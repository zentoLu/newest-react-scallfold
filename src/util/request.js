import md5 from 'md5'
import axios from 'axios'
import Tool from './tool.js'
import { message, Modal } from 'antd';
const serializeToUrl = (data) => Object.keys(data).map(function(key) {
    var value = data[key];
    if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
        value = value.replace(/\+/g, '%2B'); //处理加号
        console.log(value);
    } else {
        value = encodeURI(value)
    }
    return key + '=' + value
}).join('&');

console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV;
const resetToken = () => {
    var XTOKEN = 'csrftoken',
        token = Tool.cookie.get(XTOKEN);
    if (token) {
        Tool.cookie.remove(XTOKEN);
        Tool.storage.set(XTOKEN, token);
    } else {
        token = Tool.storage.get(XTOKEN) || md5(new Date().getTime());
    }
    return token;
}

export const ajaxGet = (url, data, callback) => axios({
    method: 'get',
    url: url,
    /*
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                },*/
    data: data
}).then(function(response) {
    callback(response.data);
});

export const ajaxPost = (url, data, success, error) => {
    if (!data) { ajaxPost(url, {}, data, success) }
    return ajax({ url, data, success, error }).then().catch((d) => { console.log(d) });
}

export const ajaxPromise = (url, data, success, error) => {
    if (!data) { ajaxPost(url, {}, data, success) }
    return ajax({ url, data, success, error });
}

export const ajax = (opt) => {
    var defaultOption = {
        method: 'post',
        timeout: 120 * 1000
    };

    var option = Object.assign(defaultOption, opt);
    var { success, error } = option;
    var token = resetToken();
    //console.log('token', token);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    if (token) {
        option.headers = {
            'X-CSRF-Token': md5(token)
        }

    }

    //if (env === 'production') {
    option.headers['Content-type'] = 'application/x-www-form-urlencoded'
    option.data = serializeToUrl(option.data);
    //}

    return new Promise(function(resolve, reject) {
        axios(option).then(function(response) {
            let d = response.data;
            if (!d) {
                d = { status: 600, msg: '服务器错误' };
            }
            // 成功
            if (d.status === 200 || /^2\d+$/.test(String(d.status))) {
                success(d);
                resolve(d);
                return;
            }
            if (d.status === 6002) {
                Modal.warning({
                    title: '登陆超时',
                    content: '点击确定重新登陆',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: function() {
                        window.location.href = "/login.jsp?url=" + encodeURIComponent(window.location.href);
                    },
                    onCancel: function() {
                        window.location.href = "/login.jsp?url=" + encodeURIComponent(window.location.href);
                    }
                });
            } else {
                // 执行done，结束请求
                if (d.msg) {
                    message.error(d.msg);
                } else {
                    message.error('系统错误：' + JSON.stringify(d));
                }

                if (typeof error === 'function') {
                    error(d);
                }
                reject(d);
            }

        }).catch(function(err) {
            if (typeof error === 'function') {
                error(err);
            } else {
                message.error('系统错误：' + JSON.stringify(err));
            }
            reject(err);
        });
    });


}
