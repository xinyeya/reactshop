import React from "react";
import {connect} from 'react-redux'
import action from '../../../actions/index';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/reg/index.css';
import { Switch, Toast } from 'antd-mobile';

class LoginIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            sCellphone: '',
            sPassword: '',
            sType: 'password'
        };
        this.bSubmit = true;
    }

    componentDidMount() {
        document.getElementById("title").innerHTML = "会员登录"
    }

    // 点击登录
    submitData() {
        // 验证手机号是否为空
        if (this.state.sCellphone.match(/^\s*$/)) {
            Toast.info("请输入您的手机号", 2);
            return false;
        }
        // 验证手机号是否输入合法
        if (!this.state.sCellphone.match(/^1[0-9][0-9]{9}/)) {
            Toast.info('您输入的手机号格式不正确', 2);
            return false;
        }

        // 验证密码是否为空
        if (this.state.sPassword.match(/^\s*$/)) {
            Toast.info("请输入密码", 2);
            return false;
        }

        if (this.bSubmit) {
            // 点击登录
            let sUrl = config.baseUrl+"/api/home/user/pwdlogin?token="+config.token;
            request(sUrl, "post", {
                cellphone: this.state.sCellphone,
                password: this.state.sPassword
            }).then(res=>{
                if (res.code === 200) {
                    localStorage['uid'] = res.data.uid;
                    localStorage['nickname'] = res.data.nickname;
                    localStorage['authToken'] = res.data.auth_token;
                    localStorage['isLogin'] = true;
                    this.props.dispatch(action.user.login({
                        uid: res.data.uid,
                        nickname: res.data.nickname,
                        authToken: res.data.auth_token,
                        isLogin: true
                    }));
                    this.bSubmit = false;
                    this.props.history.goBack()
                }else{
                    Toast.info(res.data, 2)
                }
            })
        }
    }

    // 显示/隐藏密码
    changePwd(checked) {
        if (checked) {
            this.setState({
                sType: "text"
            })
        }else{
            this.setState({
                sType: "password"
            })
        }
        this.setState({checked: checked});
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    // 跳转注册页面
    pushPage(url) {
        this.props.history.push(config.path+url);
    }

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent
                    title={"会员登录"}
                >
                </SubHeaderComponent>
                {/* 主体*/}
                <div className={Css['main']}>
                    {/*手机号*/}
                    <div className={Css['code-wrap']} style={{marginTop: "0px"}}>
                        <input type="text" placeholder={"手机号"} onChange={e=>{
                            this.setState({
                                sCellphone: e.target.value
                            })
                        }}/>
                    </div>
                    {/*密码*/}
                    <div className={Css['password-wrap']}>
                        {/*密码输入框盒子*/}
                        <div className={Css['password']}>
                            <input type={this.state.sType} placeholder={"密码"} onChange={e=>{
                                this.setState({
                                    sPassword: e.target.value
                                })
                            }}/>
                        </div>
                        {/*显示/隐藏密码*/}
                        <div className={Css['switch-wrap']}>
                            <Switch
                                color={"#EB1625"}
                                checked={this.state.checked}
                                onClick={this.changePwd.bind(this, !this.state.checked)}
                            />
                        </div>
                    </div>
                    {/*登录按钮*/}
                    <div className={Css['sure-btn']} onClick={this.submitData.bind(this)}>
                        登录
                    </div>
                    {/*链接跳转*/}
                    <div className={Css["fastreg-wrap"]}>
                        {/*忘记密码*/}
                        <div>
                            <img src={require("../../../assets/images/home/index/forget.png")} alt="忘记密码"/>
                            忘记密码
                        </div>
                        {/*快速注册*/}
                        <div onClick={this.pushPage.bind(this, 'reg/index')}>
                            <img src={require("../../../assets/images/home/index/reg.png")} alt="忘记密码"/>
                            快速注册
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {
        state
    }
})(LoginIndex);