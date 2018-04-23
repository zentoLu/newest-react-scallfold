import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import {ajaxPost} from 'request';
class SignSuccess extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        ajaxPost('/front/financing.do?action=getCustInfo', {
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {custInfo: data}
            })
        });
        ajaxPost('/front/financing.do?action=queryFundInfo', {
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {fundInfo: data}
            })
        });
    }

    render() {
        const {sign} = this.props;
        const {states} = sign;
        return (
            <div className="indentityBox">
                <div className="container finance-sign-success">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">签约</a>
                    </div>
                    <div className="page-sign">
                        <div className="finish">
                            <div className="icon-finish"></div>
                            <div className="finish-text">签约成功！</div>
                        </div>
                        <p className="notice-text">请尽快通过银行柜台、在线网银等方式将资金转入以下账户中：</p>
                        {states.custInfo && <div className="account">
                            <p>对公账户：{states.custInfo.data.clientName}</p>
                            <p>银行账号：{states.custInfo.data.bankNo}</p>
                        </div>}
                        {states.custInfo && states.fundInfo && <div className="sign-info">
                            <div className="sign-title">签约信息</div>
                            <div className="sign-info-table">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>签约账号</td>
                                            <td>{states.custInfo.data.clientName}</td>
                                        </tr>
                                        <tr>
                                            <td>基金公司名称</td>
                                            <td>{states.fundInfo.data.result[0].prdName}</td>
                                        </tr>
                                        <tr>
                                            <td>基金名称代码</td>
                                            <td>{states.fundInfo.data.result[0].prdName}/{states.fundInfo.data.result[0].prdCode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                        <div className="btn-box">
                            <div className="btn-my-loan">查看我的理财</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect((state) => { return { sign: state.sign } })(
SubPageWarpper({
    title: '我的理财',
    child: SignSuccess
}));

