const base = require('./base');
const qs = require('qs');
const fs = require('fs');

/**
 * 漫画签到
 */
class userCheck extends base {
  constructor(args) {
    super(args);
  }

  order() {
    return 0;
  }

  async run() {
    const userCheckURL = 'https://api.bilibili.com/x/web-interface/nav';
    const result = await this.request.get(userCheckURL);
    const isLogin = this._.get(result, 'data.isLogin');
    const username = this._.get(result, 'data.uname');
    const money = this._.get(result, 'data.money');
    if (isLogin) {
      this.userInfo = result.data;

      console.info('----- login success -----');
      console.info('----- [username] - ' + username);
      console.info('----- [金币余额] - ' + money);

      this.setUserStatus(result.data);
    } else {
      console.info('----- login fail -----');
    }
  }

  getTaskName() {
    return '用户登录检查';
  }
}

module.exports = userCheck;
