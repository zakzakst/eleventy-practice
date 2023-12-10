const fetch = require("node-fetch");
const apiUrl =
  "https://s-ishizaki.sakura.ne.jp/sample-site-01/wp-json/wp/v2/posts";

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
    console.log(responseData);
    return responseData;
  }
};
