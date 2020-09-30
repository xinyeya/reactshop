import React from "react";
import {connect} from 'react-redux';
import Css from "../../../assets/css/user/mobile/index.css";
import SubHeaderComponent from "../../../components/header/subheader";
import {Toast} from "antd-mobile";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";

class MobileIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sCellphone: '',
            bCodeSuccess: false,
            sCodeText: "获取验证码",
            sCode: '',
        };
        this.timer = null;
        this.bSendCode = true;
        this.bSubmit = true;
    }

    componentDidMount() {
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
                        sCodeText: `获取验证码`
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
            Toast.info("请输入验证码", 2);
            return false;
        }

        // 防止重复提交
        if (this.bSubmit) {
            this.bSubmit = false;
            // 确定注册
            let sUrl = config.baseUrl+"/api/user/myinfo/updatecellphone?token="+config.token;
            request(sUrl, "post", {
                vcode: this.state.sCode,
                cellphone: this.state.sCellphone,
                uid: this.props.state.user.uid
            }).then(res=>{
                if (res.code === 200) {
                    Toast.info(res.data, 2, ()=>{
                        this.props.history.goBack();
                    });
                }else{
                    Toast.info(res.data, 2);
                }
            })
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

    // 防止内存泄露
    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title={"绑定手机"}></SubHeaderComponent>
                <div className={Css['main']}>
                    {/*提示公告*/}
                    <div className={Css['tip']}>
                        <div className={Css['icon']}></div>
                        <div className={Css['text']}>
                            新手机号验证成功后，即可绑定成功！
                        </div>
                    </div>
                    {/*手机号*/}
                    <div className={Css['input-wrap']} style={{marginTop: "0.5rem"}}>
                        <input type="tel" className={Css['cellphone']} placeholder={"绑定手机号码"} onChange={e=>{
                            this.checkCellphone(e)
                        }}/>
                    </div>
                    {/*验证码*/}
                    <div className={Css['input-wrap']} style={{marginTop: "0.2rem"}}>
                        <input type="text" className={Css['code']} placeholder={"请输入短信验证码"} onChange={e=>{
                            this.setState({
                                sCode: e.target.value
                            })
                        }}/>
                        <div className={this.state.bCodeSuccess?Css['code-btn']+" "+Css['success']:Css['code-btn']} onClick={this.getCode.bind(this)}>{this.state.sCodeText}</div>
                    </div>
                    {/*保存*/}
                    <div className={Css['save-btn']} onClick={this.submitData.bind(this)}>
                        下一步
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(MobileIndex);