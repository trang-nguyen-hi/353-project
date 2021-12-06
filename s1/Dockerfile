
FROM node:latest

EXPOSE 8080

WORKDIR /usr/src/app

RUN npm init -y
RUN npm install nodemon express body-parser cookie-parser debug ejs http-errors morgan mysql express-session express-flash express-validator@5.3.0 react react-dom 
RUN npm install babel-core babel-loader babel-preset-react babel node-cron moment
# CMD ["node", "server.js"]
