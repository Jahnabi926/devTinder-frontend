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

-- For handle routes like "devtinder.in/requests, on page refresh , it goes to 404 nginx error. To handle that , we change location / { ...try_files $uri 404" } to "try_files $uri /index.html". ---- for react and next js applications as they are single page applications

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

# Adding a Custom Domain Name

-- Go to GoDaddy. Purchase a domain name. Eg- devtinder.in
-- All / my products -> Edit DNS of your project name
-- DNS means Domain name server -- it tells Which ip address, devtinder.in is mapping to.
-- Visit Cloudflare Sign up -- to manage DNS, it gives free SSL. It can be done in GoDaddy as well.
-- Go to Add a domain name -> devtinder.in -> Quick scan for DNS Records -> free plan -> Continue to activation

-- Visit GoDaddy -> Nameservers -> Change Nameservers -> I'll use my own nameservers -> use cloudflare nameservers -> copy-paste from cloudflare -> save. Wait for 15 mint to update.

-- Under DNS Records - delete the A named records of devtinder.in. Keep one.
-- Under one of the A records ,Copy our public ip4 address from aws and paste it under ip4 address. http not required. Only the ip4 address -> save

-- devtinder.in will point to our server. Explore !

## Enable SSL - http to https

-- To secure our website -- CloudFlare -> SSL -> Custom SSL/TLS -> Select Flexible -> save
-- Edge certificates -> Automatic HTTPS Rewrites -> Enable it.
-- In order to enable full instead of flexible , we need to upload ssl certicate (key) to our server as well and make some nginx configuration. Flexible works for us !

# Sending Emails via Amazon Simple Email Service

-- If you send a connection request to somebody, how to send a email to users. For that we will use Amazon SES

-- Amazon Simple Email Service -> Sign in to the console -> region Mumbai -> Search for "Iam" -> users -> create user -> name -> Attach policies directly -> search amazon ses -> Select AmazonSESFullAccess -> Next -> user created. Go to AWS Console and search for SES -> Amazon SES -> Account dashboard -> View get setup page -> Create identity -> Identity type "Domain" -> Enter devtinder.in -> Easy DKIM -> RSA_2048_BIT -> Enabled (both) -> Create Identity.

-- If no domain name -- Verify an email address - Go to amazon ses -> Create Identity -> Email address -> verify using link . AWS Verifies sender's email ids

-- Cloudflare -> DNS Records -> Copy the CNAME DNS Record and value from Amazon SES and paste it in cloudflare DNS Records -> Turn off proxy. Create another CNAME Record. Create 3 DNS Records. AWS will verify that devtinder is our domain. It takes 10 min. Identity verifies. DNS Configuration successful

