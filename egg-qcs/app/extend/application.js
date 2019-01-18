// app/extend/application.js
const STORE = Symbol('Application#STORE');
const axios = require('axios');
const utils = require('./utils.js');
module.exports = {
  utils,
  env: 'dev',
  baseUrl(){
    if (this.env === 'dev') {
      return 'http://127.0.0.1:7001'
    } else if (this.env === 'prod') {
      return 'http://132.232.94.151:10000'
    }
  },
  fetch(url, data){
    url = this.baseUrl() + url;
    return axios.post(url, data);
  },
  getStore() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[STORE]) {
      // 实际情况肯定更复杂
      this[STORE] = {
        list: [],
        /*
         * @param obj-查询对象
         * @return 1已登录 msg过期或者未登录
         */

        get(obj) {
          const targetObj = this.list.find(item => {
            // 可以根据username和token进行查询
            return item.username === obj.username || item.token === obj.token;
          })
          // 查找目标下标
          const index = this.list.findIndex(item => {
            // 可以根据username和token进行查询
            return item.username === obj.username || item.token === obj.token;
          })
          if (!targetObj) {
            return null;
          }
          let disTime = new Date - targetObj.loginTime;
          if (disTime > targetObj.maxAge) {
            return {
              msg: '会话已过期',
              status: -1,
              user: targetObj
            }
          } else {
            // 过期时间重新计算
            this.list[index].loginTime = new Date();
            return {
              status: 0,
              msg: '已登录',
              user: targetObj
            }
          }

        },
        // @param obj-需要存储的对象
        set(obj) {
          obj.createTime = new Date();
          // 过期时间
          obj.maxAge = obj.maxAge || 1800;
          this.list.push(obj)
        },
        update(obj) {
          let index = this.list.findIndex(item => {
            return (item.username === obj.username) || (item.token === obj.token);
          });
          this.list[index] = obj;
        },
        destroy(obj) {
          let index = this.list.findIndex(item => {
            return (item.username === obj.username) || (item.token === obj.token);
          });
          this.list.splice(index, 1);
        }
      }
    }
    return this[STORE];
  }
}