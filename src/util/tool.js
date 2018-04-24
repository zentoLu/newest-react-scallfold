/**
 * [Tool description] 通用工具函数
 * @type {Object}
 */
const Tool = {
    deepClone: function(obj) {
        var newObj = obj instanceof Array ? [] : {};

        for (var i in obj) {
            newObj[i] = typeof obj[i] == 'object' ? arguments.callee(obj[i]) : obj[i];
        }

        return newObj;
    },
    unparam: function(str, params) {
        if (!str) return;
        params = params || {};
        str.replace(/\/$/, '').replace(/([^?=&]+)=([^&#]*)/g, function(m, key, value) {
            params[key] = decodeURIComponent(value);
        });
        return params;
    },
    serialize: function(data) {
        let paramArr = [];
        let paramStr = '';
        for (let attr in data) {
            paramArr.push(attr + '=' + data[attr]);
        }
        paramStr = paramArr.join('&');
        return paramStr ? '?' + paramStr : paramStr;
    },
    /* eg.
        util.formatDate('2014-03-24', '-1m')    => 2014/02/24
        util.formatDate('2014-03-24', '-2d')    => 2014/03/22
        util.formatDate('2014-03-24', '/')      => 2014/03/22
        util.formatDate(null, '/')              => 2014/10/15
        util.formatDate(null, '')               => 20141015
        util.formatDate(null, 'datetime')       => 2015/08/04 17:41:48
    */
    formatDate: function(date, str, div) {
        if (!date) {
            date = new Date();
        } else if (typeof date === 'number') {
            date = new Date(date);
        } else if (typeof date === 'string') {
            date = new Date(/(\d{4})\D?(\d{2})\D?(\d{2})/.exec(date).splice(1).join('/'));
        }
        var y, m, d, H, M, S, time = '';

        if (typeof str === 'string') {
            str = str.toLowerCase();
            if (str === 'datetime') {
                H = date.getHours();
                M = date.getMinutes();
                S = date.getSeconds();
                time = ' ' + (H > 9 ? H : '0' + H) + ':' + (M > 9 ? M : '0' + M) + ':' + (S > 9 ? S : '0' + S);
            } else if (/\d(y|m|d)$/i.test(str)) {
                var n = str.substr(0, str.length - 1);
                switch (str.substr(-1)) {
                    case 'y':
                        date.setFullYear(date.getFullYear() + (+n));
                        break;
                    case 'm':
                        date.setMonth(date.getMonth() + (+n));
                        break;
                    case 'd':
                        date.setDate(date.getDate() + (+n));
                        break;
                }
            } else {
                div = div || str;
            }
        }
        if (div === undefined) div = '/';
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();

        return y + div + (m > 9 ? m : '0' + m) + div + (d > 9 ? d : '0' + d) + time;
    },
    /**
     * [formatBankNo description] 银行卡号每隔四位用空格隔开
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    formatBankNo: function(num) {
        num = String(num);
        let numArr = num.match(/.{1,4}/g);
        return numArr.join(' ');
    },
    //距离当前时间
    dateToNow: function(str) {
        var date = new Date(str);
        var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
        if (time < 0) {
            return '';
        } else if (time / 1000 < 60) {
            return '刚刚';
        } else if ((time / 60000) < 60) {
            return parseInt((time / 60000)) + '分钟前';
        } else if ((time / 3600000) < 24) {
            return parseInt(time / 3600000) + '小时前';
        } else if ((time / 86400000) < 31) {
            return parseInt(time / 86400000) + '天前';
        } else if ((time / 2592000000) < 12) {
            return parseInt(time / 2592000000) + '月前';
        } else {
            return parseInt(time / 31536000000) + '年前';
        }
    },
    // 格式化金额
    formatMoney: function(value, unit) {
        if (value === undefined) value = 0;
        var parts = Number(value).toFixed(2).toString().split('.');
        return parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.' + parts[1] + (unit ? ' ' + unit : '');
    },
    // 精确浮点数
    formatFloat: function(num, length) {
        if (typeof length !== 'number') length = 2;
        var n = Math.pow(10, length);
        return (num * n / n).toFixed(length);
    },
    //精确浮点数，然后去掉最后的0，最多保留length位
    formatFloat0: function(num, length) {
        var n = this.formatFloat(num, length);
        return Number(n);
    },
    // 浮点数计算，自定义小数位数和取近似值的模式
    // X、Y为计算的数；method为运算方法（+, -, *, /）；demical为小数点后位数，默认2位；convert为取近似值的模式，对应Math对象的方法名，默认为round
    floatCal: (X, Y, method, demical = 2, convert = 'round') => {
        if (+X === NaN || +Y === NaN || /^[\+\-\*\/]$/.test(method) !== true) {
            throw 'Illegal arguments';
        }
        const scale = Math.pow(10, demical);
        X *= scale;
        Y *= scale;
        let result = 0;
        method === '+' && (result = X + Y);
        method === '-' && (result = X - Y);
        method === '*' && (result = X * Y / scale);
        method === '/' && (result = X / Y * scale);
        convert && Math[convert] && (result = Math[convert](result));
        return result / scale;
    },
    // 手机号、邮箱地址打码
    formatName: function(str) {
        str = str ? String(str) : '';
        return str.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2').replace(/^(.{3})[^@]*(@.+)$/, '$1****$2');
    },

    storage: {
        set: function(key, value) {
            key = key.replace(/\//g, '_');
            if (value === undefined) return;

            //localStorage.setItem(key, JSON.stringify(value));
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                return false;
            }
        },
        get: function(key) {
            key = key.replace(/\//g, '_');
            return JSON.parse(localStorage.getItem(key));
        },
        remove: function(key) {
            key = key.replace(/\//g, '_');
            localStorage.removeItem(key);
        },
        clear: function() {
            localStorage.clear();
        }
    },

    session: {
        set: function(key, value) {
            key = key.replace(/\//g, '_');
            if (value === undefined) return;
            var val = JSON.stringify(value) || '';
            try {
                sessionStorage.setItem(key, val);
            } catch (e) {
                return false;
            }
        },
        get: function(key) {
            key = key.replace(/\//g, '_');
            return JSON.parse(sessionStorage.getItem(key));
        },
        remove: function(key) {
            key = key.replace(/\//g, '_');
            sessionStorage.removeItem(key);
        },
        clear: function() {
            sessionStorage.clear();
        }
    },

    cookie: {
        set: function(key, value, expires, path, domain, secure) {
            if (value === null) value = '';
            if (typeof expires === 'number') {
                expires = new Date(+new Date() + 86400000 * expires);
            }
            document.cookie = key + '=' + escape(value) +
                ((expires) ? '; expires=' + expires.toUTCString() : '') +
                ((path) ? '; path=' + path : '; path=/') +
                ((domain) ? '; domain=' + domain : '') +
                ((secure) ? '; secure' : '');
        },
        get: function(key) {
            var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));
            return arr !== null ? unescape(arr[2]) : null;
        },
        remove: function(key) {
            if (this.get(key)) {
                this.set(key, '', -365);
            }
        }
    },

    base64: {
        encode: function(str) {
            return window.btoa(encodeURIComponent(escape(typeof str !== 'string' ? '' : str)));
        },
        decode: function(str) {
            return unescape(decodeURIComponent(window.atob(typeof str !== 'string' ? '' : str)));
        }
    }
}


Tool.scrollFix = function(elem) {
    var startTopScroll;
    elem.addEventListener('touchstart', function() {
        //startY = event.touches[0].pageY;
        startTopScroll = elem.scrollTop;
        //当滚动条在最顶部的时候
        if (startTopScroll <= 0)
            elem.scrollTop = 1;
        //当滚动条在最底部的时候
        if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
            elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }, false);
};

export default Tool
