window.Config = {
  appname: "CEBU BAKERY SUPPLY",
  theme: {
    primary: "#7e1316",
    secondary: "#ffb100",
  },
  logo: "/static/logo.png",
  products: {
    hidden: [4, 5, 6, 7, 30],
  },
  sales: {
    cards: {
      methods: [
        // valid keys:
        // Prepayment
        // Multiple Payment
        // Loyalty Points
        // Gift Card
        // Paypal
        // Cheque
        // Charge
        // Credit Card
        // Cash
        // Debit Card
        { key: "Cash", value: "Cash" },
        { key: "Debit Card", value: "Debit Card" },
      ],
    },
  },
  API: {
    domain: "https://site.test",
  },
  backup: {
    host: "localhost:3306",
    user: "root",
    pass: "",
    table: "nenpos",
  },
};
