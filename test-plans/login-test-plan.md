# Login Page Test Plan

## Application Overview

The login page of the Deployment Automation (DA) application serves as the entry point for authenticated access. It features:

- **Username and Password Fields**: For user credentials
- **Remember Me Checkbox**: To persist login sessions
- **Login Button**: To submit credentials
- **Title**: "DA"

## Test Scenarios

### 1. Valid Login
**Steps:**
1. Navigate to `http://10.119.32.132:8084/da/login`
2. Locate the Username field and type `admin`
3. Locate the Password field and type `admin`
4. Click the Login button

**Expected Results:**
- The page navigates to `http://10.119.32.132:8084/da/app`
- The title remains "DA"
- User is successfully logged into the application

### 2. Invalid Login with Incorrect Username
**Steps:**
1. Navigate to `http://10.119.32.132:8084/da/login`
2. Enter an invalid username in the Username field (e.g., `wrongUser`)
3. Enter the correct password (`admin`) in the Password field
4. Click the Login button

**Expected Results:**
- An error message is displayed indicating invalid credentials
- The user remains on the login page
- No redirection occurs

### 3. Invalid Login with Incorrect Password
**Steps:**
1. Navigate to `http://10.119.32.132:8084/da/login`
2. Enter the correct username (`admin`) in the Username field
3. Enter an incorrect password in the Password field (e.g., `wrongPass`)
4. Click the Login button

**Expected Results:**
- An error message is displayed indicating invalid credentials
- The user remains on the login page
- No redirection occurs

### 4. Empty Credentials
**Steps:**
1. Navigate to `http://10.119.32.132:8084/da/login`
2. Leave both Username and Password fields empty
3. Click the Login button

**Expected Results:**
- An error message is displayed indicating both fields are required
- The user remains on the login page
- No redirection occurs

### 5. Remember Me Functionality
**Steps:**
1. Navigate to `http://10.119.32.132:8084/da/login`
2. Enter valid credentials in the Username and Password fields
3. Check the "Remember Me" checkbox
4. Click the Login button
5. Close and reopen the browser tab
6. Navigate back to `http://10.119.32.132:8084/da/login`

**Expected Results:**
- User is automatically logged in
- Redirects to `http://10.119.32.132:8084/da/app`

### 6. UI Validation
**Steps:**
1. Navigate to `http://10.119.32.132:8084/da/login`

**Expected Results:**
- The page title is "DA"
- The Username and Password fields are present and editable
- The Login button is present and clickable
- The "Remember Me" checkbox is present and functional