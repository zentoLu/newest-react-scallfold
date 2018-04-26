import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajaxPost } from 'request';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
class RedeemSuccess extends React.Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        ajaxPost('/front/financing.do?action=getCustInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {
                    custInfo: data
                }
            })
        });
        ajaxPost('/front/financing.do?action=queryFundInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {
                    fundInfo: data
                }
            })
        });
    }

    render() {
        console.log(this.props);
        const { states } = this.props.redeem;
        const { params } = this.props.match;
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">赎回</a>
                    </div>
                    <div className="page-redeem tac">
                        <div className="finish">
                            <div className="icon-finish"></div>
                            <div className="finish-text">赎回申请已提交！</div>
                        </div>
                        <div className="notice-text">
                            <p>发起申请  2018-03-23  11:44:50</p>
                            <p>预计今日<span className="blue">24:00</span>前到账</p>
                        </div>
                        <div className="redeem-info">
                            <div className="redeem-title">赎回信息</div>
                            <div className="redeem-info-table">
                                {states.custInfo && states.fundInfo && <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>赎回账号</td>
                                            <td>{states.custInfo.data.clientName}</td>
                                        </tr>
                                        <tr>
                                            <td>赎回金额</td>
                                            <td>{params.amt}万元</td>
                                        </tr>
                                    </tbody>
                                </table>}
                            </div>
                        </div>
                        <div className="btn-box">
                            <Link to="/myFinancing" className="btn btn-my-financing">查看我的理财</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { redeem: state.redeem } })(
    SubPageWarpper({
        title: '我的理财',
        child: RedeemSuccess
    }));
