import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ajaxPost } from 'request'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
const env = process.env.NODE_ENV;
class Index extends React.Component {
    constructor(props) {
        super(props)
        //this.isLegal = this.isLegal.bind(this)
        if (env !== 'production') {
            ajaxPost('/user/login', {
                name: '18816833338',
                password: '123456zxc',
                type: 'GW'
            }, (data) => {
                console.log(data);
            });
        }

        ajaxPost('/front/financing.do?action=getCustStatus', {}, (data) => {
            console.log(data);
        });

        ajaxPost('/front/financing.do?action=getMaterial', {}, (data) => {
            /*this.props.dispatchState({
                material: data
            })*/
            let values = Object.assign({}, data.data),
                list = [],
                imgList = values.applyImgList,
                imgMap = {};
            values.bankCity = values.bankCity.split(',');
            values.addressPrefix = values.addressPrefix.split(',');

            imgList.map((it, i) => {
                imgMap[it.imgType] = {
                    name: it.imgName,
                    base64: it.img
                }
            });
            //生成图片列表
            ['legalIdFront', 'legalIdBack', 'idFront', 'idBack', 'busCert'].map((it, i) => {
                let typeMap = ['1', '2', '3', '4', 'C'];
                let type = typeMap[i];
                if (imgMap[type]) {
                    values[it] = imgMap[type];
                }

            })
            console.log(values);
            delete values.applyImgList; //清空
            this.props.dispatchForm(values)
            //this.props.dispatchState({ formatMaterial: values })
        });

    }

    isLegal(isLegal) {
        //console.log(this.props.account.states.isLegal)
        this.props.dispatchState({ isLegal: isLegal });
    }

    handleNext() {
        const isLegal = this.props.account.states.isLegal
        if (isLegal) {
            location.hash = '#/addMaterial'
        } else {
            location.hash = '#/material'
        }
    }

    render() {
        const isLegal = this.props.account.states.isLegal
        console.log(isLegal);
        return (
            <div className="indentityBox page-finance-account">
                <div className="container">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">开户</a>
                    </div>
                    <div className="steps">
                        <div className="step step1"><img src={require( '../../img/confirm-indentity-icon1.png')} alt="企业理财" /></div>
                        <div className="step step2">2</div>
                        <div className="step step3">3</div>
                        <div className="step step4">4</div>
                        <div className="line-box" >
                            <div className="line" ></div>
                            <div className="line" ></div>
                            <div className="line" ></div>
                        </div>
                        <div className="text">
                            <span className="active">确认身份</span>
                            <span>设置管理</span>
                            <span>补充信息</span>
                            <span>提交审核</span>
                        </div>
                    </div>
                    <p>民生银行开户需要将您设置为管理员，请问您是否为公司法定代表人？</p>
                    <div className="chooseBox clearfix">
                        <div className={'choose choose1' + (isLegal?' active':'')} onClick={() => {this.isLegal(true)}}>我是法定代表人</div>
                        <div className={'choose choose2' + (isLegal?'':' active')} onClick={() => {this.isLegal(false)}}>我不是法定代表人</div>
                    </div>
                    <div className="nextStep" onClick={() => {this.handleNext()}}>下一步</div>
                </div>
            </div>
        );
    }
}


export default connect((state) => {
    return {
        account: state.account
    }
})(SubPageWarpper({
    title: '我的理财',
    child: Index
}));
