import React from "react";
import Css from "../../../assets/css/home/index/index.module.css";
import { Carousel } from 'antd-mobile';

class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
        }
    }

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            // this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            // });
        }, 100);
    }

    beforeChange(from, to) {
        console.log(`slide from ${from} to ${to}`)
    }

    afterChange(index) {
        console.log('slide to', index)
    }
    imgOnload() {
        // fire window resize event to change height
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }

    render() {
        // 轮播图外框样式
        const swiperBox = { display: 'inline-block', width: '100%', height: this.state.imgHeight }
        const swiperImage = { width: '100%', verticalAlign: 'top' }
        return (
            <div className={Css['page']}>
                {/*头部搜索栏*/}
                <div className={Css["search-header"] + " " + Css['red-bg']}>
                    <div className={Css['classify-icon']}></div>
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
                        autoplay={false}
                        infinite
                        beforeChange={this.beforeChange.bind(this)}
                        afterChange={this.afterChange.bind(this)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.baidu.com"
                                style={swiperBox}
                            >
                                <img
                                    src={`http://vueshop.glbuys.com/uploadfiles/1484285302.jpg`}
                                    alt=""
                                    style={swiperImage}
                                    onLoad={this.imgOnload.bind(this)}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
                {/*导航分类*/}
                <div className={Css['quink-nav']}>
                    <div className={Css['item']}>
                        <li className={Css['item-img']}><img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </div>
                    <div className={Css['item']}>
                        <li className={Css['item-img']}><img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </div>
                    <div className={Css['item']}>
                        <li className={Css['item-img']}><img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </div>
                    <div className={Css['item']}>
                        <li className={Css['item-img']}><img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </div>
                </div>
                {/*产品推荐*/}
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title'] + " " +Css['color1']}>
                        —— 潮流女装 ——
                    </div>
                    <div className={Css['goods-level1-wrap']}>
                        {/*第一个子格*/}
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text']}>精品打折</div>
                            <div className={Css['goods-price1']}>128元</div>
                            <div className={Css['goods-img']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                        </div>
                        {/*第二个子格*/}
                        <div className={Css['goods-level1-item1']}>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>
                                    高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                                </div>
                                <div className={Css['goods-row-text']}>
                                    品质精挑
                                </div>
                                <div className={Css['goods-row-img']}>
                                    <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                                </div>
                            </div>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>
                                    高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                                </div>
                                <div className={Css['goods-row-text']}>
                                    品质精挑
                                </div>
                                <div className={Css['goods-row-img']}>
                                    <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*第三个子格*/}
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                    </div>
                </div>
                {/*产品推荐2*/}
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title'] + " " +Css['color2']}>
                        —— 品牌男装 ——
                    </div>
                    <div className={Css['goods-level1-wrap']}>
                        {/*第一个子格*/}
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title2']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text2']}>火爆开售</div>
                            <div className={Css['goods-img2']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                        </div>
                        {/*第二个子格*/}
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title2']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text2']}>火爆开售</div>
                            <div className={Css['goods-img2']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                    {/*第三个子格*/}
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                    </div>
                </div>
                {/*产品推荐3*/}
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title'] + " " +Css['color3']}>
                        —— 电脑办公 ——
                    </div>
                    <div className={Css['goods-level1-wrap']}>
                        {/*第一个子格*/}
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title2']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text2']}>火爆开售</div>
                            <div className={Css['goods-img2']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                        </div>
                        {/*第二个子格*/}
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title2']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text2']}>火爆开售</div>
                            <div className={Css['goods-img2']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                    {/*第三个子格*/}
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                            </div>
                            <div className={Css['price']}>
                                ￥288
                            </div>
                            <div className={Css['unprice']}>
                                ￥388
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                        </div>
                        <div className={Css['price']}>
                            ￥399
                        </div>
                    </div>
                </div>
                <div className={Css['reco-item-wrap']}>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                        </div>
                        <div className={Css['price']}>
                            ￥399
                        </div>
                    </div>
                </div>
                <div className={Css['reco-item-wrap']}>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                        </div>
                        <div className={Css['price']}>
                            ￥399
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexComponent;