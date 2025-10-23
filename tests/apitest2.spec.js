// tests/apitest_get.spec.js
import { test, expect } from '@playwright/test';
import Returnheader from '../utils_api/Returnheader.js';
import AllEndpoint from '../utils_api/endpoint.js';
import { Component } from '../api_request/component.js';
import apiClient from '../utils_api/apiClient.js';

test.describe('API EndPoint Tests', () => {

  test('@api GET Call for Component', async ({ request }) => {
    const client = new apiClient();

    const response = await client.getRequest(
      request,
      AllEndpoint.get_component_endpoint(),
      { Authorization: Returnheader.returnheader() }
    );

    console.log("✅ GET Endpoint:", AllEndpoint.get_component_endpoint());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('🧩 Response Body:', responseBody);
  });
});
