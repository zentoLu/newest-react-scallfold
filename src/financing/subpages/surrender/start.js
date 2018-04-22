import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {ajaxPost} from 'request';
import { message, Form, Input, Modal, Button, Checkbox } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
const FormItem = Form.Item;
class SurrenderStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false , isAgree: false}
    }

    getCode() {
        //const mobile = this.props.Surrender || '13480704730';
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

    handleConfirm() {
        if(this.state.isAgree) {
            this.setState({
              visible: true,
            });
        }else{
            console.log(this.refs);
            this.refs.checkBox.focus();
            message.warning('请阅读并同意协议！');
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
        this.refs.smsForm.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values));
                const {Surrender} = this.props;
                ajaxPost('/front/financing.do?action=Surrender', {
                    prdCode: 'test',
                    smsCode: Surrender.values.smsCode,
                    smsFlowNo: Surrender.states.msgCode.data ? Surrender.states.msgCode.data.smsFlowNo : ''
                }, (data) => {
                    console.log(data);
                    this.props.dispatch({
                        type: 'STATE',
                        states: {msgCode: data}
                    })
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

    render() {
        console.log(this.props);
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">解约基金</a>
                    </div>
                    <div className="page-surrender">
                        <h3 className="surrender-title">解约信息</h3>
                        <div className="notice">
                            <span className="icon-info"></span>
                            <span>基金解约后将无法继续享受理财收益，请谨慎操作</span>
                        </div>
                        <div className="surrender-info">
                            <div className="info-item">
                                <div className="item-label">基金名称</div>
                                <div className="item-content">
                                    <span>民生</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-label">签约账号</div>
                                <div className="item-content">
                                    <span>6227 0033 2414 0554 910</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="item-label">累计收益</div>
                                <div className="item-content">
                                    <span className="blue">20000.91 元</span>
                                </div>
                            </div>
                        </div>
                        <div className="btn-box clearfix">
                            <div className="btn-confirm fl">解约</div>
                            <div className="btn btn-consider fr">再考虑一下</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect((state) => { return { Surrender: state.Surrender } })(
SubPageWarpper({
    title: '我的理财',
    child: SurrenderStart
}));

