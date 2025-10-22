import { test, expect } from '@playwright/test';
const rtheader = require('../utils_api/Returnheader');
const endpoint = require('../utils_api/endpoint');
const apiRequest = require('../api_request/component');
const apiClient = require('../utils_api/apiClient');

test.describe('API EndPoint Tests', () => {

  test('@api GET Call for Component', async ({ request }) => {
    const response = await new apiClient().getRequest(
      request,
      endpoint.get_component_endpoint(),
      { 'Authorization': rtheader.returnheader() }
    );

    console.log("GET Endpoint:", endpoint.get_component_endpoint());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Response Body:', responseBody);
  });
});
