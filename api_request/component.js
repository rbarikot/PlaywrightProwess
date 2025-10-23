import { getRandomAlphanumericName } from '../utils_api/randomalphanumeric.js';

export class Component {
  static put_component_request() {
    const payload = {
      defaultVersionType: "FULL",
      description: getRandomAlphanumericName(12),
      importAutomatically: false,
      inheritSystemCleanup: true,
      name: getRandomAlphanumericName(12), // Using the generated random alphanumeric name
      properties: {
        "MavenComponentProperties/artifactId": "selenium-java",
        "MavenComponentProperties/extension": "jar",
        "MavenComponentProperties/groupId": "org.seleniumhq.selenium"
      },
      runVersionCreationProcess: false,
      sourceConfigType: "Maven",
      useVfs: true
    };
    return payload;
  }
}
