import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {ajaxPost} from 'request';
import { message, Form, Input, Modal, Button, Checkbox } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
const FormItem = Form.Item;
class RedeemStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false , isAgree: false}
    }

    getCode() {
        //const mobile = this.props.Redeem || '13480704730';
        const mobile = '13480704730';
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile, type: '03'
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {msgCode: data}
            })
        });
    }

    handleConfirm() {
        if(this.state.isAgree) {
            this.setState({
              visible: true,
            });
        }else{
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
                const {Redeem} = this.props;
                ajaxPost('/front/financing.do?action=Redeem', {
                    prdCode: 'test',
                    smsCode: Redeem.values.smsCode,
                    smsFlowNo: Redeem.states.msgCode.data ? Redeem.states.msgCode.data.smsFlowNo : ''
                }, (data) => {
                    console.log(data);
                    this.props.dispatch({
                        type: 'STATE',
                        states: {msgCode: data}
                    })
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
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">赎回</a>
                    </div>
                    <Modal
                        title="短信验证"
                        visible={this.state.visible}
                        onOk={() => {this.handleOk()}}
                        onCancel={() => {this.hideModal()}}
                        width='400px'
                        maskClosable=""
                        footer={[
                            <Button key="back" className="btn-cancel" onClick={() => {this.hideModal()}}>取消</Button>,
                            <Button key="submit" className="btn-ok" onClick={() => {this.handleOk()}}>确认</Button>
                        ]}
                    >
                        <div className="pop-body">
                            <p>已向管理员手机号180****1234发送一条验证码，请输入</p>
                            <WrappedSmsForm ref="smsForm" getCode={() => {this.getCode()}} {...this.props} />
                        </div>
                    </Modal>
                    <div className="page-redeem">
                        <h3 className="redeem-title">赎回资金</h3>
                        <div className="redeem-info">
                            <div className="info-item">
                                <div className="item-label">赎至账户</div>
                                <div className="item-content">
                                    <p>金蝶互联网金融服务有限公司</p>
                                    <p>6227 0033 2414 0554 910</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-label">赎回金额</div>
                                <div className="item-content relative">
                                    <input className="redeem-input-amt" placeholder="最多可赎回500万元" />
                                    <a className="btn-redeem-all absolute">全部赎回</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-label">赎回方式</div>
                                <div className="item-content relative">
                                    <div className="redeem-method">快赎（T+0实时到账）</div>
                                    <a  className="redeem-method-tip icon-info absolute"></a>
                                </div>
                            </div>
                        </div>
                        <div className="btn-box">
                            <div className="btn btn-confirm">确认</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect((state) => { return { Redeem: state.Redeem } })(
SubPageWarpper({
    title: '我的理财',
    child: RedeemStart
}));

