import React from 'react';

//通用的action
const formAction = function(values) {
    return {
        type: 'FORM',
        values
    }
}

const stateAction = function(values) {
    return {
        type: 'STATE',
        values
    }
}

function SubPageWarpper(option) {
    const Child = option.child;
    //console.log('sub', option);
    class Parent extends React.Component {
        constructor(props) {
            super(props);
            this.state = { loading: option.beforeLoad ? true : false };
        }

        componentDidMount() {
            var me = this;
            if (option.beforeLoad) {
                Promise.all(option.beforeLoad).then((datas) => {
                    console.log(datas);
                    me.props.dispatch({
                        type: 'STATE',
                        states: { initDatas: datas }
                    })
                    //debugger;
                    me.setState({
                        loading: false
                    });
                }).catch(function(err) {
                    console.log(err);
                });
            }

        }

        render() {
            const { props } = this;
            const Loading = <div>加载中...</div>
            const dispatchForm = (values, e) => {
                if (e) {
                    values.eventType = e.type;
                    values.id = e.target.id;
                }
                return props.dispatch(formAction(values));
            }
            const dispatchState = (state) => {
                return props.dispatch(formAction(state));
            }
            return (
                <div>
                    <SubHead {...option} />
                    { this.state.loading ? Loading : <Child dispatchForm={dispatchForm} dispatchState={dispatchState} {...props} /> }
                    <Foot />
                    <ToolBar />
                </div>
            )
        }
    }

    return Parent;
}

const SubHead = (props) => {
    document.title = props.title;
    const nav = props.nav || 'financing';
    const navs = [{
        nav: 'index',
        cnName: '官网首页',
        link: '/'
    }, {
        nav: 'financing',
        cnName: '企业理财',
        link: '/financing.html#/'
    }, {
        nav: 'financingQA',
        cnName: '常见问题',
        link: '/financing.html#/financingQA/1'
    }];
    return (
        <div className="header">
            <div className="container clearfix">
                <div className="title fl clearfix">
                    <a href="/" className="logo fl"></a>
                    <div className="sub-title">企业理财</div>
                </div>
                <div className="customer-service fr">
                    <div className="hotline inline-block">客服热线：4008 830 822</div>
                    <div className="contact inline-block">
                        <span className="icon-contact-service"></span>
                        <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzNDI3MV8yODI5NzZfNDAwODgzMDgyMl8yXw" className="service-text" title="在线客服" target="_blank">在线客服</a>
                    </div>
                </div>
                <div className="navs">
                    { navs.map((it) => {
                        return  (
                            <div className={'nav-item inline-block ' + (nav === it.nav ? 'active' : '')}>
                                <a href={it.link}>{it.cnName}</a>
                            </div>)
                        }) }
                </div>
            </div>
        </div>
    )
}

const Foot = () => (
    <div className="foot">
        <div className="container">
            <div className="footer-content clearfix">
                <div className="footer-about">
                    <div className="footer-title">关于金蝶金融</div>
                    <div className="footer-about-text">金蝶金融，是金蝶软件旗下金融平台，旨在有效的连接金蝶软件企业与金融机构，帮助金融机构加速了解企业真实运营状况进行贷款审批。</div>
                </div>
                <div className="footer-tag">
                    <div className="footer-title">热门标签</div>
                    <div className="footer-tag-list">
                        <a>金蝶金融</a>
                        <a>KIS用户</a>
                        <a>申请放款</a><br />
                        <a>专享</a>
                        <a>个人贷款</a>
                        <a>低息</a>
                    </div>
                </div>
                <div className="footer-contact">
                    <div className="footer-title">联系我们</div>
                    <div className="footer-contact-text">
                        <p>客服热线<a href="tel:4008830822" className="footer-tel text-num">4008 830 822 (09:00-18:00)</a></p>
                        <p>电子邮箱<a href="mailto:kdjr@kingdee.com" className="text-num">kdjr@kingdee.com</a></p>
                    </div>
                </div>
            </div>
            <div className="sub-footer">
                <div className="footer-link">
                    <a data-href="http://kingdee.com/" target="_blank" data-statistics="互联网金融官网-底部信息-金蝶官网">金蝶官网</a> | <a data-href="http://8.kingdee.com//jsp/help/connectUs.jsp" data-statistics="互联网金融官网-底部信息-联系我们">联系我们</a> | <a data-href="http://8.kingdee.com//front/indexNotLogin.do?action=viewAgreement&amp;id=202" target="_blank" data-statistics="互联网金融官网-底部信息-服务条款">服务条款</a> | <a data-href="http://club.kisdee.com/forum.php?mod=forumdisplay&amp;fid=863" target="—_blank" data-statistics="互联网金融官网-底部信息-论坛">论坛</a> | <a data-href="http://8.kingdee.com//jsp/help/help-center-home.jsp" data-statistics="互联网金融官网-底部信息-帮助中心">帮助中心</a>
                </div>
                <div className="footer-copyright">©1993-2018 金蝶国际软件集团有限公司    粤ICP备 05041751 号</div>
                <div className="footer-share">
                    <a href="javascript:void(0)" className="footer-share-wechat" title="关注官方微信号"><div className="wechat-qrimg"></div></a>
                    <a data-href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzNDI3MV8yODI5NzZfNDAwODgzMDgyMl8yXw" target="_blank" className="footer-share-qq" id="wpaQQ2" title="联系客服" data-statistics="互联网金融官网-底部信息-联系客服"></a>
                    <a data-href="http://weibo.com/u/5396510688" target="_blank" className="footer-share-weibo" title="关注官方微博" data-statistics="互联网金融官网-底部信息-关注官方微博"></a>
                </div>
            </div>
        </div>
    </div>
)

const ToolBar = () => (
    <div className="fixed-toolbar">
        {/*<a className="sidebar-online" data-href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzNDI3MV8yODI5NzZfNDAwODgzMDgyMl8yXw" title="在线客服" target="_blank" data-statistics="互联网金融官网-侧边栏-在线客服"><i className="sidebar-online-icon"></i>在线客服</a>*/}
        <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzNDI3MV8yODI5NzZfNDAwODgzMDgyMl8yXw" className="sidebar sidebar-online" title="在线客服" target="_blank">
            <i className="icon-sidebar-online"></i>
            <span>在线客服</span>
        </a>

        <a href="javascript:;" className="sidebar sidebar-hotline js-hover" title="客服热线" target="_blank" data-target="kdjr-hotline">
            <i className="icon-sidebar-hotline"></i>
            <span>客服热线</span>
            <div className="sidebar-tooltip sidebar-hotline-box" id="kdjr-hotline">
                <span className="tooltip-title">4008 830 822</span>
            </div>
        </a>

        <a href="javascript:;" className="sidebar sidebar-wechat js-hover" id="sidebar-wechat" title="微信公众号" data-target="kdjr-qrcode">
            <i className="icon-sidebar-wechat"></i>
            <span>微信公众号</span>
            <div className="sidebar-tooltip sidebar-qrcode-box" id="kdjr-qrcode">
                <img src={require( '../../img/v3/qr_kdjr_8.jpg')} alt="金蝶金融" />
                <span className="tooltip-title">最贴心的贷款专家</span>
            </div>
        </a>

        <a href="/jsp/help/help-center-download/kisAmountTest.jsp" className="sidebar sidebar-tool" title="工具" target="_blank">
            <i className="icon-sidebar-tool"></i>
            <span>工具</span>
        </a>
    </div>
)

export default SubPageWarpper
