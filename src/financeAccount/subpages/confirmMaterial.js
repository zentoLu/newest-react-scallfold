import React from 'react'
import { Link } from 'react-router-dom'
import { ajaxPost } from 'request'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Radio, Checkbox, Cascader, Modal, Select } from 'antd'
import projectTool from '../../util/projectTool'
import { validator } from '../../globalComponents/form/valid.js'
import WrappedSmsForm from 'form/smsForm.js'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import Tool from 'tool'
const action = function(values) {
    return {
        type: 'ACCOUNT',
        values
    }
}

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class AccountForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
        this.handleSubmit = this.handleSubmit.bind(this)

        this.addressValidator = this.addressValidator.bind(this)
        this.bankCityValidator = this.bankCityValidator.bind(this)
    }

    componentDidMount() {
        /*if (this.props.account.states.confirmFormSubmited) {
            this.props.form.validateFields((err, values) => {});
        }*/
        /*ajaxPost('/front/index.do?action=findProvice', {}, (data) => {
            console.log(data)
            let options = []
            let initOptions = this.props.account.values.addressPrefixSelect
            data.data.list.map((it) => {
                if (it.code !== initOptions[0].value) {
                    options.push({
                        value: it.code,
                        label: it.name,
                        isLeaf: false
                    })
                } else {
                    options.push(initOptions[0])
                }

            })

            this.props.dispatchState({
                addressOptions: options
            })
        })*/
        //民生获取省
        /*ajaxPost('/front/financing.do?action=getProvinceList', {}, (data) => {
            console.log(data)
            let options = []
            let initOptions = this.props.account.values.bankCitySelect
            data.data.data.map((it) => {
                if (it.provinceCode !== initOptions[0].value) {
                    options.push({
                        value: it.provinceCode,
                        label: it.provinceName,
                        type: it.provinceType,
                        isLeaf: false
                    })
                } else {
                    options.push(initOptions[0])
                }
            })

            this.props.dispatchState({
                bankCityOptions: options
            })
        })*/
        //民生获取银行列表
        /*ajaxPost('/front/financing.do?action=getBankList', {}, (data) => {
            console.log(data)
            let options = []
            data.data.data.map((it) => {
                options.push({
                    value: it.bankCode,
                    label: it.bankName
                })
            })
            this.props.dispatchState({
                bankOptions: options
            })
        })*/
    }

    onChangeCity(value, selectedOptions) {
        console.log(value, selectedOptions)
        this.props.dispatchForm({
            bankCitySelect: selectedOptions
        })
    }

    loadBankCity(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1]

        console.log(targetOption)
        if (targetOption.type) {
            targetOption.loading = true
            ajaxPost('/front/financing.do?action=getCityList', { provinceCode: targetOption.value }, (data) => {
                console.log(data)
                targetOption.loading = false
                let children = []
                data.data.data.map((it) => {
                    children.push({
                        value: it.cityCode,
                        label: it.cityName
                    })
                })
                if (children.length > 0) {
                    targetOption.children = children
                }
                this.props.dispatchState({
                    bankCityOptions: this.props.account.states.bankCityOptions
                })
            })
        }

    }

    bankCityValidator(rule, value, callback) {
        console.log(value);
        console.log(this.refs);
        if (!value || value.length === 0) {
            callback('请选择省');
        } else if (value.length === 1) {
            callback('请选择市');
        } else if (value.length === 2) {
            callback();
        } else {
            callback('未知错误');
        }

    }

    addressValidator(rule, value, callback) {
        //const addressPrefixSelect = this.props.account.values.addressPrefixSelect;
        if (value && value[0] !== '820000' && value[0] !== '710000' && value[0] !== '810000') {
            if (value.length === 0) {
                callback('请选择省');
            } else if (value.length === 1) {
                callback('请选择市');
            } else if (value.length === 2) {
                callback('请选择区/县');
            } else if (value.length === 3) {
                callback();
            } else {
                callback('未知错误');
            }
        } else if (!value) {
            callback('请选择省');
        } else {
            callback();
        }

    }

    onChange(value, selectedOptions) {
        console.log(value, selectedOptions)
        this.props.dispatchForm({
            addressPrefixSelect: selectedOptions
        })
    }

    loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        if (/00$/.test(targetOption.value)) {
            targetOption.loading = true
            ajaxPost('/front/index.do?action=findAreaByPCode', { pCode: targetOption.value }, (data) => {
                console.log(data)
                targetOption.loading = false
                let children = []
                let isLeaf = false
                if (/0000$/.test(targetOption.value)) {
                    isLeaf = false
                } else if (/00$/.test(targetOption.value)) {
                    isLeaf = true
                }

                data.data.list.map((it) => {
                    children.push({
                        value: it.code,
                        label: it.name,
                        isLeaf: isLeaf
                    })
                })
                if (children.length > 0) {
                    targetOption.children = children
                } else if (children.length === 0) {
                    targetOption.isLeaf = true
                }
                this.props.dispatchState({
                    addressOptions: this.props.account.states.addressOptions
                })
            })
        }

    }

    getCode() {
        //const mobile = this.props.sign || '13480704730'
        const mobile = '13480704730'
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile,
            type: '02'
        }, (data) => {
            console.log(data)
            this.props.dispatchState({ msgCode: data })
        })
    }


    handleSubmit(e) {
        e.preventDefault()
        this.props.dispatchState({ confirmFormSubmited: true });
        this.props.form.validateFieldsAndScroll(['addressDetail', 'addressPrefix', 'officePhone', 'bankNo', 'bankCity'], (err, values) => {
            if (!err) {
                this.props.dispatchForm(values)
                this.setState({
                    visible: true,
                })
            }
        })
    }

    hideModal(e) {
        //console.log(e)
        this.setState({
            visible: false,
        })
    }

    handleOk() {
        let { account } = this.props
        this.props.form.validateFields(['smsCode'], (err, values) => {
            if (!err) {
                console.log(values)
                let data = Object.assign({}, account.values, values)
                //格式化数据
                data = this.formatData(data, account)

                ajaxPost('/front/financing.do?action=apply', data, function(d) {
                    location.hash = '#/finish'
                })
            }
        })
    }

    formatData(d, account) {
        let data = {},
            list = [],
            isLegal = account.states.isLegal
        //把法定代表人改为经办人
        if (isLegal) {
            data = {
                actorName: d.reprName,
                mobile: d.reprMobile,
                actorIdCode: d.reprIdCode,
                idFront: d.legalIdFront,
                idBack: d.legalIdBack
            }
        }

        data = Object.assign(data, d)
        data.isLegal = isLegal
        console.log(data)
        //data.idType = Number(d.isMixedCtf) === 1 ? 'C' : 'B' //B-营业执照号（非三证合一）C-统一社会信用代码（三证合一）
        //不处理三证合一，默认写死
        data.idType = 'C'
        data.reprIdType = 1
        data.isMixedCtf = 1
        data.clientType = 0
        data.bankAccName = data.clientName
        //短信验证码
        data.smsFlowNo = account.states.msgCode.data ? account.states.msgCode.data.smsFlowNo : ''
        //开户城市和详细地址
        data.openCityNo = data.bankCity[1]
        data.address = data.addressPrefixSelect.map((it) => { return it.label }).join('') + data.addressDetail
        data.bankCity = data.bankCity.join()
        data.addressPrefix = data.addressPrefix.join()
        data.addressPrefixSelect = null
        data.bankCitySelect = null

        data.officePhone = data.officePhone.replace('-', '');

        //生成图片列表
        ['legalIdFront', 'legalIdBack', 'idFront', 'idBack', 'busCert'].map((it, i) => {
            let indexMap = ['1', '2', '3', '4', 'C']
            if (d[it]) {
                //console.log(d[it].base64);
                list.push({
                    imgType: indexMap[i],
                    imgName: d[it] ? d[it].name : '',
                    img: d[it] ? d[it].base64 : ''
                })
            }
            data[it] = ''
        })
        data.list = list

        return data
    }

    render() {
        const { getFieldsError, getFieldError, isFieldTouched } = this.props.form
        const decorator = this.props.form.getFieldDecorator
        const getFieldDecorator = (name, option) => {
            option.validateTrigger = states.confirmFormSubmited ? 'onChange' : 'onSubmit';
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
        }

        const { account, dispatch, form } = this.props
        const { values, states } = account
        const CustomInput = (name, label, rules, placeholder, notDisabled) => {
            let initialValue = account.values[name]
            if (name === 'actorIdCode' || name === 'reprIdCode') {
                initialValue = Tool.formatId(account.values[name])
            }
            return (
                <FormItem {...formItemLayout} label={label}>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: initialValue
                    })(
                <Input disabled={!notDisabled} placeholder={placeholder} />
                    )}
                </FormItem>
            )
        }
        const addressOptions = states.addressOptions || []
        const bankCityOptions = states.bankCityOptions || []
        //console.log(states)
        return (
            <Form onSubmit={this.handleSubmit} className="account-form">
                {!states.isLegal && <div className="actor form-module">
                    <div className="subtitle">管理员资料</div>
                    { CustomInput('actorName', '管理员姓名', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的姓名!' }], '请输入真实姓名') }
                    { CustomInput('mobile', '手机号码', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' }], '请输入手机号码') }
                    { CustomInput('actorIdCode', '身份证号', [{ required: true, message: '请输入正确的身份证号!' ,validator: validator }], '请输入身份证号') }
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >身份证上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="id-front fl img-loader-box">
                                    {account.values.idFront && <img src={account.values.idFront.base64}  />}
                                </div>
                                <div className="id-back fr img-loader-box">
                                    {account.values.idBack && <img src={account.values.idBack.base64}  />}
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
                                    {account.values.busCert && <img src={account.values.busCert.base64}  />}
                                </div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>
                    { CustomInput('bankAcc', '对公账号', [{ required: true, message: '请输入正确的银行卡号!' }], '请输入企业银行卡号') }
                    <FormItem className="item-bankNo" {...formItemLayout} label="开户银行">
                        {getFieldDecorator('bankNo', {
                            rules: [{rule:'required', required: true, validator: validator, message: '请选择开户银行' }],
                            initialValue: values.bankNo
                        })(
                        <Select  placeholder="请选择开户银行" >
                        {states.bankOptions && states.bankOptions.map((item, i) => <Option key={i} value={item.value}>{item.label}</Option>)}
                        </Select>
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label="银行开户城市">
                        {getFieldDecorator('bankCity', {
                            rules: [{rule:'required', validator: this.bankCityValidator, required: true, message: '' }],
                            initialValue: values.bankCity
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
                    { CustomInput('officePhone', '办公电话', [{rule:'tel;required', validator: validator, required: true, message: '请输入正确的办公电话!' }], '请输入办公电话', true)}
                    <FormItem  className="address-prefix-item" {...formItemLayout} label="通讯地址">
                        {getFieldDecorator('addressPrefix', {
                            rules: [{rule:'required', validator: this.addressValidator, required: true, message: '' }],
                            initialValue: values.addressPrefix
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
                        {getFieldDecorator('addressDetail', {
                            rules: [{rule:'required', validator: validator, message: '请输入详细通讯地址' }],
                            initialValue: values.addressDetail
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
                    { CustomInput('reprIdCode', '身份证号', [{required: true, message: '请输入正确的身份证号!' }], '请输入身份证号') }
                    <div className="ant-row ant-form-item form-item-id">
                        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                            <label className="ant-form-item-required" >身份证上传</label>
                            <div className="id-sub-label">（原件照片）</div>
                        </div>
                        <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                            <div className="ant-form-item-control clearfix">
                                <div className="id-front fl  img-loader-box">
                                    {account.values.legalIdFront && <img src={account.values.legalIdFront.base64}  />}
                                </div>
                                <div className="id-back fr  img-loader-box">
                                    {account.values.legalIdBack && <img src={account.values.legalIdBack.base64}  />}
                                </div>
                                <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="btn-box clearfix">
                    <Link  className="btn-prev" to={states.isLegal ? 'addMaterial' : 'material'}>返回修改</Link>
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
        )
    }
}

let WrappedAccountForm = Form.create()(AccountForm)

class ConfirmMaterial extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate(props) {
        if (Boolean(this.props.account.states.confirmFormSubmited) === false && props.account.states.confirmFormSubmited === true) {
            //重新创建form
            //debugger
            WrappedAccountForm = Form.create()(AccountForm)
        }
    }

    hideModal(e) {
        console.log(e)
        this.setState({
            visible: false,
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className="indentityBox page-finance-account">
                <div className="container">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:">现金盈基金</a>
                        <a href="javascript:">开户</a>
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
    child: ConfirmMaterial
}))
