/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },migrations:{
      directory:'./src/migrations',
    },
    useNullAsDefault: true
  },

};
