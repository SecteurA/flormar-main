import { createClientAsync } from 'soap';

// Configuration
const wsdlUrl =
  'http://105.159.252.51/Y2_B5_COSMETICS/ItemInventoryWcfService.svc?wsdl';
const authOptions = {
  wsdl_options: {
    username: 'B5COSMETICSWEBSERVICE',
    password: 'webservice@@@2020',
    strictSSL: false,
  },
};
const dbId = 'B5COSMETICS';

// Utility function to get URL parameters
function getUrlParamArray(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(param) ? urlParams.get(param).split(',') : [];
}

// Main function to get product quantities
async function getProductQuantities(ids) {
  if (!ids || ids.length === 0) {
    return null;
  }

  const retailContext = {
    DatabaseId: dbId,
    // Add any other required properties for RetailContext
  };

  try {
    // Create SOAP client
    const client = await createClientAsync(wsdlUrl, authOptions);

    let result = '';

    // Loop through each ID to get product quantity
    for (const id of ids) {
      const requestParams = {
        ItemIdentifier: '',
        ItemId: id,
        StoreId: '',
        WarehouseId: '001',
        ClientContext: retailContext,
      };

      // Call the GetAvailableQty method
      const [response] = await client.GetAvailableQtyAsync({
        request: requestParams,
      });
      if (
        response &&
        response.GetAvailableQtyResult &&
        response.GetAvailableQtyResult.AvailableQty !== '0.0000'
      ) {
        result += `${id} , `;
      }
    }

  } catch (error) {
    console.error('SOAP ERROR CALL:', error.message);
  }
}

// Fetch product quantities
export { getProductQuantities };
