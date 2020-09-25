import React from "react";
import {connect} from 'react-redux';
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/address/add.css';
import {Picker, Toast} from 'antd-mobile';
import config from "../../../assets/js/conf/config";
import {province} from '../../../assets/data/province';
import {request} from "../../../assets/js/libs/request";
import {localParam} from "../../../assets/js/utils/util";

class AddressMod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultProvince: '', // 所在地区
            sProvince: "",
            sCity: "",
            sArea: "",
            sName: "",
            sCellphone: "",
            sAddress: "",
            bChecked: false
        };
        this.aid = localParam(props.location.search).search.aid;
        console.log(this.aid)
    }

    componentDidMount() {
        this.getAddress();
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    // 获取收货地址信息
    getAddress() {
        let sUrl = config.baseUrl+"/api/user/address/info?uid="+this.props.state.user.uid+"&aid="+this.aid+"&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    sName: res.data.name,
                    sCellphone: res.data.cellphone,
                    sProvince: res.data.province,
                    sCity: res.data.city,
                    sArea: res.data.area,
                    sAddress: res.data.address,
                    bChecked: res.data.isdefault === '1' ? true : false,
                    defaultProvince: `${res.data.province} ${res.data.city} ${res.data.area}`
                })
            }
        })
    }

    // 提交数据
    submitData() {
        // 验证收货人姓名
        if (this.state.sName.match(/^s*$/)) {
            Toast.info("请输入收货人姓名", 2);
            return false;
        }
        // 验证手机号
        if (this.state.sCellphone.match(/^s*$/)) {
            Toast.info("请输入联系人手机号", 2);
            return false;
        }
        // 验证是否合法
        if (!this.state.sCellphone.match(/^1[0-9][0-9]{9}/)) {
            Toast.info("您输入的手机号不正确", 2);
            return false;
        }
        // 验证收货地区
        if (this.state.defaultProvince.match(/^s*$/)) {
            Toast.info("请选择所在地区", 2);
            return false;
        }
        // 验证详细地址
        if (this.state.sAddress.match(/^s*$/)) {
            Toast.info("请输入详细地址", 2);
            return false;
        }
        let url = config.baseUrl+"/api/user/address/mod?token="+config.token;
        let data = {
            aid: this.aid,
            uid: this.props.state.user.uid,
            name: this.state.sName,
            cellphone: this.state.sCellphone,
            province: this.state.sProvince,
            city: this.state.sCity,
            area: this.state.sArea,
            address: this.state.sAddress,
            isdefault: this.state.bChecked?"1":"0"
        };
        request(url, "post", data).then(res=>{
            if (res.code === 200) {
                // 如果添加的是默认地址，则直接存储到缓存里
                if (this.state.bChecked) {
                    localStorage['addressId'] = this.aid;
                    sessionStorage.removeItem('addressId');
                }else{
                    localStorage.removeItem("addressId");
                }
                Toast.info('修改成功', 1, ()=>{
                    this.props.history.replace(config.path+"address/index");
                });
            }else{
                Toast.info(res.data, 2)
            }
        })
    }

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title={"修改收货地址"}></SubHeaderComponent>
                {/*主体*/}
                <div className={Css['main']}>
                    <ul>
                        <li>收货人</li>
                        <li>
                            <input type="text" value={this.state.sName} placeholder={"收货人姓名"} onChange={e=>{
                                this.setState({
                                    sName: e.target.value
                                })
                            }}/>
                        </li>
                    </ul>
                    <ul>
                        <li>联系方式</li>
                        <li>
                            <input type="text" value={this.state.sCellphone} placeholder={"联系人手机号"} onChange={e=>{
                                this.setState({
                                    sCellphone: e.target.value
                                })
                            }}/>
                        </li>
                    </ul>
                    <ul>
                        <li>所在地区</li>
                        <Picker
                            data={province}
                            title="选择地区"
                            onOk={e => {
                                this.setState({
                                    defaultProvince: e.join(" "),
                                    sProvince: e[0],
                                    sCity: e[1],
                                    sArea: e[2] !== undefined ? e[2] : ""
                                })
                            }}
                        >
                            <li>
                                <input type="text" className={Css['area']} placeholder={"请选择收货地址"} readOnly value={this.state.defaultProvince}/>
                            </li>
                        </Picker>
                    </ul>
                    <ul>
                        <li>详细地址</li>
                        <li>
                            <input type="text" value={this.state.sAddress} placeholder={"街道详细地址"} onChange={e=>{
                                this.setState({
                                    sAddress: e.target.value
                                })
                            }}/>
                        </li>
                    </ul>
                    <ul>
                        <li>设为默认地址</li>
                        <li>
                            <input type="checkbox" checked={this.state.bChecked} onChange={e=>{
                                this.setState({
                                    bChecked: !this.state.bChecked
                                })
                            }}/>
                        </li>
                    </ul>
                    <button type={"button"} className={Css['submit-save']} onClick={this.submitData.bind(this)}>保存</button>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(AddressMod);