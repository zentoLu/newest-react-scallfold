import React from 'react';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
class FinancingQA extends React.Component {
    render() {
        //console.log(this.props);
        let qid = Number(this.props.match.params.qid) - 1;
        return (
            <div className="page-financing-qa">
                <div className="container clearfix">
                    <div className="aside fl">
                        <div className="aside-header">
                            理财常见问题
                        </div>
                        <div className="aside-body">
                            <ul className="question-list">
                                {qa.map((it, i) => {
                                    //console.log(it, i);
                                    return <li><a href={'#/financingQA/' + Number(i + 1)} className={'question-item ' + (qid === i ? 'active': '')}><span className="icon-dot"></span>{it.question}</a></li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="indentityBox">
                        <div className="container main-content">
                            <div className="crumbs">
                                <a href="/">首页</a>
                                <a href="javascript:;">理财常见问题</a>
                            </div>
                            <div className="main-content-body relative">
                                <div className="question">{qa[qid].question}</div>
                                <div className="answer">{qa[qid].answer}</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

const qa = [{
    question: '什么是现金盈？',
    answer: '金蝶金融是由金蝶集团旗下金融平台，联合业内知名的银行、融资服务公司、小额贷款公司等专业金融机构，结合企业的ERP的财务与业务数据，为金蝶客户提供审批快、额度高、利率低的贷款服务。'
},{
    question: '现金盈有哪些特点？',
    answer: '金蝶金融是由金蝶集团旗下金融平台，联合业内知名的银行、融资服务公司、小额贷款公司等专业金融机构，结合企业的ERP的财务与业务数据，为金蝶客户提供审批快、额度高、利率低的贷款服务。'
},{
    question: '现金盈怎么开户？',
    answer: '金蝶金融是由金蝶集团旗下金融平台，联合业内知名的银行、融资服务公司、小额贷款公司等专业金融机构，结合企业的ERP的财务与业务数据，为金蝶客户提供审批快、额度高、利率低的贷款服务。'
},{
    question: '如何购买？',
    answer: '金蝶金融是由金蝶集团旗下金融平台，联合业内知名的银行、融资服务公司、小额贷款公司等专业金融机构，结合企业的ERP的财务与业务数据，为金蝶客户提供审批快、额度高、利率低的贷款服务。'
},{
    question: '如何赎回？',
    answer: '金蝶金融是由金蝶集团旗下金融平台，联合业内知名的银行、融资服务公司、小额贷款公司等专业金融机构，结合企业的ERP的财务与业务数据，为金蝶客户提供审批快、额度高、利率低的贷款服务。'
},{
    question: '收益怎么计算？',
    answer: '金蝶金融是由金蝶集团旗下金融平台，联合业内知名的银行、融资服务公司、小额贷款公司等专业金融机构，结合企业的ERP的财务与业务数据，为金蝶客户提供审批快、额度高、利率低的贷款服务。'
},]

export default  SubPageWarpper({
    title: '理财常见问题',
    nav: 'financingQA',
    child: FinancingQA
});

