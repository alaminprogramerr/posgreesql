# Demo instructions
Run the demo by:

    npm install
    npm run demo

# Notes

I just threw this together as a demo.  The schema is fairly solid, but I
didn't even try to make it bullet-proof.  There are likely a few errors here
and there, like certain fields that should be UNIQUE() and aren't.  Feel
free to use or not use any of it.  Since you all had more limited experience
with traditional relational databases like Postgresql and mentioned that you
may like some input, I threw this together as a quick-and-dirty demo of how
to get something like this running.

I hope it helps!

# Schema notes

PRACTICES
  * have a name
  * have zero or one SYSTEM (e.g. "Duke" or "Rex Healthcare")
  * has a website
  * have one or more SITES.
  * have an HCA
  * has zero or more NOTES
  * have zero or one photo

SYSTEMS
  * have a name
  * have a website
  * have a vendor code
  * has a photo (like a logo or icon)

HCAs
  * have a contact
  * have a practice
  * have zero or more NOTES

SITES
  * belong to a PRACTICE
  * have a physical address (street, suite, city, state, zip)
  * have zero or more CLEANING EVENTS
  * have zero or more CONTACTS
  * have zero or more NOTES

CONTACTS
  * are associated with one or more SITES
  * have a name
  * have an optional title
  * have an optional phone number
  * have an optional e-mail address
  * have zero or more NOTES
  * have a boolean flag whether they are a site contact point
  * have zero or one photo

CLEANING EVENTS
  * belong to a SITE
  * have a start timestamp
  * have a stop timestamp
  * have a list of CLEANED ITEMS, for example:
    - 06' Medical Curtain (x3)
    - 12' Medical Curtain (x7)
    - Chair (x9)
    - Bench (x4)
  * have a cleaning certificate (downloadable)
  * have a list of which workers worked it
  * have an associated invoice (provided through WaveApp API)
  * have zero or more NOTES

NOTES
  * have plain text content
  * are always visible to admins
  * have a flag to determine whether it is visible to customers
  * have a flag to determine whether it is visible to workers
  * have a flag to determine whether it is visible to managers
  * have zero or more photos

CLEANED ITEMS
  * have a name (e.g. "06' Medical Curtain")
  * have a count (number of items of this type cleaned)
  * have a location name (e.g. "Exam Room 4")
  * have a location code (e.g. "2024")
  * have zero or more NOTES


