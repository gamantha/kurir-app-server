# Backend Profile

## Mobile Aplikasi Kurir

### Language

Javascript

### Server Side

Node.js

### Framework

Express

### Database

Postgres using Sequelize as ORM

### How to run the server

1. Install Node.js on your computer
   Go to below link and choose according your OS
   https://nodejs.org/en/download/
2. Clone this repository to your local machine
3. At your terminal, go to the directory where you cloned this repo at
4. And then type:

```
npm install
```

### Migrate the database

1. install sequelize-cli in global:

```
npm install sequelize-cli -g
```

2. create postgres database with name: kurir_mobile
3. make sure postgres installed and running
4. change username and password in folder config > config.json file according to your postgres setup
5. migrate the database

```
sequelize db:migrate
```

6. the database should be updated

### Resources

1. db schema: https://www.lucidchart.com/invitations/accept/b80ab736-01ec-417d-ad24-b57da927ca30

2. db relation:
   https://docs.google.com/document/d/1_PzesWJ1NjizSSfq3MFWycS0FJ5_YF9U92FpifEie1U/edit?usp=sharing


### Start the app
- run the seeder with `sequelize db:seed:all` you'll have default user come with email: `test@development.com`, password: `testpassword`.
- start the server by running `npm run start`
- fetch the token by POST `email` and `password` to `localhost:3000/api/user/login`

### Testing
- create mysql database and name it `database_test`
- run `sequelize --env test db:migrate:all` to run migration on you testing database.
- run `sequelize --env test db:seed --seed seeders/20180118112739-seed-test-user.js` to seed the test user [run this just once.].
- run `npm run test` to run all the test.
