import { test, expect } from '@playwright/test';
const rtheader=require('../utils_api/Returnheader');
const endpoint=require('../utils_api/endpoint');
const apiRequest=require('../api_request/component');
const apiClient=require('../utils_api/apiClient');

test.describe('API EndPoint Tests', () =>{
  test('@api Put Call for Componnt', async({request}) => {
    const response = await new apiClient().putRequest(request, endpoint.put_component_endpoint(), {'Authorization': rtheader.returnheader()}, apiRequest.put_component_request());
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });
});