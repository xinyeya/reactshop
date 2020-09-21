import React from 'react';
import action from '../../../actions/index';
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {safeAuth} from "../../../assets/js/utils/util";
class  IndexComponent extends React.Component{
    constructor(props) {
        super(props);
        // 安全验证
        safeAuth(props);
    }

    componentDidMount(){

    }

    // 安全退出
    outLogin() {
        let sUrl = config+"/api/home/user/safeout?token="+config.token;
        request(sUrl, "post", {
            uid: this.props.state.user.uid
        }).then(res=>{
            if (res.code === 200) {
                this.props.dispatch(action.user.outLogin());
                this.props.history.replace(config.path+"login/index");
            }
        })
    }

    render(){
        return(
            <div>
                昵称： {this.props.state.user.nickname}
                <button type={"button"} onClick={this.outLogin.bind(this)}>安全退出</button>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(IndexComponent)