#!/bin/sh
docker compose -f ac*/_w*/am*/am*/docker-compose-prod.yaml stop
sudo certbot renew
docker compose -f ac*/_w*/am*/am*/docker-compose-prod.yaml up -d

exec "$@"
