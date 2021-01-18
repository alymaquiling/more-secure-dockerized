# More Secure App, now Dockerized! 
Dockerized web application demonstrating authentication and authorization with JWTs built with Node.js, Express, PostgreSQL, and React.

To run application, run `docker-compose up -d` from the root folder. This website will be accessible from localhost:1234

When initialized, two users will be created:
- Admin Account
  * Username: admin
  * Password: administrator
  * Roles: Admin/Moderator/User
- Moderator Account
  * Username: mod
  * Password: moderator
  * Roles: Moderator/User
  
All new users will only have the User role provisioned.

### To-do: 
- Implement error handling for registration page - username/email in use
- Create .env file for use with api/database/docker-compose

# Screenshots
## Pages
### Home
![Home](screenshots/pages/homepage.png)
### Login
![Login](screenshots/pages/login-page.png)
### Signup
![Signup](screenshots/pages/signup-page.png)
### User Registered
![Registration Confirmation](screenshots/pages/user-registered-page.png)
### Registered Users
#### User Board
![User Board](screenshots/pages/user-board-page.png)
#### Moderator Board
![Moderator Board](screenshots/pages/mod-board-page.png)
#### Admin Board with Ping Test
##### Host Reachable
![Admin Board 1](screenshots/ping/admin-ping-alive.png)
##### Host Unreachable
![Admin Board 2](screenshots/ping/admin-ping-dead.png)
## Error Handling
### Unauthorized View
![Unauthorized](screenshots/pages/unauthorized-page.png)
### Invalid Hostname for Ping Test
![hostname error](screenshots/error-handling/admin-ping-error-handling.png)
### Login Errors
#### Incorrect Credentials
![credentials error](screenshots/error-handling/invalid-login-error-handling.png)
#### Required Field
![login required field error](screenshots/error-handling/login-error-handling.png)
### Registration Errors
#### Invalid Email
![Email error](screenshots/error-handling/signup-error-handling-email.png)
#### Invalid Password
![Password error](screenshots/error-handling/signup-error-handling-password.png)
