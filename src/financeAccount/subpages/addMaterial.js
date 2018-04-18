import React from 'react'
import {Link} from 'react-router-dom'
import {ajaxPost} from 'request'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Radio, Checkbox, Cascader} from 'antd'
import projectTool from '../../util/projectTool'
import {validator} from '../../globalComponents/form/valid.js'

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
                console.log('Received values of form: ', JSON.stringify(values));
                this.props.dispatch(action(values));
                let {account} = this.props;

                let data = Object.assign({}, account.values, values)
                //格式化数据
                data = this.formatData(data, account);
                //校验图片


                ajaxPost('/front/financing.do?action=apply', data, function(d) {
                    console.log(d);
                });
            }
        });
    }

    formatData(d, account) {
        let data = Object.assign({}, d), list = [];
        data.idType = Number(d.isMixedCtf) === 1 ? 'C' : 'B'; //B-营业执照号（非三证合一）C-统一社会信用代码（三证合一）
        data.smsFlowNo = account.states.msgCode.data ? account.states.msgCode.data.smsFlowNo : '';
        data.legalIdFront = '';
        data.legalIdBack = '';
        data.idFront = '';
        data.idBack = '';
        data.busCert = '';
        data.orgCert = '';
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
        }, {
            imgType: 'C',
            img: d.orgCret
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
        const {values} = account;
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
        const isMixedCtf = form.getFieldValue('isMixedCtf') || 1;

        return (
            <Form onSubmit={this.handleSubmit} className="account-form">
                <div className="cust">
                    <div className="subtitle">企业资料录入</div>
                    { CustomInput('custName', '企业名称', [{ required: true, message: '请输入正确的企业名称!' }], '请按营业执照填写') }
                    <FormItem {...formItemLayout} label="是否三证合一">
                        {getFieldDecorator('isMixedCtf', {
                            rules: [{ required: true, message: '请选择!' }],
                            initialValue: 1
                        })(
                            <RadioGroup>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    { isMixedCtf !== 0 &&  CustomInput('idCode', '统一社会信用代码', [{ required: true, message: '请输入正确的统一社会信用代码!' }], '请输入社会信用代码') }
                    { isMixedCtf === 0 &&  CustomInput('idCode', '营业执照注册号', [{ required: true, message: '请输入正确的注册号!' }], '请按营业执照填写') }
                    { isMixedCtf === 0 &&  CustomInput('organCodeNum', '组织机构代码证', [{ rule: 'orgcode',required: true, validator: validator, message: '请输入正确的组织机构代码!' }], '请按营业执照填写') }
                    { isMixedCtf === 0 &&  CustomInput('taxCode', '税务登记证', [{ required: true, message: '请输入正确的税务登记证!' }], '请按营业执照填写') }
                    { CustomInput('bankAcc', '对公账号', [{ required: true, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    { CustomInput('bankAccName', '开户银行', [{ required: true, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    { CustomInput('officePhone', '办公电话', [{rule:'tel;required', validator: validator, required: true, message: '请输入正确的办公电话!' }], '请输入办公电话') }
                    <FormItem {...formItemLayout} label="通讯地址">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请输入正确的通讯地址!' }],
                            initialValue: values.address
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
                                <div className="business-cret fl  img-loader-box">
                                    <input type="file" id="busCert"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.busCert && <img src={account.values.busCert}  />}
                                </div>
                                <div className="org-cert fr  img-loader-box">
                                    <input type="file" id="orgCert"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.orgCert && <img src={account.values.orgCert}  />}
                                </div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-border-top"></div>
                <div className="legal">
                    <div className="subtitle">法人资料录入</div>
                    { CustomInput('reprName', '法人姓名', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的姓名!' }], '请输入真实姓名') }
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
                                    <input type="file" id="legalIdFront"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.legalIdFront && <img src={account.values.legalIdFront}  />}
                                </div>
                                <div className="id-back fr  img-loader-box">
                                    <input type="file" id="legalIdBack"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.legalIdBack && <img src={account.values.legalIdBack}  />}
                                </div>
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
                    <Link  className="btn-prev" to="material">上一步</Link>
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

export default  connect((state) => { return { account: state.account } })( AddMaterial );

