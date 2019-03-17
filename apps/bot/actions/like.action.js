const { LoginAction } = require("./");

module.exports = {
  process: () => {
    const account = {
      username: "linexgift10@gmail.com",
      password: "sandy123",
      post: "/p/Bt8GSqqhUNP/"
    };

    LoginAction.process(account)
      .goto(`${process.env.BASE_URL}${account.post}`)
      .wait("[aria-label=Profile]")
      .wait(500)
      .click("button.coreSpriteHeartOpen")
      .end()
      .then(() => {
        console.log("Sukses");
      })
      .catch(e => {
        console.log(e);
      });
  }
};
