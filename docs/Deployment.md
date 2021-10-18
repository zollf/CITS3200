# Deployment
To deploy this application you'll have to use docker. You can deploy with regular python however that is more involved and not covered.

Things you'll need
- Somewhere to run the code (e.g., AWS EC2 or AWS Lightsail, Heroku)
- MySql Database Only if you choose mysql option (e.g., AWS RDS, ClearDB)
- SMTP (e.g., AWS SMTP, Google SMTP)

You'll either need to build image then push image to cloud service (e.g., EC2 + ECR) in some way or run these scripts within a terminal that has docker (Lightsail).

Currently we are running with Heroku + ClearDB + Google SMTP as all of them are free.

I would recommend storing image on AWS ECR and using EC2 to deploy image, also using AWS RDS for database.

## Docker + MySql
### ENV SETUP
```bash
DOCKER_BUILDKIT=1

# Type of environment you are using (dev, prod, test)
ENV="prod"

# Enable debug mode 
DEBUG="False"

# Django Secret Key 
SECRET_KEY="secret"

# MYSQL Database Connection
MYSQL_DATABASE="db"
MYSQL_USERNAME="mysql"
MYSQL_PASSWORD="mysql"
# ('localhost', '127.0.0.1') or 'mysql' for Docker
MYSQL_HOST="mysql"
MYSQL_PORT="3306"

EMAIL_HOST="changeme"
EMAIL_HOST_USER="changeme"
EMAIL_HOST_PASSWORD="changeme"
EMAIL_PORT="587"
EMAIL_USE_TLS="True"
DEFAULT_FROM_EMAIL="changeme"
```

### BUILD
You'll require a connection to the db as it runs a migration on database so it is up to date
```
docker build -f docker/django.prod.Dockerfile -t unipark .
```

### RUN
```
docker run --publish 8000:8000 unipark
```

Open/Route localhost:8000

## Docker + Sqlite3
### ENV SETUP
```bash
DOCKER_BUILDKIT=1

# Type of environment you are using (dev, prod, test)
ENV="test"

# Enable debug mode 
DEBUG="False"

# Django Secret Key 
SECRET_KEY="secret"

EMAIL_HOST="changeme"
EMAIL_HOST_USER="changeme"
EMAIL_HOST_PASSWORD="changeme"
EMAIL_PORT="587"
EMAIL_USE_TLS="True"
DEFAULT_FROM_EMAIL="changeme"
```

### BUILD
```
docker build -f docker/django.prod.Dockerfile -t unipark . 
```

### RUN
```
docker run --publish 8000:8000 unipark
```

Open/Route localhost:8000