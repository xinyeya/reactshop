import React from 'react';
import Css from '../../../assets/css/user/profile/index.css';
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeaderComponent from "../../../components/header/subheader";
import { ActionSheet, Toast } from 'antd-mobile';

class  ProfileIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            sHead: require("../../../assets/images/user/my/default-head.png"),
            sNickname: '昵称',
            sGender: '',
            iGender: 0,
            sHeadName: ''
        };
    }

    componentDidMount(){
        this.getUserInfo();
    }

    // 获取用户信息
    getUserInfo() {
        if (this.props.state.user.isLogin === true) {
            let sUrl = config.baseUrl + "/api/user/myinfo/userinfo/uid/" + this.props.state.user.uid + "?token=" + config.token;
            request(sUrl).then(res => {
                if (res.code === 200) {
                    this.setState({
                        sHead: res.data.head !=="" ? res.data.head : this.state.sHead,
                        sNickname: res.data.nickname,
                        iGender: res.data.gender,
                        sGender: res.data.gender==='1'?'男': res.data.gender==='2'?'女':""
                    })
                }
            })
        }
    }

    // 选择性别
    selectGender() {
        const BUTTONS = ['男', '女', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                title: '请选择性别',
                maskClosable: true,
                onTouchStart: e => e.preventDefault()
            }, (buttonIndex) => {
                if (buttonIndex !== 2) {
                    this.setState({
                        sGender: buttonIndex===0 ? "男" : buttonIndex===1?"女" : this.state.sGender,
                        iGender: buttonIndex===0 ? 1 : buttonIndex===1?2 : this.state.iGender,
                    });
                }
            });
    };

    // 保存数据
    submitSave() {
        if (this.state.sNickname.match(/^\s*$/)){
            Toast.info("请输入昵称", 1);
            return false;
        }
        if (this.state.sGender.match(/^\s*$/)){
            Toast.info("请输入昵称", 1);
            return false;
        }

        let sUrl = config.baseUrl+"/api/user/myinfo/updateuser?token="+config.token;
        let jData = {
            uid: this.props.state.user.uid,
            nickname: this.state.sNickname,
            gender: this.state.iGender,
            head: this.state.sHeadName
        };
        request(sUrl, "post", jData).then(res=>{
            if (res.code === 200) {
                Toast.info(res.data, 1, ()=>{
                    this.props.history.goBack();
                });
            }
        })
    }

    // 图片上传
    uploadHead() {
        let sUrl = config.baseUrl+"/api/user/myinfo/formdatahead?token="+config.token;
        request(sUrl, "file", {
            headfile: this.refs['headfile'].files[0]
        }).then(res=>{
            if (res.code === 200) {
                this.setState({
                    sHead: "http://vueshop.glbuys.com/userfiles/head/"+res.data.msbox,
                    sHeadName: res.data.msbox
                })
            }
        })
    }

    render(){
        return(
            <div className={Css['page']}>
                <SubHeaderComponent
                    title={"个人资料"}
                    right-text={"保存"}
                    onClickRightBtn={this.submitSave.bind(this)}
                ></SubHeaderComponent>
                {/*个人资料*/}
                <div className={Css['main']}>
                    {/*头像*/}
                    <ul className={Css['head']}>
                        <li>头像</li>
                        <li>
                            <img src={this.state.sHead}/>
                            <input ref={"headfile"} type="file" onChange={this.uploadHead.bind(this)}/>
                        </li>
                    </ul>
                    {/*昵称*/}
                    <ul className={Css['list']}>
                        <li>昵称</li>
                        <li>
                            <input type="text" placeholder={"请设置昵称"} value={this.state.sNickname} onChange={e=>{
                                this.setState({
                                    sNickname: e.target.value
                                })
                            }}/>
                        </li>
                        <li className={Css['arrow']}></li>
                    </ul>
                    {/*性别*/}
                    <ul className={Css['list']}>
                        <li>性别</li>
                        <li>
                            <input type="text" placeholder={"请选择性别"} readOnly value={this.state.sGender} onClick={this.selectGender.bind(this)}/>
                        </li>
                        <li className={Css['arrow']}></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(ProfileIndex)