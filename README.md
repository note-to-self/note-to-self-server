# Note to Self

**Authors**: [Kate Dameron](https://github.com/Katedam), [Lance Merill](https://github.com/zulilu), [Carmen Perezchica](https://github.com/crperezchica), [marcysilverman](https://github.com/marcysilverman)

**[https://note-to-self-server.herokuapp.com](https://note-to-self-server.herokuapp.com/)**

## Overview

## Technologies used

[Node.js](https://nodejs.org/en/), [Twilio](https://www.twilio.com/), [Auth0](https://auth0.com), [MongoDB](https://www.mongodb.com/what-is-mongodb), [Express](https://www.npmjs.com/package/express), [Jest](https://www.npmjs.com/package/jest), [SuperTest](https://www.npmjs.com/package/supertest), [nodemon](https://www.npmjs.com/package/nodemon), [dotenv](https://www.npmjs.com/package/dotenv), [Mongoose](https://www.npmjs.com/package/mongoose), [morgan](https://www.npmjs.com/package/morgan), [SuperAgent](https://www.npmjs.com/package/superagent), [Chance](https://www.npmjs.com/package/chance)

## Application Structure

    .
    ├── lib                      # Application,
    routes, models,
    services
    ├── test                     # Unit and E2E tests
    ├── seed.js                  # Load seed data to MongoDB
    ├── server.js                # Run Express server
    ├── LICENSE
    └── README.md

## Getting Started

1. Clone and download [GitHub repo](https://github.com/note-to-self/note-to-self-server)
1. Install dependencies:\
   `npm i`

1. Run scripts:\
   `npm run lint`\
   `npm run pretest`\
   `npm run test`\
   `npm run test:watch`\
   `npm run start` (start node server)\
   `npm run start:watch` (start nodemon server)\
   `npm run seed` (seed database)\
   `npm run drop` (drop MongoDB)\
   `npm run db-load-all` (drop db and load seed data from scratch)

## License

Standard [MIT](/LICENSE.md)

## Acknowledgements
