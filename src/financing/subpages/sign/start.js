import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {ajaxPost} from 'request'
import { Form, Input, Modal, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
class SmsForm extends React.Component {

    getCode() {
        //const mobile = this.props.sign || '13480704730';
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="sms-form">
                <FormItem>
                    {getFieldDecorator('smsCode', {
                        rules: [{ required: true, message: '请输入短信验证码!' }],
                    })(
                        <Input  placeholder="请输入短信验证码" />
                    )}
                    <a className="btn-getcode" onClick={() => {this.getCode()}}>发送验证码</a>
                </FormItem>
            </Form>
        )
    }
}

const WrappedSmsForm = Form.create({
    onValuesChange(props, value) {
        console.log(props,value);
        props.dispatch({
            type: 'SIGN',
            values: {smsCode: value.smsCode}
        });
    }
})(SmsForm);

class SignStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
        ajaxPost('/user/login', {
            name: '18948174517', password: '123456zxc', type: 'GW'
        }, function(data) {
            console.log(data);
        });
    }

    hideModal(e) {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    showModal() {
      this.setState({
        visible: true,
      });
    }

    handleOk(e) {
      console.log(e);
      /*this.setState({
        visible: false,
      });*/
      const {sign} = this.props;
      ajaxPost('/front/financing.do?action=sign', {
          prdCode: 'test', smsCode: sign.values.smsCode, smsFlowNo: sign.states.msgCode.data.smsFlowNo
      }, (data) => {
          console.log(data);
          this.props.dispatch({
              type: 'STATE',
              states: {msgCode: data}
          })
      });
    }

    handleCancel(e) {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    handleConfirm() {
        console.log(1);
        this.setState({
          visible: true,
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
                        <a href="javascript:;">签约</a>
                    </div>
                    <Modal
                      title="短信验证"
                      visible={this.state.visible}
                      onOk={() => {this.handleOk()}}
                      onCancel={() => {this.hideModal()}}
                      okText="确认"
                      cancelText="取消"
                      maskClosable=""
                    >
                        <div className="pop-body">
                            <p>已向管理员手机号180****1234发送一条验证码，请输入</p>
                            <WrappedSmsForm {...this.props} />
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
                                <Checkbox>我已阅读并同意遵守<a href="#">《金蝶互联网金融服务协议》</a></Checkbox>
                            </span>
                        </div>
                        <div className="btn-box">
                            <a  onClick={() => {this.handleConfirm()}} className="btn-confirm">确认</a>
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

