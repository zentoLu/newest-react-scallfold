import React from 'react'
import {Link} from 'react-router-dom'
import {ajaxPost} from 'request'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Radio, Checkbox} from 'antd';
import projectTool from '../../util/projectTool'

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.dispatch(action(values));
            }
        });
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

        const account = this.props.account;

        const CustomInput = (name, label, rules, placeholder) => {
            const error = isFieldTouched(name) && getFieldError(name);
            return (
                <FormItem {...formItemLayout} label={label}>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: account.values[name]
                    })(
                        <Input placeholder={placeholder} />
                    )}
                </FormItem>
            )
        }


        return (
            <Form onSubmit={this.handleSubmit} className="account-form">
                <div className="cust">
                    <div className="subtitle">企业资料录入</div>
                    { CustomInput('custName', '企业名称', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的企业名称!' }], '请按营业执照填写') }
                    <FormItem {...formItemLayout} label="是否三证合一">
                        {getFieldDecorator('idType', {
                            rules: [{ required: true, message: '请选择!' }],
                            initialValue: 1
                        })(
                            <RadioGroup>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    { CustomInput('idCode', '营业执照注册号', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的注册号!' }], '请按营业执照填写') }
                    { CustomInput('organCodeNum', '组织机构代码证', [{ required: true, validator: function(rule,value,callback) { callback()}, message: '请输入正确的组织机构代码!' }], '请按营业执照填写') }
                    { CustomInput('bankAcc', '对公账号', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    { CustomInput('bankAccName', '开户银行', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    { CustomInput('bankAccName', '办公电话', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的办公电话!' }], '请输入办公电话') }
                    <FormItem {...formItemLayout} label="通讯地址">
                        {getFieldDecorator('smsCode', {
                            rules: [{ required: true, message: '请输入正确的通讯地址!' }],
                        })(
                            <Input  placeholder="请输入通讯地址" />
                        )}
                    </FormItem>
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >企业资料上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="business-cret fl"></div>
                                <div className="org-cert fr"></div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-border-top"></div>
                <div className="legal">
                    <div className="subtitle">法人资料录入</div>
                    { CustomInput('actorName', '法人姓名', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的姓名!' }], '请输入真实姓名') }
                    { CustomInput('mobile', '手机号码', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' }], '请输入手机号码') }
                    { CustomInput('actorIdCode', '身份证号', [{ required: true, validator: function(rule,value,callback) { callback()}, message: '请输入正确的身份证号!' }], '请输入身份证号') }
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >身份证上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="id-front fl"></div>
                                <div className="id-back fr"></div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                    <FormItem  className="protocol-item">
                        {getFieldDecorator('smsCode', {
                            rules: [{ required: true, message: '请阅读并同意协议!' }],
                        })(
                            <Checkbox>我已阅读并同意遵守<a href="#">《金蝶互联网金融服务协议》</a></Checkbox>
                        )}
                    </FormItem>
                </div>
                <div className="btn-box clearfix">
                    <Button className="btn-prev">上一步</Button>
                    <Button htmlType="submit" className="btn-next">下一步</Button>
                </div>
            </Form>
        );
  }
}

const WrappedAccountForm = Form.create()(AccountForm);

class AddMaterial extends React.Component {
    constructor(props) {
        super(props)
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

//connect((state) => { return { account: state.account } })(WrappedAccountForm);

export default  connect((state) => { return { account: state.account } })( AddMaterial );
//export default AddMaterial
// export default  connect((state) => { return { Index: state.Index } }, undefined, undefined, {withRef: true})( Index );
