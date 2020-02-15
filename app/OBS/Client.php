<?php

namespace App\OBS;

use GuzzleHttp\Client as HttpClient;
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
    public function request($method = 'GET', $path = '/', $options = []) {
        $full_url = $this->apiroot.$path;
        $new_options = array_merge($options, [
            'auth' => [$this->username, $this->password]
        ]);
        return $this->client->request($method, $full_url, $new_options);
    }

    /**
     * Search published binaries in OBS instance.
     *
     * @param string[] $keywords
     * @return App\OBS\OBSBinary[]
     */
    public function searchBinaries($keywords)
    {
        $query_string = join("','", $keywords);
        $distribution = 'openSUSE:Factory';
        $xpath = "contains-ic(@name, '$query_string') and path/project='$distribution'";

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

        return $binaries;
    }
}
