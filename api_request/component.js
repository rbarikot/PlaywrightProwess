import { faker } from '@faker-js/faker';
class component{

    static put_component_request(){
        const payload={
  "defaultVersionType": "FULL",
  "description": faker.commerce.productDescription(),
  "importAutomatically": false,
  "inheritSystemCleanup": true,
  "name": faker.commerce.productName(),
  "properties": {
    "MavenComponentProperties/artifactId": "selenium-java",
    "MavenComponentProperties/extension": "jar",
    "MavenComponentProperties/groupId": "org.seleniumhq.selenium"
  },
  "runVersionCreationProcess": false,
  "sourceConfigType": "Maven",
  "useVfs": true
};
return payload;
    }

}
module.exports = component;