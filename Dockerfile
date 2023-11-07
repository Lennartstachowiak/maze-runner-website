FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "build", "&&", "npm", "run", "start" ]