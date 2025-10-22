
class apiClient{

    async putRequest(request, endpoint, headers = {}, data){
        const response = await request.put(endpoint, {
            headers: headers,
            data: data
        });
        return response;
    }
    async getRequest(request, endpoint, headers = {}) {
        const response = await request.get(endpoint, {
            headers: headers
        });
        return response;
    }
    async postRequest(request, endpoint, headers = {}, data){
        const response = await request.put(endpoint, {
            headers: headers,
            data: data
        });
        return response;
    }

}
module.exports = apiClient;