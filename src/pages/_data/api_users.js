const fetch = require("node-fetch");
const apiUrl = "https://jsonplaceholder.typicode.com/users";

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
