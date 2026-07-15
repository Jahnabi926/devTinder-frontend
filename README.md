# Dev Tinder Frontend

-- Create a Vite + React app
-- Remove unnecessary code and craete a hello world app
-- Install tailwindCSS
-- Install Daisy UI
-- Add Navbar component to app.jsx
-- Create a navbar.jsx separate component file
-- Install react router dom
-- Create routes and it children routes
-- Create an Outlet in your Body component
-- Create a Footer
-- Create a Login Page
-- Install axios
-- CORS - Install cors in backend => add middleware to app with configurations: origin , credentials: true
-- Whenever you're making an API call using axios, pass {withCredentials : true}. It will not send the token back to the Application tab of browser. Cookies won't have the token. Set-cookies will be seen in Networks tab Header but not in Applications tab.
-- Send the user data in backend, instaed of "Login Successful" message.
-- Test your code. Login successful saves token under Applications tab.
-- Install redux-toolkit and react-redux
-- Configure store => Provider => createSlice => add reducer to store
-- Add Redux devtools in chrome
-- Login and see if your data is showing properly in the store
-- Navbar should update as soon as user logs in
-- Refactor your code to add constants file
-- You should not be able to access other routes without login
-- If token is not present, redirect user to login page
-- Logout
-- Get the feed and add the feed to the store
-- Build the user card on feed.
-- Build Edit Profile page
-- See all my connections / Connections page
-- See all my requests / Requests page
-- Accept/ Reject connection requests
-- Send /ignore the user card from feed
-- Sign up New User
-- E2E Testing

## Deployment

-- Signup on AWS
-- Launch Instance
-- On terminal change/modify permissions of the pem file in the folder eg-downloads, where you have your pem file using "chmod 400 <secret>.pem
-- Connect/log in to the machine using ssh that you created , it will be like -- "ssh -i ubuntu@ec2-43..."
-- The above will log in to the terminal of your machine and move you from Downloads..
-- Get your softwares to setup your project onto the laptop given by aws by the below--

---install node using "curl -o- "
-- check your node version in you local computer by doing "node --v"
-- install that version of node into your machine given by server. Else it will mismatch.
-- do "nvm install ..."
-- logout from the machine by "exit"
-- log back in by "ssh -i ...."
-- do "nvm install ..." again
-- node -v to verify
-- Get your code from github
-- Grab the code from github of both backend and frontend and clone into the new system

## Deploy your frontend

-- Do "npm run build" -- vite is the bundler here. It will create a dist folder.
-- Do ssh to connect again, if its gets disconnected.
-- Move inside your frontend project, Run "npm install" to install all dependencies along with vite
-- Now run "npm run build" . It will build our project on aws
-- Run "sudo app update" -- to update ubuntu versions etc
-- Run "sudo app install nginx" -- to install nginx . Nginx gives an http server.
-- Run "sudo systemctl start nginx" -- to start nginx
-- Run "sudo systemctl enable nginx" -- to enable nginx
-- Copy code from dist(build files) to http server (/var/www/html/) by doing
"cd /var/www/html/"
-- Run ls . Replace the index.nginx-debian.html file by dist folder
-- Enter the frontend project by doing "cd devTinder-frontend"
-- Run "sudo scp -r dist/\* /var/www/html/" -- sudo to get root level permisiions, scp is copy , and -r is recursiveness to copy everything of dist folder to /var/www/html/
-- Run cd /var/www/html/ and ls -- all files have been copy pasted onto /var/www/html/
-- Go to aws instances and find public iPv4 address -- where we can access our server
-- Go to that ip , you should see your frontend app running. But it won't because aws blocks all our ports. Nginx HTTP Server is on port no- 80. We need to expose our port 80 to make this work. Enable port 80 on your instance by -
-- Go to aws -> security -> security groups -> Inbound rules -> Edit inbound rules -> Add rule -> Select HTTP -> Port range (80) -> select 0.0.0.0/0 to allow access from anywhere on the internet -> Save rules
-- Refresh the public iPv4 address and see frontend app running (only if the server is running)