-- Amazon SES -> Go to getsetup page -> Request production access -> Website url ( https://devtinder.in/) -> Additional contacts -> support@namastedev.com -> acknowledge -> Submit

-- Amazon SES -> IAM -> Users -> Security credentials -> Create an access key -> select other -> next -> create access key -> copy the secret access key -> devtider-backend code -> .env file -> AWS_SES_SECRET="the key" , copy the access key and store as AWS_ACCESS_KEY="access key" -> Done.

-- Go to AWS SES NODEJS DOC -> Send Email using Amazon SES -> Sending an email code.

-- Install AWS SDK V3 - AWS - Documentation -> AWS SDK for javascript -> Get started with Node js -> code examples -> Amazon ses -> Send Email.

-- Inside utils folder -> create sesClient.js file -> copy code of sesClient.js from git repo "aws-doc-sdk-examples" -> install the package before running the code -> npm i @aws-sdk/client-ses -> change import and export style to require and module.exports -> const {SESCient} = require("@aws-sdk/client-ses") -> module.exports = {sesClient} -> change REGION to "ap-south-1".

-- Configure your SES Client in v3 -> add accesskey -> const sesClient = new SESClient({ region: REGION , credentials : { accessKeyId: process.env.AWS_ACCESS_KEY , secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY}})

-- ses SEND Email -> Inside utils folder -> create sesSendEmail.js file -> copy code of ses_sendemail.js from git repo "aws-doc-sdk-examples" -> change import and export style to require and module.exports -> but add your verified identities (domain name and email address), else email will not go through sandbox.

-- Test your code - if i send a connection request, it should send me an email.

-- Inside request.js file, import sendEmail file by writing const sendEmail = require("../utils/sendEmail") -> inside the api "/request/send/:status/:toUserId"

-- After the line .save() , write const emailRes = await sendEmail.run(), console.log(emailRes) to check

-- Restart your server -> npm run dev -> click on interested of an usercard and get api response under networks tab -> check your email to receive and email from aws.

-- To make our mail dynamic -- Inside sendEmail.js file -- const run = async (subject, body){ ..., subject , body} ,
const sendEmailBodyCommand = (toAddress, fromAddress, subject, body) {... , Subject: {.. Data: subject}, Body: {{Data: `<h1>${body}</h1>`}}}
write a custom message or the response inside run, const emailRes = await sendEmail.run(here)

-- Check your or the emails of the receiver to receive the customised email from the aws that "somebody is interested in the receiver"

-- create your .env file in the aws machine as our github code doesnot have th dotenv file which contains the secret keys needed to run our code.

-- login to your machine by ssh

-- Run git pull to get the lastest pushed code from github. restart pm2 or stop and start fresh.

-- sudo nano .env to edit the .env file, add the contents of env file.

-- restart pm2 and refresh devtinder.in/login and explore.

-- Always keep your pem files safe.

-- Add the parameter "toEmailId" in the line const run = async (subject, body, toEmailId)

# Scheduling Cron Jobs in NodeJs

-- Installing node cron
-- Learning about cron expression syntax - crontab.guru
-- Schedule a job
-- date-fns
-- Find all the unique email ids who have got connection request in previous day
-- Send Email
-- Explore queue mechanism to send bulk emails or
-- Amazon SES Bulk emails
-- Make sendEmail function dynamic
-- bee-queue && bull npm packages

# Payment Gateway Integration ft. Razorpay

-- Sign up to RazorPay & complete KYC
-- Created a UI for premium page.
-- Created an api for create order in backend
-- Check "Razorpay documentation node js" and "npm i razorpay" in backend, follow Integrate With Razorpay Payment Gateway
-- Added my key and secret in env file
-- Initialised razorpay in utils
-- Created order on RazorPay
-- Created Schema and Model
-- Saved the order in payments collection
-- Make the API dynamic (passing gold, silver memberships)
-- Setup Razorpay webhook on your live api . localhost won't work here. Go to razorpay website dashboard -> accounts & settings -> webhooks -> Add new webhook -> webhook url (https://devTinder.in/api/payment/webhook), secret, check payment fail, captured -> create webhook.

-- Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
-- Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
-- Ref - https://razorpay.com/docs/webhooks/validate-test?search-string=validate%20and%20test
-- Ref - https://razorpay.com/docs/webhooks/payments/
-- Push, Deploy and Test your code

## The flow

-- Pay Now button calls your backend's create-order API. The backend uses RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET to authenticate with Razorpay's servers and creates an order there. Razorpay returns an orderId, which the backend sends back to the frontend (along with the public RAZORPAY_KEY_ID).

-- After receiving the orderId, Frontend should open the razorpay dialog box
-- Once the payment is successful, razorpay will send a webhook to us
-- "webhook" is what api should razorpay call if a payment is success or fail. Whenever there will be a successful transaction, the webhook url will be called.
-- Payment is verified by calling an api from frontend and UI is updated for payment success or failure.

Note --
Webhook is the server-to-server notification for payment success/failure (this is the reliable source of truth, not the frontend redirect).
Why webhooks matter at all — a user could close the browser tab right after paying, before the frontend gets a chance to confirm anything. The webhook guarantees your backend still finds out and updates the payment status, independent of what the frontend does. That's the actual reason localhost doesn't work for webhooks — Razorpay's servers need a publicly reachable URL to call.

# Real Time Chat using Websocket(Socket.io)

-- Build the UI for a chat window /chat/:targetUserId
-- Setup socket.io in backend
-- npm i socket.io
-- Setup frontend socket.io-client
-- Initialise the chat
-- createSocketConnection
-- Listen to events
-- Homework: Improve the UI (chat window as new chats get hidden)
-- Homework: Fix Security Bug - auth in web sockets
-- Homework: Fix bug - iF I'm not a friend, then I should not be able to send messsage
-- Homework: feat: Show Green Symbol when online, last seen 2 hours ago
-- Homework: Limit messages when fetching from DB
-- Similar Project Ideas: Tic tac toe, chess game, typeracer

## Notes

-- socket.on(...) = "I'm listening on this channel"
-- socket.emit(...) = "I'm broadcasting on this channel"
-- The event name string = the channel name — both sides must say the exact same word or they never hear each other
-- Why rooms? (so messages only go to the two people chatting, not everyone)
