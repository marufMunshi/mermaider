FROM node:22.15.0-alpine AS build

# setting work directory as app, rest of the path will be relative to this
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable-alpine AS serve

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]