## Deploy your backend

-- Login to your machine again using ssh command
-- Run "cd devTinder-backend"
-- Run "npm install"
-- Go to MongoDb Atlas -> Network Access -> Add ip address -> allow access from anywhere
-- Once it is activated, run "npm run start" or "npm start" to establish database connection.
-- But allowing access from anywhere is risky due to security reasons, so by the same process add the public ip4 address of the ec2 instance in mongodb atlas and remove the 0.0.0.0/0. Now only the local and system and the machine of aws will be able to access our database. Not anyone from the internet. Once activated, run "npm run start" or "npm start".
-- Hit public ip4 address:7777 (backend's port), but it will not run, as we need to expose / enable our port
-- To enable - go to aws -> security -> security groups -> edit inbound rules -> Add rule -> Select custom TCP -> Port Range (7777) -> select 0.0.0.0/0 to allow access from anywhere on the internet -> Save rules
-- Go to public ip4 address:7777/login -> Shows "Please Login".
-- But suppose we close our backend server in the machine, ip4 address:7777/login will be gone. So there should be a process that will keep npm start running in the background forever. For this we will use PM2. It's a process manager
-- Run "npm install pm2 -g"
-- Run "pm2 start npm -- start".
-- Now ip4 address:7777/login -> Shows "Please Login".
-- Run "pm2 logs" to see issues.
-- Run "pm2 flush npm" to clear logs. Now "pm2 logs" will give empty.
-- Run "pm2 stop <name>" to stop the process named npm.
-- Run "pm2 delete <name>" to delete the process named npm. Eg - pm2 delete npm.
-- Run "pm2 start npm --name "devtinder-backend" -- start" , to create a custom named process. Check by running "pm2 list"
-- Our frontend and backend are deployed but Now our frontend will not run , because our apis are running on "http:/localhost:7777/login", and our aws ip4 address is different. We need to connect frontend to backend.

Suppose ,
Frontend = http://43.204.96.49/
Backend = http://43.204.96.49:7777/

If domain name exists,
Domain name = devTinder.com maps to 43.204.96.49 which is called DNS mapping, then

Frontend = devTinder.com
Backend = devTinder.com:7777

But best practice is
Backend = devTinder.com/api . To map :7777 to /api . For that we use, nginx proxy pass

Google or chat gpt -- "nginx proxy pass /api to 7777 node application"

## Nginx config

-- Edit the nginx config file in terminal by --
sudo nano /etc/nginx/sites-available/default

-- Written in white are the rules and written with # are the comments. edit carefully
-- Edit these --- server_name <public ip4 address> or server_name <domain name> . Example -- server_name 43.204.96.49 or server_name devTinder.com

-- Below server_name 43.204.96.49 , Add the rule starting with "location /api/ {...} " given by google or chatgpt.
Change http://127.0.0.1:7777/ to http://localhost:7777/ , since our api uses localhost.

-- Restart nginx by "sudo systemctl restart nginx"
-- Now http://43.204.96.49/api should give "Cannot GET" instead of 404. Means it is mapped correctly.
-- Go to http://43.204.96.49/api/feed , it says "Please login"
-- Lastly go to your frontend project code , and change the hardcoded http://localhost:7777 "BASE_URL" inside constants file to "/api". If we don't write anything before /api means it will directly take our server ip address
-- Login to the machine by doing ssh -i
-- Import the code on the server
-- Run "cd devTinder-frontend" and run "git-log" and "git pull" to see the changes
-- Page refresh frontend will not work
-- Run the same steps starting from npm run build to deploy our frontend
-- Run "npm run build" , "sudo scp -r dist/\* /var/www/html/"
-- Now http://43.204.96.49/login should give the login page, and everything should work !
-- Application deployed successfully on aws machine(server) !
