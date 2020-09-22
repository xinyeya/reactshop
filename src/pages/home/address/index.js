import React from "react";
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import SubHeaderComponent from "../../../components/header/subheader";

class AddressIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    pushPage(url) {
        this.props.history.push(config.path+url);
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div>
                <SubHeaderComponent title={"选择收货地址"}></SubHeaderComponent>
                <button style={{marginTop: "1rem"}} type={"button"} onClick={this.pushPage.bind(this, "address/add")}>添加收货地址</button>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(AddressIndex);