import { test, expect } from '@playwright/test';
import MySQLClient from '../utils_db/mysqlClient.js';

test.describe('Database Integration Test', () => {

  test('@db Fetch data from MySQL and validate API response', async ({ request }) => {
    const db = new MySQLClient();
    // ✅ Example: Query data from DB
    const user = await db.executeQuery('select FirstName from Employees where EmployeeID=4;');
    console.log('Fetched users:', user);
    const pwd = await db.executeQuery('select LastName from Employees where EmployeeID=4;');
    console.log('Fetched Password:', pwd);

    await db.close();
  });

});
