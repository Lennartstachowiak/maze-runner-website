FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV NEXT_PUBLIC_API_ENDPOINT=http://127.0.0.1:5000
EXPOSE 3000
CMD [ "npm", "run", "dev" ]