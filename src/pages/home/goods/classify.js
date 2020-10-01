import React from 'react';
import  {Route,Switch}  from  'react-router-dom';
import asyncComponents from '../../../components/async/AsyncComponent';
import config from '../../../assets/js/conf/config.js';
import IScroll from '../../../assets/js/libs/iscroll.js';
import Css from '../../../assets/css/home/goods/classify.css';
import {request} from "../../../assets/js/libs/request";
import {isSystem, localParam, setScrollTop} from "../../../assets/js/utils/util";
import SearchComponent from '../../../components/search/search';
const GoodsItems=asyncComponents(()=>import('./items'));
export default class  GoodsClassify extends React.Component{
    constructor(props){
        super(props);
        this.state={
            aClassify:[],
            pageStyle:{display:"none"}
        };
        this.myScroll=null;
        this.aTempClassify=[];
        this.cid=props.location.search?localParam(props.location.search).search.cid:'492';
    }
    // 调用函数获取数据列表
    componentDidMount(){
        setScrollTop();
        this.getClassifyData();
    }
    // 跳转路由
    replacePage(pUrl){
      this.props.history.replace(config.path+pUrl);
    }
    // 返回上一层
    goBack(){
        this.props.history.goBack();
    }
    // 初始化scroll插件
    eventScroll(){
        let scrollClassify = this.refs["scroll-classify"];
        scrollClassify.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        this.myScroll= new IScroll(scrollClassify, {
            scrollX : false,
            scrollY : true,
            preventDefault : false
        });
    }
    // 获取分类列表
    getClassifyData(){
        request(config.baseUrl+"/api/home/category/menu?token="+config.token).then(res =>{
            if (res.code ===200){
                this.aTempClassify=res.data;
                for (let i=0;i<this.aTempClassify.length;i++){
                    this.aTempClassify[i].bActive=false;
                }
                this.setState({aClassify:this.aTempClassify},()=>{
                    this.eventScroll();
                    this.defaultClassifyStyle();
                })
            }
        } );
    }
    // 点击修改样式并跳转页面
    changeStyle(pUrl,pIndex){
        if (this.aTempClassify.length>0){
            for (let i=0;i<this.aTempClassify.length;i++){
                this.aTempClassify[i].bActive=false;
            }
        }
        this.aTempClassify[pIndex].bActive=true;
        this.handleScroll(pIndex);
        this.replacePage(pUrl);
    }
    // 下拉插件，兼容IOS
    handleScroll(pIndex){
        // 获取dom
        let oScrollClassify=this.refs["scroll-classify"];
        // 获取高度
        let iTopHeight=Math.round(parseInt(this.refs['item-'+pIndex].offsetHeight)*pIndex);
        // 获取下拉的高度
        let iHalfHeight=Math.round(oScrollClassify.offsetHeight/3);
        // 计算下拉高度
        let iBottomHeight=oScrollClassify.scrollHeight-iTopHeight;
        // 如果在不在指定位置则修改高度
        if (iTopHeight>iHalfHeight && iBottomHeight>oScrollClassify.offsetHeight){
            this.myScroll.scrollTo(0,-iTopHeight,300,IScroll.utils.ease.elastic);
        }
    }
    // 默认样式
    defaultClassifyStyle(){
        if (this.aTempClassify.length>0){
            for (let i=0;i<this.aTempClassify.length;i++){
                if (this.aTempClassify[i].cid ===this.cid){
                    this.aTempClassify[i].bActive=true;
                    break;
                }
            }
            this.setState({aClassify:this.aTempClassify});
        }
    }
    // 显示/隐藏搜索组件
    getStyle(val){
        this.setState({pageStyle:val})
    }
    // 显示搜索组件
    changeSearch(){
        this.setState({pageStyle:{display:"block"}})
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
            <div>
                {/*头部*/}
                <div className={Css['search-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['search']} onClick={this.changeSearch.bind(this)}>请输入宝贝名称</div>
                </div>
                {/* 列表 */}
                <div className={Css['goods-main']}>
                    <div ref="scroll-classify" className={Css['classify-wrap']}>
                        <div>
                            {
                                this.state.aClassify!=null?
                                    this.state.aClassify.map((item, index)=>{
                                        return(
                                            <div ref={"item-"+index} className={item.bActive?Css['classify-item']+" "+Css['active']:Css['classify-item']} key={index} onClick={this.changeStyle.bind(this, 'goods/classify/items?cid='+item.cid+'',index)}>{item.title}</div>
                                        )
                                    })
                                :""
                            }
                            {
                                isSystem() === 1?<div style={{width:"100%",height: "1.6rem"}}></div>:<div style={{width:"100%",height: "0.2rem"}}></div>
                            }
                        </div>
                    </div>
                    {/*内容路由*/}
                    <div className={Css['goods-content']}>
                        <Switch>
                            <Route path={config.path+"goods/classify/items"} component={GoodsItems}></Route>
                        </Switch>
                    </div>
                </div>
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}></SearchComponent>
            </div>
        );
    }
}