/*eslint-disable*/
import React, {lazy} from "react";
import Css from "../../../assets/css/home/goods/classify.module.css"
import {Route, Switch} from 'react-router-dom';
import config from "../../../assets/js/conf/config";
import IScroll from 'iscroll/build/iscroll-probe';
import {request} from "../../../assets/js/libs/request";
const GoodsItems = lazy(()=>import("./items"));

class ClassifyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aClassify: null,
        };
        this.scroll = null;
        this.aTempClassify = [];
    }


    componentDidMount() {
        this.getClassifyData();
    }

    // 返回上一层
    goBack() {
        this.props.history.goBack();
    }

    // 兼容ios滑动条
    eventScroll() {
        // 阻止默认的点击事件执行
        document.getElementById("scroll-classify").addEventListener("touchmove", function(e) {e.preventDefault();}, false);
        this.scroll = new IScroll('#scroll-classify', {
            scrollX: false,
            scrollY: true,
            preventDefault: false,
            mouseWheel: true, // 允许鼠标滚轮
        });
    }

    // 获取分类数据
    getClassifyData() {
        request(config.baseUrl+"/api/home/category/menu?token="+config.token).then(res=>{
            if (res.code === 200) {
                this.aTempClassify = res.data;
                for (let i=0; i<this.aTempClassify.length; i++){
                    this.aTempClassify[i].bActive = false;
                }
                this.setState({
                    aClassify: this.aTempClassify
                },()=>{
                    this.eventScroll();
                })
            }
        });
    }

    // 点击切换子路由
    replacePage(pUrl) {
        console.log(config.path+pUrl);
        this.props.history.replace(config.path+pUrl);
    }

    // 改变选中分类颜色
    changeStyle(pUrl, pIndex) {
        for (let i=0; i<this.aTempClassify.length; i++) {
            this.aTempClassify[i].bActive = false;
        }
        this.aTempClassify[pIndex].bActive = true;
        this.replacePage(pUrl, pIndex);
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
                            {
                                this.state.aClassify !== null && this.state.aClassify.map((val, key)=>{
                                    return (
                                        <div key={key} className={val.bActive === true?Css['classify-item'] + " " + Css['active'] : Css['classify-item']} onClick={this.changeStyle.bind(this, `goods/classify/items?cid=${val.cid} `, key)}>{val.title}</div>
                                    )
                                })
                            }
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