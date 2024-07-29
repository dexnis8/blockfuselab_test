const User = require("../models/user");

const userController = {
  addUser: (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).send("Email and name are required");
    }

    User.create({ email, name }, (err, result) => {
      if (err) return res.status(500).send("Error adding user");
      res
        .status(201)
        .send({ success: true, message: "User added successfully" });
    });
  },

  getAllUsers: (req, res) => {
    User.getAll((err, users) => {
      if (err) return res.status(500).send("Error fetching users");
      res.status(200).send({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    });
  },
};

module.exports = userController;
