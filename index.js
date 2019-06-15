require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const CoinStatsModel = require('./models/coinStatsById');
const CoinStatsLoader = require('./loaders/index');
const schema = require('./schema/index');
const cors = require('cors');

const coinStatsLoader = new CoinStatsLoader();
const PORT = 3001;
const app = express();
app.use(cors());


const server = new ApolloServer({
  schema,
  context: async () => ({
    CryptoCompareCoinData: new CoinStatsModel({ connector: coinStatsLoader }),
  }),
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.info(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`));
