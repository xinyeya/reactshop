import React from "react";
import config from "../../../assets/js/conf/config";
import SubHeaderComponent from "../../../components/header/subheader";

class LoginIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    pushPage(url) {
        this.props.history.push(config.path+url);
    }

    render() {
        return (
            <div>
                <SubHeaderComponent
                    title={"会员登录"}
                ></SubHeaderComponent>
                <br/>
                <span onClick={this.pushPage.bind(this, 'reg/index')}>会员注册</span>
            </div>
        );
    }
}

export default LoginIndex;