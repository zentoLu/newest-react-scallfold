import React from 'react'
import SubPageWarpper from 'globalComponents/common/SubPageWarpper.js'
import { connect } from 'react-redux'
class Index extends React.Component {
    render() {
        //console.log(this.props);
        const { index } = this.props;
        const action = type => this.props.dispatch({ type })
        const onIncrementAsync = () => action('INCREMENT_ASYNC')
        const onIncrement = () => action('INCREMENT')
        return (
            <div className="page-financing-index">
                <div className="container clearfix">
                    首页{index}
                    <div className="btn btn-apply">立即申购</div>
                    <button onClick={onIncrement}>
          Increment
        </button>
        <button onClick={onIncrementAsync}>
          IncrementAsync
        </button>
                </div>

            </div>
        );
    }
}


export default connect((state) => { return { index: state.index } })(
    SubPageWarpper({
        title: '现金盈',
        child: Index
    }));
