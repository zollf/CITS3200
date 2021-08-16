FROM python:3.8.3-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache mariadb-dev build-base
RUN pip install --upgrade pip 
COPY ./requirements.txt /usr/src/app
RUN pip install -r requirements.txt

COPY . /usr/src/app

RUN python manage.py migrate

EXPOSE $PORT
CMD gunicorn app.core.wsgi:application --bind 0.0.0.0:$PORT
