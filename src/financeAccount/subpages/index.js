import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {ajaxPost} from 'request'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'

class Index extends React.Component {
    constructor(props) {
        super(props)
        //this.isLegal = this.isLegal.bind(this)
        ajaxPost('/user/login', {
            name: '13480704730', password: '123456zxc', type: 'GW'
        }, function(data) {
            console.log(data);
        });

        ajaxPost('/cust/myLoan.do?action=getMyLoan', {}, function(data) {
            console.log(data);
        });
    }

    isLegal(isLegal) {
        //console.log(this.props.account.states.isLegal)
        this.props.dispatch({
            type: 'STATE',
            states: {isLegal: isLegal}
        });
    }

    handleNext() {
        const isLegal = this.props.account.states.isLegal
        if(isLegal) {
            location.hash = '#/addMaterial'
        }else{
            location.hash = '#/material'
        }
    }

    render() {
        const isLegal = this.props.account.states.isLegal
        console.log(isLegal);
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
                        <div className="step step2">2</div>
                        <div className="step step3">3</div>
                        <div className="step step4">4</div>
                        <div className="line-box" >
                            <div className="line" ></div>
                            <div className="line" ></div>
                            <div className="line" ></div>
                        </div>
                        <div className="text">
                            <span className="active">确认身份</span>
                            <span>设置管理</span>
                            <span>补充信息</span>
                            <span>提交审核</span>
                        </div>
                    </div>
                    <p>民生银行开户需要将您设置为管理员，请问您是否为公司法定代表人？</p>
                    <div className="chooseBox clearfix">
                        <div className={'choose choose1' + (isLegal?' active':'')} onClick={() => {this.isLegal(true)}}>我是法定代表人</div>
                        <div className={'choose choose2' + (isLegal?'':' active')} onClick={() => {this.isLegal(false)}}>我不是法定代表人</div>
                    </div>
                    <div className="nextStep" onClick={() => {this.handleNext()}}>下一步</div>
                </div>
            </div>
        );
    }
}


export default  connect((state) => { return {
        account: state.account
    }})( SubPageWarpper({
        title: '我的理财',
        child: Index
    }));
