#!/bin/sh

echo "Waiting for db.."

python3 manage.py check --database default
until [ $? -eq 0 ];
do
  sleep 2
  python3 manage.py check --database default
done

echo "Connected."

#python3 manage.py collectstatic --noinput
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000

exec "$@"
