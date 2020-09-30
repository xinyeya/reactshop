import React from "react";
import {connect} from 'react-redux';
import Css from "../../../assets/css/user/modpwd/index.css";
import SubHeaderComponent from "../../../components/header/subheader";
import { Switch, Toast } from 'antd-mobile';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {safeAuth} from "../../../assets/js/utils/util";

class ModPwdIndex extends React.Component {
    constructor(props) {
        super(props);
        safeAuth(props);
        this.state = {
            sPassword: '',
            sType: 'password'
        };
        this.bSubmit = true;
    }

    componentDidMount() {
    }

    // 点击注册按钮提交数据
    submitData(){
        if(this.state.sPassword.match(/^\s*$/)){
            Toast.info("请输入您的密码",2);
            return false;
        }
        if(this.state.sPassword.length<6){
            Toast.info("请输入不小于6位的密码",2);
            return false;
        }
        if (this.bSubmit){
            this.bSubmit=false;
            let sUrl=config.baseUrl+"/api/user/myinfo/modpwd?token="+config.token;
            request(sUrl, "post",{password:this.state.sPassword,uid:this.props.state.user.uid}).then(res=>{
                if (res.code ===200){
                    Toast.info("修改密码成功！",2,()=>{
                        this.props.history.goBack();
                        this.bSubmit = true;
                    })
                }else{
                    Toast.info(res.data,2);
                    this.bSubmit = true;
                }
            });
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

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title={"修改密码"}></SubHeaderComponent>
                <div className={Css['main']}>
                    {/*密码*/}
                        {/*密码输入框盒子*/}
                        <div className={Css['input-wrap']} style={{marginTop: "0.3rem"}}>
                            <input type={this.state.sType} placeholder="请输入不小于6位的密码" onChange={(e)=>{this.setState({sPassword:e.target.value})}} className={Css['password']} />
                        {/*显示/隐藏密码*/}
                        <div className={Css['switch-wrap']}>
                            <Switch
                                color={"#EB1625"}
                                checked={this.state.checked}
                                onClick={this.changePwd.bind(this, !this.state.checked)}
                            />
                        </div>
                    </div>
                    {/*注册按钮*/}
                    <div className={Css['save-btn']} onClick={this.submitData.bind(this)}>
                        确定修改
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(ModPwdIndex);