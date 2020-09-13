import React from "react";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Swiper from '../../../assets/js/libs/swiper.min.js';
// import Swiper from '../../../assets/js/libs/swiper.min.js';
import "../../../assets/css/common/swiper.min.css";
import Css from '../../../assets/css/home/goods/details_item.css';
import {lazyImg, localParam} from "../../../assets/js/utils/util";

class DetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getSwiper();
    }

    // 初始化轮播图
    getSwiper() {
        new Swiper(this.refs['swpier-wrap'], {
            autoplay: 3000,
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false
        })
    }

    render() {
        return (
            <div>
                {/*轮播图*/}
                <div ref="swpier-wrap" className={Css['swpier-wrap']}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/></div>
                        <div className="swiper-slide"><img src="//vueshop.glbuys.com/uploadfiles/1524556419.jpg" alt=""/></div>
                        <div className="swiper-slide"><img src="//vueshop.glbuys.com/uploadfiles/1524556315.jpg" alt=""/></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                {/*商品介绍*/}
                <div className={Css['goods-ele-main']}>
                    {/*标题*/}
                    <div className={Css['goods-title']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                    <div className={Css['price']}>￥128</div>
                    <ul className={Css['sales-wrap']}>
                        <li>快递: 20元</li>
                        <li>月销量: 0</li>
                    </ul>
                </div>
                {/*商品评价*/}
                <div className={Css['reviews-main']}>
                    <div className={Css['reviews-title']}>商品评价(22)</div>
                    {/*评论内容盒子*/}
                    <div className={Css['reviews-wrap']}>
                        {/*单条评论*/}
                        <div className={Css['reviews-list']}>
                            {/*用户信息*/}
                            <div className={Css['uinfo']}>
                                {/*头像*/}
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head//980139409.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>神秘人</div>
                            </div>
                            {/*评价内容*/}
                            <div className={Css['reviews-content']}>
                                评价内容评价内容评价内容评价内容评价内容评价内容评价内容
                            </div>
                            {/*时间*/}
                            <div className={Css['reviews-date']}>
                                2020-10-25 14:20:20
                            </div>
                        </div>
                        <div className={Css['reviews-list']}>
                            {/*用户信息*/}
                            <div className={Css['uinfo']}>
                                {/*头像*/}
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head//980139409.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>神秘人</div>
                            </div>
                            {/*评价内容*/}
                            <div className={Css['reviews-content']}>
                                评价内容评价内容评价内容评价内容评价内容评价内容评价内容
                            </div>
                            {/*时间*/}
                            <div className={Css['reviews-date']}>
                                2020-10-25 14:20:20
                            </div>
                        </div>
                        <div className={Css['reviews-list']}>
                            {/*用户信息*/}
                            <div className={Css['uinfo']}>
                                {/*头像*/}
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head//980139409.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>神秘人</div>
                            </div>
                            {/*评价内容*/}
                            <div className={Css['reviews-content']}>
                                评价内容评价内容评价内容评价内容评价内容评价内容评价内容
                            </div>
                            {/*时间*/}
                            <div className={Css['reviews-date']}>
                                2020-10-25 14:20:20
                            </div>
                        </div>
                        <div className={Css['reviews-list']}>
                            {/*用户信息*/}
                            <div className={Css['uinfo']}>
                                {/*头像*/}
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head//980139409.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>神秘人</div>
                            </div>
                            {/*评价内容*/}
                            <div className={Css['reviews-content']}>
                                评价内容评价内容评价内容评价内容评价内容评价内容评价内容
                            </div>
                            {/*时间*/}
                            <div className={Css['reviews-date']}>
                                2020-10-25 14:20:20
                            </div>
                        </div>
                        <div className={Css['reviews-list']}>
                            {/*用户信息*/}
                            <div className={Css['uinfo']}>
                                {/*头像*/}
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head//980139409.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>神秘人</div>
                            </div>
                            {/*评价内容*/}
                            <div className={Css['reviews-content']}>
                                评价内容评价内容评价内容评价内容评价内容评价内容评价内容
                            </div>
                            {/*时间*/}
                            <div className={Css['reviews-date']}>
                                2020-10-25 14:20:20
                            </div>
                        </div>
                    </div>
                    {/*查看更多评价*/}
                    <div className={Css['reviews-more']}>
                        查看更多评价
                    </div>
                </div>
                {/*按钮*/}
                <div className={Css['bottom-btn-wrap']}>
                    <div className={Css['btn']+" "+Css['fav']}>收藏</div>
                    <div className={Css['btn']+" "+Css['card']}>加入购物车</div>
                </div>
            </div>
        );
    }
}

export default DetailsItem;