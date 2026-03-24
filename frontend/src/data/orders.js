const orders = [
  {
    id: 101,
    userId: 1,
    items: [
      { bookId: 1, quantity: 2, price: 19.99 },
      { bookId: 5, quantity: 1, price: 8.99 }
    ],
    total: 48.97,
    date: "2024-06-10",
    status: "Pending" 
  },
  {
    id: 102,
    userId: 2,
    items: [{ bookId: 3, quantity: 1, price: 17.5 }],
    total: 17.5,
    date: "2024-06-09",
    status: "Shipped"
  },
  {
    id: 103,
    userId: 3,
    items: [
      { bookId: 6, quantity: 1, price: 16.49 },
      { bookId: 2, quantity: 1, price: 14.5 }
    ],
    total: 30.99,
    date: "2024-06-08",
    status: "Delivered"
  }
];

export default orders;
