import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ajaxPost } from 'request';
import { Table } from 'antd';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
class Manage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ajaxPost('/front/financing.do?action=getCustInfo', {}, (data) => {
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
        ajaxPost('/front/financing.do?action=queryFundInfo', {}, (data) => {
            console.log(data);
            this.props.dispatch({
                type: 'STATE',
                states: { fundInfo: data }
            })
        });
    }

    render() {
        console.log(this.props);
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

        const columns = [{
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '交易状态',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <div class="page-financing-manage">
                <div class="container clearfix">
                    <div class="aside fl">

                    </div>
                    <div class="indentityBox">
                        <div class="container main-content">
                            <div class="crumbs">
                                <a href="/">首页</a>
                                <a href="javascript:;">基金管理</a>
                            </div>
                            <div class="main-content-body relative">
                                {dataSource.length !== 0 ?
                                    <Table dataSource={dataSource} columns={columns} pagination={false}></Table> :
                                    <div className="no-fund">
                                        <div className="no-fund-icon"></div>
                                        <span>暂无申购理财产品</span><a href="">去申购></a>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { manage: state.manage } })(
    SubPageWarpper({
        title: '我的理财',
        child: Manage
    }));
