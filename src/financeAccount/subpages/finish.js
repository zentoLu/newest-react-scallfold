import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

class Finish extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="indentityBox page-finance-account">
                <div className="container">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">开户</a>
                    </div>
                    <div className="steps">
                        <div className="step step1"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="企业理财" /></div>
                        <div className="step step2"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="企业理财" /></div>
                        <div className="step step3"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="企业理财" /></div>
                        <div className="step step4"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="企业理财" /></div>
                        <div className="line-box" >
                            <div className="line active"></div>
                            <div className="line active"></div>
                            <div className="line active"></div>
                        </div>
                        <div className="text">
                            <span className="active">确认身份</span>
                            <span className="active">设置管理</span>
                            <span className="active">补充信息</span>
                            <span className="active">提交审核</span>
                        </div>
                    </div>
                    <div className="material-commit notice tac">
                        <div className="main-notice">
                            <div className="icon-finish"></div>
                            <div className="main-notice-desc">企业资料已提交审核</div>
                        </div>
                        <div className="notice-detail-desc">您已完成账号注册与开户流程，系统将于1-2个工作日内完成审核，并将结果通过短信通知到
  管理员手机号码18012123434，审核通过后可登录签约产品。</div>
                    </div>
                    <div className="btn-box">
                        <div className="btn-back">返回理财首页</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect((state) => { return { account: state.account } })( Finish );
// export default  connect((state) => { return { Index: state.Index } }, undefined, undefined, {withRef: true})( Index );
