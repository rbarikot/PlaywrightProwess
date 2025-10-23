// utils_api/Returnheader.js
export default class Returnheader {
  static returnheader() {
    const username = process.env.TEST_USERNAME || 'admin';
    const password = process.env.TEST_PASSWORD || 'admin';
    const header = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    return header;
  }
}
