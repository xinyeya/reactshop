import React from "react";
import {connect} from 'react-redux';
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/address/add.css'

class AddressAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
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
                <SubHeaderComponent title={"添加收货地址"}></SubHeaderComponent>
                {/*主体*/}
                <div className={Css['main']}>
                    <ul>
                        <li>收货人</li>
                        <li>
                            <input type="text" placeholder={"收货人姓名"}/>
                        </li>
                    </ul>
                    <ul>
                        <li>联系方式</li>
                        <li>
                            <input type="text" placeholder={"联系人手机号"}/>
                        </li>
                    </ul>
                    <ul>
                        <li>所在地区</li>
                        <li>
                            <input type="text" className={Css['area']} placeholder={"请选择收货地址"} readOnly/>
                        </li>
                    </ul>
                    <ul>
                        <li>详细地址</li>
                        <li>
                            <input type="text" placeholder={"街道详细地址"}/>
                        </li>
                    </ul>
                    <ul>
                        <li>设为默认地址</li>
                        <li>
                            <input type="checkbox"/>
                        </li>
                    </ul>
                    <button type={"button"} className={Css['submit-save']}>保存</button>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(AddressAdd);