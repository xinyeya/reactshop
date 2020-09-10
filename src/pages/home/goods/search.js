import React from 'react';
import config from '../../../assets/js/conf/config.js';
import {request} from "../../../assets/js/libs/request";
import IScroll from '../../../assets/js/libs/iscroll.js';
import Uprefresh from '../../../assets/js/libs/uprefresh';
import Css from '../../../assets/css/home/goods/search.css';
import SearchComponent from "../../../components/search/search";
import {lazyImg} from "../../../assets/js/utils/util";
export default class  GoodsSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            screenMove: "",
            bMask: false,
            pageStyle: {display: "none"},
            aGoodsList: [],
            bPriceMenu: false,
            bSaleMenu: false,
            aPriceOrder: [
                {
                    title: "综合",
                    type: "all",
                    checked: true
                },
                {
                    title: "从低到高",
                    type: "up",
                    checked: false
                },
                {
                    title: "从高到低",
                    type: "down",
                    checked: false
                }
            ]
        };
        this.myScroll = null;
        this.oUpRefresh = null;
        this.curPage = 1;
        this.maxPage = 0;
        this.oType = "all";
        this.offsetBottom = 100;
        this.bPriceMenu = false;
        this.bSaleMenu = false;
        this.sParams = "";
    }
    componentDidMount(){
        // 兼容IOS的侧边栏
        this.myScroll = new IScroll("#screen",{
            scrollX: false,
            scrollY: true,
            preventDefault: false,
            aGoodsList: []
        });
        this.getPageData();
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
            bMask: false,
            bPriceMenu: false,
            bSaleMenu: false,
        });
    }

    // 返回上一层
    goBack() {
        this.props.history.goBack();
    }

    // 显示/隐藏价格排序
    handlePriceOrder() {
        this.bSaleMenu = false;
        this.setState({
            bSaleMenu: false
        });
        if (!this.bPriceMenu){
            this.bPriceMenu = true;
            this.setState({
                bPriceMenu: true
            });
        }else{
            this.bPriceMenu = false;
            this.setState({
                bPriceMenu: false
            });
        }
    }

    // 显示/隐藏销量排序
    handleSalesOrder() {
        this.bPriceMenu = false;
        this.setState({
            bPriceMenu: false
        });
        if (!this.bSaleMenu){
            this.setState({
                bSaleMenu: true
            });
        }else{
            this.setState({
                bSaleMenu: false
            });
        }
        this.oType="sales";
        this.getPageData();
    }

    // 显示/隐藏搜索组件页面
    changeSearch(){
        this.setState({pageStyle:{display:"none"}})
    }

    // 显示/隐藏搜索组件页面
    getStyle(val){
        this.setState({pageStyle:val})
    }

    // 封装url请求链接
    setParams() {
        this.sParams = "/api/home/goods/search?kwords=裙&param=&&price1=&price2=&otype="+this.oType+"&cid=";
    }

    // 获取数据
    getPageData() {
        // 改变sParams方便下面使用
        this.setParams();
        let url = config.baseUrl + "/api/home/goods/search?"+this.sParams+"&page=1&token="+config.token;
        request(url).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aGoodsList: res.data
                });
                this.maxPage = res.pageinfo.pagenum;
                lazyImg();
                this.getScrollPage();
            }else{
                this.setState({
                    aGoodsList: []
                })
            }
        })
    }

    // 无限下拉刷新
    getScrollPage() {
        this.oUpRefresh = new Uprefresh({
            "curPage": this.curPage,
            "maxPage": this.maxPage,
            "offsetBottom": this.offsetBottom
        }, curPage => {
            let url = config.baseUrl + "/api/home/goods/search?"+this.sParams+"&page="+curPage+"&cid=&token="+config.token;
            request(url).then(res=>{
                if (res.code === 200) {
                    console.log(res);
                    if (res.data.length>0){
                        let aGoods = this.state.aGoodsList;
                        for (let i=0; i<res.data.length; i++) {
                            aGoods.push(res.data[i]);
                        }
                        this.setState({
                            aGoodsList: aGoods
                        })
                    }
                    lazyImg();
                }
            })
        })
    }

    // 选择价格排序里面的值
    checkPriceOrder(index) {
        let aPriceOrder = this.state.aPriceOrder;
        for (let key in aPriceOrder) {
            aPriceOrder[key].checked = false
        }
        aPriceOrder[index].checked = true;
        this.setState({
            aPriceOrder: aPriceOrder
        });
        this.oType = aPriceOrder[index].type;
        this.getPageData();
    }

    render(){
        return(
            <div className={Css['page']}>
                {/*头部定位*/}
                <div className={Css['search-top']}>
                    {/*头部搜索盒子*/}
                    <div className={Css['search-header']}>
                        <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                        <div className={Css['search-wrap']}>
                            <div className={Css['search-icon']}></div>
                            <div className={Css['search']} onClick={this.changeSearch.bind(this)}>请输入您的宝贝名称</div>
                        </div>
                        <div className={Css['screen-btn']} onClick={this.showScreen.bind(this)}>筛选</div>
                    </div>
                    {/*排序盒子*/}
                    <div className={Css['order-main']}>
                        {/*筛选排序子盒子*/}
                        <div className={this.state.bPriceMenu ? Css['order-item']+ " " + Css['active'] : Css['order-item']} onClick={this.handlePriceOrder.bind(this)}>
                            <div className={Css['order-item-text']}>综合</div>
                            <div className={Css['order-icon']}></div>
                            {/*选择排序*/}
                            <ul className={this.state.bPriceMenu ? Css['order-menu'] : Css['order-menu'] + " hide"}>
                                {
                                    this.state.aPriceOrder.length > 0 ? this.state.aPriceOrder.map((item, index)=>{
                                        return (
                                            <li key={index} className={item.checked ? Css['active'] : ""} onClick={this.checkPriceOrder.bind(this, index)}>{item.title}</li>
                                        )
                                    }) : ""
                                }
                            </ul>
                        </div>
                        <div className={this.state.bSaleMenu ? Css['order-item'] + " " + Css['active'] : Css['order-item']}>
                            <div className={Css['order-item-text']} onClick={this.handleSalesOrder.bind(this)}>销量</div>
                        </div>
                    </div>
                </div>
                {/*盒子*/}
                <div className={Css['goods-main']}>
                    {
                        this.state.aGoodsList.length > 0 ?
                        this.state.aGoodsList.map((item, index) => {
                            return (
                                <div key={index} className={Css['goods-list']}>
                                    {/*缩略图*/}
                                    <div className={Css['image']}>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    {/*内容介绍*/}
                                    <div className={Css['goods-content']}>
                                        <div className={Css['goods-title']}>
                                            {item.title}
                                        </div>
                                        <div className={Css['price']}>
                                            ￥{item.price}
                                        </div>
                                        <div className={Css['sales']}>
                                            销量<span>{item.sales}</span>件
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
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
                {/*搜索组件*/}
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}></SearchComponent>
            </div>
        );
    }
}