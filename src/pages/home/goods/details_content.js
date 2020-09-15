import React from "react";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Css from "../../../assets/css/home/goods/details_content.css";
import {lazyImg, localParam} from "../../../assets/js/utils/util";

class DetailsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className={Css['page']}>

            </div>
        );
    }
}

export default DetailsContent;