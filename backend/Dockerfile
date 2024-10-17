FROM python:3.12-slim
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
    sh -c "curl -o /usr/share/postgresql-common/pgdg/apt-archive.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc" &&\
    sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt-archive.postgresql.org.asc] https://apt-archive.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' &&\
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends  \
    libpython3-dev \
    postgresql \
     && \
    # install application requirements
    pip install --upgrade pip &&\
    pip install pipenv && \
    PIPENV_VENV_IN_PROJECT=1 pipenv install --system
