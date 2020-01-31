
import * as db from '../db.js';

const queries = {
  insertSystem: `
    INSERT INTO systems
      (name, website, vendor_code, photo)
   	VALUES
      ($1, $2, $3, $4)
    RETURNING id, name, website, vendor_code`,  // this line returns the ID of newly inserted objects.
};


export default class System {
  constructor ({id, name, website, vendor_code, photo}={}) {
    this.$id         = id;
    this.name        = name;
    this.photo       = photo;
    this.website     = website;
    this.vendor_code = vendor_code;
  }

  store () {
    var client = db.getClient();
    client.connect();

    return db
      .runQuery(
        client,
        queries.insertSystem,
        [this.name, this.website, this.vendor_code, this.photo]
      )
      .then(results => {
        this.$id = results.rows[0].id;
        client.end();
        return this.$id;
      });
  }
}

