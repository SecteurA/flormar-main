<?php

// Set headers for CORS
header("Access-Control-Allow-Origin: https://admin.flormar.ma");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include WordPress core files (adjust the path if WordPress is installed in a different directory)
require_once '/var/www/html/wp-load.php';

// Ensure the user is logged in
#if (!is_user_logged_in()) {
 #   http_response_code(403);
  #  echo "You must be logged in to access this resource.";
   # exit;
#}

// Enable error reporting for debugging (only in development, disable in production)
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Autoload Composer dependencies (assuming you have the Y2 library installed via Composer)
require_once __DIR__ . '/vendor/autoload.php'; // Adjust this path if necessary

// Use necessary classes from Y2 namespace
use Y2\ItemInventory\RetailContext;
use Y2\ItemInventory\GetAvailableQty;
use Y2\ItemInventory\ItemInventoryWcfService;

// WSDL service credentials and configuration
$wsdl = 'http://105.159.252.51/Y2_B5_COSMETICS/ItemInventoryWcfService.svc?wsdl'; // WSDL interface
$login = 'B5COSMETICS\WEBSERVICE'; // credentials for basic auth
$password = 'webservice@@@2020'; // credentials for basic auth
$dbId = 'B5COSMETICS'; // Y2 database ID


//New WSDL service credentials and configuration
#$wsdl = 'https://90467427-test-retail-ondemand.cegid.cloud/Y2/ItemInventoryWcfService.svc?wsdl';
#$login = '90467427_002_TEST\WEBSERVICE02';
#$password = 'webservice@@@2020';
#$dbId = '90467427_002_TEST';


// Create retail context
$retailContext = new RetailContext();
$retailContext->setDatabaseId($dbId);

try {
    // Create SOAP client
    $client = new ItemInventoryWcfService($wsdl, [
        'login' => $login,
        'password' => $password
    ]);

    // Fetch all products with SKUs
    $products = wc_get_products([
        'limit' => -1,
        'return' => 'ids'
    ]);

    foreach ($products as $product_id) {
        $product = wc_get_product($product_id);
        $sku = $product->get_sku();

        if ($sku) {
            // Create GetAvailableQty request
            $getAvailableQtyRequest = new GetAvailableQty('', $sku, '', '001', $retailContext);

            try {
                // Get available quantity
                $response = $client->GetAvailableQty($getAvailableQtyRequest)->getGetAvailableQtyResult();
                $availableQty = $response->getAvailableQty();

                // Update WooCommerce product stock based on the available quantity
                if ($availableQty != "0.0000") {
                    $product->set_stock_quantity($availableQty);
                    $product->set_stock_status('instock');
                    $product->save();
                } else {
                    $product->set_stock_quantity(0);
                    $product->set_stock_status('outofstock');
                    $product->save();
                }

                echo "Updated stock for SKU: $sku, Available Quantity: $availableQty\n";

            } catch (SoapFault $e) {
                echo "SOAP ERROR for SKU: $sku: " . $e->getMessage() . "\n";
            }
        }
    }
    
} catch (SoapFault $e) {
    echo "SOAP ERROR: " . $e->getMessage() . "\n";
}

?>