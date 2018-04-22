import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {ajaxPost} from 'request';
import { message, Form, Input, Modal, Button, Checkbox } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
const FormItem = Form.Item;
class MyFinancing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false , isAgree: false}
    }

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
                const {sign} = this.props;
                ajaxPost('/front/financing.do?action=sign', {
                    prdCode: 'test',
                    smsCode: sign.values.smsCode,
                    smsFlowNo: sign.states.msgCode.data ? sign.states.msgCode.data.smsFlowNo : ''
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
            <div className="page-my-financing">
                <div className="container clearfix">
                    <div className="aside fl">

                    </div>
                    <div className="indentityBox">
                        <div className="container main-content">
                            <div className="crumbs">
                                <a href="/">首页</a>
                                <a href="javascript:;">我的理财</a>
                            </div>
                            <div className="main-content-body relative">
                                <div className="tabs absolute hide">
                                    <div className="tab-nav">
                                        <div className="tab active">买入</div>
                                        <div className="tab">卖出</div>
                                    </div>
                                    <div className="tabs-content">
                                        <div className="tab-panel">
                                            <input type="text" placeholder="10000元起购" />
                                            <a  className="btn-buy">立即买入</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-financing-content">
                                    <div className="title">
                                        <span className="main-title">签约基金：民生现金盈基金</span>
                                        <span className="sub-title">（ 注册号：123456789012 ）</span>
                                    </div>
                                </div>
                                <div className="my-money clearfix">
                                    <div className="fl money-item">
                                        <div className="item-th">持有资产（元）</div>
                                        <div className="item-td"> <span className="num">5000.84</span><span className="unit">万</span> </div>
                                    </div>
                                    <div className="fl money-item">
                                        <div className="item-th">昨日收益（元）</div>
                                        <div className="item-td num">146,50</div>
                                    </div>
                                    <div className="fl money-item">
                                        <div className="item-th">累计收益（元）</div>
                                        <div className="item-td num">480,900</div>
                                    </div>
                                </div>
                                <div className="notice-text pb4">* 投资收益将在每日24:00更新</div>
                                <div className="money-ontheway-label">
                                    在途资金（元）
                                </div>
                                <div className="money-ontheway">
                                    <span className="num">200</span><span className="unit">万</span>
                                    <span className="btn-revoke blue">撤回（出金）</span>
                                </div>
                                <div className="notice-text">* 在途资金将于下个工作日15:00转入基金账户中，在资金转入之前可进行撤回操作</div>
                            </div>
                        </div>
                        <div className="trade-records container">
                            <div className="records-header relative">
                                <div className="header-left handle-filter">
                                    <div className="handle-item active">全部</div>
                                    <div className="handle-item">入金</div>
                                    <div className="handle-item">赎回</div>
                                    <div className="handle-item">撤回</div>
                                </div>
                                <div className="header-right absolute">
                                    <div className="date-box">
                                        <span className="data-label">日期</span>
                                        <span className="date"></span>
                                    </div>
                                    <div className="btn-query">查询</div>
                                </div>
                            </div>
                            <div className="records-body">
                                <div className="table"></div>
                            </div>
                            <div className="records-footer relative">
                                <div className="absolute  pagination-box">
                                    <div className="desc">共32条记录</div>
                                    <div className="pagination"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect((state) => { return { sign: state.sign } })(
SubPageWarpper({
    title: '我的理财',
    child: MyFinancing
}));

