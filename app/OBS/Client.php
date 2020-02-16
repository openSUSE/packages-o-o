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
     * 2. -debuginfo packages: only experts need it.
     * 3. -buildsymbols packages: only experts need it.
     * 4. -debugsource packages: only exports need it.
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
                ) {
                $new_array[] = $binary;
            }
        };
        return $new_array;
    }

    /**
     * Search published binaries in OBS instance.
     *
     * @param string[] $keywords
     * @param string $distro
     * @return App\OBS\OBSBinary[]
     */
    public function searchBinaries($keywords, $distro)
    {
        $query_string = join("','", $keywords);
        if (empty($distro)) {
            $distro = 'openSUSE:Factory';
        }
        $xpath = "contains-ic(@name, '$query_string') and path/project='$distro'";

        $res = $this->request('GET', '/search/published/binary/id', [
            'query' => [
                'match' => $xpath
            ]
        ]);
        $body = $res->getBody();

        $xml = new SimpleXMLElement($body);
        $items = $xml->xpath('binary');
        $binaries = [];
        foreach ($items as $item) {
            $binary = (array)$item;
            $binaries[] = $binary['@attributes'];
        }

        return self::filterBinaries($binaries);
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
