require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const morgan = require("morgan");

const CoinStatsModel = require('./models/coinStatsById');
const CoinStatsLoader = require('./loaders/index');
const schema = require('./schema/index');

const coinStatsLoader = new CoinStatsLoader();
const PORT = 3001;
const app = express();

app.use(cors());
app.use(morgan('combined'));

const defaultQuery = `
{
  coins(limit: 10, offset: 0){
    name
    cmc_rank
    last_updated
    ImageUrl
    github {
      stars
      last_push
    }
  }
}`

const server = new ApolloServer({
  schema,
  context: async () => ({
    CryptoCompareCoinData: new CoinStatsModel({ connector: coinStatsLoader }),
  }),
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
    tabs: [
      {
        name: "Default tab",
        query: defaultQuery,
      },
    ],
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.info(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`)
);
