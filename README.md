# js-data-rest-react-typescript-example

The code in this example shows how to connect [JS-Data](https://www.js-data.io/) with a React frontend, Express backend, and Typescript as the compiler.

## Express Server

The Express server source code can be found in the `/server` directory. The important files are:

- `/server/routes/comments.js`
- `/server/routes/index.js`
- `/server/routes/posts.js`
- `/server/routes/users.js`

Data for commands, posts, and users are hard-coded within the respective files. In a real-world situation this data would be stored in a database.

Api routes are added in `/server/app.js`.

## React Frontend

Within the `/src` directory are a number of files related to the React frontend. The main files are developed in Typescript and are given the `*.ts` or `*.tsx` extension. These files may import an accompanying `*.css` file.

The routes are located in `index.tsx`.

Each component may interact with js-data by importing the store and accessing the js-data datastore or making an HTTP request using js-data.

## JS-Data

The JS-Data examples comprise of 3 files: `Schemas.tsx`, `Store.tsx`, and `Relations.tsx`.

`Schemas.tsx` defines the data structure for an endpoint from the Express service.

`Store.tsx` defines the accessors and deserialization methods (`wrap`).

`Relations.tsx` defines the relationship between schemas.
