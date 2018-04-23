const Mock = require('mockjs');
//import Mock from 'mockjs'
Mock.mock('/front/financing.do?action=msgCode', {
    'status': 200,
    'msg': 'ok',
    'data': {
        'smsFlowNo': '123456789'
    }
})
// 输出结果
//console.log(JSON.stringify(data, null, 4))

Mock.mock('/front/financing.do?action=apply', {
    'status': 200,
    'msg': 'ok',
    'data': {}
})


Mock.mock('/front/financing.do?action=sign', {
    'status': 200,
    'msg': 'ok',
    'data': {}
})

Mock.mock('/front/financing.do?action=queryFundPortion', {
    'status': 200,
    'msg': 'OK',
    'data': {
        'prdCode': 'test',
        'prdName': '测试基金',
        'currType': '156',
        'vol': '2',
        'useVol': '1',
        'frozenVol': '1',
        'profit': '12.12'
    }

})

Mock.mock('/front/financing.do?action=queryFundInfo', {
    "status": 200,
    "msg": "OK",
    "data": {
        "currentPage": "1",
        "pageSize": "10",
        "totalNum": "19",
        "totalPage": "2",
        "result":[{
            "issDate": "20170202",
            "prdCode": "test",
            "prdName": "测试基金",
            "currType": "156",
            "income": "11.11",
                "yield": "11.11"
            }]
    }


})

Mock.mock('/front/financing.do?action=queryAccountInfo', {
    'status': 200,
    'msg': 'OK',
    'data': {
        'clientNo': 'as2d1a23d3a',
        'clientName': '测试客户',
        'fundAcc': '56432135',
        'idType': 'xxx',
        'idCode': 'xxxxxxxxx',
        'mobile': '18811112222',
        'openDate': '20170203',
        'status': '0',
        'statusName': '正常',
        'currType': 'RMB',
        'balance': '9999.99',
        'useBala': '8888.88',
        'reprName': 'xxx',
        'reprIdType': 'xxxx',
        'reprIdCode': '545666196602112369',
        'actorName': 'xxx',
        'actorIdType': 'xx',
        'actorIdCode': '545666196602116369',
        'summary': 'zxcsaas',
    }

})

Mock.mock('/front/financing.do?action=queryTransInfo', {
    'status': 200,
    'msg': 'OK',
    'data': {
        'startDate': '20180202',
        'endDate': '20180303',
        'currentPage': '1',
        'pageSize': '10',
        'totalNum': '19',
        'totalPage': '2',
        'result': [{
            'clientName': '测试客户',
            'fundAcc': 'xxx',
            'accName': 'xxx',
            'businCode': '104',
            'transDate': '20180209',
            'transTime': '083045',
            'amt': '999.66',
            'chgFlag': '0',
            'postBala': '2222.22',
            'currType': 'RMB',
            'otherAcc': 'xxx',
            'otherAccName': 'xxxxxx',
            'summary': '基金赎回',}
        ]
    }

})

Mock.mock('/front/financing.do?action=entrustQuery', {
    'status': 200,
    'msg': 'OK',
    'data': {
        'currentPage': '1',
        'pageSize': '10',
        'totalNum': '19',
        'totalPage': '2',
        'result': [{
            'clientNo': 'xxxxxxxxx',
            'transDate': '20170608',
            'transTime': '012345',
            'serialNo': 'xxxxxx',
            'transCode': 'xxx',
            'transName': 'xxxx',
            'prdCode': 'xxx',
            'prdName': 'xxxx',
            'vol': '11.23',
            'currType': 'RMB',
            'amt': '11.11',
            'status': 'xx',
            'statusName': 'xxx',
            'summary': 'xxx',
            'errCode': 'xxx',
            'errMsg': 'xxx',
            'cancleFlag': 'xxx'}
        ]
    }

})

Mock.mock('/front/financing.do?action=dealHistoryQuery', {
    'status': 200,
    'msg': 'OK',
    'data': {
        'currentPage': '1',
        'pageSize': '10',
        'totalNum': '19',
        'totalPage': '2',
        'result': [{
            'clientNo': 'xxx',
            'businCode': 'xxx',
            'businName': 'xxx',
            'cfmNo': 'xxx',
            'cfmDate': '20170101',
            'clearDate': '20170202',
            'prdCode': 'xxx',
            'prdName': 'xxx基金',
            'cfmAmt': '88.88',
            'cfmVol': '13.3',
            'currType': 'RMB',
            'summary': 'xxx'}
        ]
    }

})

Mock.mock('/front/financing.do?action=surrender', {
    'status': 200,
    'msg': 'ok',
    'data': {}
})
Mock.mock('/front/financing.do?action=commonRedeem', {
    'status': 200,
    'msg': 'ok',
    'data': {}
})
Mock.mock('/front/financing.do?action=quickRedeem', {
    'status': 200,
    'msg': 'ok',
    'data': {}
})
Mock.mock('/front/financing.do?action=revoke', {
            'status': 200,
            'msg': 'OK',
            'data': {
                'fundAcc': 'xxx',
                'clientName': 'xxx',
                'balance': '546546.65',
                'summary': 'xxxx'

            }
        })

Mock.mock('/front/financing.do?action=getIncome', {
            'status': 200,
            'msg': 'OK',
            'data': {
                'yesterdayIncome': '924.99',
                'totalIncome': '991.31'
            }

        })

Mock.mock('/front/financing.do?action=getCustInfo', {
    "status": 200,
  "msg": "OK",
  "data": {
    "bankNo": "xx",
    "clientName": "测试客户",
    "fundAcc": "11",
    "phone": "18888888888"
   }
})
