import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

class SmsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { btnText: '发送验证码' };
        this.getCode();
    }
    getCode() {
        if(typeof this.state.btnText === 'number') {
            return;
        }
        var btnText = 60;
        var tick = setInterval(() => {

            if(btnText > 0) {
                btnText--;
            }else{
                btnText = '重新获取';
                clearInterval(tick);
            }
            this.setState({ btnText: btnText })

        }, 1000);

        this.props.getCode();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //console.log(this);
        return (
            <Form className="sms-form">
                <FormItem>
                    {getFieldDecorator('smsCode', {
                        rules: [{ required: true, message: '请输入短信验证码!' }],
                    })(
                        <Input  placeholder="请输入短信验证码" />
                    )}
                    <a className="btn-getcode" disabled={typeof this.state.btnText === 'number'} onClick={() => {this.getCode()}}>{this.state.btnText}</a>
                </FormItem>
            </Form>
        )
    }
}

// const WrappedSmsForm = Form.create({
//     onValuesChange(props, value) {
//         console.log(props,value);
//         props.dispatch({
//             type: 'SIGN',
//             values: {smsCode: value.smsCode}
//         });
//     }
// })(SmsForm);

const WrappedSmsForm = Form.create()(SmsForm);


export default  WrappedSmsForm;

