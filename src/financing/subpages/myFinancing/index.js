import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajaxPost } from 'request';
import { message, Form, Input, Modal, Button, Checkbox, Table, DatePicker } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import WrappedSmsForm from 'form/smsForm.js'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Tool from 'tool';
import moment from 'moment';
const FormItem = Form.Item;
const pageSize = 6;
//console.log(moment);
//const { RangePicker } = DatePicker;
class MyFinancing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, isAgree: false, endDate: Tool.formatDate(null, ''), startDate: '20180425', busin: '' }
        this.dateChange = this.dateChange.bind(this);
    }

    componentDidMount() {
        ajaxPost('/front/financing.do?action=queryAccountInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { custInfo: data }
            })
        });

        ajaxPost('/front/financing.do?action=queryFundInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { fundInfo: data }
            })
        });

        //基金持有份额接口
        ajaxPost('/front/financing.do?action=queryFundPortion', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: {
                    fundPortion: data
                }
            })
        });

        //基金收益
        ajaxPost('/front/financing.do?action=getIncome', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { income: data }
            })
        });

        //流水明细
        ajaxPost('/front/financing.do?action=queryTransInfo', {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            currentPage: 1,
            pageSize: pageSize
        }, (data) => {
            console.log(data);
            console.log(Tool.formatDate(null, ''));
            this.props.dispatch({
                type: 'STATE',
                states: { transInfo: data }
            })
        });
    }

    changeBusin(code) {
        this.setState({
            busin: code
        });
        this.queryTransInfo({ businCode: code });
    }

    dateChange(date, dateString, key) {
        console.log(date, dateString, key);
        this.setState({
            [key]: dateString.replace('-', '')
        });
    }

    transInfoFormat(d) {
        let res = d.data.result,
            arr = [];


        const businMap = {
            '104': '赎回', //提现
            '301': '入金', //充值
            '507': '撤回' //提现退款
        };

        res.map((v, index) => {
            //console.log(v.businCode, businMap[v.businCode]);
            console.log(Tool.formatDate(v.transDate, '.'))
            let date = (
                <div>
                    <span className="trans-date">{Tool.formatDate(v.transDate, '.')}</span>
                    <span className="trans-time">{v.transTime.match(/.{2}/g).join(':')}</span>
                </div>
            )
            //console.log(date);
            arr.push({
                key: index,
                transDate: date,
                busin: businMap[v.businCode],
                summary: v.summary,
                amt: v.amt,
                status: '成功'
            });
        });
        return arr;
    }

    queryTransInfo(params) {
        params = params || '';
        let oldReq = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            currentPage: 1,
            pageSize: pageSize
        };
        let req = Object.assign(oldReq, params);
        //流水明细
        ajaxPost('/front/financing.do?action=queryTransInfo', req, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { transInfo: data }
            })
        });
    }

    setPagination(d) {
        let data = d.data,
            pagination = {},
            self = this;
        pagination = {
            total: Number(data.totalNum),
            pageSize: Number(data.pageSize),
            current: Number(data.currentPage),
            //showTotal: { total => `共${total}条记录` },
            showTotal(total) {
                return `共${total}条记录`;
            },
            onChange(page, pageSize) {
                console.log(page, pageSize);
                self.queryTransInfo({ currentPage: page });
            }
        }
        //console.log(pagination);
        return pagination;
    }


    render() {
        console.log(this.props);

        var dataSource = [],
            pagination = {};

        const columns = [{
            title: '交易日期',
            dataIndex: 'transDate',
            key: 'key',
        }, {
            title: '交易类型',
            dataIndex: 'busin',
            key: 'key',
        }, {
            title: '资金流向',
            dataIndex: 'summary',
            key: 'key',
        }, {
            title: '金额',
            dataIndex: 'amt',
            key: 'key',
        }, {
            title: '交易状态',
            dataIndex: 'status',
            key: 'key',
        }];
        const { myFinancing } = this.props;
        const { states } = myFinancing;
        const fundPortion = states.fundPortion ? states.fundPortion.data : {};
        const businList = [{ code: '', text: '全部' }, { code: '104', text: '赎回' }, { code: '301', text: '入金' }, { code: '507', text: '撤回' }];
        if (states.transInfo) {
            let transInfo = states.transInfo;
            dataSource = this.transInfoFormat(transInfo);
            pagination = this.setPagination(transInfo);

        }

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
                            {states.fundInfo&&states.custInfo&&states.income&&states.fundPortion &&
                                <div className="main-content-body relative">
                               {/*<div className="tabs absolute hide">
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
                                </div>*/}
                                <div className="tabs absolute">
                                    <div className="btn-grounp">
                                        <Link to="/redeem/start" className="btn-sell">赎回</Link>
                                        <Link to="/financingQA/1" className="btn-buy">买入</Link>
                                    </div>
                                </div>
                                <div className="my-financing-content">
                                    <div className="title">
                                        <span className="main-title">签约基金：{states.fundInfo.data.result[0].prdName}</span>
                                        <span className="sub-title">（ 注册号：{states.custInfo.data.clientNo} ）</span>
                                    </div>
                                </div>
                                <div className="my-money clearfix">
                                    <div className="fl money-item">
                                        <div className="item-th">持有资产（元）</div>
                                        {Number(fundPortion.prdValue) !== 0 ?
                                            <div className="item-td"> <span className="num">{Number(fundPortion.prdValue)}</span><span className="unit">万</span> </div> :
                                            <div className="item-td">
                                                <span className="num">暂无投资</span>

                                            </div>}
                                    </div>
                                    <div className="fl money-item">
                                        <div className="item-th">昨日收益（元）</div>
                                        <div className="item-td num">{states.income.data.yesterdayIncome > 0 ? Tool.formatMoney(states.income.data.yesterdayIncome) : '-------'}</div>
                                    </div>
                                    <div className="fl money-item">
                                        <div className="item-th">累计收益（元）</div>
                                        <div className="item-td num">{states.income.data.totalIncome > 0 ? Tool.formatMoney(states.income.data.totalIncome) : '-------'}</div>
                                    </div>
                                </div>
                                {Number(fundPortion.prdValue) === 0 &&
                                    <div className="ant-popover-content">
                                        <div className="ant-popover-arrow"></div>
                                        <div className="ant-popover-inner">
                                            <div>
                                                <div className="ant-popover-title">
                                                    <div className="prdValue-title">为保证理财收益，请尽快通过银行柜台、在线网银等方式将资金转入以下账户：</div>
                                                </div>
                                                <div className="ant-popover-inner-content">
                                                    <div className="tip-noprd">
                                                        <p>账户：金蝶互联网金融服务有限公司</p>
                                                        <p>账号：123456789012</p>
                                                        <p>支行名称：中国银行高新园支行</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="notice-text pb4">* 投资收益将在每日24:00更新</div>
                                {fundPortion.onwayAmt > 0 && <div>
                                    <div className="money-ontheway-label">
                                        在途资金（元）
                                    </div>
                                    <div className="money-ontheway">
                                        <span className="num">{fundPortion.onwayAmt}</span><span className="unit">万</span>
                                        <Link className="btn-revoke blue" to="/revoke/start">撤回（出金）</Link>
                                    </div>
                                    <div className="notice-text">* 在途资金将于下个工作日15:00转入基金账户中，在资金转入之前可进行撤回操作</div>
                                </div>}

                            </div>}
                        </div>
                        <div className="trade-records container">
                            <div className="records-header relative">
                                <div className="header-left handle-filter">
                                    {businList.map((it) => {
                                        return (<div onClick={(code) => {this.changeBusin(it.code)}} className={'handle-item ' + (it.code === this.state.busin ? 'active' : '')}>{it.text}</div>)
                                    })}
                                </div>
                                <div className="header-right absolute">
                                    <div className="date-box">
                                        <span className="data-label">日期</span>
                                        <span className="date">
                                            <DatePicker defaultValue={moment(this.state.startDate, 'YYYYMMDD')} locale={locale} onChange={(obj,str) => {this.dateChange(obj,str,'startDate')}} />
                                            <span className="line">—</span>
                                            <DatePicker defaultValue={moment(this.state.endDate, 'YYYYMMDD')} locale={locale} onChange={(obj,str) => {this.dateChange(obj,str,'startDate')}} />
                                        </span>
                                    </div>
                                    <div className="btn-query" onClick={()=>{this.queryTransInfo()}}>查询</div>
                                </div>
                            </div>
                            <div className="records-body">
                                <div className="table">
                                    <Table dataSource={dataSource} pagination={pagination} columns={columns} ></Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { myFinancing: state.myFinancing } })(
    SubPageWarpper({
        title: '我的理财',
        child: MyFinancing
    }));
