import { test, expect } from '@playwright/test';
import { Component } from '../api_request/component.js';
import apiClient from '../utils_api/apiClient.js';
import AllEndpoint from '../utils_api/endpoint.js';
import Returnheader from '../utils_api/Returnheader.js';

test.describe('API EndPoint Tests', () => {
  test('@api Put Call for Component', async ({ request }) => {
    const payload = Component.put_component_request();
    const client = new apiClient();

    const response = await client.putRequest(
      request,
      AllEndpoint.put_component_endpoint(),
      { Authorization: Returnheader.returnheader() },
      payload
    );

    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
});
