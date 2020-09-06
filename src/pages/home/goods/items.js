/*eslint-disable*/
import React from "react";
import config from "../../../assets/js/conf/config";
import Css from "../../../assets/css/home/goods/items.module.css";
import IScroll from 'iscroll/build/iscroll-probe';
import {lazyImg, localParam} from "../../../assets/js/utils/util"
import {request} from "../../../assets/js/libs/request";

class GoodsItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aGoods: []
        };
        this.scroll = null;
    }

    componentDidMount() {
        this.getData(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.getData(newProps);
    }

    // 获取数据
    getData(props) {
        // 获取get传过来的值
        let cid = props.location.search ? localParam(props.location.search).search.cid : '';
        request(config.baseUrl+"/api/home/category/show?cid="+cid+"&token="+config.token).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aGoods: res.data
                }, ()=>{
                    this.eventScroll();
                    lazyImg();
                    this.scroll.on("scrollEnd", ()=>{
                        lazyImg();
                    })
                });
            }
        })
    }

    // 兼容ios滑动条
    eventScroll() {
        // 阻止默认的点击事件执行
        document.getElementById("goods-content-main").addEventListener("touchmove", function(e) {e.preventDefault();}, false);
        this.scroll = new IScroll('#goods-content-main', {
            scrollX: false,
            scrollY: true,
            preventDefault: false,
            mouseWheel: true, // 允许鼠标滚轮
        });
    }

    render() {
        return (
            <div id={"goods-content-main"} className={Css['goods-content-main']}>
                <div>
                    {
                        this.state.aGoods !== null && this.state.aGoods.map((val, key)=>{
                            return (
                                <div key={key} className={Css['goods-wrap']}>
                                    {/*标题*/}
                                    <div className={Css['classify-name']}>{val.title}</div>
                                    {/*内容*/}
                                    <div className={Css['goods-item-wrap']}>
                                        {
                                            val.goods !== null && val.goods.map((val1, key1)=>{
                                                return (
                                                    <ul key={key1}>
                                                        <li className={Css['image']}>
                                                            <img data-echo={val1.image} src={require("../../../assets/images/common/lazyImg.jpg")} alt=""/>
                                                        </li>
                                                        <li>
                                                            {val1.title}
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GoodsItems;