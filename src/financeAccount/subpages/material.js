import React from 'react'
import {Link} from 'react-router-dom'
import {ajaxPost} from 'request'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import projectTool from '../../util/projectTool'
import {validator} from '../../globalComponents/form/valid.js'
const FormItem = Form.Item;

const action = function(values) {
    return {
        type: 'ACCOUNT',
        values
    }
}

class AdminForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCode = this.getCode.bind(this);


        this.props.dispatch({type: 'STATE', states: {adminFormSubmited: false}});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch({type: 'STATE', states: {adminFormSubmited: true}});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values));

                this.props.dispatch(action(values));
                //校验图片



                location.hash = '#/addMaterial';
            }
        });
    }

    getCode() {
        const {values} = this.props.account
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: values.mobile, type: '02'
        }, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {msgCode: data}
            })
        });
    }

    render() {
        const { getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const {dispatch, account} = this.props;
        const {states} = account;
        const decorator = this.props.form.getFieldDecorator;
        let getFieldDecorator = (name, option) => {
            //option.validateTrigger = states.adminFormSubmited ? 'onChange' : 'onSubmit';
            option.validateTrigger = 'onSubmit';
            //console.log(option.validateTrigger);
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

        //console.log(states.adminFormSubmited);
        return (
            <Form onSubmit={this.handleSubmit} className="admin-form">
            { CustomInput('actorName', '管理员姓名', [{ required: true, pattern: /^[\u0391-\uFFE5]+$/, message: '请输入正确的姓名!' }], '请输入真实姓名') }
            { CustomInput('mobile', '手机号码', [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' }], '请输入手机号码') }
            <FormItem {...formItemLayout} label="短信验证码">
                {getFieldDecorator('smsCode', {
                    rules: [{ required: true, message: '请输入正确的短信验证码!' }],
                })(
                    <Input  placeholder="请输入短信验证码" />
                )}
                <a className="btn-getcode" onClick={() => {this.getCode()}}>发送验证码</a>
            </FormItem>
            { CustomInput('actorIdCode', '身份证号', [{ rule: 'idcard;required',required: true, message: '请输入正确的身份证号!' ,validator: validator }], '请输入身份证号') }
            <div className="ant-row ant-form-item form-item-id">
                <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-8">
                    <label className="ant-form-item-required" >身份证上传</label>
                    <div className="id-sub-label">（原件照片）</div>
                </div>
                <div className="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-16">
                    <div className="ant-form-item-control clearfix">
                        <div className="id-front fl img-loader-box">
                            <input type="file" id="idFront"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                            {account.values.idFront && <img src={account.values.idFront}  />}
                        </div>
                        <div className="id-back fr img-loader-box">
                            <input type="file" id="idBack"  onChange={(e) => {projectTool.loadImgToBase64(e, dispatch, action)}}  name="img" accept="image/*"  />
                            {account.values.idBack && <img src={account.values.idBack}  />}
                        </div>
                        <div className="id-notice">图片格式：支持jpg、gif、bmp、png格式</div>
                    </div>
                </div>
            </div>
            <div className="btn-box clearfix">
                <Link  className="btn-prev" to="index">上一步</Link>
                <Button htmlType="submit" className="btn-next">下一步</Button>
            </div>
          </Form>
        );
  }
}

const WrappedAdminForm = Form.create()(AdminForm);

class Material extends React.Component {
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
                        <div className="step step3">3</div>
                        <div className="step step4">4</div>
                        <div className="line-box" >
                            <div className="line active" ></div>
                            <div className="line" ></div>
                            <div className="line" ></div>
                        </div>
                        <div className="text">
                            <span className="active">确认身份</span>
                            <span className="active">设置管理</span>
                            <span>补充信息</span>
                            <span>提交审核</span>
                        </div>
                    </div>
                    <div className="form">
                        <div className="form-border-top"></div>
                        <div className="form-content">
                            <div className="form-title clearfix">
                                <div className="form-title-left ant-col-xs-24 ant-col-sm-8">管理员资料录入</div>
                                <div className="form-title-right ant-col-xs-24 ant-col-sm-16">管理员会对理财账号进行查看、赎回，
                                    <br/> 资金发生变动时相关信息会发送至管理员手机上。
                                </div>
                            </div>
                            <WrappedAdminForm {...this.props} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default  connect((state) => { return { account: state.account } })( Material );

