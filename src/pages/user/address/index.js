import React from "react";
import {connect} from 'react-redux';

class UserAddressIndex extends React.Component {
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
            <div>
                index
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(UserAddressIndex);