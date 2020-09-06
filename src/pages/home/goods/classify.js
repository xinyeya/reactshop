/*eslint-disable*/
import React, {lazy} from "react";
import Css from "../../../assets/css/home/goods/classify.module.css"
import {Route, Switch} from "react-router-dom";
import config from "../../../assets/js/conf/config";
import IScroll from 'iscroll/build/iscroll-probe';
const GoodsItems = lazy(()=>import("./items"));

class ClassifyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.scroll = null;
    }

    componentDidMount() {
        this.eventScroll();
    }

    goBack() {
        this.props.history.goBack();
    }

    eventScroll() {
        // 阻止默认的点击事件执行
        document.getElementById("scroll-classify").addEventListener("touchmove", function(e) {e.preventDefault();}, false);
        this.scroll = new IScroll('#scroll-classify', {
            mouseWheel: true, // 允许鼠标滚轮
        });
    }

    render() {
        return (
            <div>
                {/*顶部搜搜索栏与返回按钮*/}
                <div className={Css['search-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['search']}>请输入名称</div>
                </div>
                {/*左侧*/}
                <div className={Css['goods-main']}>
                    {/*左侧分类*/}
                    <div id="scroll-classify" className={Css['classify-wrap']}>
                        <div>
                            <div className={Css['classify-item'] + " " + Css['active']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                            <div className={Css['classify-item']}>潮流女装</div>
                        </div>
                    </div>
                    <div className={Css['goods-content']}>
                        <Switch>
                            <Route path={config.path+"goods/classify/items"} component={GoodsItems} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassifyComponent;