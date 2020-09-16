import React from "react";
import ReactDOM from 'react-dom';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Swiper from '../../../assets/js/libs/swiper.min.js';
import "../../../assets/css/common/swiper.min.css";
import Css from '../../../assets/css/home/goods/details_item.css';
import {lazyImg, localParam, setScrollTop} from "../../../assets/js/utils/util";
import {Toast} from "antd-mobile";
import TweenMax from '../../../assets/js/libs/TweenMax';

class DetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bMask: false,
            sCartPanel: Css['down'],
            gid: props.location.search !== "" ? localParam(props.location.search).search.gid : "",
            aAttr: [],
            iAmount: 1,
            aSlide: [],
            sGoodsTitle: '',
            fPrice: 0,
            fFreight: 0,
            iSales: 0,
            aReviews: [],
            iReviewTotal: 0
        };
        this.bMove = false
    }

    componentDidMount() {
        // 解决可能会出现的白屏问题
        setScrollTop();
        this.getSwiper();
        this.getReviews();
    }

    // 获取轮播图数据和获取商品信息
    getSwiper() {
        let sUrl = config.baseUrl+"/api/home/goods/info?gid="+this.state.gid+"&type=details&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aSlide: res.data.images,
                    sGoodsTitle: res.data.title,
                    fPrice: res.data.price,
                    fFreight: res.data.freight,
                    iSales: res.data.sales
                }, ()=>{
                    // 初始化轮播图
                    new Swiper(this.refs['swpier-wrap'], {
                        autoplay: 3000,
                        pagination : '.swiper-pagination',
                        autoplayDisableOnInteraction : false
                    })
                })
            }
        });
    }

    // 获取商品规格属性
    getGoodsAttr() {
        let sUrl = config.baseUrl+"/api/home/goods/info?gid="+this.state.gid+"&type=spec&token="+config.token
        request(sUrl).then(res=>{
            if (res.code === 200) {
                console.log(res.data);
                this.setState({
                    aAttr: res.data
                })
            }
        })
    }

    // 获取商品评价
    getReviews() {
        let sUrl = config.baseUrl+"/api/home/reviews/index?gid="+this.state.gid+"&token="+config.token+"&page=1";
        request(sUrl).then(res=>{
            if (res.code === 200) {
                console.log(res.data)
                this.setState({
                    aReviews: res.data,
                    iReviewTotal: res.pageinfo.total
                }, ()=>{
                    lazyImg()
                })
            }else{
                this.setState({
                    aReviews: [],
                    iReviewTotal: 0
                })
            }
        })
    }

    // 显示购物控制面板
    showCartPanel() {
        this.getGoodsAttr();
        // 禁用遮罩层下的默认事件
        this.refs['mask'].addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        this.setState({
            bMask: true,
            sCartPanel: Css['up']
        })
    }

    // 关闭购物车面板
    hideCartPanel() {
        this.setState({
            bMask: false,
            sCartPanel: Css['down']
        })
    }

    // 加入收藏
    addFav() {
        Toast.info('收藏成功', 2);
    }

    // 跳转路由
    replacePage(url) {
        this.props.history.replace(config.path + url);
    }

    // 选择属性值
    selectAttrVal(attrIndex, valIndex) {
        let aAttr = this.state.aAttr;
        if (aAttr.length > 0) {
            for (let key in  aAttr[attrIndex].values) {
                aAttr[attrIndex].values[key].checked = false
            }
        }
        aAttr[attrIndex].values[valIndex].checked = true;
        this.setState({
            aAttr: aAttr
        })
    }

    // 增加数量
    incAmount() {
        let iAmount = this.state.iAmount;
        this.setState({
            iAmount: ++iAmount
        })
    }

    // 减少数量
    decAmount() {
        let iAmount = this.state.iAmount;
        if (iAmount > 1) {
            this.setState({
                iAmount: --iAmount
            })
        }
    }

    // 加入购物车
    addCart() {
        this.checkAttrVal(()=>{
            // 判断动画是否正在执行
            if (!this.bMove) {
                this.bMove = true;
                // 获取dom
                let oGoodsImg = this.refs['goods-img'],
                    oGoodsInfo = this.refs['goods-info'],
                    onCartPanel = this.refs['cart-panel'];
                // 使用ReactDOM获取虚拟dom性能较高
                let oCartIcon = ReactDOM.findDOMNode(document.getElementById("cart-icon"));
                // 克隆dom节点
                let oCloneImg = oGoodsImg.cloneNode(true);
                oGoodsInfo.appendChild(oCloneImg);
                // 这种写法性能比较好
                oCloneImg.style.cssText = "width: 0.4rem;height:0.4rem;position:absolute;z-index:1;left:0.2rem;top:0.2rem;";
                // 图片左边的距离
                let srcImg = oGoodsImg.offsetLeft;
                // 计算购物车面板缩略图到顶部购物车图标的高度
                let cloneY = parseInt(window.innerHeight - onCartPanel.offsetHeight + oGoodsImg.offsetTop - oCartIcon.offsetTop);
                // 抛物线动画
                TweenMax.to(oCloneImg, 2, {bezier: [{x: srcImg, y: -100}, {x: oCartIcon.offsetLeft, y: -cloneY}], onComplete:()=>{
                        // 销毁克隆的节点
                        oCloneImg.remove();
                        this.bMove = false;
                    }});
                // 旋转，repeat为-1表示无限旋转
                TweenMax.to(oCloneImg, 0.2, {rotation: 360, repeat: -1})
            }
        });
    }

    // 监听件数的值
    changePrice(e) {
        this.setState({
            iAmount: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|;|,|+|=|\-|"|'|\/|\\|、|、|。|，|“|”|‘|’]/g, "")
        },()=>{
            if (this.state.iAmount === "") {
                this.setState({
                    iAmount: 1
                });
            }
        });
    }

    // 检测是否为选中属性值
    checkAttrVal(callback) {
        let aAttr = this.state.aAttr, bSelect=false, attrName="";
        // 判断是否有数据
        if (aAttr.length > 0) {
            for (let key in aAttr) {
                bSelect=false;
                for (let key2 in aAttr[key].values) {
                    if (aAttr[key].values[key2].checked) {
                        bSelect = true;
                        break;
                    }
                }
                // 如果没有选择，则获取标题名
                if (!bSelect) {
                    attrName = aAttr[key].title;
                    break;
                }
            }
            //如果没有选中，则提示
            if (!bSelect) {
                Toast.info(`请选择${attrName}`, 1);
            }
            // 若都选中
            if (bSelect) {
                callback()
            }
        }
    }

    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div>
                {/*轮播图*/}
                <div ref="swpier-wrap" className={Css['swpier-wrap']}>
                    <div className="swiper-wrapper">
                        {
                            this.state.aSlide.length > 0 ? this.state.aSlide.map((item, index)=>{
                                return (
                                        <div key={index} className="swiper-slide">
                                            <img src={item} alt=""/>
                                        </div>
                                    )
                            }) : ""
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                {/*商品介绍*/}
                <div className={Css['goods-ele-main']}>
                    {/*标题*/}
                    <div className={Css['goods-title']}>{this.state.sGoodsTitle}</div>
                    <div className={Css['price']}>￥{this.state.fPrice}</div>
                    <ul className={Css['sales-wrap']}>
                        <li>快递: {this.state.fFreight}元</li>
                        <li>月销量: {this.state.iSales}</li>
                    </ul>
                </div>
                {/*商品评价*/}
                <div className={Css['reviews-main']}>
                    <div className={Css['reviews-title']}>商品评价({this.state.iReviewTotal})</div>
                    {/*评论内容盒子*/}
                    <div className={Css['reviews-wrap']}>
                        {
                            this.state.aReviews.length > 0 ? this.state.aReviews.map((item, index)=>{
                                return (
                                    <div key={index} className={Css['reviews-list']}>
                                        {/*用户信息*/}
                                        <div className={Css['uinfo']}>
                                            {/*头像*/}
                                            <div className={Css['head']}>
                                                <img data-echo={item.head} src={require("../../../assets/images/common/lazyImg.jpg")} alt={item.nickname}/>
                                            </div>
                                            <div className={Css['nickname']}>{item.nickname}</div>
                                        </div>
                                        {/*评价内容*/}
                                        <div className={Css['reviews-content']}>
                                            {item.content}
                                        </div>
                                        {/*时间*/}
                                        <div className={Css['reviews-date']}>
                                            2020-10-25 14:20:20
                                        </div>
                                    </div>
                                )
                            }) : ""
                        }
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
                    <div className={Css['reviews-more']} onClick={this.replacePage.bind(this, `goods/details/review?gid=${this.state.gid}`)}>
                        查看更多评价
                    </div>
                </div>
                {/*按钮*/}
                <div className={Css['bottom-btn-wrap']}>
                    <div className={Css['btn']+" "+Css['fav']} onClick={this.addFav.bind(this)}>收藏</div>
                    <div className={Css['btn']+" "+Css['card']} onClick={this.showCartPanel.bind(this)}>加入购物车</div>
                </div>
                {/*遮罩层*/}
                <div ref={"mask"} className={this.state.bMask ? Css['mask'] : Css['mask'] + " hide"}></div>
                {/*控制面板*/}
                <div ref={"cart-panel"} className={Css['cart-panel']+" "+this.state.sCartPanel}>
                    {/*商品信息*/}
                    <div ref={'goods-info'} className={Css['goods-info']}>
                        {/*关闭按钮*/}
                        <div className={Css['close-panel-wrap']}>
                            <div className={Css['spot']}></div>
                            <div className={Css['line']}></div>
                            <div className={Css['close']} onClick={this.hideCartPanel.bind(this)}></div>
                        </div>
                        {/*缩略图*/}
                        <div ref={"goods-img"} className={Css['goods-img']}>
                            <img src={this.state.aSlide.length!==0?this.state.aSlide[0]:""} alt=""/>
                        </div>
                        {/*商品信息盒子*/}
                        <div className={Css['goods-wrap']}>
                            <div className={Css['goods-title']}>
                                {this.state.sGoodsTitle}
                            </div>
                            {/*价格*/}
                            <div className={Css['price']}>
                                ￥{this.state.fPrice}
                            </div>
                            {/*编码*/}
                            <div className={Css['goods-code']}>
                                商品编码：{this.state.gid}
                            </div>
                        </div>
                    </div>
                    {/*数据面板*/}
                    <div className={Css['attr-wrap']}>
                        {/*数据列表*/}
                        {
                            this.state.aAttr.length > 0 ? this.state.aAttr.map((item, index)=>{
                                return (
                                    <div key={index} className={Css['attr-list']}>
                                        {/*标题*/}
                                        <div className={Css['attr-name']}>
                                            {item.title}
                                        </div>
                                        {/*选项盒子*/}
                                        <div className={Css['val-wrap']}>
                                            {
                                                item.values.length > 0 ? item.values.map((item1, index1)=>{
                                                    return (
                                                        <span key={index1} className={item1.checked ? Css['val'] + " " + Css['active'] : Css['val']} onClick={this.selectAttrVal.bind(this, index, index1)}>{item1.value}</span>
                                                    )
                                                }) : ""
                                            }
                                        </div>
                                    </div>
                                )
                            }) : ""
                        }
                    </div>
                    {/*购买数量*/}
                    <div className={Css['amount-wrap']}>
                        {/*购买数量-文字*/}
                        <div className={Css['amount-name']}>
                            购买数量
                        </div>
                        {/*输入数量盒子*/}
                        <div className={Css['amount-input-wrap']}>
                            <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                            <div className={Css['amount-input']}>
                                <input type="tel" value={this.state.iAmount} onChange={e=>{
                                    this.changePrice(e)
                                }}/>
                            </div>
                            <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                        </div>
                    </div>
                    {/*确定按钮*/}
                    <div className={Css['sure-btn']} onClick={this.addCart.bind(this)}>
                        确定
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsItem;