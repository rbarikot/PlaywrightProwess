class AllEndpoint{

    static put_component_endpoint(){
        return '/da/rest/deploy/component';
    }
    static get_component_endpoint(){
        return '/da/rest/deploy/component/all';
    }

}
module.exports = AllEndpoint;