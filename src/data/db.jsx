export let users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    cart: [],
  },
  {
    id: 2,
    username: "user1",
    password: "user123",
    role: "user",
    cart: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 3,
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    username: "user2",
    password: "user456",
    role: "user",
    cart: [
      {
        productId: 4,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ],
  },
  {
    id: 4,
    username: "user3",
    password: "user789",
    role: "user",
    cart: [
      {
        productId: 5,
        quantity: 1,
      },
      {
        productId: 6,
        quantity: 2,
      },
    ],
  },
];

export let products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless Bluetooth headphones with noise cancellation.",
    price: 100,
    stock: 10,
    image:
      "https://plus.unsplash.com/premium_photo-1677158265072-5d15db9e23b2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lyZWxlc3MlMjBibHVldG9vdGglMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Smartphone",
    description:
      "Latest smartphone with advanced features, including a powerful camera.",
    price: 200,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1502096472573-eaac515392c6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    description:
      "Experience crystal-clear visuals with this 4K Ultra HD smart television.",
    price: 150,
    stock: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHZ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Laptop",
    description:
      "Powerful laptop with a high-resolution display and fast processing speed.",
    price: 250,
    stock: 2,
    image:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Smartwatch",
    description:
      "Stylish smartwatch with fitness tracking and health-monitoring features.",
    price: 300,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1523395243481-163f8f6155ab?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Gaming Console",
    description: "Next-gen gaming console for an immersive gaming experience.",
    price: 350,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1580234797602-22c37b2a6230?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FtaW5nJTIwY29uc29sZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export let orders = [
  {
    orderId: 1,
    userId: 2, // user1
    status: "Processing", // Processing, Shipped, Delivered, Cancelled
    orderDate: "2024-12-01", // ISO format date
    paid: false, // true if paid, false if not
    paymentMethod: "COD", // Payment methods: COD, Card, UPI, etc.
    address: {
      fullName: "John Doe",
      street: "123 Elm Street",
      city: "Springfield",
      state: "Illinois",
      country: "USA",
      postalCode: "62701",
      phone: "123-456-7890",
    },
    items: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 3,
        quantity: 1,
      },
    ],
  },
  {
    orderId: 2,
    userId: 3, // user2
    status: "Shipped",
    orderDate: "2024-11-25",
    paid: true,
    paymentMethod: "Card", // Credit/Debit card
    address: {
      fullName: "Jane Smith",
      street: "456 Oak Avenue",
      city: "Seattle",
      state: "Washington",
      country: "USA",
      postalCode: "98101",
      phone: "987-654-3210",
    },
    items: [
      {
        productId: 4,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ],
  },
  {
    orderId: 3,
    userId: 4, // user3
    status: "Processing",
    orderDate: "2024-12-02",
    paid: false,
    paymentMethod: "UPI", // Unified Payment Interface
    address: {
      fullName: "Robert Johnson",
      street: "789 Maple Road",
      city: "Austin",
      state: "Texas",
      country: "USA",
      postalCode: "73301",
      phone: "456-789-0123",
    },
    items: [
      {
        productId: 5,
        quantity: 1,
      },
      {
        productId: 6,
        quantity: 2,
      },
    ],
  },
];
