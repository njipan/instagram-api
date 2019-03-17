const nightmare = require("./../shared/nightmare");

module.exports = {
  process: account => {
    return nightmare
      .goto(process.env.BASE_URL)
      .wait()
      .goto(`${process.env.BASE_URL}${process.env.LOGIN_URL}`)
      .wait("[name=username]")
      .wait(500)
      .type("[name=username]", account.username)
      .type("[name=password]", account.password)
      .click("button[type=submit]")
      .wait("[aria-label=Profile]")
      .wait(500);
  }
};
