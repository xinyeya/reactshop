import React from 'react';
import {withRouter} from 'react-router';
import config from '../../assets/js/conf/config.js';
import {request} from "../../assets/js/libs/request";
import { Modal } from 'antd-mobile';
import Css from './search.css';
import {connect} from "react-redux";
import action from '../../actions';
import {Toast} from 'antd-mobile';
class SearchComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bHistory:true,
            aHotKeywords:[],
            keywords:""
        };
        this.aKeywords=props.state.hk.keywords;
    }
    componentDidMount(){
        if (this.props.state.hk.keywords.length>0){
            this.setState({bHistory:true})
        } else{
            this.setState({bHistory:false})
        }
        this.getHotKeywords();
    }

    // 获取搜索推荐词
    getHotKeywords(){
        request(config.baseUrl+"/api/home/public/hotwords?token="+config.token).then(res=>{
            if (res.code ===200){
                this.setState({aHotKeywords:res.data})
            } else{
                this.setState({aHotKeywords:[]})
            }
        })
    }

    // 删除历史记录
    clearHistory(){
        Modal.alert('', '确认要删除吗？', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                    this.setState({bHistory:false})
                    localStorage.removeItem("hk");
                    this.props.dispatch(action.hk.addHistoryKeywords({keywords:[]}));
                    this.aKeywords=[];
                }
            }
        ]);
    }
    // 添加搜索历史记录
    addHistoryKeywords(){
        let skeywords = this.state.keywords.replace(/^\s*|\s*$/g, "") || "";
        let pkeywords = this.state.keywords ? this.state.keywords.replace(/^\s*|\s*$/g, "") : "";

        if (skeywords != "" || pkeywords != "") {
            for (let i=0;i<this.aKeywords.length;i++){
                if (this.aKeywords[i]===this.state.keywords){
                    this.aKeywords.splice(i--,1);
                }
            }
            this.aKeywords.unshift(this.state.keywords);
            localStorage['hk']=JSON.stringify(this.aKeywords);
            this.props.dispatch(action.hk.addHistoryKeywords({keywords:this.aKeywords}));
            this.setState({bHistory:true});
            this.goPage("goods/search?keywords="+this.state.keywords, this.state.keywords)
        }else{
            Toast.info("请输入宝贝名称", 2);
        }
    }

    // 跳转商品列表页
    goPage(url, keywords){
        if (this.props.isLocal == '1') {
            this.props.childKeywords(keywords)
        }else{
            this.props.history.push(config.path+url);
        }
    }

    render(){
        return(
            <div style={this.props.pageStyle} className={Css['page']}>
                <div className={Css['search-header']}>
                    <div className={Css['close']} onClick={this.props.childStyle.bind(this,{display:"none"} )}></div>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-input-wrap']}>
                            <input type="text" className={Css['search']} placeholder="请输入宝贝名称" defaultValue={this.props.keywords} onChange={(e)=>{this.setState({keywords:e.target.value})}} />
                        </div>
                        <button type="button" className={Css['search-btn']} onClick={this.addHistoryKeywords.bind(this)}></button>
                    </div>
                </div>
                <div className={this.state.bHistory?Css['search-main']:Css['search-main']+" hide"}>
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>最近搜索</div>
                        <div className={Css['bin']} onClick={this.clearHistory.bind(this)}></div>
                    </div>
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.props.state.hk.keywords!=null?
                                this.props.state.hk.keywords.map((item,index)=>{
                                    return(
                                        <div key={index} className={Css['keywords']} onClick={this.goPage.bind(this, 'goods/search?keywords='+item, item)}>{item}</div>
                                    )
                                })
                            :''
                        }
                    </div>
                </div>
                <div className={Css['search-main']}>
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>热门搜索</div>
                    </div>
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.state.aHotKeywords!=null?
                                this.state.aHotKeywords.map((item,index)=>{
                                    return(
                                        <div key={index} className={Css['keywords']} onClick={this.goPage.bind(this, 'goods/search?keywords='+item.title, item.title)}>{item.title}</div>
                                    )
                                })
                            :""
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state)=>{
    return{
        state:state
    }
})(withRouter(SearchComponent))