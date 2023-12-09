require("dotenv").config();
const fetch = require("node-fetch");
const apiUrl = process.env.API_URL;
console.log(process.env.NODE_ENV);

module.exports = async () => {
  let responseData;
  try {
    const response = await fetch(apiUrl);
    responseData = await response.json();
  } catch (e) {
    console.error(e);
    responseData = [
      {
        id: 1,
        name: "User 1",
        email: "user1@mail.com",
      },
    ];
  } finally {
    return responseData;
  }
};
