import React from 'react';
import config from '../../../assets/js/conf/config.js';
import {request} from "../../../assets/js/libs/request";
import IScroll from '../../../assets/js/libs/iscroll.js';
import {lazyImg,localParam} from '../../../assets/js/utils/util.js';
import Css from '../../../assets/css/home/goods/search.css';
export default class  GoodsSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
    }

    render(){
        return(
            <div className={Css['page']}>
                {/*头部定位*/}
                <div className={Css['search-top']}>
                    {/*头部搜索盒子*/}
                    <div className={Css['search-header']}>
                        <div className={Css['back']}></div>
                        <div className={Css['search-wrap']}>
                            <div className={Css['search-icon']}></div>
                            <div className={Css['search']}>请输入您的宝贝名称</div>
                        </div>
                        <div className={Css['screen-btn']}>
                            筛选
                        </div>
                    </div>
                    {/*筛选排序盒子*/}
                    <div className={Css['order-main']}>
                        {/*筛选排序子盒子*/}
                        <div className={Css['order-item']}>
                            <div className={Css['order-item-text']}>综合</div>
                            <div className={Css['order-icon']}></div>
                            {/*选择排序*/}
                            <ul className={Css['order-menu'] + " hide"}>
                                <li className={Css['active']}>综合</li>
                                <li>价格从低到高</li>
                                <li>价格从高到低</li>
                            </ul>
                        </div>
                        <div className={Css['order-item']}>
                            <div className={Css['order-text']}>销量</div>
                        </div>
                    </div>
                </div>
                {/*盒子*/}
                <div className={Css['goods-main']}>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt=""/>
                        </div>
                        {/*内容介绍*/}
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>
                                蕾丝半身裙女2019春夏新款韩版修身包臀a字纯色不规则裙 CM81004
                            </div>
                            <div className={Css['price']}>
                                ￥118
                            </div>
                            <div className={Css['sales']}>
                                销量<span>100</span>件
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}