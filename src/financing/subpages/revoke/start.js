import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajaxPost } from 'request';
import { message, Form, Input, Modal, Button, Checkbox, Popover, Radio } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
import Tool from 'tool';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class RevokeStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            revokeMethod: 1,
            revokeAmt: ''
        }
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
        //基金持有份额接口
        ajaxPost('/front/financing.do?action=queryFundPortion', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {
                    fundPortion: data
                }
            })
        });
    }

    getCode() {
        const mobile = this.props.revoke.states.custInfo.data.phone;
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile,
            type: '05'
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {
                    msgCode: data
                }
            })
        });
    }

    handleInput(e) {
        this.setState({
            revokeAmt: e.target.value
        });
    }

    revokeAll() {
        this.setState({
            revokeAmt: this.calMaxAmt()
        });
    }

    calMaxAmt() {
        let maxAmt = this.props.revoke.states.fundPortion.data.onwayAmt;
        return maxAmt;
    }

    handleConfirm() {
        if (!this.state.revokeAmt) {
            message.warning('请输入撤回金额！');
            this.refs.inputAmt.focus();
        } else if (isNaN(this.state.revokeAmt)) {
            message.warning('请输入正确的撤回金额！');
            this.refs.inputAmt.focus();
        } else if (this.state.revokeAmt > this.calMaxAmt()) {
            message.warning('撤回金额超过最大额度！');
            this.refs.inputAmt.focus();
        } else {
            this.setState({
                visible: true,
            });
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
        const { revokeMethod, revokeAmt } = this.state;
        this.refs.smsForm.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values));
                const { revoke } = this.props;
                ajaxPost('/front/financing.do?action=revoke', {
                    prdCode: revoke.states.fundInfo.data.result[0].prdCode,
                    amt: revokeAmt,
                    bankAcc: revoke.states.custInfo.data.bankNo,
                    smsCode: revoke.values.smsCode,
                    smsFlowNo: revoke.states.msgCode.data ? revoke.states.msgCode.data.smsFlowNo : ''
                }, (data) => {
                    console.log(data);
                    location.hash = '#/revoke/success/' + revokeAmt;
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

    methodChange(e) {
        console.log(e.target.value);
        this.setState({
            revokeMethod: e.target.value
        });
    }

    render() {
        console.log(this.props);
        const { revoke } = this.props;
        const { states } = revoke;
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">出金</a>
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
                    <div className="page-revoke">
                        <h3 className="revoke-title">撤回资金</h3>
                        <div className="revoke-info">
                            {states.custInfo && <div className="info-item">
                                <div className="item-label">撤回账户</div>
                                <div className="item-content">
                                    <p>{states.custInfo.data.clientName}</p>
                                    <p>{Tool.formatBankNo(states.custInfo.data.bankNo)}</p>
                                </div>
                            </div>}
                            <div className="info-item">
                                <div className="item-label">撤回金额</div>
                                <div className="item-content relative">
                                    {states.fundPortion && <input onChange={(e) => {this.handleInput(e)}} ref="inputAmt" value={this.state.revokeAmt} className="revoke-input-amt" placeholder={'最多可撤回' + this.calMaxAmt() + '万元'} />}
                                    <a className="btn-revoke-all absolute" onClick={()=>{this.revokeAll()}}>全部撤回</a>
                                </div>
                            </div>
                        </div>
                        <div className="btn-box">
                            <div className="btn btn-confirm" onClick={()=>{this.handleConfirm()}}>确认</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { revoke: state.revoke } })(
    SubPageWarpper({
        title: '我的理财',
        child: RevokeStart
    }));
