---
title: gcex-api
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: '@tarslib/widdershins v4.0.23'
---

# gcex-api

Base URLs:

# Authentication

# Default

## GET Exchange Information

GET /api/v1/exchange-info

> Response Examples

```json
{
  "status": "success",
  "data": {
    "symbol": "GCS/USDT",
    "status": "ENABLED",
    "baseAsset": "GCS",
    "baseAssetPrecision": 6,
    "quoteAsset": "USDT",
    "quotePrecision": 3,
    "quoteAssetPrecision": 3,
    "baseCommissionPrecision": 2,
    "quoteCommissionPrecision": 3,
    "orderTypes": ["LIMIT", "LIMIT_MAKER"],
    "quoteOrderQtyMarketAllowed": false,
    "isSpotTradingAllowed": false,
    "isMarginTradingAllowed": false,
    "quoteAmountPrecision": "5",
    "baseSizePrecision": "0.0001",
    "permissions": ["SPOT", "LIMIT"],
    "filters": [],
    "maxQuoteAmount": "5000000",
    "makerCommission": "0.002",
    "takerCommission": "0.002",
    "tradeSideType": "1"
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name                          | Type     | Required | Restrictions | Title | description |
| ----------------------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status                      | string   | true     | none         |       | none        |
| » data                        | object   | true     | none         |       | none        |
| »» symbol                     | string   | true     | none         |       | none        |
| »» status                     | string   | true     | none         |       | none        |
| »» baseAsset                  | string   | true     | none         |       | none        |
| »» baseAssetPrecision         | integer  | true     | none         |       | none        |
| »» quoteAsset                 | string   | true     | none         |       | none        |
| »» quotePrecision             | integer  | true     | none         |       | none        |
| »» quoteAssetPrecision        | integer  | true     | none         |       | none        |
| »» baseCommissionPrecision    | integer  | true     | none         |       | none        |
| »» quoteCommissionPrecision   | integer  | true     | none         |       | none        |
| »» orderTypes                 | [string] | true     | none         |       | none        |
| »» quoteOrderQtyMarketAllowed | boolean  | true     | none         |       | none        |
| »» isSpotTradingAllowed       | boolean  | true     | none         |       | none        |
| »» isMarginTradingAllowed     | boolean  | true     | none         |       | none        |
| »» quoteAmountPrecision       | string   | true     | none         |       | none        |
| »» baseSizePrecision          | string   | true     | none         |       | none        |
| »» permissions                | [string] | true     | none         |       | none        |
| »» filters                    | [string] | true     | none         |       | none        |
| »» maxQuoteAmount             | string   | true     | none         |       | none        |
| »» makerCommission            | string   | true     | none         |       | none        |
| »» takerCommission            | string   | true     | none         |       | none        |
| »» tradeSideType              | string   | true     | none         |       | none        |

## GET Depth

GET /api/v1/depth

### Params

| Name   | Location | Type   | Required | Description |
| ------ | -------- | ------ | -------- | ----------- |
| symbol | query    | string | yes      | none        |
| limit  | query    | string | yes      | none        |

> Response Examples

```json
{
  "status": "success",
  "data": {
    "asks": [
      ["3250.78", "0.081069"],
      ["3251.43", "0.878545"],
      ["3251.86", "0.415894"],
      ["3252.38", "0.33595"],
      ["3253.09", "0.439655"],
      ["3257.4", "0.126452"],
      ["3259.85", "0.30691"],
      ["3262.8", "0.648537"],
      ["3285.94", "0.828934"],
      ["3305.24", "0.770274"],
      ["3322.44", "0.887495"],
      ["3323.13", "0.768265"],
      ["3331.2", "1.466548"],
      ["3382.26", "1.855446"],
      ["3409.9", "3.551243"],
      ["3415.83", "3.430818"],
      ["3429.76", "2.248753"],
      ["3613.78", "0.635691"],
      ["3621.26", "2.192992"],
      ["3649.04", "0.651474"],
      ["3728.96", "2.398845"],
      ["3772.99", "1.956055"],
      ["3790.74", "0.29872"],
      ["3872.16", "0.409606"],
      ["3911.08", "0.798536"],
      ["3919.53", "0.883437"],
      ["4050.18", "0.483582"],
      ["4119.42", "0.380986"],
      ["4229.01", "0.283618"],
      ["4243.77", "1.028588"],
      ["4253.15", "0.743143"],
      ["4341.23", "0.370955"],
      ["4888.3", "0.085765"],
      ["5489.19", "1.159382"],
      ["5914.31", "0.029699"],
      ["6171.61", "0.045605"],
      ["6368.59", "0.027974"],
      ["10973.88", "0.017892"]
    ],
    "bids": [
      ["3247.05", "0.250985"],
      ["3246.29", "0.158716"],
      ["3244", "0.156602"],
      ["3242.85", "0.088535"],
      ["3241.27", "0.037816"],
      ["3234.84", "0.147118"],
      ["3232.66", "0.082269"],
      ["3226.75", "0.17443"],
      ["3225.51", "0.147176"],
      ["3207.07", "0.029838"],
      ["3180.5", "0.431925"],
      ["3180.16", "0.139057"],
      ["3125.97", "0.191275"],
      ["3122.41", "0.115196"],
      ["3102.62", "0.784219"],
      ["3052.27", "2.444153"],
      ["2981.41", "0.369683"],
      ["2943.09", "0.573072"],
      ["2815.24", "0.616909"],
      ["2812.17", "0.335689"],
      ["2720.1", "0.21245"],
      ["2715.28", "0.392282"],
      ["2681.83", "0.248985"],
      ["2624.91", "0.252205"],
      ["2552.59", "0.317301"],
      ["2549.87", "0.356546"],
      ["2434.29", "0.346364"],
      ["2323.07", "0.253998"],
      ["2092.76", "1.021434"],
      ["1840.04", "0.383801"],
      ["1602.81", "0.662157"],
      ["1566.6", "0.395107"],
      ["1199.47", "0.259456"]
    ]
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name     | Type    | Required | Restrictions | Title | description |
| -------- | ------- | -------- | ------------ | ----- | ----------- |
| » status | string  | true     | none         |       | none        |
| » data   | object  | true     | none         |       | none        |
| »» asks  | [array] | true     | none         |       | none        |
| »» bids  | [array] | true     | none         |       | none        |

## GET 24Hr Ticker

GET /api/v1/ticker/24hr

> Response Examples

```json
{
  "status": "success",
  "result": 7,
  "data": [
    {
      "symbol": "XLM/USDT",
      "priceChangePercent": 0.0022,
      "prevClosePrice": 0.42353,
      "lastPrice": 0.42353,
      "bidPrice": "0.42",
      "bidQty": "7159.73",
      "askPrice": "0.43",
      "askQty": "33204.05",
      "openPrice": 0.42258,
      "highPrice": 0.43926,
      "lowPrice": 0.41818,
      "volume": 2428004.21,
      "timestamp": 1736745590003
    },
    {
      "symbol": "ETH/USDT",
      "priceChangePercent": -0.0127,
      "prevClosePrice": 3226.46,
      "lastPrice": 3226.46,
      "bidPrice": "3227.72",
      "bidQty": "0.056264",
      "askPrice": "3228.94",
      "askQty": "0.349126",
      "openPrice": 3267.98,
      "highPrice": 3340.32,
      "lowPrice": 3221.48,
      "volume": 218.293732,
      "timestamp": 1736745590002
    },
    {
      "symbol": "GCS/USDT",
      "priceChangePercent": 0,
      "prevClosePrice": 11.4528,
      "lastPrice": 11.4528,
      "bidPrice": "11.44",
      "bidQty": "173.3",
      "askPrice": "12.18",
      "askQty": "0.01",
      "openPrice": 11.4536,
      "highPrice": 11.4837,
      "lowPrice": 11.4446,
      "volume": 23.19,
      "timestamp": 1736745590004
    },
    {
      "symbol": "LTC/USDT",
      "priceChangePercent": -0.014,
      "prevClosePrice": 100.94,
      "lastPrice": 100.94,
      "bidPrice": "100.87",
      "bidQty": "1.283",
      "askPrice": "100.94",
      "askQty": "14.154",
      "openPrice": 102.38,
      "highPrice": 104.5,
      "lowPrice": 99.97,
      "volume": 8111.412,
      "timestamp": 1736745590002
    },
    {
      "symbol": "BTC/USDT",
      "priceChangePercent": 0.0041,
      "prevClosePrice": 94407.04,
      "lastPrice": 94407.04,
      "bidPrice": "94382.06",
      "bidQty": "0.002012",
      "askPrice": "94407.04",
      "askQty": "0.01625",
      "openPrice": 94018.26,
      "highPrice": 95447.6,
      "lowPrice": 93998.71,
      "volume": 6.563283,
      "timestamp": 1736745590001
    },
    {
      "symbol": "MAAL/USDT",
      "priceChangePercent": 0,
      "prevClosePrice": 0.1472,
      "lastPrice": 0.1472,
      "bidPrice": "0.14",
      "bidQty": "1506.19",
      "askPrice": "0.15",
      "askQty": "23135.29",
      "openPrice": 0.1472,
      "highPrice": 0.1474,
      "lowPrice": 0.1465,
      "volume": 391467,
      "timestamp": 1736745590004
    },
    {
      "symbol": "XRP/USDT",
      "priceChangePercent": 0.0057,
      "prevClosePrice": 2.52123,
      "lastPrice": 2.52123,
      "bidPrice": "2.52",
      "bidQty": "80.61",
      "askPrice": "2.53",
      "askQty": "3848.22",
      "openPrice": 2.50676,
      "highPrice": 2.56513,
      "lowPrice": 2.49981,
      "volume": 320916.83,
      "timestamp": 1736745590004
    }
  ]
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name                  | Type     | Required | Restrictions | Title | description |
| --------------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status              | string   | true     | none         |       | none        |
| » result              | integer  | true     | none         |       | none        |
| » data                | [object] | true     | none         |       | none        |
| »» symbol             | string   | true     | none         |       | none        |
| »» priceChangePercent | number   | true     | none         |       | none        |
| »» prevClosePrice     | number   | true     | none         |       | none        |
| »» lastPrice          | number   | true     | none         |       | none        |
| »» bidPrice           | string   | true     | none         |       | none        |
| »» bidQty             | string   | true     | none         |       | none        |
| »» askPrice           | string   | true     | none         |       | none        |
| »» askQty             | string   | true     | none         |       | none        |
| »» openPrice          | number   | true     | none         |       | none        |
| »» highPrice          | number   | true     | none         |       | none        |
| »» lowPrice           | number   | true     | none         |       | none        |
| »» volume             | number   | true     | none         |       | none        |
| »» timestamp          | integer  | true     | none         |       | none        |

## GET Average Price

GET /api/v1/ticker/price

> Response Examples

```json
{
  "status": "success",
  "result": 7,
  "data": [
    {
      "symbol": "XLM/USDT",
      "price": 0.42288
    },
    {
      "symbol": "ETH/USDT",
      "price": 3229.98
    },
    {
      "symbol": "GCS/USDT",
      "price": 11.4584
    },
    {
      "symbol": "LTC/USDT",
      "price": 100.75
    },
    {
      "symbol": "BTC/USDT",
      "price": 94437.41
    },
    {
      "symbol": "MAAL/USDT",
      "price": 0.1472
    },
    {
      "symbol": "XRP/USDT",
      "price": 2.51719
    }
  ]
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name      | Type     | Required | Restrictions | Title | description |
| --------- | -------- | -------- | ------------ | ----- | ----------- |
| » status  | string   | true     | none         |       | none        |
| » result  | integer  | true     | none         |       | none        |
| » data    | [object] | true     | none         |       | none        |
| »» symbol | string   | true     | none         |       | none        |
| »» price  | number   | true     | none         |       | none        |

## GET Trades

GET /api/v1/trades

### Params

| Name   | Location | Type   | Required | Description |
| ------ | -------- | ------ | -------- | ----------- |
| symbol | query    | string | yes      | none        |

> Response Examples

```json
{
  "status": "success",
  "result": 50,
  "data": [
    {
      "id": 97554983,
      "price": "3230.19",
      "qty": "0.012646",
      "time": 1736745646.981688,
      "type": "buy"
    },
    {
      "id": 97554978,
      "price": "3226.03",
      "qty": "0.021196",
      "time": 1736745639.886603,
      "type": "sell"
    },
    {
      "id": 97554971,
      "price": "3226.03",
      "qty": "0.018732",
      "time": 1736745631.489144,
      "type": "sell"
    },
    {
      "id": 97554965,
      "price": "3225.72",
      "qty": "0.007938",
      "time": 1736745622.383859,
      "type": "sell"
    },
    {
      "id": 97554959,
      "price": "3228.03",
      "qty": "0.029869",
      "time": 1736745615.185258,
      "type": "buy"
    },
    {
      "id": 97554952,
      "price": "3225.46",
      "qty": "0.009421",
      "time": 1736745605.978665,
      "type": "sell"
    },
    {
      "id": 97554945,
      "price": "3228.74",
      "qty": "0.02219",
      "time": 1736745597.315274,
      "type": "buy"
    },
    {
      "id": 97554941,
      "price": "3227.72",
      "qty": "0.008498",
      "time": 1736745592.070148,
      "type": "sell"
    },
    {
      "id": 97554937,
      "price": "3226.46",
      "qty": "0.014239",
      "time": 1736745587.972112,
      "type": "sell"
    },
    {
      "id": 97554930,
      "price": "3229.15",
      "qty": "0.014025",
      "time": 1736745579.366628,
      "type": "sell"
    },
    {
      "id": 97554927,
      "price": "3228.41",
      "qty": "0.015799",
      "time": 1736745575.0629,
      "type": "sell"
    },
    {
      "id": 97554925,
      "price": "3228.41",
      "qty": "0.025785",
      "time": 1736745570.768803,
      "type": "sell"
    },
    {
      "id": 97554917,
      "price": "3229.55",
      "qty": "0.008857",
      "time": 1736745561.169918,
      "type": "buy"
    },
    {
      "id": 97554915,
      "price": "3230.46",
      "qty": "0.019152",
      "time": 1736745556.876805,
      "type": "buy"
    },
    {
      "id": 97554909,
      "price": "3228.77",
      "qty": "0.007831",
      "time": 1736745548.668291,
      "type": "buy"
    },
    {
      "id": 97554901,
      "price": "3229.53",
      "qty": "0.022603",
      "time": 1736745538.767629,
      "type": "buy"
    },
    {
      "id": 97554896,
      "price": "3229.15",
      "qty": "0.02902",
      "time": 1736745531.964811,
      "type": "sell"
    },
    {
      "id": 97554893,
      "price": "3229.15",
      "qty": "0.008848",
      "time": 1736745527.469091,
      "type": "sell"
    },
    {
      "id": 97554888,
      "price": "3229.15",
      "qty": "0.006836",
      "time": 1736745522.074706,
      "type": "sell"
    },
    {
      "id": 97554885,
      "price": "3230.31",
      "qty": "0.017034",
      "time": 1736745516.169054,
      "type": "buy"
    },
    {
      "id": 97554880,
      "price": "3231.68",
      "qty": "0.019574",
      "time": 1736745510.869603,
      "type": "buy"
    },
    {
      "id": 97554874,
      "price": "3231.68",
      "qty": "0.013762",
      "time": 1736745503.165398,
      "type": "buy"
    },
    {
      "id": 97554868,
      "price": "3230.55",
      "qty": "0.024258",
      "time": 1736745496.277608,
      "type": "sell"
    },
    {
      "id": 97554864,
      "price": "3232.11",
      "qty": "0.008893",
      "time": 1736745488.871664,
      "type": "buy"
    },
    {
      "id": 97554858,
      "price": "3235.11",
      "qty": "0.010823",
      "time": 1736745483.369358,
      "type": "buy"
    },
    {
      "id": 97554855,
      "price": "3231.79",
      "qty": "0.022557",
      "time": 1736745478.571934,
      "type": "sell"
    },
    {
      "id": 97554851,
      "price": "3235.11",
      "qty": "0.025064",
      "time": 1736745474.367062,
      "type": "buy"
    },
    {
      "id": 97554846,
      "price": "3235.11",
      "qty": "0.029983",
      "time": 1736745469.979937,
      "type": "buy"
    },
    {
      "id": 97554839,
      "price": "3233.1",
      "qty": "0.022981",
      "time": 1736745459.975333,
      "type": "sell"
    },
    {
      "id": 97554835,
      "price": "3233.1",
      "qty": "0.013577",
      "time": 1736745451.176954,
      "type": "sell"
    },
    {
      "id": 97554828,
      "price": "3235.11",
      "qty": "0.010543",
      "time": 1736745442.368477,
      "type": "buy"
    },
    {
      "id": 97554824,
      "price": "3232.94",
      "qty": "0.021509",
      "time": 1736745437.069896,
      "type": "sell"
    },
    {
      "id": 97554818,
      "price": "3235.11",
      "qty": "0.029085",
      "time": 1736745428.066924,
      "type": "buy"
    },
    {
      "id": 97554815,
      "price": "3235.11",
      "qty": "0.01649",
      "time": 1736745422.476108,
      "type": "buy"
    },
    {
      "id": 97554809,
      "price": "3235.11",
      "qty": "0.01484",
      "time": 1736745416.780384,
      "type": "buy"
    },
    {
      "id": 97554805,
      "price": "3235.11",
      "qty": "0.018205",
      "time": 1736745409.566089,
      "type": "buy"
    },
    {
      "id": 97554798,
      "price": "3234",
      "qty": "0.017064",
      "time": 1736745400.666621,
      "type": "sell"
    },
    {
      "id": 97554793,
      "price": "3234.66",
      "qty": "0.025524",
      "time": 1736745395.374756,
      "type": "sell"
    },
    {
      "id": 97554787,
      "price": "3232.9",
      "qty": "0.008053",
      "time": 1736745386.168788,
      "type": "sell"
    },
    {
      "id": 97554783,
      "price": "3235.49",
      "qty": "0.030522",
      "time": 1736745382.069355,
      "type": "buy"
    },
    {
      "id": 97554777,
      "price": "3232.48",
      "qty": "0.027362",
      "time": 1736745372.269417,
      "type": "sell"
    },
    {
      "id": 97554773,
      "price": "3233.61",
      "qty": "0.018693",
      "time": 1736745367.862114,
      "type": "buy"
    },
    {
      "id": 97554768,
      "price": "3232.59",
      "qty": "0.010731",
      "time": 1736745362.757109,
      "type": "sell"
    },
    {
      "id": 97554762,
      "price": "3233.33",
      "qty": "0.023103",
      "time": 1736745353.466675,
      "type": "buy"
    },
    {
      "id": 97554758,
      "price": "3232.06",
      "qty": "0.026247",
      "time": 1736745347.072226,
      "type": "sell"
    },
    {
      "id": 97554752,
      "price": "3231.65",
      "qty": "0.025746",
      "time": 1736745338.269858,
      "type": "sell"
    },
    {
      "id": 97554748,
      "price": "3233.53",
      "qty": "0.013554",
      "time": 1736745332.363357,
      "type": "buy"
    },
    {
      "id": 97554743,
      "price": "3229.29",
      "qty": "0.020148",
      "time": 1736745326.481838,
      "type": "sell"
    },
    {
      "id": 97554740,
      "price": "3231.4",
      "qty": "0.014623",
      "time": 1736745320.56408,
      "type": "sell"
    },
    {
      "id": 97554733,
      "price": "3231.33",
      "qty": "0.01259",
      "time": 1736745310.767029,
      "type": "buy"
    }
  ]
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name     | Type     | Required | Restrictions | Title | description |
| -------- | -------- | -------- | ------------ | ----- | ----------- |
| » status | string   | true     | none         |       | none        |
| » result | integer  | true     | none         |       | none        |
| » data   | [object] | true     | none         |       | none        |
| »» id    | integer  | true     | none         |       | none        |
| »» price | string   | true     | none         |       | none        |
| »» qty   | string   | true     | none         |       | none        |
| »» time  | number   | true     | none         |       | none        |
| »» type  | string   | true     | none         |       | none        |

## GET Exchange 24hr Volume

GET /api/v1/exchange-24hr-volume

> Response Examples

```json
{
  "status": "success",
  "data": {
    "volume": 4037518.315
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name      | Type   | Required | Restrictions | Title | description |
| --------- | ------ | -------- | ------------ | ----- | ----------- |
| » status  | string | true     | none         |       | none        |
| » data    | object | true     | none         |       | none        |
| »» volume | number | true     | none         |       | none        |

# Data Schema
