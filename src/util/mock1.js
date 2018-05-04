const Mock = require('mockjs');
//import Mock from 'mockjs'
Mock.mock('/front/financing.do?action=msgCode', {
    'status': 200,
    'msg': 'ok',
    'data': {
        'smsFlowNo': '123456789'
    }
})
