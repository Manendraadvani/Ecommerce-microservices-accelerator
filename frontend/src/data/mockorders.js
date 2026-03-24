export const mockOrders = [
  {
    id: 'ORD-2023-A4B6',
    date: '2023-10-26T14:30:00Z',
    status: 'Delivered',
    totalAmount: 59.98,
    items: [
      {
        bookId: '978-0525559474',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        imageUrl: 'https://picsum.photos/seed/midnight/200/300.webp',
        quantity: 1,
        price: 26.00,
        attributes: [
          { label: 'Format', value: 'Hardcover' },
          { label: 'Condition', value: 'New' },
        ],
      },
      {
        bookId: '978-0593135204',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        imageUrl: 'https://picsum.photos/seed/hailmary/200/300.webp',
        quantity: 1,
        price: 33.98,
        attributes: [
          { label: 'Format', value: 'Paperback' },
        ],
      },
    ],
  },
  {
    id: 'ORD-2023-C8D1',
    date: '2023-09-15T11:00:00Z',
    status: 'Returned',
    totalAmount: 18.50,
    items: [
      {
        bookId: '978-0441013593',
        title: 'Dune',
        author: 'Frank Herbert',
        imageUrl: 'https://picsum.photos/seed/dune/200/300.webp',
        quantity: 1,
        price: 18.50,
        attributes: [
            { label: 'Format', value: 'Paperback' },
            { label: 'Edition', value: 'Collector' },
        ],
      },
    ],
  },
   {
    id: 'ORD-2023-F2G9',
    date: '2023-08-01T18:45:00Z',
    status: 'Cancelled',
    totalAmount: 22.00,
    items: [
       {
        bookId: '978-1400033423',
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        imageUrl: 'https://picsum.photos/seed/kiterunner/200/300.webp',
        quantity: 1,
        price: 22.00,
        attributes: [
          { label: 'Format', value: 'Paperback' },
        ],
      },
    ],
  },
  
  // --- NEW ORDER 1 ---
  {
    id: 'ORD-2024-H7J2',
    date: '2024-01-10T09:15:00Z',
    status: 'Shipped',
    totalAmount: 15.99,
    items: [
      {
        bookId: '978-0345339683',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        imageUrl: 'https://picsum.photos/seed/hobbit/200/300.webp',
        quantity: 1,
        price: 15.99,
        attributes: [
          { label: 'Format', value: 'Mass Market Paperback' },
        ],
      },
    ],
  },

  // --- NEW ORDER 2 ---
  {
    id: 'ORD-2024-K3L5',
    date: '2024-02-05T16:00:00Z',
    status: 'Delivered',
    totalAmount: 17.00,
    items: [
      {
        bookId: '978-0743273565',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        imageUrl: 'https://picsum.photos/seed/gatsby/200/300.webp',
        quantity: 1,
        price: 17.00,
        attributes: [
          { label: 'Format', value: 'Hardcover' },
        ],
      },
    ],
  },
];