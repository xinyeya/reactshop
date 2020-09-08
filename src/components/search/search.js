import React from "react";
import {withRouter} from 'react-router'
import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/libs/request";
import Css from './search.module.css';
import "../../assets/css/common/public.css";
import { Modal } from 'antd-mobile';
import {connect} from 'react-redux';
import action from "../../actions";

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bHistory: false,
            aHotKeyWords: [],
            keywords: ''
        };
        this.aKeywords = props.state.hk.keywords;
    }

    componentDidMount() {
        // 判断搜索历史
        if (this.aKeywords.length > 0) {
            this.setState({
                bHistory: false
            })
        }else{
            this.setState({
                bHistory: true
            })
        }
        this.getHotKeyWords();
    }

    // 获取热门搜索数据
    getHotKeyWords() {
        request(config.baseUrl+'/api/home/public/hotwords?token='+config.token).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aHotKeyWords: res.data
                });
            }
        })
    }

    // 清理搜索记录
    clearHistory() {
        Modal.alert('', '你确定要删除吗？', [
            { text: '返回', onPress: () => {}},
            { text: '确定', onPress: () => {
                    this.setState({
                        bHistory: false
                    });
                    // 删除本地缓存
                    localStorage.removeItem('hk');
                    this.props.dispatch(action.hk.addHistoryKeywords({keywords: []}));
                    this.aKeywords = [];
                }
            },
        ]);
    }

    // 添加历史记录
    addHistoryKeywords() {
        //去重
        for (let i=0; i < this.aKeywords.length; i++) {
            if (this.aKeywords[i] === this.state.keywords) {
                // 删除现在这一个
                this.aKeywords.splice(i--, 1)
            }
        }
        this.aKeywords.unshift(this.state.keywords);
        // 将数据存储到本地缓存
        localStorage['hk'] = JSON.stringify(this.aKeywords);
        // 存储值到redux
        this.props.dispatch(action.hk.addHistoryKeywords({keywords: this.aKeywords}))
        this.goPage("goods/search?keywords="+this.aKeywords);
    }

    // 跳转商品选择页面
    goPage(url) {
        this.props.history.push(config.path + url);
    }
    render() {
        return (
            <div style={{display: this.props.pageStyle.display}} className={Css['page']}>
                {/*头部*/}
                <div className={Css['search-header']}>
                    <div className={Css['close']} onClick={this.props.childStyle.bind(this, {display: "none"})}></div>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-input-wrap']}>
                            <input type="text" className={Css['search']} placeholder={"请输入宝贝名称"} onChange={e=>{
                                this.setState({
                                    keywords: e.target.value
                                })
                            }}/>
                        </div>
                        <button type={"button"} className={Css['search-btn']} onClick={this.addHistoryKeywords.bind(this)}></button>
                    </div>
                </div>
                {/*搜索记录盒子*/}
                <div className={this.state.bHistory ? Css['search-main'] + ' hide' : Css['search-main']}>
                    {/*最近搜索标题*/}
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>最近搜索</div>
                        <div className={Css['bin']} onClick={this.clearHistory.bind(this)}></div>
                    </div>
                    {/*搜索记录*/}
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.props.state.hk.keywords !== null ? this.props.state.hk.keywords.map((val, key)=>{
                                return (
                                    <div key={key} className={Css['keywords']} onClick={this.goPage.bind(this, `goods/search?keywords=${val}`)}>{val}</div>
                                )
                            }) : ""
                        }
                    </div>
                </div>
                {/*搜索推荐盒子*/}
                <div className={Css['search-main']}>
                    {/*最近搜索标题*/}
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>热门搜索</div>
                    </div>
                    {/*热门搜索单个*/}
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.state.aHotKeyWords.length > 0 ? this.state.aHotKeyWords.map((val, key)=>{
                                return (
                                    <div key={key} className={Css['keywords']} onClick={this.goPage.bind(this, `goods/search?keywords=${val.title}`)}>{val.title}</div>
                                )
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state)=>{
    return {
        state: state
    }
})(withRouter(SearchComponent));