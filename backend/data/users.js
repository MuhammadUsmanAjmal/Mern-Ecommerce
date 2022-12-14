import bcrypt from "bcryptjs";

const users = [
  {
    name: "New Admin",
    email: "new@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },

  {
    name: "Jan Doe",
    email: "jan@example.com",
    password: bcrypt.hashSync("123456", 10),
  },

  {
    name: "Usman Ajmal",
    email: "usman@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
