

export const ProductData = [
  { name: "Profit", value: 400000 },
  { name: "Lose", value: 120000 },
];

export const CustomerDemography = [
  {
    country: "Spain",
    totalVisit: 400,
    timeSpent: 2400,
    impression: 24000,
  },
  {
    country: "USA",
    totalVisit: 1400,
    timeSpent: 6400,
    impression: 34000,
  },
  {
    country: "Canada",
    totalVisit: 1400,
    timeSpent: 6400,
    impression: 34000,
  },
  {
    country: "China",
    totalVisit: 1800,
    timeSpent: 5400,
    impression: 44000,
  },
  {
    country: "Portugal",
    totalVisit: 800,
    timeSpent: 2400,
    impression: 24000,
  },
  {
    country: "Australia",
    totalVisit: 2800,
    timeSpent: 7400,
    impression: 94000,
  },
  {
    country: "Ireland",
    totalVisit: 800,
    timeSpent: 40,
    impression: 1200,
  },
];


export const CustomerPortfolio = [
  {
    coin: "BTC",
    totalInvestment: 400,
    totalProfilts: 2400,
    expected: 24000,
  },
  {
    coin: "Doge",
    totalInvestment: 1400,
    totalProfilts: 400,
    expected: 24000,
  },
  {
    coin: "WIN",
    totalInvestment: 20400,
    totalProfilts: 22400,
    expected: 240000,
  },
  {
     coin: "LTC",
    totalInvestment: 1800,
    totalProfilts: 5400,
    expected: 44000,
  },
  {
     coin: "LINK",
    totalInvestment: 800,
    totalProfilts: 2400,
    expected: 24000,
  },
  {
     coin: "XRP",
    totalInvestment: 2800,
    totalProfilts: 7400,
    expected: 94000,
  },
  {
     coin: "Ethereum",
    totalInvestment: 800,
    totalProfilts: 40,
    expected: 1200,
  },
];
 


export const data = {
  orders: [
    {
      ID: 1,
      username: "Balablu",
      isPaid: false,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: "yui_341_93",
      isDelivered: false,
    },
    {
      ID: 2,
      username: "Craig",
      isPaid: true,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: "nmh_111_13",
      isDelivered: true,
    },
    {
      ID: 3,
      username: "Victan",
      isPaid: false,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: "ffo-341_93",
      isDelivered: "Not Delivered",
    },
    {
      ID: 4,
      username: "King",
      isPaid: false,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: "rtv-a41_93",
      isDelivered: false,
    },
    {
      ID: 5,
      username: "Tems",
      isPaid: true,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: "wep-341_93",
      isDelivered: false,
    },
    {
      ID: 6,
      username: "Mark",
      isPaid: true,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: 341_93,
      isDelivered: false,
    },
    {
      ID: 7,
      username: "John",
      isPaid: false,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: 341_93,
      isDelivered: false,
    },
    {
      ID: 8,
      username: "Fred",
      isPaid: true,
      DATE: "Tuesday November, 2023",
      total: 50000,
      reference: "a341_4ww93",
      isDelivered: true,
    },
  ],
  pageSize: 7,
  count: 7,
};

data.pages = Math.ceil(data.count / data.pageSize);

