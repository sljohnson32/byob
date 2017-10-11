// Update with your config settings.

module.exports = {
  test: {
      client: 'pg',
      connection: process.env.DATABASE_URL || 'postgres://localhost/school_finder',
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/test'
      },
      useNullAsDefault: true
    },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/school_finder',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
