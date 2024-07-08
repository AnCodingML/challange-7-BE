import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config()

const {CLIENT, DATABASE, USER,PASSWORD, HOST_PROD, DATABASE_PROD, USER_PROD, PASSWORD_PROD, PORT_PROD} = process.env 

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: CLIENT,
    connection: {
      database: DATABASE,
      user: USER,
      password: PASSWORD
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: CLIENT,
    connection: {
      host: HOST_PROD,
      database: DATABASE_PROD,
      user: USER_PROD,
      password: PASSWORD_PROD,
      port: parseInt(PORT_PROD || '6543')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
