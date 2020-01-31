
import pg from 'pg';
import { schemaSQL } from './db/schema.js';

// The right way to do this is to read config stuff from the environment.  I
// didn't do that here because it's just a demo.
export var config = {
  user : 'sirrobert',
  pass : 'sirrobert',
  host : 'localhost',
  port : '5432',
  name : 'sirrobert_schema_test',
  str  : function () {
    return `postgres://${this.user}:${this.pass}`
      + `@${this.host}:${this.port}`
      + `/${this.name}`;
  }
};

// Get a new client object with the desired connection string.
export function getClient () {
  return new pg.Client(config.str());
}

// Just reset the schema in full.  Nuke everything and start from scratch.
export function resetSchema () {
  var client = getClient();
  client.connect();

  return client.query(schemaSQL, [])
    // This happens at the end.  Make sure the DB connection is closed.
    .then(_ => client.end())
    .catch(error => console.error(error.stack))
  ;
}

// This is just a simple wrapper around queries that ensures we're always
// handling thrown errors in a consistent way.
//
// By returning here, we send out the Promise object client.query()
// uses.  This lets us chain things outside this function.
export function runQuery (client, query, data) {
  return client
    .query(query, data)
    .catch(error => console.error(error.stack));
}

