import React from 'react'
import {Link} from 'react-router-dom'
import {ajaxPost} from 'request'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Radio, Checkbox, Cascader, Modal} from 'antd'
import projectTool from '../../util/projectTool'
import {validator} from '../../globalComponents/form/valid.js'
import WrappedSmsForm from 'form/smsForm.js'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
const action = function(values) {
    return {
        type: 'ACCOUNT',
        values
    }
}

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCode() {
        //const mobile = this.props.sign || '13480704730';
        const mobile = '13480704730';
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile, type: '02'
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {msgCode: data}
            })
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            visible: true,
        });
    }

    hideModal(e) {
        //console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleOk() {
        let {account} = this.props;
        this.props.form.validateFields(['smsCode'], (err, values) => {
            if (!err) {
                //console.log(values);
                let data = Object.assign({}, account.values);
                //格式化数据
                data = this.formatData(data, account);

                ajaxPost('/front/financing.do?action=apply', data, function(d) {
                    location.hash = '#/finish'
                });
            }
        });
    }

    formatData(d, account) {
        let data = {}, list = [];
        //把法定代表人改为经办人
        if(account.states.isLegal) {
            data = {
                actorName: d.reprName,
                mobile: d.reprMobile,
                actorIdCode: d.reprIdCode,
                idFront: d.legalIdFront,
                idBack: d.legalIdBack
            }
        }
        data = Object.assign(data, d);
        //data.idType = Number(d.isMixedCtf) === 1 ? 'C' : 'B'; //B-营业执照号（非三证合一）C-统一社会信用代码（三证合一）
        data.idType = 'C';
        data.smsFlowNo = account.states.msgCode.data ? account.states.msgCode.data.smsFlowNo : '';
        data.legalIdFront = '';
        data.legalIdBack = '';
        data.idFront = '';
        data.idBack = '';
        data.busCert = '';
        data.reprIdType = '身份证';
        list.push({
            imgType: '1',
            img: d.legalIdFront
        }, {
            imgType: '2',
            img: d.legalIdBack
        }, {
            imgType: '3',
            img: d.idFront
        }, {
            imgType: '4',
            img: d.idBack
        }, {
            imgType: 'A',
            img: d.busCert
        });
        data.list = list;
        data.clientType = 0;

        return data;
    }

    render() {
        const { getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const decorator = this.props.form.getFieldDecorator;
        const getFieldDecorator = (name, option) => {
            option.validateTrigger = 'onSubmit';
            return decorator(name, option);
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const {account, dispatch, form} = this.props;
        const {values, states} = account;
        const CustomInput = (name, label, rules, placeholder) => {
            const error = isFieldTouched(name) && getFieldError(name);
            return (
                <FormItem {...formItemLayout} label={label}>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: account.values[name]
                    })(
                        <Input disabled placeholder={placeholder} />
                    )}
                </FormItem>
            )
        }
        const isMixedCtf = form.getFieldValue('isMixedCtf') || 1;
        console.log(states)
        return (
            <Form onSubmit={this.handleSubmit} className="account-form">
                {!states.isLegal && <div className="actor form-module">
                    <div className="subtitle">管理员资料</div>
                    { CustomInput('actorName', '管理员姓名', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的姓名!' }], '请输入真实姓名') }
                    { CustomInput('mobile', '手机号码', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' }], '请输入手机号码') }
                    { CustomInput('actorIdCode', '身份证号', [{ rule: 'idcard;required',required: true, message: '请输入正确的身份证号!' ,validator: validator }], '请输入身份证号') }
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >身份证上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="id-front fl img-loader-box">
                                    {account.values.idFront && <img src={account.values.idFront}  />}
                                </div>
                                <div className="id-back fr img-loader-box">
                                    {account.values.idBack && <img src={account.values.idBack}  />}
                                </div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {!states.isLegal && <div className="form-border-top"></div>}
                <div className="cust form-module">
                    <div className="subtitle">企业资料录入</div>
                    { CustomInput('clientName', '企业名称', [{ required: true, message: '请输入正确的企业名称!' }], '请按营业执照填写') }
                    {CustomInput('idCode', '统一社会信用代码', [{ required: true, message: '请输入正确的统一社会信用代码!' }], '请输入社会信用代码') }
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >企业资料上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="business-cret fl  img-loader-box">
                                    {account.values.busCert && <img src={account.values.busCert}  />}
                                </div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                    { CustomInput('bankAcc', '对公账号', [{ required: true, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    { CustomInput('bankAccName', '开户银行', [{ required: true, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    { CustomInput('officePhone', '办公电话', [{rule:'tel;required', validator: validator, required: true, message: '请输入正确的办公电话!' }], '请输入办公电话') }
                    <FormItem {...formItemLayout} label="通讯地址">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请输入正确的通讯地址!' }],
                            initialValue: values.address
                        })(
                            <Input disabled placeholder="请输入通讯地址" />
                        )}
                    </FormItem>

                </div>
                <div className="form-border-top"></div>
                <div className="legal form-module">
                    <div className="subtitle">法定代表人资料录入</div>
                    { CustomInput('reprName', '法定代表人姓名', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的姓名!' }], '请输入真实姓名') }
                    { CustomInput('reprMobile', '手机号码', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' }], '请输入手机号码') }
                    { CustomInput('reprIdCode', '身份证号', [{rule: 'required;idcard', required: true, validator: validator, message: '请输入正确的身份证号!' }], '请输入身份证号') }
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >身份证上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="id-front fl  img-loader-box">
                                    {account.values.legalIdFront && <img src={account.values.legalIdFront}  />}
                                </div>
                                <div className="id-back fr  img-loader-box">
                                    {account.values.legalIdBack && <img src={account.values.legalIdBack}  />}
                                </div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="btn-box clearfix">
                    <Link  className="btn-prev" to={states.isLegal ? 'addMaterial' : 'material'}>上一步</Link>
                    <Button htmlType="submit" className="btn-next">提交</Button>
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
            </Form>
        );
  }
}

const WrappedAccountForm = Form.create()(AccountForm);

class ConfirmMaterial extends React.Component {
    constructor(props) {
        super(props);
    }

    hideModal(e) {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    render() {
        console.log(this.props);
        return (
            <div className="indentityBox page-finance-account">
                <div className="container">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">开户</a>
                    </div>
                    <div className="steps">
                        <div className="step step1"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="完成" /></div>
                        <div className="step step2"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="完成" /></div>
                        <div className="step step3"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="完成" /></div>
                        <div className="step step4">4</div>
                        <div className="line-box" >
                            <div className="line active" ></div>
                            <div className="line active" ></div>
                            <div className="line" ></div>
                        </div>
                        <div className="text">
                            <span className="active">确认身份</span>
                            <span className="active">设置管理</span>
                            <span className="active">补充信息</span>
                            <span>提交审核</span>
                        </div>
                    </div>
                    <div className="form">
                        <div className="form-border-top"></div>
                        <div className="form-content">
                            <WrappedAccountForm {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  connect((state) => { return {
        account: state.account
    }})( SubPageWarpper({
        title: '我的理财',
        child: ConfirmMaterial
    }));
