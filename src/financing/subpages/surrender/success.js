import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
class SurrenderSuccess extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                        <div className="notice-text">
                            <p>账户内剩余在途资金将自动撤回至绑定账户</p>
                            <p>金蝶互联网金融服务有限公司（6227 0033 2414 0554 910）</p>
                            <p>如需继续进行理财，可再次进行开通基金账户</p>
                        </div>
                        <div className="btn-box">
                            <div className="btn btn-my-financing">查看我的理财</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  SubPageWarpper({
    title: '我的理财',
    child: SurrenderSuccess
});

