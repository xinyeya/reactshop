import React from 'react';
import Css from './subheader.css';
import {withRouter} from 'react-router';
import config from "../../assets/js/conf/config";
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
        if (this.props.location.pathname === config.path+'address/index') {
            this.props.history.replace(config.path+'balance/index')
        }else{
            this.props.history.goBack()
        }
    }

    // 向父组件传值
    getClick() {
        this.props['onClickRightBtn']();
    }

    render(){
        return(
            <div className={Css['sub-header']}>
                <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                <div className={Css['text']}>{this.props.title}</div>
                <div className={this.props['right-text']?Css['right-btn']:Css['right-btn'] + " hide"} onClick={this.getClick.bind(this)}>{this.props['right-text']}</div>
            </div>
        );
    }
}

export default withRouter(SubHeaderComponent);