import React from "react";
import Css from "../../../assets/css/home/index/index.module.css";
import { Carousel } from 'antd-mobile';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";

class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SwiperData: [], // 轮播图数据
            imgHeight: 176, // 轮播图高
            aNav: null, // 首页导航
            aGoods: null, // 首页产品
            aReco: null
        }
    }

    componentDidMount() {
        this.getSwiper();
        this.getNav();
        this.getGoodsLevel();
        this.getReco();
    }

    // 获取轮播图数据
    getSwiper() {
        // console.log(config.baseUrl + "/home/index/slide?token=" + config.token)
        request(config.baseUrl + "/api/home/index/slide?token=" + config.token)
        .then(res=>{
            if (res.code === 200) {
                this.setState({
                    SwiperData: res.data
                });
            }
        });
    }

    // 获取导航数据
    getNav() {
        request(config.baseUrl + '/api/home/index/nav?token='+config.token).then(res=>{
            if (res.code === 200){
                this.setState({
                    aNav: res.data
                })
            }
        })
    }

    // 轮播图样式
    imgOnload() {
        // fire window resize event to change height
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }

    // 获取首页产品
    getGoodsLevel() {
        request(config.baseUrl+'/api/home/index/goodsLevel?token='+config.token).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aGoods: res.data
                })
            }
        })
    }

    // 获取为您推荐
    getReco() {
        request(config.baseUrl+'/api/home/index/recom?token='+config.token).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aReco: res.data
                })
            }
        })
    }

    // 跳转分类页面
    pushPage(pUrl) {
        this.props.history.replace(config.path + pUrl);
    }

    render() {
        // 轮播图外框样式
        const swiperBox = { display: 'inline-block', width: '100%', height: this.state.imgHeight }
        const swiperImage = { width: '100%', verticalAlign: 'top' }
        return (
            <div className={Css['page']}>
                {/*头部搜索栏*/}
                <div className={Css["search-header"] + " " + Css['red-bg']}>
                    <div className={Css['classify-icon']} onClick={this.pushPage.bind(this, "goods/classify/items")}></div>
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
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {/*遍历数据*/}
                        {this.state.SwiperData.length >= 1 && this.state.SwiperData.map((val, key) => {
                            return (
                                <a
                                    key={key}
                                    href={val.webs}
                                    style={swiperBox}
                                >
                                <img
                                    src={`http:${val.image}`}
                                    alt={val.title}
                                    style={swiperImage}
                                    onLoad={this.imgOnload.bind(this)}
                                />
                                </a>
                            )
                        }
                        )}
                    </Carousel>
                </div>
                {/*导航分类*/}
                <div className={Css['quink-nav']}>
                    {
                        this.state.aNav!==null ? this.state.aNav.map((value, index)=>{
                            return (
                                <div className={Css['item']} key={value.cid}>
                                    <li className={Css['item-img']}><img src={value.image} alt=""/></li>
                                    <li className={Css['item-text']}>{value.title}</li>
                                </div>
                            )
                        }) : ""
                    }
                </div>
                {/*产品推荐*/}
                {
                    this.state.aGoods !== null &&
                    this.state.aGoods.map((value, index)=>{
                        return (
                            <div key={index} className={Css['goods-level-wrap']}>
                                <div className={Css['classify-title'] + " " +Css['color'+(index+1)]}>
                                    —— {value.title} ——
                                </div>
                                {
                                    index % 2 === 0 ?
                                    <div>
                                        <div className={Css['goods-level1-wrap']}>
                                            <div className={Css['goods-level1-item0']}>
                                                <div className={Css['goods-title']}>{value.items!==null ? value.items[0].title : ""}</div>
                                                <div className={Css['goods-text']}>精品打折</div>
                                                <div className={Css['goods-price'+(index+1)]}>{value.items!==null ? value.items[0].price : ""}</div>
                                                <div className={Css['goods-img']}>
                                                    <img src={value.items!==null ? `http:${value.items[0].image}`:""} alt=""/>
                                                </div>
                                            </div>
                                            <div className={Css['goods-level1-item1']}>
                                                {
                                                    value.items !== null ? value.items.slice(1,3).map((val2,key2)=>{
                                                        return (
                                                            <div key={key2} className={Css['goods-row']}>
                                                                <div className={Css['goods-row-title']}>
                                                                    {val2.title}
                                                                </div>
                                                                <div className={Css['goods-row-text']}>
                                                                    品质精挑
                                                                </div>
                                                                <div className={Css['goods-row-img']}>
                                                                    <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : ''
                                                }
                                            </div>
                                        </div>
                                        <div className={Css['goods-list-wrap']}>
                                            {
                                                value.items !== null ? value.items.slice(3,7).map((val3,key3)=>{
                                                    return (
                                                        <div key={key3} className={Css['goods-list']}>
                                                            <div className={Css['title']}>
                                                                {val3.title}
                                                            </div>
                                                            <div className={Css['image']}>
                                                                <img src={`http:${val3.image}`} alt=""/>
                                                            </div>
                                                            <div className={Css['price']}>
                                                                {val3.price}
                                                            </div>
                                                            <div className={Css['unprice']}>
                                                                {val3.price+100}
                                                            </div>
                                                        </div>
                                                    )
                                                }):""
                                            }
                                        </div>
                                    </div> : <div>
                                        <div className={Css['goods-level1-wrap']}>
                                            {
                                                value.items !== null ?
                                                value.items.slice(0, 2).map((item1, index1)=>{
                                                    return (
                                                        <div key={index1} className={Css['goods-level1-item0']}>
                                                            <div className={Css['goods-title2']}>{item1.title}</div>
                                                            <div className={Css['goods-text2']}>火爆开售</div>
                                                            <div className={Css['goods-img2']}>
                                                                <img src={`http:${item1.image}`} alt=""/>
                                                            </div>
                                                        </div>
                                                    )
                                                }):''
                                            }
                                        </div>
                                        {/*第三个子格*/}
                                        <div className={Css['goods-list-wrap']}>
                                            {
                                                value.items!==null ?
                                                value.items.slice(2, 6).map((item2, index2)=>{
                                                    return (
                                                        <div key={index2} className={Css['goods-list']}>
                                                            <div className={Css['title']}>
                                                                {item2.title}
                                                            </div>
                                                            <div className={Css['image']}>
                                                                <img src={`http:${item2.image}`} alt=""/>
                                                            </div>
                                                            <div className={Css['price']}>
                                                                {item2.price}
                                                            </div>
                                                            <div className={Css['unprice']}>
                                                                {item2.price+100}
                                                            </div>
                                                        </div>
                                                    )
                                                }):""
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                {/*为你推荐*/}
                <div className={Css['reco-title-wrap']}>
                    {/*标题部分*/}
                    <div className={Css['line']}></div>
                    <div className={Css['reco-text-wrap']}>
                        <div className={Css['reco-icon']}></div>
                        <div className={Css['reco-text']}>为您推荐</div>
                    </div>
                    <div className={Css['line']}></div>
                </div>
                {/*为您推荐得内容*/}
                <div className={Css['reco-item-wrap']}>
                    {
                        this.state.aReco !==null ?
                        this.state.aReco.map((value, index)=>{
                            return (
                                    <div key={index} className={Css['reco-item']}>
                                        <div className={Css['image']}>
                                            <img src={`http:${value.image}`} alt=""/>
                                        </div>
                                        <div className={Css['title']}>
                                            {value.title}
                                        </div>
                                        <div className={Css['price']}>
                                            {value.price}
                                        </div>
                                    </div>
                            )
                        }):""
                    }
                </div>
            </div>
        );
    }
}

export default IndexComponent;