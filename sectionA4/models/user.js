const db = require("../db");

const User = {
  create: (userData, callback) => {
    const query = "INSERT INTO users (email, name) VALUES (?, ?)";
    db.query(query, [userData.email, userData.name], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },
  getAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = User;
