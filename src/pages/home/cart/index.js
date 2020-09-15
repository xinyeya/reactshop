import React from 'react';
export default class  CartIndex extends React.Component{
    componentDidMount(){

    }
    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    render(){
        return(
            <div>
                购物车
            </div>
        );
    }
}