#!/bin/sh

sudo certbot renew
docker compose -f ac*/_w*/am*/am*/docker-compose-prod.yaml exec nginx nginx -s reload

exec "$@"
