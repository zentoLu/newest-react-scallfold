import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

class SignStart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">签约</a>
                    </div>
                    <div className="page-sign">
                        <div className="sign-info">
                            <div className="sign-info-title">签约信息</div>
                            <div className="sign-info-table">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>企业名称</td>
                                            <td>金蝶互联网金融服务有限公司</td>
                                        </tr>
                                        <tr>
                                            <td>理财注册号</td>
                                            <td>11231</td>
                                        </tr>
                                        <tr>
                                            <td>基金名称</td>
                                            <td>民生加银现金增利货币市场基金</td>
                                        </tr>
                                        <tr>
                                            <td>近七日年化</td>
                                            <td>4.2330%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="protocol tac">
                            <span className="agree-box">
                                <span className="icon-check"></span>
                            </span>
                            <span className="protocol-text">
                                我已阅读并同意遵守<a href="#">《金蝶互联网金融服务协议》</a>
                            </span>
                        </div>
                        <div className="btn-box">
                            <div className="btn-confirm">确认</div>
                        </div>
                        <div className="sign-footer">
                            <div className="footer-border-line"></div>
                            <div className="sign-steps">
                                <div className="sign-step1">签约申购流程 :</div>
                                <div className="sign-step2">1. 签约申购协议</div>
                                <div className="icon-step-arrow"></div>
                                <div className="sign-step3">2. 手动转入资金</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect((state) => { return { sign: state.sign } })( SignStart );
// export default  connect((state) => { return { Index: state.Index } }, undefined, undefined, {withRef: true})( Index );

