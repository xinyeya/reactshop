import React from "react";
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/reg/index.css';
import { Switch } from 'antd-mobile';

class RegIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent
                    title={"会员注册"}
                >
                </SubHeaderComponent>
                {/* 主体*/}
                <div className={Css['main']}>
                    {/*注册盒子*/}
                    <div className={Css['cellphone-wrap']}>
                        {/*手机号*/}
                        <div className={Css['cellphone']}>
                            <input type="tel" placeholder={"手机号"}/>
                        </div>
                        {/*短信验证码*/}
                        <div className={Css['code-btn'] + " " + Css['success']}>
                            获取短信验证码
                        </div>
                    </div>
                    {/*输入短信验证码*/}
                    <div className={Css['code-wrap']}>
                        <input type="text" placeholder={"输入短信验证码"}/>
                    </div>
                    {/*密码*/}
                    <div className={Css['password-wrap']}>
                        {/*密码输入框盒子*/}
                        <div className={Css['password']}>
                            <input type="text" placeholder={"请输入密码"}/>
                        </div>
                        {/*显示/隐藏密码*/}
                        <div className={Css['switch-wrap']}>
                            <Switch
                                checked={this.state.checked}
                                onChange={() => {
                                    this.setState({
                                        checked: !this.state.checked
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className={Css['sure-btn']}>
                        注册
                    </div>
                </div>
            </div>
        );
    }
}

export default RegIndex;