# build
FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN apk update && apk upgrade && \
    apk add --no-cache bash git 
RUN npm install
COPY . .
RUN npm run build

# production
FROM nginx:stable-alpine as production-stage

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]