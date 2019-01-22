FROM python:3.6
RUN pip install pipenv

WORKDIR /usr/src/app
COPY Pipfile Pipfile.lock ./
RUN pipenv install --system

COPY . .
CMD [ "python", "-u", "./app.py" ]
