<?php

namespace App\OBS;

use ErrorException;
use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Exception\ClientException;
use SimpleXMLElement;

class Client
{
    /**
     * Create a new OBS client instance.
     *
     * @return void
     */
    public function __construct($apiroot, $username, $password)
    {
        $this->client = new HttpClient();
        $this->apiroot = $apiroot;
        $this->password = $password;
        $this->username = $username;
    }

    /**
     * Send request to OBS API.
     *
     * @return GuzzleHttp\Response
     */
    public function request($method = 'GET', $path = '/', $options = [])
    {
        $full_url = $this->apiroot.$path;
        $new_options = array_merge($options, [
            'auth' => [$this->username, $this->password]
        ]);
        return $this->client->request($method, $full_url, $new_options);
    }

    /**
     * Filter out the following binaries:
     * 1. Ghost packages: the project has been deleted but binaries still exist.
     * 2. Source packages: they are rarely used.
     * 3. -buildsymbols packages: only experts need them.
     * 4. -debuginfo packages: only exports need them.
     * 5. -debugsource packages: only experts need them.
     * 6. Maintenance packages: not for installation.
     */
    public static function filterBinaries($binaries)
    {
        $new_array = [];
        foreach ($binaries as $binary) {
            if (
                isset($binary['project'], $binary['package'])
                && substr($binary['name'], -13) !== '-buildsymbols'
                && substr($binary['name'], -10) !== '-debuginfo'
                && substr($binary['name'], -12) !== '-debugsource'
                && $binary['arch'] !== 'src'
                && substr($binary['project'], 0, 21) !== 'openSUSE:Maintenance:'
            ) {
                $new_array[] = $binary;
            }
        };
        return $new_array;
    }

    /**
     * Merge patchinfo into binaries (Leap)
     * Binaries in openSUSE:Leap:15.x:Update have @project=patchinfo.xxx, but we
     * want them to be the actual source package.
     */
    public static function mergeBinaryPatchInfo($binaries)
    {
        $package_names = [];
        $all_package_names = [];
        foreach ($binaries as $binary) {
            if (substr($binary['project'], 0, 14) === 'openSUSE:Leap:' && substr($binary['project'], -7) !== ':Update') {
                $package_names[$binary['name']] = $binary['package'];
            }
        }
        $new_array = [];
        foreach ($binaries as $binary) {
            if (substr($binary['package'], 0, 10) === 'patchinfo.') {
                // We assume source package names won't change in release lifetime
                if (isset($package_names[$binary['name']])) {
                    $binary['package'] = $package_names[$binary['name']];
                }
                // If the package is new addition after the release, we have to
                // keep patchinfo source package names.
            }
            $new_array[] = $binary;
        }
        return $new_array;
    }

    /**
     * Search published binaries in OBS instance.
     *
     * @param string[] $keywords
     * @param string $distro
     * @param string $arch
     * @return App\OBS\OBSBinary[]
     */
    public function searchBinaries($keywords, $distro, $arch)
    {
        $query_string = join("','", $keywords);

        if (empty($distro)) {
            $distro = 'openSUSE:Factory';
        }

        if (empty($arch)) {
            $arch = 'x86_64';
        }

        $project_string = "path/project='$distro' or path/project='$distro:NonFree'";

        // TODO: fix ARM and PowerPC search results

        $xpath = "contains-ic(@name, '$query_string') and (@arch='$arch' or @arch='noarch') and ($project_string)";

        try {
            $res = $this->request('GET', '/search/published/binary/id', [
                'query' => [
                    'match' => $xpath
                ]
            ]);
        } catch (ClientException $e) {
            // Some query string cause OBS API limit errors
            abort(500, 'Failed to communicate with OBS.');
        }

        $body = $res->getBody();

        $xml = new SimpleXMLElement($body);
        $items = $xml->xpath('binary');
        $binaries = [];
        foreach ($items as $item) {
            $binary = (array)$item;
            $binaries[] = $binary['@attributes'];
        }

        $binaries = self::filterBinaries($binaries);
        if (substr($distro, 0, 14) === 'openSUSE:Leap:') {
            $binaries = self::mergeBinaryPatchInfo($binaries);
        }
        return $binaries;
    }

    public function fetchBinaryFileInfo($binary)
    {
        try {
            $project = $binary['project'];
            $repository = $binary['repository'];
            $arch = $binary['arch'];
            $package = $binary['package'];
            $filename = $binary['filename'];
        } catch (ErrorException $e) {
            return null;
        }

        if ($arch === 'src') {
            return null;
        }

        try {
            $res = $this->request('GET', "/build/$project/$repository/$arch/$package/$filename", [
                'query' => [
                    'view' => 'fileinfo'
                ]
            ]);
            $body = $res->getBody();

            $xml = new SimpleXMLElement($body);

            $fileinfo = [
                'name' => (string)$xml->name,
                'version' => (string)$xml->version,
                'release' => (string)$xml->release,
                'arch' => (string)$xml->arch,
                'source' => (string)$xml->source,
                'summary' => (string)$xml->summary,
                'description' => (string)$xml->description,
                'size' => (string)$xml->size,
                'mtime' => (string)$xml->mtime,
            ];

            return $fileinfo;
        } catch (ClientException $e) {
            // Some s390x RPMs don't have fileinfo
            return null;
        }
    }
}
