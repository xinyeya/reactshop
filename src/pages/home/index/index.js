import React from "react";
import Css from '../../../assets/css/home/index/index.module.css';
console.log(Css)
export default class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                首页
                <div className={"app"}>首页</div>
                <div className={Css['app']}>
                    hello world
                </div>
            </div>
        );
    }
}