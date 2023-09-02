FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
ENV NEXT_PUBLIC_API_ENDPOINT=https://maze-runner-api.onrender.com
EXPOSE 3000
CMD [ "yarn", "start" ]