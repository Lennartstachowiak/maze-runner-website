FROM node:lts-alpine
WORKDIR /app
COPY . .
ENV API_ENDPOINT=https://maze-runner-api.onrender.com
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]