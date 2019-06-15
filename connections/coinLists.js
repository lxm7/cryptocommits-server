const axios = require('axios');

const fetchCcListFn = () => {
  const fetchCoins = axios
    .get(process.env.API_CC_ALL)
    .then((res) => {
      const coinList = res.data.Data; // this retruns each key'd cryptocoin object
      return Object.keys(coinList).map(k => coinList[k]); // convert to array
    })
    .catch((err) => {
      console.info('err CC', err);
    });

  return fetchCoins;
};

const fetchCmcListFn = (limit, start = 1) => {
  const fetchCoins = axios
    .get(
      `${process.env.API_CMC}?limit=${limit}`,
      { headers: { 'X-CMC_PRO_API_KEY': process.env.API_CMC_KEY } },
    )
    .then(res => res.data.data)
    .catch((err) => {
      console.info('err CMC', err);
    });

  return fetchCoins;
};

module.exports = { fetchCmcListFn, fetchCcListFn };
