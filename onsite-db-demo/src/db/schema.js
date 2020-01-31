
export const schemaSQL = `
DROP TABLE IF EXISTS cleaning_notes;
DROP TABLE IF EXISTS cleaning_workers;
DROP TABLE IF EXISTS note_photos;
DROP TABLE IF EXISTS cleaned_item_notes;
DROP TABLE IF EXISTS cleaned_items;
DROP TABLE IF EXISTS site_notes;
DROP TABLE IF EXISTS person_notes;
DROP TABLE IF EXISTS practice_photos;
DROP TABLE IF EXISTS practice_notes;
DROP TABLE IF EXISTS site_people;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS cleanings;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS sites;
DROP TABLE IF EXISTS practices;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS systems;
DROP TABLE IF EXISTS photos;


-- ---
-- Table 'photos'
-- 
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id          SERIAL       NOT NULL ,
  image       BYTEA        NOT NULL ,
  filename    VARCHAR(255) NOT NULL ,
  caption     VARCHAR(255)     NULL DEFAULT NULL ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'systems'
-- 
-- ---

DROP TABLE IF EXISTS systems;

CREATE TABLE systems (
  id          SERIAL,
  name        VARCHAR(255) NOT NULL ,
  website     VARCHAR(255)     NULL DEFAULT NULL ,
  vendor_code VARCHAR(64)      NULL DEFAULT NULL ,
  photo       INTEGER          NULL DEFAULT NULL ,

  UNIQUE (name),
  FOREIGN KEY (photo) REFERENCES photos (id) ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'people'
-- 
-- ---

DROP TABLE IF EXISTS people;

CREATE TABLE people (
  id          SERIAL   NOT NULL,
  first_name  VARCHAR(32)  NULL DEFAULT NULL ,
  middle_name VARCHAR(32)  NULL DEFAULT NULL ,
  last_name   VARCHAR(32)  NULL DEFAULT NULL ,
  title       VARCHAR(32)  NULL DEFAULT NULL ,
  email       VARCHAR(255) NULL DEFAULT NULL ,
  phone       INTEGER      NULL DEFAULT NULL ,
  photo       INTEGER      NULL DEFAULT NULL ,

  UNIQUE (email),
  FOREIGN KEY (photo) REFERENCES photos (id) ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'practices'
-- 
-- ---

DROP TABLE IF EXISTS practices;

CREATE TABLE practices (
  id      SERIAL       NOT NULL ,
  name    VARCHAR(255)     NULL DEFAULT NULL ,
  system  INTEGER          NULL DEFAULT NULL ,
  website VARCHAR(255)     NULL DEFAULT NULL ,
  hca     INTEGER          NULL DEFAULT NULL ,

  FOREIGN KEY (hca)    REFERENCES people  (id) ,
  FOREIGN KEY (system) REFERENCES systems (id) ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'sites'
-- 
-- ---

DROP TABLE IF EXISTS sites;

CREATE TABLE sites (
  id                 SERIAL       NOT NULL ,
  name               VARCHAR(255) NOT NULL ,
  practice           INTEGER      NOT NULL ,
  address_number     VARCHAR(16)      NULL DEFAULT NULL ,
  address_street     VARCHAR(255)     NULL DEFAULT NULL ,
  address_additional VARCHAR(255)     NULL DEFAULT NULL ,
  address_city       VARCHAR(255)     NULL DEFAULT NULL ,
  address_state      VARCHAR(2)       NULL DEFAULT NULL ,
  address_zip        VARCHAR(10)      NULL DEFAULT NULL ,

  UNIQUE (name, practice),
  FOREIGN KEY (practice) REFERENCES practices (id) ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'notes'
-- ---

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id                  SERIAL  NOT NULL,
  content             TEXT    NOT NULL,
  is_customer_visible BOOLEAN NOT NULL DEFAULT FALSE,
  is_worker_visible   BOOLEAN NOT NULL DEFAULT FALSE,
  is_manager_visible  BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id)
);

-- ---
-- Table 'cleanings'
-- ---

DROP TABLE IF EXISTS cleanings;

CREATE TABLE cleanings (
  id          SERIAL       NOT NULL ,
  site        INTEGER          NULL DEFAULT NULL ,
  start_time  TIMESTAMP(0)     NULL DEFAULT NULL ,
  end_time    TIMESTAMP(0)     NULL DEFAULT NULL ,

  FOREIGN KEY (site) REFERENCES sites (id) ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'items'
-- 
-- ---

DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id          SERIAL   NOT NULL ,
  name VARCHAR(64) NULL DEFAULT NULL,
  description VARCHAR(255) NULL DEFAULT NULL,
  price DECIMAL(10,0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'site_people'
-- 
-- ---

DROP TABLE IF EXISTS site_people;
    
CREATE TABLE site_people (
  site            INTEGER NULL DEFAULT NULL,
  person          INTEGER NULL DEFAULT NULL,
  is_site_contact BOOLEAN NOT NULL,

  FOREIGN KEY (site)   REFERENCES sites  (id) ,
  FOREIGN KEY (person) REFERENCES people (id) ,

  PRIMARY KEY (site, person)
);

-- ---
-- Table 'practice_notes'
-- 
-- ---

DROP TABLE IF EXISTS practice_notes;
    
CREATE TABLE practice_notes (
  practice INTEGER NOT NULL,
  note     INTEGER NOT NULL,

  FOREIGN KEY (note)     REFERENCES notes     (id) ,
  FOREIGN KEY (practice) REFERENCES practices (id) ,

  PRIMARY KEY (practice, note)
);

-- ---
-- Table 'practice_photos'
-- 
-- ---

DROP TABLE IF EXISTS practice_photos;
    
CREATE TABLE practice_photos (
  practice INTEGER NOT NULL,
  photo    INTEGER NOT NULL,

  FOREIGN KEY (practice) REFERENCES practices (id) ,
  FOREIGN KEY (photo)    REFERENCES photos    (id) ,

  PRIMARY KEY (practice, photo)
);

-- ---
-- Table 'person_notes'
-- 
-- ---

DROP TABLE IF EXISTS person_notes;
    
CREATE TABLE person_notes (
  note   INTEGER NOT NULL,
  person INTEGER NOT NULL,

  FOREIGN KEY (note)   REFERENCES notes  (id) ,
  FOREIGN KEY (person) REFERENCES people (id) ,

  PRIMARY KEY (note, person)
);

-- ---
-- Table 'site_notes'
-- 
-- ---

DROP TABLE IF EXISTS site_notes;
    
CREATE TABLE site_notes (
  site INTEGER NOT NULL,
  note INTEGER NOT NULL,

  FOREIGN KEY (note) REFERENCES notes (id) ,
  FOREIGN KEY (site) REFERENCES sites (id) ,

  PRIMARY KEY (site, note)
);

-- ---
-- Table 'cleaned_items'
-- 
-- ---

DROP TABLE IF EXISTS cleaned_items;

CREATE TABLE cleaned_items (
  id            SERIAL       NOT NULL ,
  cleaning      INTEGER      NOT NULL ,
  item          INTEGER      NOT NULL ,
  count         INTEGER      NOT NULL ,
  location_name VARCHAR(255)     NULL DEFAULT NULL ,
  location_code VARCHAR(16)      NULL DEFAULT NULL ,

  FOREIGN KEY (cleaning) REFERENCES cleanings (id) ,
  FOREIGN KEY (item)     REFERENCES items     (id) ,

  PRIMARY KEY (id)
);

-- ---
-- Table 'cleaned_item_notes'
-- 
-- ---

DROP TABLE IF EXISTS cleaned_item_notes;
    
CREATE TABLE cleaned_item_notes (
  cleaned_item INTEGER NOT NULL,
  note         INTEGER NOT NULL,

  FOREIGN KEY (cleaned_item) REFERENCES cleaned_items (id),
  FOREIGN KEY (note)         REFERENCES notes         (id),

  PRIMARY KEY (cleaned_item, note)
);

-- ---
-- Table 'note_photos'
-- 
-- ---

DROP TABLE IF EXISTS note_photos;
    
CREATE TABLE note_photos (
  note  INTEGER NOT NULL,
  photo INTEGER NOT NULL,

  FOREIGN KEY (note)  REFERENCES notes  (id) ,
  FOREIGN KEY (photo) REFERENCES photos (id) ,

  PRIMARY KEY (note, photo)
);

-- ---
-- Table 'cleaning_workers'
-- 
-- ---

DROP TABLE IF EXISTS cleaning_workers;
    
CREATE TABLE cleaning_workers (
  cleaning INTEGER NOT NULL,
  person   INTEGER NOT NULL,
  is_lead  BOOLEAN NOT NULL DEFAULT FALSE,

  FOREIGN KEY (cleaning) REFERENCES cleanings (id) ,
  FOREIGN KEY (person)   REFERENCES people    (id) ,

  PRIMARY KEY (cleaning, person)
);

-- ---
-- Table 'cleaning_notes'
-- 
-- ---

DROP TABLE IF EXISTS cleaning_notes;
    
CREATE TABLE cleaning_notes (
  cleaning INTEGER NOT NULL,
  note     INTEGER NOT NULL,

  FOREIGN KEY (cleaning) REFERENCES cleanings (id) ,
  FOREIGN KEY (note)     REFERENCES notes     (id) ,

  PRIMARY KEY (cleaning, note)
);

GRANT ALL PRIVILEGES ON ALL TABLES    IN SCHEMA public TO sirrobert;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sirrobert;
`;
