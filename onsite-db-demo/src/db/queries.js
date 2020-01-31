
const pg = require('pg');
const config = {
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

const connectionString = config.str();

var client = new pg.Client(connectionString);
client.connect();

function _run_query (statement, values) {
  return client
    .query(statement, values)
    .catch(error => console.error(error.stack));

  //***
  // Callback version

  // client.query(statement, values, (err, result) => {
  //   if (err) {
  //     console.log(err.stack);
  //   } else {
  //     console.log(res.rows[0]);
  //   }
  // });

  //***
  // Async/Await version

  // try {
  //   const res = await pool.query(query, values)
  //   console.log(res.rows[0])
  // } catch (err) {
  //   console.log(err.stack)
  // }

}

function INSERT_USER ({
  first_name,
  middle_name,
  last_name,
  title,
  email,
  phone,
  photo,
}) {
  return _run_query(
    `INSERT INTO people
      (first_name, middle_name, last_name, title, email, phone, photo)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [first_name, middle_name, last_name, title, email, phone, photo]
  );

}

function create_practice ({ name, system, website, hca }) {
  return _run_query(
    `INSERT INTO
      practices (name, system, website, hca)
    VALUES
      ($1, $2, $3, $4)`,
    [name, system, website, hca]
  );
}

function create_system ({ name, website, vendor_code, photo}) {
  return _run_query(
    `INSERT INTO
      systems (name, website, vendor_code, photo)
    VALUES
      ($1, $2, $3, $4)`,
    [name, website, vendor_code, photo]
  );
}

function add_practice_site (
  { practice, name, number, street, additional, city, state, zip }
) {
  return _run_query(
    `INSERT INTO sites
      (practice, name, address_number, address_street, address_additional, address_city, address_state, address_zip)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [practice, name, number, street, additional, city, state, zip]
  );
}

function get_system ({name}) {
  return _run_query("SELECT * FROM systems WHERE name=$1", [name]);
}

function get_practice ({name}) {
  return _run_query("SELECT * FROM practices WHERE name=$1", [name]);
}

function get_practice_data ({id}) {
  return _run_query(
    `SELECT
      practice.id             AS practice_id,
      practice.name           AS practice_name,
      practice.website        AS practice_website,

      system.id               AS system_id,
      system.name             AS system_name,
      system.website          AS system_website,
      system.vendor_code      AS system_vendor_code,

      site.id                 AS site_id,
      site.name               AS site_name,
      site.address_number     AS site_address_number,
      site.address_street     AS site_address_street,
      site.address_additional AS site_address_additional,
      site.address_city       AS site_address_city,
      site.address_state      AS site_address_state,
      site.address_zip        AS site_address_zip

    FROM practices as practice

    INNER JOIN systems  AS system
      on practice.system = system.id

    INNER JOIN sites    AS site
      on site.practice = practice.id
      
    WHERE practice.id=$1`,

    [id]
  );
}

module.exports = {
  INSERT_USER,
  add_practice_site,
  client,
  create_practice,
  create_system,
  get_practice,
  get_practice_data,
  get_system,
};

