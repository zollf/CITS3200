# CITS3200 Project
https://unipark.herokuapp.com/

## Pre-Setup
| Package | Site | Guide |
| ----------- | ----------- | ----------- |
| mysql | https://dev.mysql.com/downloads/installer/ | https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/ |
| node | https://nodejs.org/en/download/ |  https://phoenixnap.com/kb/install-node-js-npm-on-windows
| python | https://www.python.org/downloads/ | https://realpython.com/installing-python/
| pip | https://pip.pypa.io/en/stable/installation/ | https://phoenixnap.com/kb/install-pip-windows |
| yarn | after installing node run `npm install --global yarn` | https://classic.yarnpkg.com/en/docs/install/#windows-stable
---

## Useful VSCode Plugins
- Python
- ESLint
- Django 
- Prettier

## Setup
Copy `.env.example` to .env
```
cp .env.example .env
```

Install Python requirements (on Windows you might need to be administrator running this)
```
pip install -r requirements.txt
```

Run migration at least once on initial setup and every pull of a new change (db needs to be alive)
```
python manage.py migrate
```

Install Node dependencies
```
yarn
```

Bundle webpack files at least once on initial setup and every pull of a new change
```
yarn build
```

---
## Starting Up Docker
```bash
docker-compose build
docker-compose up
```
Open http://localhost:8000

You'll still need to run Webpack separately. This is done for simplicity sakes rather making it into another container and then running a dev server to feed static files through a port. Instead we just bundle and import as CDN.

---
## Running Up Without Docker
In short you'll need to run 2-3 services/applications concurrently.
- Django
- MySql
- Webpack (if working with react)

### Running MySql
Install and run a mysql server through your preferred application. Make sure to create a database called 'db', else you'll need to change the environment variable `MYSQL_DATABASE` in `.env`. The credentials of your database server should match environment variables in `.env`. These will be passed to Django `settings.py` so it can connect. Good applications to view database and tables is `TablePlus` for Windows and `SequelPro` for Mac.

### Running Django
```
python manage.py runserver
```
Open http://localhost:8000

### Running Webpack
Single compilation
```
yarn build
```
Watching for changes in `frontend/entrypoints` with typescript extension `.tsx`
```
yarn dev
```

---
## Lints
### Python Lint
```
pycodestyle app/
```
### Fix your Python Lint
```
autopep8 --in-place --recursive .
```
---
## Unit/Integration Testing
For django we use sqlite3 for testing database.
```
python manage.py test
```
```
yarn test
```
### Fix/Change Jest Snapshots
```
yarn test -u
```
---
## Guides
### **Webpack**
For developers using React, you'll need to run webpack concurrently to all other containers/services. This will transpile, polyfill and bundle up your Typescript React code to Javascript to be imported via CDN. Running `yarn dev` will watch for changes then bundle and `yarn build` will bundle on every change. We use `frontend/entrypoints` as entry points for html to render react using `react-dom`. These files don't need to be tested.

E.g., you've made a new file for a Card component and entry point Card.tsx, webpack will bundle this to `card.bundle.js` in `app/resource/static/dist`. Which then can be imported in django html template:
```html
<div id="react-app"></div>
<script src="{% static '/dist/card.bundle.js' %}"></script>
```

Bundles are not to be committed.

### **Making Migrations**
Django uses an ORM system within its models. This mean model objects are synced with database tables. After creating a model and you now want to insert object schema into the database (note app that contains the model should be linked in `settings.py` https://docs.djangoproject.com/en/3.2/topics/db/models/#using-models), run:
```
python manage.py makemigrations
```
Then to migrate run:
```
python manage.py migrate
```

If using Docker, make migrations and migrate from within containers
```
docker-compose run django python manage.py makemigrations
docker-compose run django python manage.py migrate
```

---
## File Structure
```
CITS3200/
|
├── app/
|   ├── __init__.py
|   ├── core/
│   |   ├── __init__.py
│   |   ├── settings.py
│   |   ├── urls.py
│   |   └── wsgi.py
|   ├── resources/
|   |   ├── static/
|   |   |   ├── dist/
|   |   |   ├── images/
|   |   |   ├── scripts/
|   |   |   └── styles/
|   |   └── templates/
|   ├── <internal_app>/
|   |   ├── __init__.py
|   |   ├── migrations/
|   |   ├── tests/
|   |   ├── models.py
|   |   ├── serializers.py
|   |   └── views.py 
|   └── <another_internal_app>/
|       └── ...
|
├── docker/
|   └── django.dev.Dockerfile
|
├── frontend/
│   ├── components/
│   ├── entrypoints/
│   ├── tests/
|   └── typings/
|
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── manage.py
├── package.json
├── README.md
├── requirements.txt
├── setup.cfg
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```
---
## Branches/Workflow
Sample workflow to follow for organisation purposes. Please collaborate on tasks that might have conflicting commits by either avoiding or fixing the conflicts.
- feature -> feature/{task}-{title}
- bugfix -> bugfix/{task}-{title}
  
### Example

1. New task TASK_1 (Add login page to front-end) requires new feature branch
2. Create a new branch off of main (e.g. feature/TASK_1-login-front-end)
3. Complete task
4. Create pull request to main
5. Review by other contributors and pass tests
6. Merge to main 🎉 🎉 🎉

## Contributors

| Name             | Student Number |
| ---------------- | -------------- |
| Arun Muthu       | 22704805       |
| Dylan Kennedy    | 22736996       |
| Jayden Teo       | 22713211       |
| Joel Fitzpatrick | 22736996       |
| Joel Miligan     | 22701252       |
| Pin-Hsuan Tseng  | 22941085       |
