
import * as db from '../db.js';
import System from './system.model.js';

const queries = {
  insertPractice: `
    INSERT INTO practices 
      (name, system, website, hca)
   	VALUES
      ($1, $2, $3, $4)
    RETURNING id`,  // this line returns the ID of newly inserted objects.

    // This uses a LEFT JOIN so we get a row back if there's a Practice with
    // no System.  If we used an INNER JOIN, we would only get records when
    // both objects exist, and with a RIGHT JOIN, when the "right" object
    // exists, even if there's no "left" object (left = first table, right =
    // second table).
  getPracticeById: `
    SELECT
      P.id          AS p_id,
      P.name        AS p_name,
      P.system      AS p_system,
      P.website     AS P_website,

      S.id          AS s_id,
      S.name        AS s_name,
      S.website     AS s_website,
      S.vendor_code AS s_vendor_code

    FROM practices    AS P
    LEFT JOIN systems AS S
      ON P.system = S.id

    WHERE P.id=$1
  `,
};

export function create ({
  id,
  hca_id,
  name,
  note_ids,
  photo_id,
  site_ids,
  system_id,
  system,
  website,
} = {}) {
  return {
    "$id"     : id,
    "name"    : name,
    "system"  : system_id || system,
    "website" : website,
    "sites"   : site_ids,
    "hca"     : hca_id,
    "notes"   : note_ids,
    "photo"   : photo_id
  }
}

export function store ({
  name, system, website, sites, hca, notes, photo
} = {}) {
  var client = db.getClient();
  client.connect();

  // Ideally this would be done in a transaction.

  return db.runQuery(
    client,
    queries.insertPractice,
    [
      name,
      system,
      website,
      hca,
    ]
  ).then(results => {
    // End the connection so we don't tie up resources.
    client.end();
    return results.rows[0].id;
  });
}

export function getById (id) {
  var client = db.getClient();
  client.connect();
  // First we run the query.
  return db.runQuery(
    client,
    queries.getPracticeById,
    [id]
  ).then(results => {
    client.end();

    // Now we got some funky records that look like this:    
    //   {
    //     "p_id"          : 1,
    //     "p_name"        : "Duke Awesome Clinic",
    //     "p_system"      : 1,
    //     "p_website"     : "duke-awesome-clinic.com",
    //     "s_name"        : "Duke Medicine",
    //     "s_website"     : "duke.edu",
    //     "s_vendor_code" : "1234567"
    //   }
    // 
		// We want to transform it into a canonical form before we send it out.
    var raw_data = results.rows[0];

    // Create a new practice object and return it.
    return create({
      id      : raw_data.p_id,
      name    : raw_data.p_name,
      website : raw_data.p_website,

      // And create a new System object because ... well, it's a demo.
      system : new System({
        name        : raw_data.s_name,
        website     : raw_data.s_website,
        vendor_code : raw_data.s_vendor_code,
      })
    });
  });
}


export default {
  create,
  store,
  getById,
}
