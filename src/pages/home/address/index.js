import React from "react";
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/address/index.css'
import {safeAuth} from "../../../assets/js/utils/util";
import {Modal, Toast} from "antd-mobile";
import {request} from "../../../assets/js/libs/request";

class AddressIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aAddress: []
        };
        safeAuth(props);
    }

    componentDidMount() {
        this.getAddress();
    }

    // 跳转页面
    pushPage(url) {
        this.props.history.push(config.path+url);
    }

    // 获取收货地址列表
    getAddress() {
        let sUrl = config.baseUrl+"/api/user/address/index?uid="+this.props.state.user.uid+"&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aAddress: res.data
                })
            }
        })
    }

    // 删除收货地址
    delAddress(e,index,aid){
        e.stopPropagation();
        Modal.alert('', '确认要删除吗？', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                    let aAddress=this.state.aAddress;
                    aAddress.splice(index, 1);
                    this.setState({aAddress:aAddress});
                    let sUrl=config.baseUrl+"/api/user/address/del?uid="+this.props.state.user.uid+"&aid="+aid+"&token="+config.token;
                    request(sUrl).then(res=>{
                        if (res.code===200){
                            if (aid === sessionStorage['addressId']){
                                sessionStorage.removeItem("addressId");
                            }
                            if (aid === localStorage['addressId']){
                                localStorage.removeItem("addressId");
                            }
                        }
                    });
                }
            }
        ]);
    }

    // 修改收货地址
    modAddress(e, aid) {
        e.stopPropagation();
        this.pushPage('address/mod?aid='+aid);
    }

    // 选择收货地址
    selectAddress(aid) {
        sessionStorage['addressId'] = aid;
        this.props.history.replace(config.path+"balance/index");
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
                    {
                        this.state.aAddress.length > 0 ? this.state.aAddress.map((item, index)=>{
                            return (
                                <div key={index} className={Css['address-list']} onClick={this.selectAddress.bind(this, item.aid)}>
                                    <div className={Css['address-info-wrap']+" "+Css['default']}>
                                        {/*默认图标*/}
                                        {
                                            item.isdefault === '1' ? <div className={Css['check-mark']}></div> : ''
                                        }
                                        {/*地址信息*/}
                                        <div className={Css['address-info']}>
                                            <div className={Css['persion']}>
                                                <span>{item.name}</span>
                                                <span>{item.cellphone}</span>
                                            </div>
                                            {/*默认位置*/}
                                            <div className={Css['address']}>
                                                {
                                                    item.isdefault === '1' ? <span className={Css['default']}>默认</span> : ''
                                                }
                                                <span className={Css['text']}>{item.province} {item.city} {item.area} {item.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/*操作*/}
                                    <div className={Css['handle-wrap']}>
                                        <div className={Css['edit']} onClick={(e)=>{this.modAddress(e, item.aid)}}></div>
                                        <div className={Css['del']} onClick={(e)=>{this.delAddress(e, index, item.aid)}}></div>
                                    </div>
                                </div>
                            )
                        }):""
                    }
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(AddressIndex);