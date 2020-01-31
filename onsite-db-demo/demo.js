
import Model   from './src/models.js';
import * as db from './src/db.js';

// This is just a demo.  It does these things:
//
//  1. reset the schema (including permissions)
//  2. add a new "System" to the database.
//  3. Add a new "Practice" to the database.
//  4. Get the new Practice from the db and display it.
//
// It assumes Postgresql and a db user name sirrobert with password
// sirrobert on localhost.  You can change that in ./src/db/schema.js
// (at the bottom of the query) and in ./src/db.js in the config object.

// ***
// The demo.  These functions are at the bottom of this file.

resetSchema().then(async function () {
  var system      = createSystem();
  var system_id   = await system.store();
  var practice_id = await createPractice({system_id});

  // Finally, get the practice by id and display it (as JSON).  In this
  // demo, the practice id will always be 1 because we just reset the
  // database... but in real life we would have gotten it back from the
  // insert procedure.
  displayPractice(practice_id);
});

//****************************
// Our functions

// First, reset the schema.  This dumps all the tables, re-creates them, and
// grants permission to user 'sirrobert'.  This is a good way to do it
// because it resets all the id counters and stuff.
function resetSchema () {
  return db.resetSchema();
}

// Let's create a new "System" using an OO approach.  This only exists in
// the application's memory right now.
function createSystem () {
  var system = new Model.System({
    name        : 'Duke Medicine',
    website     : 'duke.edu',
    vendor_code : '1234567',
  });

  // This returns a promise
  return system;
}

// Creating a practice using a functional approach (still using promises
// with async/await).
function createPractice ({system_id}) {
  return Model.Practice.store(
    Model.Practice.create({
      system_id,
      name    : "Duke Awesome Clinic",
      website : "duke-awesome-clinic.com",
    })
  );
}

async function displayPractice (practice_id) {
  console.log(`
------------------------------------
  Here's the data we inserted.
  It's formatted all nicely.
------------------------------------
              `)
  var practice = await Model.Practice.getById(practice_id);
  console.log(JSON.stringify(practice, undefined, 2));
}




