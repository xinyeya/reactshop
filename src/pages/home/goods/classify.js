/*eslint-disable*/
import React, {lazy} from "react";
import Css from "../../../assets/css/home/goods/classify.module.css"
import {Route, Switch} from 'react-router-dom';
import config from "../../../assets/js/conf/config";
import IScroll from 'iscroll/build/iscroll-probe';
import {request} from "../../../assets/js/libs/request";
import {localParam} from "../../../assets/js/utils/util";
const GoodsItems = lazy(()=>import("./items"));

class ClassifyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aClassify: [],
        };
        this.scroll = null;
        this.aTempClassify = [];
        this.cid = props.location.search ? localParam(props.location.search).search.cid : '492';
    }

    componentDidMount() {
        this.getClassifyData();
    }

    // 返回上一层
    goBack() {
        console.log('1111')
        this.props.history.replace(config.path+"home/index");
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
                    this.defaultClassifyStyle();
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
        this.handleScroll(pIndex);
        this.replacePage(pUrl, pIndex);
    }

    // 滑动条跳转到某个位置
    handleScroll(pIndex) {
        // 整个分类盒子的高度
        let oScrollClassify = document.getElementById("scroll-classify");
        // 得出点击的单元格与最底层的距离
        let iTopHeight = Math.round(this.refs['item-'+pIndex].offsetHeight*pIndex);
        // 计算盒子三分之一的高度
        let iHalfHeight = Math.round(oScrollClassify.offsetHeight / 3);
        // 计算下面部分三分之一的长度
        let iBottomHeight = Math.round(oScrollClassify.scrollHeight-iTopHeight);
        // 判断上半部分和下半部分
        if (iTopHeight > iHalfHeight && iBottomHeight>oScrollClassify.offsetHeight) {
            this.scroll.scrollTo(0, -iTopHeight, 300, IScroll.utils.ease.elastic);
        }
    }

    // 默认红色的样式
    defaultClassifyStyle() {
        if (this.aTempClassify.length > 0) {
            for (let i=0; i<this.aTempClassify.length; i++) {
                if (this.aTempClassify[i].cid === this.cid) {
                    this.aTempClassify[i].bActive = true;
                    break;
                }
            }
        }
        this.setState({
            aClassify: this.aTempClassify
        })
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
                                        <div ref={"item-"+key} key={key} className={val.bActive === true?Css['classify-item'] + " " + Css['active'] : Css['classify-item']} onClick={this.changeStyle.bind(this, `goods/classify/items?cid=${val.cid} `, key)}>{val.title}</div>
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