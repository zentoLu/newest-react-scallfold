/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

// 用来获取本地ip的模块
let os = require('os');
let ifaces = os.networkInterfaces();
var ipArr = [];

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 9000;

// 用来获取本地ip，动态设定服务器地址
Object.keys(ifaces).forEach(function (ifname) {
  let alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      // console.log('@ ',ifname, iface.address);
      ipArr.push(iface.address);
      //console.log(ipArr);
    }
    ++alias;
  });
});

module.exports = {
  srcPath: srcPath,
  publicPath: 'dist/',
  port: dfltPort,
  ip: ipArr[0] //取第一个ip作为默认ip地址
};
