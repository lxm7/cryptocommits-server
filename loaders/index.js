const DataLoader = require('dataloader');
const rp = require('request-promise');

const eTagCache = {};

class CoinStatsLoader {
  constructor() {
    this.loader = new DataLoader(this.fetch.bind(this));
    this.rp = rp;
  }

  fetch(urls) {
    const options = {
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'user-agent': process.env.USER_AGENT_HEADER,
      },
    };

    return Promise.all(urls.map((url) => {
      const cachedRes = eTagCache[url];
      if (cachedRes && cachedRes.eTag) {
        options.headers['If-None-Match'] = cachedRes.eTag;
      }
      return new Promise((resolve) => {
        this.rp({
          uri: url,
          ...options,
        }).then((response) => {
          const { body } = response;
          eTagCache[url] = {
            result: body,
            eTag: response.headers.etag,
          };

          resolve(body);
        }).catch((err) => {
          if (err.statusCode === 304) {
            resolve(cachedRes.result);
          } else {
            resolve(null);
          }
        });
      });
    }));
  }

  get(path) {
    return this.loader.load(path);
  }
}

module.exports = CoinStatsLoader;
