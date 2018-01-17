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

On root directory type:
run with `npm run start`

Congrats! If you seen "app listening on 3000" at your terminal then your server is already running!
