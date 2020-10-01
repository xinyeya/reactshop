import React from 'react';
import config from '../../../assets/js/conf/config.js';
import {request} from "../../../assets/js/libs/request";
import IScroll from '../../../assets/js/libs/iscroll.js';
import Uprefresh from '../../../assets/js/libs/uprefresh';
import Css from '../../../assets/css/home/goods/search.css';
import "../../../assets/css/common/public.css";
import SearchComponent from "../../../components/search/search";
import {lazyImg, localParam, setScrollTop} from "../../../assets/js/utils/util";
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
            ],
            keywords: "",
            aClassify: {
                checked: true,
                items: []
            },
            aPrice: {
                checked: true,
                items: [
                    {price1: 1, price2: 50, checked: false},
                    {price1: 51, price2: 99, checked: false},
                    {price1: 100, price2: 300, checked: false},
                    {price1: 301, price2: 1000, checked: false},
                    {price1: 1001, price2: 4000, checked: false},
                    {price1: 5001, price2: 9999, checked: false}
                ]
            },
            fPrice1: 0,
            fPrice2: 0,
            aAttr: [],
            itemTotal: 0
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
        this.sKeywords = "";
        this.cid = "";
        this.fPrice1 = "";
        this.fPrice2 = "";
        this.sParam = "";
        this.aParam = []
    }

    componentDidMount(){
        setScrollTop();
        // 兼容IOS的侧边栏
        let SearchScreen = this.refs['screen'];
        this.myScroll = new IScroll(SearchScreen,{
            scrollX: false,
            scrollY: true,
            preventDefault: false,
            aGoodsList: []
        });
        this.sKeywords = decodeURIComponent(localParam(this.props.location.search).search.keywords);
        this.setState({
            keywords: this.sKeywords
        });
        this.getPageData();
        this.getClassifyData();
        this.getAttrData();
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
        this.setState({pageStyle:{display:"block"}})
    }

    // 显示/隐藏搜索组件页面
    getStyle(val){
        this.setState({pageStyle:val})
    }

    // 封装url请求链接
    setParams() {
        this.sParams = "/api/home/goods/search?kwords="+this.sKeywords+"&param="+this.sParam+"&price1="+this.fPrice1+"&price2="+this.fPrice2+"&otype="+this.oType+"&cid="+this.cid;
    }

    // 获取数据
    getPageData() {
        // 改变sParams方便下面使用
        this.setParams();
        let url = config.baseUrl + this.sParams+"&page=1&token="+config.token;
        request(url).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aGoodsList: res.data,
                    itemTotal: res.pageinfo.total
                },()=>{
                    lazyImg();
                });
                this.maxPage = res.pageinfo.pagenum;
                this.getScrollPage();
            }else{
                this.setState({
                    aGoodsList: [],
                    itemTotal: 0
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
            let url = config.baseUrl+this.sParams+"&page="+curPage+"&cid=&token="+config.token;
            request(url).then(res=>{
                if (res.code === 200) {
                    if (res.data.length>0){
                        let aGoods = this.state.aGoodsList;
                        for (let i=0; i<res.data.length; i++) {
                            aGoods.push(res.data[i]);
                        }
                        this.setState({
                            aGoodsList: aGoods
                        },()=>{
                            lazyImg();
                        })
                    }
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

    // 子组件传递的值
    getChildKeywords(val) {
        this.sKeywords = val;
        this.setState({
            keywords: val,
            pageStyle: {display: "none"}
        });
        this.props.history.replace(config.path+"goods/search?keywords="+val);
        this.setReset();
        this.getPageData();
        this.getAttrData();
    }

    // 显示/隐藏分类选项
    handleClassify() {
        let aClassify = this.state.aClassify;
        aClassify.checked = !aClassify.checked;
        this.setState({
            aClassify: aClassify
        });
    }

    // 选择分类
    checkedClassify(index) {
        let aClassify = this.state.aClassify;
        if (aClassify.items.length > 0) {
            for (let i=0; i<aClassify.items.length;i++) {
                if (i !== index) {
                    aClassify.items[i].checked = false
                }
            }
            if (aClassify.items[index].checked) {
                aClassify.items[index].checked = false;
                this.cid = "";
            }else{
                aClassify.items[index].checked = true;
                this.cid = aClassify.items[index].cid;
            }
        }
        console.log(this.cid);
        this.setState({
            aClassify: aClassify
        });
    }

    // 价格范围显示/隐藏
    handlePrice() {
        let aPrice = this.state.aPrice;
        aPrice.checked = !aPrice.checked;
        this.setState({
            aPrice: aPrice
        });
    }

    // 选择价格范围
    checkedPrice(index, price1, price2) {
        let aPrice = this.state.aPrice;
        let fPrice1 = price1, fPrice2 = price2;
        if (aPrice.items.length > 0) {
            for (let i=0; i<aPrice.items.length;i++) {
                if (i !== index) {
                    aPrice.items[i].checked = false;
                }
            }
            if (aPrice.items[index].checked) {
                aPrice.items[index].checked = false;
                fPrice1 = 0;
                fPrice2 = 0;
                this.fPrice1 = "";
                this.fPrice2 = "";
            }else{
                aPrice.items[index].checked = true;
                this.fPrice1 = aPrice.items[index].price1;
                this.fPrice2 = aPrice.items[index].price2;

            }
        }
        this.setState({
            aPrice: aPrice,
            fPrice1: fPrice1,
            fPrice2: fPrice2
        });
    }

    // 阻止冒泡
    preventButton(e) {
        e.stopPropagation();
    }

    // 显示/隐藏属性
    handleAttr(index) {
        let aAttr = this.state.aAttr;
        aAttr[index].checked = !aAttr[index].checked;
        this.setState({
            aAttr: aAttr
        })
    }

    // 选择属性的值
    checkParams(attrIndex, paramIndex) {
        let aAttr = this.state.aAttr;
        if (aAttr[attrIndex].param[paramIndex].checked) {
            aAttr[attrIndex].param[paramIndex].checked = false;
            // 防止重复选择，删掉重复的属性
            for (let i=0; i<this.aParam.length; i++) {
                if (this.aParam[i] === aAttr[attrIndex].param[paramIndex].pid) {
                    this.aParam.splice(i--, 1);
                    break;
                }
            }
        }else{
            aAttr[attrIndex].param[paramIndex].checked = true;
            this.aParam.push(aAttr[attrIndex].param[paramIndex].pid);
        }
        // 将数组转为字符串存储
        this.sParam = this.aParam.length > 0 ? JSON.stringify(this.aParam) : "";
        this.setState({
            aAttr: aAttr
        })
    }

    // 获取分类数据
    getClassifyData() {
        let url = config.baseUrl+"/api/home/category/menu?token="+config.token;
        request(url).then(res=>{
            let aClassify = this.state.aClassify;
            if (res.code === 200) {
                aClassify.items = res.data;
                if (aClassify.items.length>0) {
                    for (let i=0; i<aClassify.items.length;i++) {
                        aClassify.items[i].checked = false
                    }
                }
                this.setState({
                    aClassify: aClassify
                },()=>{
                    // 刷新scroll，防止数据渲染后卡住
                    this.myScroll.refresh();
                });
            }
        });
    }

    // 获取属性数据
    getAttrData() {
        let url = config.baseUrl+"/api/home/goods/param?kwords="+this.sKeywords+"&token="+config.token;
        request(url).then(res=>{
            if (res.code === 200) {
                let aAttr = res.data;
                for (let i=0; i<aAttr.length; i++) {
                    aAttr[i].checked = true;
                    if (aAttr[i].param.length>0) {
                        for (let j=0; j<aAttr[i].param.length; j++) {
                            aAttr[i].param[j].checked = false;
                        }
                    }
                }
                this.setState({
                    aAttr: aAttr
                }, ()=>{
                    this.myScroll.refresh();
                });
            }
        })
    }

    // 确定筛选
    goSearch() {
        this.hideScreen();
        this.getPageData();
    }

    // 监听价格范围1的值
    changePrice1(e) {
        this.setState({
            fPrice1: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|;|,|+|=|\-|"|'|\/|\\|[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]]/g, "")
        },()=>{
            this.fPrice1 = this.state.fPrice1
        });
    }

    // 监听价格范围2的值
    changePrice2(e) {
        this.setState({
            fPrice2: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|;|,|+|=|\-|"|'|\/|\\|[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]]/g, "")
        },()=>{
            this.fPrice2 = this.state.fPrice2
        });
    }

    // 全部重置
    setReset() {
        this.sParam = "";
        this.aParam = [];
        this.cid = "";
        this.fPrice1 = "";
        this.fPrice2 = "";
        this.oType = "all";

        // 分类重置
        let aClassify = this.state.aClassify;
        if(aClassify.items.length > 0) {
            for (let i=0; i<aClassify.items.length;i++) {
                aClassify.items[i].checked = false;
            }
        }

        // 价格范围重置
        let aPrice = this.state.aPrice;
        for (let i=0;i<aPrice.items.length;i++) {
            aPrice.items[i].checked = false
        }

        // 属性重置
        let aAttr = this.state.aAttr;
        if (aAttr.length>0) {
            for (let i=0;i<aAttr.length;i++) {
                if (aAttr[i].param.length>0) {
                    for (let j=0;j<aAttr[i].param.length;j++) {
                        aAttr[i].param[j].checked = false
                    }
                }
            }
        }

        this.setState({
            fPrice1: 0,
            fPrice2: 0,
            aClassify: aClassify,
            aPrice: aPrice,
            aAttr: aAttr
        })
    }

    // 跳转商品详情页
    pushPage(pUrl) {
        this.props.history.push(config.path+pUrl);
    }

    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render(){
        return(
            <div className={Css['page']}>
                {/*头部定位*/}
                <div className={Css['search-top']}>
                    {/*头部搜索盒子*/}
                    <div className={Css['search-header']}>
                        <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                        <div className={Css['search-wrap']} onClick={this.changeSearch.bind(this)}>
                            <div className={Css['search-icon']}></div>
                            <div className={Css['search']}>{this.state.keywords}</div>
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
                                <div key={index} className={Css['goods-list']} onClick={this.pushPage.bind(this, `goods/details/item?gid=${item.gid}`)}>
                                    {/*缩略图*/}
                                    <div className={Css['image']}>
                                        <img data-echo={item.image} src={"../../../assets/common/lazyImg.jpg"} alt={item.title}/>
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
                        }) : <div className={"null-item"}>没有相关商品</div>
                    }
                </div>
                {/*遮罩层*/}
                <div ref={'mask'} className={this.state.bMask ? Css['mask'] : Css['mask']+" hide"} onClick={this.hideScreen.bind(this)}></div>
                {/*抽屉*/}
                <div ref={'screen'} className={Css['screen']+ " " +this.state.screenMove}>
                    <div>
                        {/*分类*/}
                        <div className={Css['attr-wrap']}>
                            {/*头部*/}
                            <div className={Css['attr-title-wrap']} onClick={this.handleClassify.bind(this)}>
                                <div className={Css['attr-name']}>分类</div>
                                <div className={this.state.aClassify.checked ? Css['attr-icon'] + " " + Css['up'] : Css['attr-icon']}></div>
                            </div>
                            {/*选项盒子*/}
                            <div className={this.state.aClassify.checked ? Css['item-wrap'] : Css['item-wrap'] + ' height-hide'}>
                                {
                                    this.state.aClassify.items.length > 0 ? this.state.aClassify.items.map((item, index)=>{
                                        return (
                                            <div key={index} className={item.checked ? Css['item']+ " " + Css['active'] : Css['item']} onClick={this.checkedClassify.bind(this, index)}>{item.title}</div>
                                        )
                                    }) : ""
                                }
                            </div>
                        </div>
                        {/*分割线*/}
                        <div style={{width:"100%", height: "1px", background: "#EFEFEF"}}></div>
                        {/*价格区间*/}
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-title-wrap']} onClick={this.handlePrice.bind(this)}>
                                <div className={Css['attr-name']}>价格区间</div>
                                <div className={Css['price-wrap']}>
                                    {/*最低价*/}
                                    <div className={Css['price-input']}>
                                        <input type="text"
                                               placeholder={"最低价"}
                                               value={this.state.fPrice1===0?"":this.state.fPrice1}
                                               onChange={this.changePrice1.bind(this)} onClick={this.preventButton.bind(this)}/>
                                    </div>
                                    <div className={Css['price-line']}></div>
                                    {/*最高价*/}
                                    <div className={Css['price-input']}>
                                        <input type="text"
                                               placeholder={"最高价"}
                                               value={this.state.fPrice2===0?"":this.state.fPrice2}
                                               onChange={this.changePrice2.bind(this)} onClick={this.preventButton.bind(this)}/>
                                    </div>
                                </div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            {/*选项盒子*/}
                            <div className={this.state.aPrice.checked ? Css['item-wrap'] : Css['item-wrap'] + ' height-hide'}>
                                {
                                    this.state.aPrice.items.map((item, index)=>{
                                        return (
                                            <div key={index} className={item.checked ? Css['item']+ " " + Css['active'] : Css['item']} onClick={this.checkedPrice.bind(this, index, item.price1, item.price2)}>{item.price1}-{item.price2}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/*分割线*/}
                        <div style={{width:"100%", height: "0.2rem", background: "#EFEFEF"}}></div>
                        {
                            this.state.aAttr.length > 0 ? this.state.aAttr.map((item, index)=>{
                                return (
                                    <React.Fragment key={index}>
                                        {/*品牌*/}
                                        <div className={Css['attr-wrap']}>
                                            <div className={Css['attr-title-wrap']} onClick={this.handleAttr.bind(this, index)}>
                                                <div className={Css['attr-name']}>{item.title}</div>
                                                <div className={item.checked ? Css['attr-icon'] : Css['attr-icon'] + " " + Css['up']}></div>
                                            </div>
                                            {/*选项盒子*/}
                                            <div className={item.checked ? Css['item-wrap'] : Css['item-wrap']+" height-hide"}>
                                                {
                                                    item.param.length > 0 ? item.param.map((item1, index1)=>{
                                                        return (
                                                            <div key={index1} className={item1.checked ? Css['item'] + " " + Css['active'] : Css['item']} onClick={this.checkParams.bind(this, index, index1)}>{item1.title}</div>
                                                        )
                                                    }) : ""
                                                }
                                            </div>
                                        </div>
                                        {/*分割线*/}
                                        <div style={{width:"100%", height: "0.2rem", background: "#EFEFEF"}}></div>
                                    </React.Fragment>
                                )
                            }):""
                        }
                        {/*占空*/}
                        <div style={{width:"100%", height: "1.7rem"}}></div>
                    </div>
                    {/*操作*/}
                    <div className={Css['handle-wrap']}>
                        <div className={Css['item']}>共<span>{this.state.itemTotal}</span>件</div>
                        <div className={Css['item']+" "+Css['reset']} onClick={this.setReset.bind(this)}>全部重置</div>
                        <div className={Css['item']+" "+Css['sure']} onClick={this.goSearch.bind(this)}>确定</div>
                    </div>
                </div>
                {/*搜索组件*/}
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)} isLocal={"1"} childKeywords={this.getChildKeywords.bind(this)} keywords={this.state.keywords}></SearchComponent>
            </div>
        );
    }
}