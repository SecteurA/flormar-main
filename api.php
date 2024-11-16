<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Y2\ItemInventory\HelloWorld;
use Y2\ItemInventory\ItemInventoryWcfService;
use Y2\ItemInventory\RetailContext;
use Y2\ItemInventory\GetAvailableQty;


function getUrlParamArray($param) {
    if (isset($_GET[$param])) {
        return explode(',', $_GET[$param]);
    }
    return [];
}



 $wsdl = 'http://105.159.252.51/Y2_B5_COSMETICS/ItemInventoryWcfService.svc?wsdl'; // WSDL interface
 $login = 'B5COSMETICS\WEBSERVICE'; // credentials for basic auth
 $password = 'webservice@@@2020'; // credentials for basic auth
$dbId = 'B5COSMETICS'; // Y2 database ID

$ids = getUrlParamArray('ids');

if(!isset($ids)) return null;

$retailContext = new RetailContext();
$retailContext->setDatabaseId($dbId);

try {
    $client = new ItemInventoryWcfService($wsdl, [
        'login'    => $login,
        'password' => $password
    ]);
    
    $result="";

foreach ($ids as $id) {
 
 
    $helloWorld = new \Y2\ItemInventory\GetAvailableQty('', $id, '', '001', $retailContext);
    $call = $client->GetAvailableQty($helloWorld)->getGetAvailableQtyResult();

 if ($call->getAvailableQty() != "0.0000")
     $result = $result.$id.' , ';
  

   
}


echo($result);
 


} catch (SoapFault $e) {
    echo "SOAP ERROR CALL : " . $e->getMessage() . "\n";
}

