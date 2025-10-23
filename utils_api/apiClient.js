// utils_api/apiClient.js
export default class apiClient {

  async putRequest(request, endpoint, headers = {}, data) {
    const response = await request.put(endpoint, {
      headers,
      data
    });
    return response;
  }

  async getRequest(request, endpoint, headers = {}) {
    const response = await request.get(endpoint, {
      headers
    });
    return response;
  }

  async postRequest(request, endpoint, headers = {}, data) {
    const response = await request.post(endpoint, {  // ✅ fixed: was incorrectly using PUT
      headers,
      data
    });
    return response;
  }

}
