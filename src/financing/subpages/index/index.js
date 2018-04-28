import React from 'react';
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
class Index extends React.Component {
    render() {
        //console.log(this.props);
        let qid = Number(this.props.match.params.qid) - 1;
        return (
            <div className="page-financing-index">
                <div className="container clearfix">
                    首页
                    <div className="btn btn-apply">立即申购</div>
                </div>

            </div>
        );
    }
}



export default SubPageWarpper({
    title: '理财常见问题',
    nav: 'index',
    child: Index
});
