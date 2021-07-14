const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

//our type definitions and resolvers for Apollo/GraphQL
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
//mongoose connection
const db = require('./config/connection');


//need to place PORT and Mongo URL in .env for live deployment
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// For when we have the product images to display
app.use('/assets/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
