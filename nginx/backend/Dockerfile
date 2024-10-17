FROM nginx:stable-alpine

EXPOSE 80

COPY ./docker/nginx/backend/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
