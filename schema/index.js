const { makeExecutableSchema } = require('apollo-server');
const lodash = require('lodash');

const { fetchCmcListFn, fetchCcListFn } = require('../connections/coinLists');
const { coinStatsSchema, coinStatsResolvers } = require('./coinStats');

const rootSchema = [`
  type Query {
    coins(limit: Float, offset: Int): [Coin]
  }

  type Coin {
    name: String
    quote: Quote
    cmc_rank: String
    symbol: String
    last_updated: String
    ImageUrl: String

    # CcId from matched Symbol to get the social stuff, namely last github commit
    id: String
    github: GithubRepo
    twitter: Twitter
    reddit: Reddit
  }

  type Quote {
    USD: USD
  }

  type USD {
    market_cap: String
    price: String
  }
`];

const rootResolvers = {
  Query: {
    coins: async (_, { limit, offset }) => {
      const initialLimit = process.env.LIMIT || limit;
      const initialOffset = offset || 1;

      const cmc = await fetchCmcListFn(initialLimit, initialOffset);
      const cc = await fetchCcListFn();

      const coinListWithCcId = lodash(cmc) // start sequence
        .keyBy('symbol') // create a dictionary of the 1st array
        .merge(lodash.keyBy(cc, 'Symbol')) // create a dictionary of the 2nd array, and merge it to the 1st
        .values() // turn the combined dictionary to array
        .value() // get the value (array) out of the sequence
        .filter(coin => typeof coin.cmc_rank !== 'undefined'); // remove coins without rank value

      return coinListWithCcId;
    },
  },
};

const schema = [...rootSchema, ...coinStatsSchema];
const resolvers = lodash.merge(rootResolvers, coinStatsResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

module.exports = executableSchema;
