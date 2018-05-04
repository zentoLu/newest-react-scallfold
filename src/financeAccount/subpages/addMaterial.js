import React from 'react'
import { Link } from 'react-router-dom'
import { ajaxPost } from 'request'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Radio, Checkbox, Cascader, Select } from 'antd'
import projectTool from '../../util/projectTool'
import { validator } from '../../globalComponents/form/valid.js'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
const Option = Select.Option;
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
        this.addressValidator = this.addressValidator.bind(this);
        this.bankCityValidator = this.bankCityValidator.bind(this);
    }

    componentDidMount() {
        ajaxPost('/front/index.do?action=findProvice', {}, (data) => {
            console.log(data);
            let options = [];
            data.data.list.map((it) => {
                options.push({
                    value: it.code,
                    label: it.name,
                    isLeaf: false
                });
            });
            this.props.dispatch({
                type: 'STATE',
                states: {
                    addressOptions: options
                }
            })
        });
        //民生获取省
        ajaxPost('/front/financing.do?action=getProvinceList', {}, (data) => {
            console.log(data);
            let options = [];
            data.data.data.map((it) => {
                options.push({
                    value: it.provinceCode,
                    label: it.provinceName,
                    type: it.provinceType,
                    isLeaf: false
                });
            });

            this.props.dispatch({
                type: 'STATE',
                states: {
                    bankCityOptions: options
                }
            })
        });
        //民生获取银行列表
        ajaxPost('/front/financing.do?action=getBankList', {}, (data) => {
            console.log(data);
            let options = [];
            data.data.data.map((it) => {
                options.push({
                    value: it.bankCode,
                    label: it.bankName
                });
            });
            this.props.dispatch({
                type: 'STATE',
                states: {
                    bankOptions: options
                }
            })
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values));
                this.props.dispatch(action(values));
                //校验图片必填


                location.hash = '#/confirmMaterial';
            }
        });
    }

    bankCityValidator(rule, value, callback) {
        const bankCitySelect = this.props.account.values.bankCitySelect;
        if (!bankCitySelect || bankCitySelect.length === 0) {
            callback('请选择省');
        } else if (bankCitySelect[0].children && bankCitySelect[0].children.length > 0) {
            if (!bankCitySelect[1]) {
                callback('请选择市');
            } else {
                callback();
            }

        } else {
            callback();
        }

    }

    addressValidator(rule, value, callback) {
        const addressPrefixSelect = this.props.account.values.addressPrefixSelect;
        if (!addressPrefixSelect || addressPrefixSelect.length === 0) {
            callback('请选择省');
        } else if (addressPrefixSelect[0].children && addressPrefixSelect[0].children.length > 0) {
            if (!addressPrefixSelect[1]) {
                callback('请选择市');
            } else if (addressPrefixSelect[0].children && addressPrefixSelect[1].children.length > 0) {
                if (!addressPrefixSelect[2]) {
                    callback('请选择区');
                } else {
                    callback();
                }
            } else {
                callback();
            }

        } else {
            callback();
        }

    }

    onChangeCity(value, selectedOptions) {
        console.log(value, selectedOptions);
        this.props.dispatch(action({
            bankCitySelect: selectedOptions
        }));
    }

    onChange(value, selectedOptions) {
        console.log(value, selectedOptions);
        this.props.dispatch(action({
            addressPrefixSelect: selectedOptions
        }));
    }

    loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        if (/00$/.test(targetOption.value)) {
            targetOption.loading = true;
            ajaxPost('/front/index.do?action=findAreaByPCode', { pCode: targetOption.value }, (data) => {
                console.log(data);
                targetOption.loading = false;
                let children = [];
                data.data.list.map((it) => {
                    children.push({
                        value: it.code,
                        label: it.name,
                        isLeaf: false
                    });
                });
                if (children.length > 0) {
                    targetOption.children = children
                }
                this.props.dispatch({
                    type: 'STATE',
                    states: {
                        addressOptions: this.props.account.states.addressOptions
                    }
                })
            });
        }

    }

    loadBankCity(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];

        console.log(targetOption);
        if (targetOption.type) {
            targetOption.loading = true;
            ajaxPost('/front/financing.do?action=getCityList', { provinceCode: targetOption.value }, (data) => {
                console.log(data);
                targetOption.loading = false;
                let children = [];
                data.data.data.map((it) => {
                    children.push({
                        value: it.cityCode,
                        label: it.cityName,
                        isLeaf: false
                    });
                });
                if (children.length > 0) {
                    targetOption.children = children
                }
                this.props.dispatch({
                    type: 'STATE',
                    states: {
                        bankCityOptions: this.props.account.states.bankCityOptions
                    }
                })
            });
        }

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

        const { account, dispatch, form } = this.props;
        const { values, states } = account;
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

        const addressOptions = states.addressOptions || [];
        const bankCityOptions = states.bankCityOptions || [];
        return (
            <Form onSubmit={this.handleSubmit} className="account-form">
                <div className="cust form-module">
                    <div className="subtitle">企业资料录入</div>
                    { CustomInput('clientName', '企业名称', [{ required: true, message: '请输入正确的企业名称!' }], '请按营业执照填写') }
                    { CustomInput('idCode', '统一社会信用代码', [{ required: true, message: '请输入正确的统一社会信用代码!' }], '请输入社会信用代码') }
                    {/*<FormItem {...formItemLayout} label="是否三证合一">
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
                    { isMixedCtf === 0 &&  CustomInput('taxCode', '税务登记证', [{ required: true, message: '请输入正确的税务登记证!' }], '请按营业执照填写') }*/}
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >企业资料上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="business-cret fl  img-loader-box">
                                    <input type="file" id="busCert"  onChange={(e) => {projectTool.loadImgToCompressedBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.busCert && <img src={account.values.busCert}  />}
                                </div>
                                {/*<div className="org-cert fr  img-loader-box">
                                    <input type="file" id="orgCert"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.orgCert && <img src={account.values.orgCert}  />}
                                </div>*/}
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                    { CustomInput('bankAcc', '对公账号', [{ required: true, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    <FormItem className="item-bankNo" {...formItemLayout} label="开户银行">
                        {getFieldDecorator('bankAccName', {
                            rules: [{rule:'required', validator: validator, message: '请选择开户银行' }],
                            initialValue: values.bankAccNo
                        })(
                        <Select  placeholder="请选择开户银行" >
                        {states.bankOptions && states.bankOptions.map((item, i) => <Option key={i} value={item.value}>{item.label}</Option>)}
                        </Select>
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label="银行开户城市">
                        {getFieldDecorator('bankCity', {
                            rules: [{rule:'required', validator: this.bankCityValidator, required: true, message: '' }]
                        })(
                            <Cascader
                                options={bankCityOptions}
                                loadData={(s)=>{this.loadBankCity(s)}}
                                onChange={(v,s)=>{this.onChangeCity(v,s)}}
                                changeOnSelect
                                placeholder="请选择开户城市"
                              />
                        )}
                    </FormItem>
                    { CustomInput('officePhone', '办公电话', [{rule:'tel;required', validator: validator, required: true, message: '请输入正确的办公电话!' }], '请输入办公电话') }
                    <FormItem  className="address-prefix-item" {...formItemLayout} label="通讯地址">
                        {getFieldDecorator('addressPrefix', {
                            rules: [{rule:'required', validator: this.addressValidator, required: true, message: '' }]
                        })(
                            <Cascader
                                options={addressOptions}
                                loadData={(s)=>{this.loadData(s)}}
                                onChange={(v,s)=>{this.onChange(v,s)}}
                                changeOnSelect
                                placeholder="请选择省市区"
                              />
                        )}
                    </FormItem>
                    <FormItem className="address-detail-item" {...formItemLayout} label=" ">
                        {getFieldDecorator('address', {
                            rules: [{rule:'required', validator: validator, message: '请输入详细通讯地址' }],
                            initialValue: values.address
                        })(
                            <Input className="address-detail"  placeholder="请输入详细通讯地址" />
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
                                    <input type="file" id="legalIdFront"  onChange={(e) => {projectTool.loadImgToCompressedBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                                    {account.values.legalIdFront && <img src={account.values.legalIdFront}  />}
                                </div>
                                <div className="id-back fr  img-loader-box">
                                    <input type="file" id="legalIdBack"  onChange={(e) => {projectTool.loadImgToCompressedBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
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
                    <Link  className="btn-prev" to={!states.isLegal ? 'material' : 'index'}>上一步</Link>
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

export default connect((state) => {
    return {
        account: state.account
    }
})(SubPageWarpper({
    title: '我的理财',
    child: AddMaterial
}));
