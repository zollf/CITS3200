FROM python:3.9-slim

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y default-libmysqlclient-dev gcc
RUN pip install --upgrade pip 
COPY ./requirements.txt /usr/src/app
RUN pip install -r requirements.txt

COPY . /usr/src/app

RUN python manage.py migrate

EXPOSE 8000
CMD gunicorn app.core.wsgi:application --bind 0.0.0.0:8000
