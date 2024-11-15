const dotenv= require('dotenv')
dotenv.config()
module.exports={
  "development": {
    "username": process.env.USERNAMEDB,
    "password":  process.env.PASSWORD,
    "database":  process.env.DATABASE,
    "host":  process.env.DBHOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
