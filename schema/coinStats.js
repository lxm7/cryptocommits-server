
const coinStatsSchema = [`
  type GithubRepo {
    created_at: String
    last_push: String
    size: String
    language: String
    stars: Float

    # Secondary stuff available from our REST 
    # subscribers: Float
    # open_total_issues: String
    # open_issues: String
    # open_pull_issues: String
    # closed_pull_issues: String
  }

  type Twitter {
    # following: String
    # account_creation: String
    # name: String
    lists: Float
    statuses: Float
    favourites: String
    followers: Float
    link: String
  }

  type Reddit {
    posts_per_hour: String
    comments_per_hour: String
    posts_per_day: String
    comments_per_day: Float
    # name: String
    # link: String
    # active_users: Float
    # community_creation: String
    # subscribers: Float
  }
`];

const coinStatsResolvers = {
  Coin: {
    github: (coin, args, { CryptoCompareCoinData }) =>
      CryptoCompareCoinData.getGithubActivity(coin.Id),
    twitter: (coin, args, { CryptoCompareCoinData }) =>
      CryptoCompareCoinData.getTwitterActivity(coin.Id),
    reddit: (coin, args, { CryptoCompareCoinData }) =>
      CryptoCompareCoinData.getRedditActivity(coin.Id),
  },
};

module.exports = { coinStatsSchema, coinStatsResolvers };
