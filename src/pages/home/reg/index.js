import React from "react";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeaderComponent from "../../../components/header/subheader";
import Css from '../../../assets/css/home/reg/index.css';
import { Switch, Toast } from 'antd-mobile';

class RegIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            sCellphone: '',
            bCodeSuccess: false,
            sCodeText: "获取短信验证码",
            sCode: '',
            sPassword: '',
            sType: 'password'
        };
        this.timer = null;
        this.bSendCode = true;
    }

    componentDidMount() {
        this.isSameCellphone()
    }

    // 检查手机号是否合法
    checkCellphone(e) {
        this.setState({
            sCellphone: e.target.value
        }, ()=>{
            if (this.bSendCode) {
                if (this.state.sCellphone.match(/^1[0-9][0-9]{9}/)) {
                    this.bSendCode = true;
                    this.setState({
                        bCodeSuccess: true
                    });
                }else{
                    this.setState({
                        bCodeSuccess: false
                    });
                }
            }
        })
    }

    // 获取验证码
    async getCode() {
        if (this.bSendCode && this.state.bCodeSuccess) {
            this.bSendCode = false;

            // 验证手机号是否已经注册
            let resData = await this.isSameCellphone();
            if (resData.code === 200) {
                if (resData.data.isreg === "1") {
                    Toast.info("您输入的手机号已存在", 2);
                    return false;
                }
            }

            // 禁用发送验证码按钮
            let iTime = 10;
            this.setState({
                sCodeText: `重新发送${iTime}s`,
                bCodeSuccess: false
            });

            // 按钮倒计时
            this.timer = setInterval(() => {
                if (iTime>0) {
                    iTime--;
                    this.setState({
                        sCodeText: `重新发送${iTime}s`
                    });
                }else{
                    clearInterval(this.timer);
                    this.setState({
                        bCodeSuccess: true,
                        sCodeText: `获取短信验证码`
                    });
                    this.bSendCode = true;
                }
            }, 1000);
        }
    }

    // 点击注册按钮提交数据
    async submitData() {
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

        // 验证手机号是否已经存在
        let resData = await this.isSameCellphone();
        if (resData.code === 200) {
            if (resData.data.isreg === "1") {
                Toast.info("您输入的手机号已存在", 2);
                return false;
            }
        }

        // 验证短信验证码是否为空
        if (this.state.sCode.match(/^\s*$/)) {
            Toast.info("请输入短信验证码", 2);
            return false;
        }

        // 验证密码是否为空
        if (this.state.sPassword.match(/^\s*$/)) {
            Toast.info("请输入密码", 2);
            return false;
        }

        let sUrl = config.baseUrl+"/api/home/user/reg?token="+config.token;
        request(sUrl, "post", {
            vcode: this.state.sCode,
            cellphone: this.state.sCellphone,
            password: this.state.sPassword
        }).then(res=>{
            if (res.code === 200) {
                this.props.history.goBack();
            }
        })
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
        clearInterval(this.timer);
        this.setState = (state, callback) => {
            return;
        }
    }

    // 检测手机号是否注册过
    isSameCellphone() {
        let sUrl = config.baseUrl+"/api/home/user/isreg?token="+config.token;
        // 解决毁掉地狱
        return request(sUrl, "post", {
            username: this.state.sCellphone
        }).then(res=>{
            return res;
        })
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
                            <input type="tel" placeholder={"手机号"} onChange={e=>{
                                this.checkCellphone(e)
                            }}/>
                        </div>
                        {/*短信验证码*/}
                        <div className={this.state.bCodeSuccess ? Css['code-btn'] + " " + Css['success'] : Css['code-btn']} onClick={this.getCode.bind(this)}>
                            {this.state.sCodeText}
                        </div>
                    </div>
                    {/*输入短信验证码*/}
                    <div className={Css['code-wrap']}>
                        <input type="text" placeholder={"输入短信验证码"} onChange={e=>{
                            this.setState({
                                sCode: e.target.value
                            })
                        }}/>
                    </div>
                    {/*密码*/}
                    <div className={Css['password-wrap']}>
                        {/*密码输入框盒子*/}
                        <div className={Css['password']}>
                            <input type={this.state.sType} placeholder={"请输入密码"} onChange={e=>{
                                this.setState({
                                    sPassword: e.target.value
                                })
                            }}/>
                        </div>
                        {/*显示/隐藏密码*/}
                        <div className={Css['switch-wrap']}>
                            <Switch
                                checked={this.state.checked}
                                onClick={this.changePwd.bind(this, !this.state.checked)}
                            />
                        </div>
                    </div>
                    {/*注册按钮*/}
                    <div className={Css['sure-btn']} onClick={this.submitData.bind(this)}>
                        注册
                    </div>
                </div>
            </div>
        );
    }
}

export default RegIndex;