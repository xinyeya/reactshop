import React from "react";
import Css from "../../../assets/css/home/index/index.module.css";

class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/*头部搜索栏*/}
                <div className={Css["search-header"] + " " + Css['red-bg']}>
                    <div className={Css['classify-icon']}></div>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-icon']}></div>
                        <div className={Css['search-text']}>请输入宝贝名称</div>
                    </div>
                    <div className={Css["login-wrap"]}>
                        <div className={Css['login-text']}>登录</div>
                    </div>
                </div>
                {/*轮播图*/}
                <div className={Css['swiper-wrap']}>
                </div>
            </div>
        );
    }
}

export default IndexComponent;