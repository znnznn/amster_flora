FROM python:3.12-slim-bullseye
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONPATH "${PYTONPATH}:/backend"

WORKDIR /app/backend

COPY . .

EXPOSE 8000


RUN apt-get update &&  \
    apt-get upgrade -y && \
    apt-get install -y  \
    curl \
    wget \
    libpq-dev \
    gnupg \
    libffi-dev \
    lsb-release \
    gcc \
    postgresql-common \
    g++ && \
    sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
    sh -c "wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -" && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends  \
    libpython3-dev \
    postgresql \
     && \
    # install application requirements
    pip install --upgrade pip &&\
    pip install pipenv && \
    PIPENV_VENV_IN_PROJECT=1 pipenv install --system --deploy --ignore-pipfile
