import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config()

const {CLIENT, DATABASE, DB_USER,PASSWORD} = process.env 

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: CLIENT,
    connection: {
      database: DATABASE,
      user: DB_USER,
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
    client: 'postgresql',
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
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
