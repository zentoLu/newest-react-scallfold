import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajaxPost } from 'request';
import { message, Form, Input, Modal, Button, Checkbox } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
import Tool from 'tool'
import { prdCode } from 'package'
const FormItem = Form.Item;
class SurrenderStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    componentDidMount() {
        ajaxPost('/front/financing.do?action=getCustInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { custInfo: data }
            })
        });

        ajaxPost('/front/financing.do?action=queryFundInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { fundInfo: data }
            })
        });

        ajaxPost('/front/financing.do?action=getIncome', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { income: data }
            })
        });
    }

    getCode() {
        const mobile = this.props.surrender.states.custInfo.data.phone;
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile,
            type: '04'
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { msgCode: data }
            })
        });
    }

    handleConfirm() {
        this.setState({
            visible: true,
        });
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
                const { surrender } = this.props;
                ajaxPost('/front/financing.do?action=surrender', {
                    prdCode: surrender.states.fundInfo.data.result[0].prdCode,
                    smsCode: values.smsCode,
                    smsFlowNo: surrender.states.msgCode.data ? surrender.states.msgCode.data.smsFlowNo : ''
                }, (data) => {
                    console.log(data);
                    location.hash = '#/surrender/success';
                });
            }
        });
    }

    render() {
        console.log(this.props);
        const { surrender } = this.props;
        const { states } = surrender;
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">解约基金</a>
                    </div>
                    <Modal
                        title="短信验证"
                        visible={this.state.visible}
                        onOk={() => {this.handleOk()}}
                        onCancel={() => {this.hideModal()}}
                        width='428px'
                        maskClosable=""
                        footer={[
                            <Button key="back" className="btn-cancel" onClick={() => {this.hideModal()}}>再考虑一下</Button>,
                            <Button key="submit" className="btn-ok" onClick={() => {this.handleOk()}}>确认解约</Button>
                        ]}
                    >
                        <div className="pop-body">
                            <p>已向管理员手机号{states.custInfo ? Tool.formatName(states.custInfo.data.phone) : '加载中...'}发送一条验证码，请输入</p>
                            <WrappedSmsForm ref="smsForm" getCode={() => {this.getCode()}} {...this.props} />
                        </div>
                    </Modal>
                    <div className="page-surrender">
                        <h3 className="surrender-title">解约信息</h3>
                        <div className="notice">
                            <span className="icon-info"></span>
                            <span>基金解约后将无法继续享受理财收益，请谨慎操作</span>
                        </div>
                        {states.custInfo && states.fundInfo && states.income && <div className="surrender-info">
                            <div className="info-item">
                                <div className="item-label">基金名称</div>
                                <div className="item-content">
                                    <span>{states.fundInfo.data.result[0].prdName}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-label">签约账号</div>
                                <div className="item-content">
                                    <span>{Tool.formatBankNo(states.custInfo.data.bankNo)}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-label">累计收益</div>
                                <div className="item-content">
                                    <span className="blue">{states.income.data.totalIncome}元</span>
                                </div>
                            </div>
                        </div>}
                        <div className="btn-box clearfix">
                            <div className="btn-confirm fl" onClick={() => {this.handleConfirm()}}>解约</div>
                            <div className="btn btn-consider fr">再考虑一下</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { surrender: state.surrender } })(
    SubPageWarpper({
        title: '我的理财',
        child: SurrenderStart
    }));
