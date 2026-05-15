const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'data', 'db.json');

// Initialize database with default structure if it doesn't exist
function initDB() {
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], products: [], orders: [] }, null, 2));
  }
}

// Read whole database
function readDB() {
  initDB();
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

// Write whole database
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

const db = {
  users: {
    find: (query) => {
      const data = readDB();
      return data.users.filter(u => {
        return Object.keys(query).every(k => u[k] === query[k]);
      });
    },
    findOne: (query) => {
      const data = readDB();
      return data.users.find(u => {
        return Object.keys(query).every(k => u[k] === query[k]);
      });
    },
    findById: (id) => {
      const data = readDB();
      return data.users.find(u => u._id === id);
    },
    insert: async (user) => {
      const data = readDB();
      user._id = Date.now().toString(); // Simulate ObjectId
      
      // Hash password if present
      if (user.password) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
      
      data.users.push(user);
      writeDB(data);
      return user;
    },
    update: (id, updates) => {
      const data = readDB();
      const idx = data.users.findIndex(u => u._id === id);
      if (idx !== -1) {
        data.users[idx] = { ...data.users[idx], ...updates };
        writeDB(data);
        return data.users[idx];
      }
      return null;
    },
    comparePassword: async (candidatePassword, userPassword) => {
      if (!userPassword) return false;
      return bcrypt.compare(candidatePassword, userPassword);
    },
    toProfile: (user) => {
      const obj = { ...user };
      delete obj.password;
      return obj;
    }
  },
  products: {
    find: (query = {}) => {
      const data = readDB();
      return data.products;
    },
    insertMany: (products) => {
      const data = readDB();
      data.products = products;
      writeDB(data);
    }
  },
  orders: {
    find: (query) => {
      const data = readDB();
      return data.orders.filter(o => {
        return Object.keys(query).every(k => o[k] === query[k]);
      });
    },
    findOne: (query) => {
      const data = readDB();
      return data.orders.find(o => {
        return Object.keys(query).every(k => o[k] === query[k]);
      });
    },
    insert: (order) => {
      const data = readDB();
      order._id = Date.now().toString();
      order.createdAt = new Date().toISOString();
      data.orders.push(order);
      writeDB(data);
      return order;
    }
  }
};

module.exports = db;
