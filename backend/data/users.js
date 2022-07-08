import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Alice Shaker",
    email: "alice@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Candice Ling",
    email: "candice@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
