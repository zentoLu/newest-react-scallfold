import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajaxPromise } from 'request';
import { message, Form, Input, Modal, Button, Checkbox } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
import Tool from 'tool'
const FormItem = Form.Item;

/*function runAsync1() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 10 * 1000);
    });
    return p;
}*/

class SignStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, isAgree: false };
    }

    getCode() {
        const mobile = this.props.sign.custInfo.data.phone;
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile,
            type: '03'
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { msgCode: data }
            })
        });
    }

    handleConfirm() {
        if (this.state.isAgree) {
            this.setState({
                visible: true,
            });
        } else {
            console.log(this.refs);
            this.refs.checkBox.focus();
            message.warning('请阅读并同意协议！');
        }

    }

    hideModal(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleOk(e) {
        console.log(this.refs);
        this.refs.smsForm.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values));
                const { sign } = this.props;
                ajaxPost('/front/financing.do?action=sign', {
                    prdCode: sign.fundInfo.data.result[0].prdCode,
                    smsCode: values.smsCode,
                    smsFlowNo: sign.states.msgCode.data ? sign.states.msgCode.data.smsFlowNo : ''
                }, (data) => {
                    console.log(data);
                    location.hash = '#/sign/success'
                });
            }
        });
    }

    isAgree(e) {
        console.log(`checked = ${e.target.checked}`);
        this.setState({
            isAgree: e.target.checked
        });
    }

    render() {
        console.log(this.props);
        const { sign } = this.props;
        const { states } = sign;
        const { initDatas } = states;
        const custInfo = initDatas[0],
            fundInfo = initDatas[1];

        console.log(states);
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">签约</a>
                    </div>
                    <Modal
                        title="短信验证"
                        visible={this.state.visible}
                        onOk={() => {this.handleOk()}}
                        onCancel={() => {this.hideModal()}}
                        width='428px'
                        maskClosable=""
                        footer={[
                            <Button key="back" className="btn-cancel" onClick={() => {this.hideModal()}}>取消</Button>,
                            <Button key="submit" className="btn-ok" onClick={() => {this.handleOk()}}>确认</Button>
                        ]}
                    >
                        <div className="pop-body">
                            <p>已向管理员手机号{Tool.formatName(custInfo.data.phone)}发送一条验证码，请输入</p>
                            <WrappedSmsForm ref="smsForm" getCode={() => {this.getCode()}} {...this.props} />
                        </div>
                    </Modal>
                    <div className="page-sign">
                        <div className="sign-info">
                            <div className="sign-info-title">签约信息</div>
                            <div className="sign-info-table">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>企业名称</td>
                                            <td>{custInfo.data.clientName}</td>
                                        </tr>
                                        <tr>
                                            <td>理财注册号</td>
                                            <td>{custInfo.data.fundAcc}</td>
                                        </tr>
                                        <tr>
                                            <td>基金名称</td>
                                            <td>{fundInfo.data.result[0].prdName}</td>
                                        </tr>
                                        <tr>
                                            <td>近七日年化</td>
                                            <td>{fundInfo.data.result[0].yield}</td>
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
                                <Checkbox ref="checkBox" defaultChecked={this.state.isAgree} onChange={(e) => {this.isAgree(e)}}>我已阅读并同意遵守<a href="#">《金蝶互联网金融服务协议》</a></Checkbox>
                            </span>
                        </div>
                        <div className="btn-box">
                            <a  onClick={() => {this.handleConfirm()}} className="btn-confirm" id="#msg">确认</a>
                        </div>
                        <div className="sign-footer">
                            <div className="footer-border-line"></div>
                            <div className="sign-steps">
                                <div className="sign-step1">签约申购流程 :</div>
                                <div className="sign-step2">1. 签约申购协议</div>
                                <div className="icon-step-arrow">→</div>
                                <div className="sign-step3">2. 手动转入资金</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { sign: state.sign } })(
    SubPageWarpper({
        /*beforeLoad: [
            ajaxPromise('/front/financing.do?action=getCustInfo', {}, () => {}),
            ajaxPromise('/front/financing.do?action=queryFundInfo', {}, () => {}),
            runAsync1()
        ],*/
        beforeLoad: [
            ajaxPromise('/front/financing.do?action=getCustInfo', {}, () => {}),
            ajaxPromise('/front/financing.do?action=queryFundInfo', {}, () => {})
        ],
        title: '我的理财',
        child: SignStart
    }));
