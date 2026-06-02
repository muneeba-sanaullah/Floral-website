const products = [
  {
    id: 1,
    name: "Rose Elegance",
    price: 2500,
    image: "https://sf.tac-cdn.net/images/v2/products/small/T11Z100.jpg",
    category: "Bouquets",
    bestSeller: true
  },
  {
    id: 2,
    name: "Pink Delight",
    price: 2200,
    image: "https://sf.tac-cdn.net/images/v2/products/small/TEV24-2.jpg",
    category: "Bouquets"
  },
  {
    id: 3,
    name: "Sunshine Mix",
    price: 2800,
    image: "https://sf.tac-cdn.net/images/v2/products/small/T514-1.jpg",
    category: "Bouquets"
  },
  {
    id: 4,
    name: "Classic Whites",
    price: 2400,
    image: "https://sf.tac-cdn.net/images/v2/products/small/SF-172.jpg",
    category: "Bouquets"
  },
  {
    id: 5,
    name: "Lavender Love",
    price: 2600,
    image: "https://sf.tac-cdn.net/images/v2/products/small/TEV28-2.jpg",
    category: "Bouquets"
  },
  {
    id: 6,
    name: "Peach Blossom",
    price: 2300,
    image: "https://sf.tac-cdn.net/images/v2/products/small/TEV59-7.jpg",
    category: "Bouquets"
    ,bestSeller: true
  },
  {
    id: 7,
    name: "Romantic Reds",
    price: 3000,
    image: "https://sf.tac-cdn.net/images/v2/products/small/FTD-14-V2.jpg",
    category: "Bouquets",
    bestSeller: true
  },
  {
    id: 8,
    name: "Spring Garden",
    price: 2450,
    image: "https://sf.tac-cdn.net/images/v2/products/small/TSP09-1.jpg",
    category: "Bouquets"
  },
  {
    id: 9,
    name: "Golden Touch",
    price: 2700,
    image: "https://sf.tac-cdn.net/images/v2/products/small/T24M510.jpg",
    category: "Bouquets"
  },
  {
    id: 10,
    name: "Soft Pastels",
    price: 2350,
    image: "https://sf.tac-cdn.net/images/v2/products/small/FTD-C13-5036.jpg",
    category: "Bouquets",
    bestSeller: true
  },
  {
    id: 11,
    name: "Bright Mix",
    price: 2550,
    image: "https://sf.tac-cdn.net/images/v2/products/small/F-667.jpg",
    category: "Bouquets"
  },
  {
    id: 12,
    name: "Luxury Bouquet",
    price: 3500,
    image: "https://sf.tac-cdn.net/images/v2/products/small/FTD-S5270.jpg",
    category: "Bouquets"
  },
  {
  id: 13,
  name: "Chocolate Fudge Cake",
  price: 3200,
  image: "https://plus.unsplash.com/premium_photo-1726776119493-485efa0693e1?q=80&w=437&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
  category: "Cakes",
  bestSeller: true
},
{
  id: 14,
  name: "Strawberry Cream Cake",
  price: 2900,
  image: "https://plus.unsplash.com/premium_photo-1669680785708-2c756ee97de8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFN0cmF3YmVycnklMjBDcmVhbSUyMENha2V8ZW58MHx8MHx8fDA%3D",
  category: "Cakes"
},
{
  id: 15,
  name: "Vanilla Delight Cake",
  price: 2700,
  image: "https://images.unsplash.com/photo-1779282312393-41cba4826c03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VmFuaWxsYSUyMERlbGlnaHQlMjBDYWtlfGVufDB8fDB8fHww",
  category: "Cakes"
},
{
  id: 16,
  name: "Luxury Gift Basket",
  price: 4200,
  image: "https://plus.unsplash.com/premium_photo-1671815629160-40598a2f00a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8THV4dXJ5JTIwR2lmdCUyMEJhc2tldHxlbnwwfHwwfHx8MA%3D%3D",
  category: "Gift Boxes & Baskets",
  bestSeller: false
},
{
  id: 17,
  name: "Premium Chocolate Box",
  price: 2800,
  image: "https://images.unsplash.com/photo-1573013835014-60d1590bfa38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
  category: "Chocolate Gifts",
  bestSeller: false
},
{
  id: 18,
  name: "Birthday Bloom Surprise",
  price: 2600,
  image: "https://images.unsplash.com/photo-1596744186392-e3c6088abff6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QmlydGhkYXklMjBCbG9vbSUyMFN1cnByaXNlfGVufDB8fDB8fHww",
  category: "Birthday Flowers",
  bestSeller: false
},
{
  id: 19,
  name: "Flower + Cake Bundle",
  price: 5200,
  image: "https://plus.unsplash.com/premium_photo-1680172801113-b638f8bd2e7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Rmxvd2VyJTIwJTJCJTIwQ2FrZSUyMEJ1bmRsZXxlbnwwfHwwfHx8MA%3D%3D",
  category: "Bundles",
  bestSeller: false
},
{
  id: 20,
  name: "Birthday Room Decoration Set",
  price: 8000,
  image: "https://images.unsplash.com/photo-1695094034917-d04244a3596a?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Birthday Decoration",
  bestSeller: false
},
{
  id: 21,
  name: "Elegant Wedding Floral Setup",
  price: 15000,
  image: "https://images.unsplash.com/photo-1613128517587-08dc18819ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fEVsZWdhbnQlMjBXZWRkaW5nJTIwRmxvcmFsJTIwU2V0dXB8ZW58MHx8MHx8fDA%3D",
  category: "Wedding Decoration",
  bestSeller: false
},
{
  id: 22,
  name: "Custom Floral Arrangement",
  price: 6000,
  image: "https://plus.unsplash.com/premium_photo-1677178660870-157206580a8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fEN1c3RvbSUyMEZsb3JhbCUyMEFycmFuZ2VtZW50fGVufDB8fDB8fHww",
  category: "Custom Orders",
  bestSeller: false
},
{
  id: 23,
  name: "White Orchid Bliss",
  price: 3900,
  image: "https://images.unsplash.com/photo-1769812343377-73d69a978ec4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2hpdGUlMjBPcmNoaWQlMjBCbGlzc3xlbnwwfHwwfHx8MA%3D%3D",
  category: "Bouquets",
  bestSeller: true
},
{
  id: 24,
  name: "Tulip Dream",
  price: 3100,
  image: "https://images.unsplash.com/photo-1710062479883-20b501f6cbeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFR1bGlwJTIwRHJlYW0lMjBib3VxdWV0fGVufDB8fDB8fHww",
  category: "Bouquets"
},
{
  id: 25,
  name: "Blush Rose Basket",
  price: 3400,
  image: "https://images.unsplash.com/photo-1701036750703-53fa7f43860e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fEJsdXNoJTIwUm9zZSUyMEJhc2tldHxlbnwwfHwwfHx8MA%3D%3D",
  category: "Bouquets"
},
{
  id: 26,
  name: "Royal Red Roses",
  price: 4800,
  image: "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Bouquets",
  bestSeller: true
},
{
  id: 27,
  name: "Peony Paradise",
  price: 4300,
  image: "https://images.unsplash.com/photo-1466027131045-da23e7670c03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFBlb255JTIwUGFyYWRpc2V8ZW58MHx8MHx8fDA%3D",
  category: "Bouquets"
},
{
  id: 28,
  name: "Luxury Lily Arrangement",
  price: 5200,
  image: "https://images.unsplash.com/photo-1772211506068-3d3f0ce794b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fEx1eHVyeSUyMExpbHklMjBBcnJhbmdlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
  category: "Bouquets"
},
{
  id: 29,
  name: "Anniversary Bloom Box",
  price: 4500,
  image: "https://media.istockphoto.com/id/2206934352/photo/hands-of-a-child-giving-a-wrapped-gift-with-a-satin-ribbon-to-a-woman-holding-a-bouquet-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=MT0pHOCWz72tDS-hvfHizQ2TAKozUxkedb9txw9JPUU=",
  category: "Gift Boxes & Baskets"
},
{
  id: 30,
  name: "Ferrero Chocolate Bouquet",
  price: 3500,
  image: "https://images.unsplash.com/photo-1644890587799-3ae8471901dd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Chocolate Gifts",
  bestSeller: true
},
{
  id: 31,
  name: "Minimalist White Cake",
  price: 3700,
  image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500",
  category: "Cakes"
},
{
  id: 32,
  name: "Luxury Birthday Hamper",
  price: 6500,
  image: "https://images.unsplash.com/photo-1713496736683-ffb12c754c27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fEx1eHVyeSUyMEJpcnRoZGF5JTIwSGFtcGVyfGVufDB8fDB8fHww",
  category: "Gift Boxes & Baskets"
},
{
  id: 33,
  name: "Romantic Proposal Setup",
  price: 18000,
  image: "https://images.unsplash.com/photo-1763129636673-df7c37cf251d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Um9tYW50aWMlMjBQcm9wb3NhbCUyMFNldHVwfGVufDB8fDB8fHww",
  category: "Wedding Decoration",
  bestSeller: true
},
{
  id: 34,
  name: "Baby Pink Roses",
  price: 2950,
  image: "https://images.unsplash.com/photo-1694620131938-0f88d08610a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEJhYnklMjBQaW5rJTIwUm9zZXN8ZW58MHx8MHx8fDA%3D",
  category: "Bouquets"
},
{
  id: 35,
  name: "Golden Sunflower Wrap",
  price: 3200,
  image: "https://images.unsplash.com/photo-1629386255808-c3ceb405173c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R29sZGVuJTIwU3VuZmxvd2VyJTIwV3JhcHxlbnwwfHwwfHx8MA%3D%3D",
  category: "Bouquets"
},
{
  id: 36,
  name: "Luxury Candle Gift Box",
  price: 4100,
  image: "https://images.unsplash.com/photo-1594360439596-36c78e4d7643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEx1eHVyeSUyMENhbmRsZSUyMEdpZnQlMjBCb3h8ZW58MHx8MHx8fDA%3D",
  category: "Gift Boxes & Baskets"
},
{
  id: 37,
  name: "Elegant Engagement Decor",
  price: 22000,
  image: "https://plus.unsplash.com/premium_photo-1675230132886-82a9a272f502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RWxlZ2FudCUyMEVuZ2FnZW1lbnQlMjBEZWNvcnxlbnwwfHwwfHx8MA%3D%3D",
  category: "Wedding Decoration"
},
{
  id: 38,
  name: "Pastel Hydrangea Bouquet",
  price: 4600,
  image: "https://images.unsplash.com/photo-1647598217396-80bb52a48610?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFBhc3RlbCUyMEh5ZHJhbmdlYSUyMEJvdXF1ZXR8ZW58MHx8MHx8fDA%3D",
  category: "Bouquets"
},
{
  id: 39,
  name: "Deluxe Birthday Combo",
  price: 7200,
  image: "https://images.unsplash.com/photo-1639052265704-483bf011e496?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGVsdXhlJTIwQmlydGhkYXklMjBDb21ib3xlbnwwfHwwfHx8MA%3D%3D",
  category: "Bundles",
  bestSeller: true
},
{
  id: 40,
  name: "Signature Bloom Collection",
  price: 8500,
  image: "https://plus.unsplash.com/premium_photo-1678115814418-d31d26e8e9d9?q=80&w=377&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Custom Orders",
  bestSeller: true
},
{
  id: 41,
  name: "Ivory Rose Symphony",
  price: 4100,
  image: "https://plus.unsplash.com/premium_photo-1733342636880-682b9e47e518?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Bouquets",
  bestSeller: true
},
{
  id: 42,
  name: "Spring Tulip Basket",
  price: 3600,
  image: "https://plus.unsplash.com/premium_photo-1764185550616-a6168cbd5455?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJpbmclMjBUdWxpcCUyMEJhc2tldHxlbnwwfHwwfHx8MA%3D%3D",
  category: "Bouquets"
},
{
  id: 43,
  name: "Red Velvet Celebration Cake",
  price: 3900,
  image: "https://plus.unsplash.com/premium_photo-1713920189815-876dbdf5f56e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmVkJTIwVmVsdmV0JTIwQ2VsZWJyYXRpb24lMjBDYWtlfGVufDB8fDB8fHww",
  category: "Cakes",
  bestSeller: true
},
{
  id: 44,
  name: "Chocolate Drip Fantasy",
  price: 4300,
  image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500",
  category: "Cakes"
},
{
  id: 45,
  name: "Luxury Eid Gift Basket",
  price: 7500,
  image: "https://images.unsplash.com/photo-1647168672642-695e96782922?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Gift Boxes & Baskets"
},
{
  id: 46,
  name: "Self Care Floral Box",
  price: 4800,
  image: "https://images.unsplash.com/photo-1778333485574-62c28b5a7368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2VsZiUyMENhcmUlMjBGbG9yYWwlMjBCb3h8ZW58MHx8MHx8fDA%3D",
  category: "Gift Boxes & Baskets"
},
{
  id: 47,
  name: "Premium Truffle Collection",
  price: 3400,
  image: "https://images.unsplash.com/photo-1757450317518-9d385619f5ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UHJlbWl1bSUyMFRydWZmbGUlMjBDb2xsZWN0aW9ufGVufDB8fDB8fHww",
  category: "Chocolate Gifts"
},
{
  id: 48,
  name: "Heart Shape Chocolate Box",
  price: 3100,
  image: "https://images.unsplash.com/photo-1656821991459-ae723d90d648?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Chocolate Gifts"
},
{
  id: 49,
  name: "Birthday Rose Surprise",
  price: 3700,
  image: "https://images.unsplash.com/photo-1701110198783-73b2cf0aff26?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Birthday Flowers",
  bestSeller: true
},
{
  id: 50,
  name: "Pastel Birthday Bouquet",
  price: 3300,
  image: "https://images.unsplash.com/photo-1641425766538-f866782a773b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFzdGVsJTIwQmlydGhkYXklMjBCb3VxdWV0fGVufDB8fDB8fHww",
  category: "Birthday Flowers"
},
{
  id: 51,
  name: "Luxury Floral Combo",
  price: 8900,
  image: "https://images.unsplash.com/photo-1680467163792-b233fb61df5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEx1eHVyeSUyMEZsb3JhbCUyMENvbWJvfGVufDB8fDB8fHww",
  category: "Bundles",
  bestSeller: true
},
{
  id: 52,
  name: "Cake & Roses Surprise",
  price: 6100,
  image: "https://images.unsplash.com/photo-1659116763125-de6bc2c8e31f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENha2UlMjAlMjYlMjBSb3NlcyUyMFN1cnByaXNlfGVufDB8fDB8fHww",
  category: "Bundles"
},
{
  id: 53,
  name: "Balloon Birthday Setup",
  price: 9500,
  image: "https://images.unsplash.com/photo-1774290687229-a725965554c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFsbG9vbiUyMEJpcnRoZGF5JTIwU2V0dXB8ZW58MHx8MHx8fDA%3D",
  category: "Birthday Decoration"
},
{
  id: 54,
  name: "Luxury Candlelight Decor",
  price: 12500,
  image: "https://media.istockphoto.com/id/994807816/photo/spa-setting-with-aromatic-candles.webp?a=1&b=1&s=612x612&w=0&k=20&c=5WHwdZPO980bId2z9naS6WHqyJgCISpLw9fpBreNRVE=",
  category: "Birthday Decoration"
},
{
  id: 55,
  name: "Royal Wedding Stage Decor",
  price: 35000,
  image: "https://images.unsplash.com/photo-1591203281954-23fa2ff8ef18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fFJveWFsJTIwV2VkZGluZyUyMFN0YWdlJTIwRGVjb3xlbnwwfHwwfHx8MA%3D%3D",
  category: "Wedding Decoration",
  bestSeller: true
},
{
  id: 56,
  name: "White & Gold Wedding Theme",
  price: 42000,
  image: "https://images.unsplash.com/photo-1769230366307-ed3b9ccb6b4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2hpdGUlMjAlMjYlMjBHb2xkJTIwV2VkZGluZyUyMFRoZW18ZW58MHx8MHx8fDA%3D",
  category: "Wedding Decoration"
},
{
  id: 57,
  name: "Luxury Proposal Box",
  price: 6800,
  image: "https://plus.unsplash.com/premium_photo-1672856040693-89aa49943f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
  category: "Custom Orders"
},
{
  id: 58,
  name: "Personalized Floral Letter Box",
  price: 7300,
  image: "https://plus.unsplash.com/premium_photo-1718453865204-bc82c9a1d430?q=80&w=812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  category: "Custom Orders",
  bestSeller: true
},
{
  id: 59,
  name: "Sunset Orange Bouquet",
  price: 3450,
  image: "https://images.unsplash.com/photo-1615362280680-a5fe619d0481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3Vuc2V0JTIwT3JhbmdlJTIwQm91cXVldHxlbnwwfHwwfHx8MA%3D%3D",
  category: "Bouquets"
},
{
  id: 60,
  name: "Luxury Orchid Vase",
  price: 5600,
  image: "https://images.unsplash.com/photo-1659155222062-54b1bfb60f4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fEx1eHVyeSUyME9yY2hpZCUyMFZhc2V8ZW58MHx8MHx8fDA%3D",
  category: "Bouquets",
  bestSeller: true
}
];

export default [...products].sort(() => Math.random() - 0.5);