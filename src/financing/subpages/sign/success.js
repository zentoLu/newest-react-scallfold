import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class SignSuccess extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                        <div className="account">
                            <p>对公账户：金蝶互联网金融服务有限公司</p>
                            <p>银行账号：6227 0033 2414 0554 910</p>
                        </div>
                        <div className="sign-info">
                            <div className="sign-title">签约信息</div>
                            <div className="sign-info-table">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>签约账号</td>
                                            <td>金蝶互联网金融服务有限公司</td>
                                        </tr>
                                        <tr>
                                            <td>基金公司名称</td>
                                            <td>民生加银现金增利货币市场基金</td>
                                        </tr>
                                        <tr>
                                            <td>基金名称代码</td>
                                            <td>民生加银现金增利货币市场基金/001240</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="btn-box">
                            <div className="btn-my-loan">查看我的理财</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  SignSuccess

