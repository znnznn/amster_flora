# Amster Flora API

## General URL’s

| **Provider**                    | **Service Name** | **URL**                                          |
|:--------------------------------|:-----------------|:-------------------------------------------------|
| Hosting provider                | AWS              | -                                                |
| CI/CD provider                  | GiTHub Actions   | <https://github.com/znnznn/amster_flora/actions> |
| Logs provider                   | AWS              | -                                                |

## Tech details

|         **Resource**          |  **Resource Name**  | **Version** | **Comment**  |
|:-----------------------------:|:-------------------:|:-----------:|:------------:|
| Back-end programming language |       python        |    3.11     |              |
|    Back-end web framework     |       Django        |     4.2     |    + DRF     |
|           Database            | Postgres SQL Server |             |     AWS      |
|          Web server           |      Gunicorn       |             |              |
|      Front-end language       |        React        |    Next     | + TypeScript |

## Application URL’s

| **Environment** | **Service Name** | **URL**                                 |
|:----------------|:-----------------|:----------------------------------------|
| Production      | Website          | <https://amster.ua/>                    |
|                 | Swagger          | <https://api.amster.ua/api/v1/swagger/> |
|                 | Admin Panel      | <https://api.amster.ua/admin/>          |

## Installation & Launch

## Run command with docker

Run project with docker.
You need install docker
need set environments

```commandline
docker-compose up --build
```

# After docker run app has 5 containers:

- BACKEND
- FRONTEND
- DB

## Run commands

Needs add environments vars

|                    **PARTH**                     |                      **Commands**                      |     **Description**      |
|:------------------------------------------------:|:------------------------------------------------------:|:------------------------:|
|                   Requirements                   |                   pip install pipenv                   |                          |
|                   Requirements                   |                     pipenv install                     |   dependencies to venv   |
|               Start django server                |              python3 manage.py runserver               | <http://127.0.0.1:8000/> |
|                   Stop server                    |                        ctrl + C                        |                          |
|        Run migrations or database schema         |               python3 manage.py migrate                |                          |
|                    Run tests                     |                 python manage.py test                  |                          |
|                 Check code stile                 |    pylint users shops orders connection_1c bonuses     |                          |
|                                                  |                                                        |                          |
|                install Front-end                 |                      npm install                       |                          |
|                  Run Front-end                   |                        npm run                         |                          |

## Dev environment deployment

Populate `Environment variables` of your system with the following:

```bash
export DEBUG # default False
export SECRET_KEY

# settings for local database if up db with docker
export DB_NAME=postgres
export DB_USER=postgres
export DB_PASSWORD=postgres
export DB_HOST=db
export DB_PORT=5432

export EMAIL_USER
export EMAIL_FROM
export EMAIL_PASSWORD
export EMAIL_HOST
export EMAIL_PORT

export AWS_S3_ACCESS_KEY_ID
export AWS_S3_SECRET_ACCESS_KEY
export AWS_STORAGE_BUCKET_NAME

export ENVIRONMENT=local

export ACCESS_TOKEN_LIFETIME
```

Then install all the required packages:

# BACKEND

```bash
user@host$ cd backend/
```

```bash
user@host$ pip install pipenv
user@host$ pipenv install
user@host$ ./manage.py runserver
```

# FRONTED

```bash
user@host$ cd frontend/
```

```bash
user@host$ npm install
user@host$ npm run
```
