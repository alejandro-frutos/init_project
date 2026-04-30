# MongoDB Node.js API

A simple CRUD API built with Express and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Create an Item
```bash
POST /api/items
Content-Type: application/json

{
  "name": "Item Name",
  "description": "Item description",
  "price": 29.99,
  "quantity": 10
}
```

### Get All Items
```bash
GET /api/items
```

### Get Single Item
```bash
GET /api/items/{id}
```

### Update Item
```bash
PUT /api/items/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 39.99
}
```

### Delete Item
```bash
DELETE /api/items/{id}
```

## Project Structure

```
.
├── server.js           # Main server file
├── models/
│   └── Item.js        # MongoDB Item schema
├── routes/
│   └── items.js       # CRUD routes
├── .env               # Environment variables
└── package.json
```
