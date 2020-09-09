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
            screenMove: "",
            bMask: false
        }
        this.myScroll = null;
    }
    componentDidMount(){
        this.myScroll = new IScroll("#screen",{
            scrollX: false,
            scrollY: true,
            preventDefault: false
        });
    }

    // 打开抽屉
    showScreen() {
        // 禁用默认事件
        this.refs['mask'].addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

        this.refs['screen'].addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

        this.setState({
            screenMove: Css['move'],
            bMask: true
        })
    }

    // 关闭抽屉
    hideScreen() {
        this.setState({
            screenMove: Css['unmove'],
            bMask: false
        })
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
                        <div className={Css['screen-btn']} onClick={this.showScreen.bind(this)}>筛选</div>
                    </div>
                    {/*排序盒子*/}
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
                {/*遮罩层*/}
                <div ref={'mask'} className={this.state.bMask ? Css['mask'] : Css['mask']+" hide"} onClick={this.hideScreen.bind(this)}></div>
                {/*抽屉*/}
                <div ref={'screen'} id={"screen"} className={Css['screen']+ " " +this.state.screenMove}>
                    <div>
                        {/*分类*/}
                        <div className={Css['attr-wrap']}>
                            {/*头部*/}
                            <div className={Css['attr-title-wrap']}>
                                <div className={Css['attr-name']}>分类</div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']+ " " + Css['active']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                            </div>
                        </div>
                        {/*分割线*/}
                        <div style={{width:"100%", height: "1px", background: "#EFEFEF"}}></div>
                        {/*价格区间*/}
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-title-wrap']}>
                                <div className={Css['attr-name']}>价格区间</div>
                                <div className={Css['price-wrap']}>
                                    {/*最低价*/}
                                    <div className={Css['price-input']}>
                                        <input type="text" placeholder={"最低价"}/>
                                    </div>
                                    <div className={Css['price-line']}></div>
                                    {/*最高价*/}
                                    <div className={Css['price-input']}>
                                        <input type="text" placeholder={"最低价"}/>
                                    </div>
                                </div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']+ " " + Css['active']}>1-50</div>
                                <div className={Css['item']}>51-99</div>
                                <div className={Css['item']}>100-300</div>
                                <div className={Css['item']}>301-1000</div>
                                <div className={Css['item']}>1001-4000</div>
                            </div>
                        </div>
                        {/*分割线*/}
                        <div style={{width:"100%", height: "0.2rem", background: "#EFEFEF"}}></div>
                        {/*品牌*/}
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-title-wrap']}>
                                <div className={Css['attr-name']}>品牌</div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']}>李宁</div>
                                <div className={Css['item']}>阿迪达斯</div>
                                <div className={Css['item']}>耐克</div>
                            </div>
                        </div>
                        {/*分割线*/}
                        <div style={{width:"100%", height: "0.2rem", background: "#EFEFEF"}}></div>
                        {/*衣长*/}
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-title-wrap']}>
                                <div className={Css['attr-name']}>衣长</div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            {/*选项盒子*/}
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']}>长款</div>
                                <div className={Css['item']}>中长款</div>
                                <div className={Css['item']}>短款</div>
                            </div>
                        </div>
                        {/*占空*/}
                        <div style={{width:"100%", height: "1.2rem"}}></div>
                    </div>
                    {/*操作*/}
                    <div className={Css['handle-wrap']}>
                        <div className={Css['item']}>共<span>16</span>件</div>
                        <div className={Css['item']+" "+Css['reset']}>全部重置</div>
                        <div className={Css['item']+" "+Css['sure']}>确定</div>
                    </div>
                </div>
            </div>
        );
    }
}