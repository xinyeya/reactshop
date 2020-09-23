import React from "react";
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/address/index.css'
import {safeAuth} from "../../../assets/js/utils/util";

class AddressIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // safeAuth(props);
    }

    componentDidMount() {
    }

    pushPage(url) {
        this.props.history.push(config.path+url);
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title={"选择收货地址"}></SubHeaderComponent>
                <div className={Css['main']}>
                    <div className={Css['address-nav']}>
                        <div className={Css['address-nav-name-1']}>
                            配送地址
                        </div>
                        <div className={Css['address-nav-name-2']} onClick={this.pushPage.bind(this, 'address/add')}>
                            +添加收货地址
                        </div>
                    </div>
                    {/*收货地址列表*/}
                    <div className={Css['address-list']}>
                        <div className={Css['address-info-wrap']+" "+Css['default']}>
                            {/*默认图标*/}
                            <div className={Css['check-mark']}></div>
                            {/*地址信息*/}
                            <div className={Css['address-info']}>
                                <div className={Css['persion']}>
                                    <span>张三</span>
                                    <span>13717263515</span>
                                </div>
                                {/*默认位置*/}
                                <div className={Css['address']}>
                                    <span className={Css['default']}>默认</span>
                                    <span className={Css['text']}>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                                </div>
                            </div>
                        </div>
                        {/*操作*/}
                        <div className={Css['handle-wrap']}>
                            <div className={Css['edit']}></div>
                            <div className={Css['del']}></div>
                        </div>
                    </div>
                    {/*没有默认的*/}
                    <div className={Css['address-list']}>
                        <div className={Css['address-info-wrap']}>
                            {/*默认图标*/}
                            {/*地址信息*/}
                            <div className={Css['address-info']}>
                                <div className={Css['persion']}>
                                    <span>张三</span>
                                    <span>13717263515</span>
                                </div>
                                {/*默认位置*/}
                                <div className={Css['address']}>
                                    <span className={Css['text']}>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                                </div>
                            </div>
                        </div>
                        {/*操作*/}
                        <div className={Css['handle-wrap']}>
                            <div className={Css['edit']}></div>
                            <div className={Css['del']}></div>
                        </div>
                    </div>
                    <div className={Css['address-list']}>
                        <div className={Css['address-info-wrap']}>
                            {/*默认图标*/}
                            {/*地址信息*/}
                            <div className={Css['address-info']}>
                                <div className={Css['persion']}>
                                    <span>张三</span>
                                    <span>13717263515</span>
                                </div>
                                {/*默认位置*/}
                                <div className={Css['address']}>
                                    <span className={Css['text']}>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                                </div>
                            </div>
                        </div>
                        {/*操作*/}
                        <div className={Css['handle-wrap']}>
                            <div className={Css['edit']}></div>
                            <div className={Css['del']}></div>
                        </div>
                    </div>
                    <div className={Css['address-list']}>
                        <div className={Css['address-info-wrap']}>
                            {/*默认图标*/}
                            {/*地址信息*/}
                            <div className={Css['address-info']}>
                                <div className={Css['persion']}>
                                    <span>张三</span>
                                    <span>13717263515</span>
                                </div>
                                {/*默认位置*/}
                                <div className={Css['address']}>
                                    <span className={Css['text']}>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                                </div>
                            </div>
                        </div>
                        {/*操作*/}
                        <div className={Css['handle-wrap']}>
                            <div className={Css['edit']}></div>
                            <div className={Css['del']}></div>
                        </div>
                    </div>
                    <div className={Css['address-list']}>
                        <div className={Css['address-info-wrap']}>
                            {/*默认图标*/}
                            {/*地址信息*/}
                            <div className={Css['address-info']}>
                                <div className={Css['persion']}>
                                    <span>张三</span>
                                    <span>13717263515</span>
                                </div>
                                {/*默认位置*/}
                                <div className={Css['address']}>
                                    <span className={Css['text']}>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                                </div>
                            </div>
                        </div>
                        {/*操作*/}
                        <div className={Css['handle-wrap']}>
                            <div className={Css['edit']}></div>
                            <div className={Css['del']}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(AddressIndex);