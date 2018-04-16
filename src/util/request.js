import md5 from 'md5'
import axios from 'axios'
import Tool from './tool.js'
const serializeToUrl = (data) => Object.keys( data ).map(function( key ) {
            return encodeURIComponent( key ) + '=' + encodeURIComponent( data[ key ])
        }).join('&');

export const ajaxPost = (url, data, success, error) => {
    if(!data) {ajax(url, {}, data, success)}
    var option = {
        method: 'post',
        url: url,/*
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
        },*/
        data: data
    };

    var token = resetToken();
    //console.log('token', token);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    if (token) {
        option.headers = {
            'X-CSRF-Token': md5(token)
        }
    }

    return axios(option).then(function(response) {
        let d = response.data;
        if (!d) {
            d = {status: 600, msg: '服务器错误'};
        }
        // 成功
        if (d.status === 200 || /^2\d+$/.test(String(d.status))) {
            success(d);
            return;
        }
        if (d.status === 6002) {
            window.location.href = "/login.jsp?url=" + encodeURIComponent(window.location.href);
        } else {
            // 执行done，结束请求
            /*if(d.msg) {
                app.showMsg(d.msg);
            }else{
                app.showMsg('系统错误：'+JSON.stringify(d));
            }*/

            if(typeof error === 'function') {
                error(d);
            }
        }

    }).catch(function (error) {
        //console.log(error.response);
    });
}

function resetToken() {
    var XTOKEN = 'csrftoken', token = Tool.cookie.get(XTOKEN);
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
            url: url,/*
            headers:{
                'Content-type': 'application/x-www-form-urlencoded'
            },*/
            data: data
        }).then(function(response) {
            callback(response.data);
        });
