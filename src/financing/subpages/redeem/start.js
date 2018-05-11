import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ajaxPost } from 'request'
import Tool from 'tool'
import { message, Form, Input, Modal, Button, Checkbox, Popover, Radio } from 'antd'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
import { prdCode, fundAcc } from 'package'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class RedeemStart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            redeemMethod: 1,
            redeemAmt: ''
        }
    }

    componentDidMount() {
        ajaxPost('/front/financing.do?action=getCustInfo', {}, (data) => {
            console.log(data)
            this.props.dispatch({
                type: 'STATE',
                states: {
                    custInfo: data
                }
            })
            //基金持有份额接口
            ajaxPost('/front/financing.do?action=queryFundPortion', { prdCode: prdCode, fundAcc: fundAcc }, (data) => {
                console.log(data)
                this.props.dispatch({
                    type: 'STATE',
                    states: {
                        fundPortion: data
                    }
                })
            })
        })
        ajaxPost('/front/financing.do?action=queryFundInfo', {
            "prdCode": prdCode,
            "currentPage": "1",
            "pageSize": "5"
        }, (data) => {
            console.log(data)
            this.props.dispatch({
                type: 'STATE',
                states: {
                    fundInfo: data
                }
            })
        })

    }

    getCode() {
        const mobile = this.props.redeem.states.custInfo.data.phone
        ajaxPost('/front/financing.do?action=msgCode', {
            mobile: mobile,
            type: '07'
        }, (data) => {
            console.log(data)
            this.props.dispatch({
                type: 'STATE',
                states: {
                    msgCode: data
                }
            })
        })
    }

    handleInput(e) {
        this.setState({
            redeemAmt: e.target.value
        })
    }

    redeemAll() {
        this.setState({
            redeemAmt: this.calMaxAmt()
        })
    }

    calMaxAmt() {
        const redeemMethod = this.state.redeemMethod
        let maxAmt = this.props.redeem.states.fundPortion.data[redeemMethod === 1 ? 'cashAmt' : 'useVol']
        return maxAmt
    }

    handleConfirm() {
        if (!this.state.redeemAmt) {
            message.warning('请输入赎回金额！')
            this.refs.inputAmt.focus()
        } else if (isNaN(this.state.redeemAmt)) {
            message.warning('请输入正确的赎回金额！')
            this.refs.inputAmt.focus()
        } else if (this.state.redeemAmt > this.calMaxAmt()) {
            message.warning('赎回金额超过最大额度！')
            this.refs.inputAmt.focus()
        } else {
            this.setState({
                visible: true,
            })
        }
    }

    hideModal(e) {
        console.log(e)
        this.setState({
            visible: false,
        })
    }

    handleOk(e) {
        console.log(this.refs)
        const { redeemMethod, redeemAmt } = this.state
        this.refs.smsForm.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', JSON.stringify(values))
                const { redeem } = this.props
                let url = redeemMethod === 1 ? '/front/financing.do?action=quickRedeem' : '/front/financing.do?action=commonRedeem'
                ajaxPost(url, {
                    prdCode: redeem.states.fundInfo.data.result[0].prdCode,
                    vol: redeemAmt,
                    smsCode: values.smsCode,
                    smsFlowNo: redeem.states.msgCode.data ? redeem.states.msgCode.data.smsFlowNo : ''
                }, (data) => {
                    console.log(data)
                    location.hash = '#/redeem/success/' + redeemAmt
                })
            }
        })
    }

    methodChange(e) {
        console.log(e.target.value)
        this.setState({
            redeemMethod: e.target.value
        })
    }

    render() {
        console.log(this.props)

        const { redeem } = this.props
        const { states } = redeem
        const redeemMethod = this.state.redeemMethod
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:">现金盈基金</a>
                        <a href="javascript:">赎回</a>
                    </div>
                    <Modal
                        title="短信验证"
                        visible={this.state.visible}
                        onOk={() => {this.handleOk()}}
                        onCancel={() => {this.hideModal()}}
                        width='428px'
                        maskClosable=""
                        footer={[
                            <Button key="back" className="btn-cancel" onClick={() => {this.hideModal()}}>取消</Button>,
                            <Button key="submit" className="btn-ok" onClick={() => {this.handleOk()}}>确认</Button>
                        ]}
                    >
                        <div className="pop-body">
                            <p>已向管理员手机号{states.custInfo ? Tool.formatName(states.custInfo.data.phone) : '加载中...'}发送一条验证码，请输入</p>
                            <WrappedSmsForm ref="smsForm" getCode={() => {this.getCode()}} {...this.props} />
                        </div>
                    </Modal>
                    <div className="page-redeem">
                        <h3 className="redeem-title">赎回资金</h3>
                        <div className="redeem-info">
                            <div className="info-item">
                                <div className="item-label">赎至账户</div>
                                {states.custInfo && <div className="item-content">
                                    <p>{states.custInfo.data.clientName}</p>
                                    <p>{Tool.formatBankNo(states.custInfo.data.bankNo)}</p>
                                </div>}
                            </div>
                            <div className="info-item">
                                <div className="item-label">赎回金额</div>
                                <div className="item-content relative">
                                    {states.fundPortion && <input onChange={(e) => {this.handleInput(e)}} ref="inputAmt" value={this.state.redeemAmt} className="redeem-input-amt" placeholder={'最多可赎回' + this.calMaxAmt() + '万元'} />}
                                    <a className="btn-redeem-all absolute" onClick={()=>{this.redeemAll()}}>全部赎回</a>
                                </div>
                            </div>
                            <div className="info-item item-method">
                                <div className="item-label">赎回方式</div>
                                <div className="item-content relative">
                                    <RadioGroup onChange={(e) => {this.methodChange(e)}} value={this.state.redeemMethod}>
                                        <Radio value={1} className="redeem-method">快赎（T+0实时到账）</Radio>
                                        <Radio value={2} className="redeem-method">普通赎回（T+1到账）</Radio>
                                        <Popover placement="rightTop" trigger="hover" content={infoContent} title="赎回规则">
                                            <a  className="redeem-method-tip icon-info absolute"></a>
                                        </Popover>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                        <div className="btn-box">
                            <div className="btn btn-confirm" onClick={() => {this.handleConfirm()}}>确认</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const infoContent = (
    <div className="redeem-popover">
        <p>赎回方式有快赎和普通赎回两种。</p>
        <p>单日赎回累计金额不大于5000万，且银行垫资剩余额度大于该笔赎回额度时，默认选择快赎方式。当日15:00前操作资金将T+0实时到账，15:00之后资金将T+1到账。</p>
        <p>其余情况将自动配置为普通赎回的方式。</p>
    </div>
)

export default connect((state) => { return { redeem: state.redeem } })(
    SubPageWarpper({
        title: '我的理财',
        child: RedeemStart
    }))
