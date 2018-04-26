import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js';
import Tool from 'tool';
import { ajaxPost } from 'request';
class SurrenderSuccess extends React.Component {
    constructor(props) {
        super(props)
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
    }

    render() {
        const { surrender } = this.props;
        const { states } = surrender;
        return (
            <div className="indentityBox">
                <div className="container finance-account-finish">
                    <div className="crumbs">
                        <a href="/">首页</a>
                        <a href="javascript:;">现金盈基金</a>
                        <a href="javascript:;">解约基金</a>
                    </div>
                    <div className="page-surrender tac">
                        <div className="finish">
                            <div className="icon-finish"></div>
                            <div className="finish-text">完成解约</div>
                        </div>
                        {states.custInfo && <div className="notice-text">
                            <p>账户内剩余在途资金将自动撤回至绑定账户</p>
                            <p>{states.custInfo.data.clientName}（{Tool.formatBankNo(states.custInfo.data.bankNo)}）</p>
                            <p>如需继续进行理财，可再次进行开通基金账户</p>
                        </div>}
                        <div className="btn-box">
                            <Link to="/myFinancing" className="btn btn-my-financing">查看我的理财</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => { return { surrender: state.surrender } })(
    SubPageWarpper({
        title: '我的理财',
        child: SurrenderSuccess
    }));
