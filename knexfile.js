const sharedConfig = {
    client: 'sqlite3',
    useNullasDefault: true,
    migrations: {
        directory: './data/migrations',
    },

    seeds: {
        directory: './data/seeds'
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.run('PRAGMA foreign_keys = ON', done)
        },
    },
}

module.exports = {
    development: {
        ...sharedConfig,
        connection: {filename: './data/project.db3'},
    },
    testing: {
        ...sharedConfig,
        connection: {filename: './data/testing.db3'},
    },
}