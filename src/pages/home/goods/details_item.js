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
        // 禁用遮罩层下的默认事件
        this.refs['mask'].addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
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
                {/*遮罩层*/}
                <div ref={"mask"} className={Css['mask']}></div>
                {/*控制面板*/}
                <div ref={"cart-panel"} className={Css['cart-panel']}>
                    {/*商品信息*/}
                    <div className={Css['goods-info']}>
                        {/*关闭按钮*/}
                        <div className={Css['close-panel-wrap']}>
                            <div className={Css['spot']}></div>
                            <div className={Css['line']}></div>
                            <div className={Css['close']}></div>
                        </div>
                        {/*缩略图*/}
                        <div className={Css['goods-img']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                        </div>
                        {/*商品信息盒子*/}
                        <div className={Css['goods-wrap']}>
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*价格*/}
                            <div className={Css['price']}>
                                ￥128
                            </div>
                            {/*编码*/}
                            <div className={Css['goods-code']}>
                                商品编码：12342356
                            </div>
                        </div>
                    </div>
                    {/*数据面板*/}
                    <div className={Css['attr-wrap']}>
                        {/*数据列表*/}
                        <div className={Css['attr-list']}>
                            {/*标题*/}
                            <div className={Css['attr-name']}>
                                颜色
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['val-wrap']}>
                                <span className={Css['val'] + " " + Css['active']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                            </div>
                        </div>
                        <div className={Css['attr-list']}>
                            {/*标题*/}
                            <div className={Css['attr-name']}>
                                尺码
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['val-wrap']}>
                                <span className={Css['val'] + " " + Css['active']}>35</span>
                                <span className={Css['val']}>36</span>
                                <span className={Css['val']}>37</span>
                                <span className={Css['val']}>38</span>
                                <span className={Css['val']}>39</span>
                                <span className={Css['val']}>40</span>
                            </div>
                        </div>
                        <div className={Css['attr-list']}>
                            {/*标题*/}
                            <div className={Css['attr-name']}>
                                颜色
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['val-wrap']}>
                                <span className={Css['val'] + " " + Css['active']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                                <span className={Css['val']}>灰色</span>
                            </div>
                        </div>
                        <div className={Css['attr-list']}>
                            {/*标题*/}
                            <div className={Css['attr-name']}>
                                尺码
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['val-wrap']}>
                                <span className={Css['val'] + " " + Css['active']}>35</span>
                                <span className={Css['val']}>36</span>
                                <span className={Css['val']}>37</span>
                                <span className={Css['val']}>38</span>
                                <span className={Css['val']}>39</span>
                                <span className={Css['val']}>40</span>
                            </div>
                        </div>
                    </div>
                    {/*购买数量*/}
                    <div className={Css['amount-wrap']}>
                        {/*购买数量-文字*/}
                        <div className={Css['amount-name']}>
                            购买数量
                        </div>
                        {/*输入数量盒子*/}
                        <div className={Css['amount-input-wrap']}>
                            <div className={Css['btn'] + " " + Css['dec'] + " " + Css['active']}>-</div>
                            <div className={Css['amount-input']}>
                                <input type="tel" defaultValue={"1"}/>
                            </div>
                            <div className={Css['btn'] + " " + Css['inc']}>+</div>
                        </div>
                    </div>
                    {/*确定按钮*/}
                    <div className={Css['sure-btn']}>
                        确定
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsItem;