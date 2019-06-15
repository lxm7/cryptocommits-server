class CryptoCompareCoinData {
  constructor({ connector }) {
    this.connector = connector;
  }

  getAllData(coinId) {
    return this.connector
      .get(`${process.env.API_CC_SOCIAL}/?id=${coinId}`);
  }

  getGithubActivity(coinId) {
    return this.getAllData(coinId)
      .then(res => {
        const repoList = res.Data.CodeRepository.List;
        if (repoList.length === 0) {
          return { last_push: 'no code repos' };
        }

        if (repoList.length === 1) {
          return repoList[0];
        }

        if (repoList.length > 1) {
          const repoListSortbyStars = repoList.reduce((a, b) => {
            return a.stars > b.stars ? a : b;
          }, {});

          return repoListSortbyStars;
        }

        return null;
      })
      .catch((err) => {
        console.error(`${err} no github stuff`);
      });
  }

  getTwitterActivity(coinId) {
    return this.getAllData(coinId)
      .then(res => res.Data.Twitter)
      .catch((err) => {
        console.error(`${err} No twitter data `);
      });
  }

  getRedditActivity(coinId) {
    return this.getAllData(coinId)
      .then(res => res.Data.Reddit)
      .catch((err) => {
        console.error(`${err} No reddit data`);
        });
  }
}

module.exports = CryptoCompareCoinData;
