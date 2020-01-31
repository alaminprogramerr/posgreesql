
var db = require('./db/queries.js');

db
  // Create a "system" for the practice
  .create_system({name: 'Duke Health', vendor_code: 8675209 })

  // We need to get the data from the system we created... the id column.
  .then(_ => db.get_system({name: 'Duke Health'}))

  // Create a practice and link it to that system
  .then(system => db.create_practice({
    name:"Duke Medical Clinic",
    system:system.rows[0].id,
  }))

  // Then grab the practice data like we did before.
  .then(_ => db.get_practice({name: 'Duke Medical Clinic'}))

  // Add three sites.  We return the practice each time so we can keep using
  // it in each site creation.
  .then(practice => {
    practice = practice.rows[0];
    db.add_practice_site({practice: practice.id, name:"Duke Medical Clinic of Cary"});
    return practice;
  })
  .then(practice => {
    db.add_practice_site({practice: practice.id, name:"Duke Medical Clinic of Raleign"});
    return practice;
  })
  .then(practice => {
    db.add_practice_site({practice: practice.id, name:"Duke Medical Clinic of Durham"});
    return practice;
  })

  // Now we query the function that does a fancy join and gets us the
  // practice and all the sites.  In a real application, this is probably
  // the function we'd be querying a lot. 
  .then(practice => db.get_practice_data({id: practice.id}))

  // Now we just format the results.
  .then(results => {
    // Create our output practice object.
    var practice = {
      system: {},
      sites: []
		};

    // You could console.log(results) here if you want a raw dump of what
    // the db returns.
    //console.log(results);

    // Loop through and add the sites.
    results.rows.forEach(row => {
      var site = {
        id         : row.site_id,
        name       : row.site_name,
        number     : row.address_number,
        street     : row.address_street,
        additional : row.address_additional,
        city       : row.address_city,
        state      : row.address_state,
        zip        : row.address_zip,
      };

      practice.sites.push(site);

      practice.name               = row.practice_name;
      practice.website            = row.practice_website;

      practice.system.id          = row.system_id;
      practice.system.name        = row.system_name;
      practice.system.website     = row.system_website;
      practice.system.vendor_code = row.system_vendor_code;
    });

    console.log("PRACTICE DATA:", practice)
  })

;



setTimeout(function () {db.client.end()}, 500);

