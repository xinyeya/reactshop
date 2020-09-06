import React from "react";
import config from "../../../assets/js/conf/config";
import Css from "../../../assets/css/home/goods/items.module.css";
import {Route, Switch} from "react-router-dom";

class GoodsItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>
                右侧商品
            </React.Fragment>
        );
    }
}

export default GoodsItems;