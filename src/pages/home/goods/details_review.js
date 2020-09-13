import React from "react";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Css from "../../../assets/css/home/goods/datails.module.css";
import {lazyImg, localParam} from "../../../assets/js/utils/util";

class DetailsReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                商品评价
            </div>
        );
    }
}

export default DetailsReviews;