FROM node:latest
RUN node --version
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000
CMD yarn build && yarn start
