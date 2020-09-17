import React from 'react';
import Css from './subheader.css';
import {withRouter} from 'react-router';
class SubHeaderComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){

    }

    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    // 返回上一页
    goBack() {
        this.props.history.goBack()
    }

    render(){
        return(
            <div className={Css['sub-header']}>
                <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                <div className={Css['text']}>{this.props.title}</div>
                <div className={this.props['right-text']?Css['right-btn']:Css['right-btn'] + " hide"}>{this.props['right-text']}</div>
            </div>
        );
    }
}

export default withRouter(SubHeaderComponent);