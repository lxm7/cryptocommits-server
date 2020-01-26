## CryptoCommits ##

The server to cryptocommits. Agrigates the useful bits from cryptoCompare, coinmarketcap and shows essential stats, including latest code commits in github.

### To start project... ###

```
docker-compose up
```

**Uses:**

* Graphql
* Express/Apollo server
* APIs - cryptoCompare, coinmarketcap

**Later I intend to include:**

* Rebuild with https://www.apollographql.com/docs/react/v3.0-beta
* Postgres db
* Graphql Subscriptions - poll at intervals for latest data
* AWS serverless / cron for periodically updating postgres 
