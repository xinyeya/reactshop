import React from "react";
import {connect} from 'react-redux';
import Css from "../../../assets/css/user/address/index.css";
import SubHeaderComponent from "../../../components/header/subheader";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {setScrollTop} from "../../../assets/js/utils/util";

class UserAddressIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: []
        }
    }

    componentDidMount() {
        setScrollTop();
        this.getData();
    }

    // 获取数据
    getData() {
        let url = config.baseUrl+"/api/user/address/index?uid="+this.props.state.user.uid+"&token="+config.token;
        request(url).then(res=>{
            if (res.code === 200) {
                this.setState({
                    datas: res.data
                })
            }
        })
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
                <SubHeaderComponent title={"收货地址管理"}></SubHeaderComponent>
                <div className={Css['main']}>
                    {
                        this.state.datas!==null&&this.state.datas.length > 0 ?
                            this.state.datas.map((item, index)=>{
                                return (
                                    <div className={Css['list']} key={index} onClick={this.pushPage.bind(this, "user/address/mod?aid="+item.aid)}>
                                        <div className={Css['name-wrap']}>
                                            <span>{item.name}</span>
                                            <span>{item.cellphone}</span>
                                        </div>
                                        {/*地址*/}
                                        <div className={Css['address']}>
                                            {
                                                item.isdefault === "1" ?
                                                    <span>默认</span> : ""
                                            }
                                            {item.province}{item.city}{item.area}{item.address}
                                        </div>
                                        {/*右箭头*/}
                                        <div className={Css['right-arrow']}></div>
                                    </div>
                                )
                            }):""
                    }
                    <div style={{width: "100%",height: "1.3rem"}}></div>
                </div>
                <div className={Css['add-btn']} onClick={this.pushPage.bind(this, "address/add")}>
                    +添加收货地址
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(UserAddressIndex);