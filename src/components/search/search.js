import React from "react";
import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/libs/request";
import Css from './search.module.css';
import "../../assets/css/common/public.css";
import { Modal } from 'antd-mobile';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bHistory: true,
            aHotKeyWords: [],
            keywords: ''
        }
        this.aKeywords = []
    }

    componentDidMount() {
        this.getHotKeyWords();
    }

    // 获取热门搜索数据
    getHotKeyWords() {
        request(config.baseUrl+'/api/home/public/hotwords?token='+config.token).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aHotKeyWords: res.data
                });
                console.log(res.data)
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
                    })
                }
            },
        ]);
    }

    // 添加历史记录
    addHistoryKeywords() {
        //去重
        for (let i=0; i<this.aKeywords.length; i++) {
            if (this.aKeywords[i] === this.state.keywords) {
                // 删除现在这一个
                this.aKeywords.splice(i--, 1)
            }
        }
        this.aKeywords.unshift(this.state.aKeywords);
        console.log(this.aKeywords)
    }

    render() {
        return (
            <div style={{display: this.props.pageStyle}} className={Css['page']} onClick={this.props.childStyle.bind(this, {display: "none"})}>
                {/*头部*/}
                <div className={Css['search-header']}>
                    <div className={Css['close']}></div>
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
                <div className={this.state.bHistory ? Css['search-main'] : Css['search-main'] + ' hide'}>
                    {/*最近搜索标题*/}
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>最近搜索</div>
                        <div className={Css['bin']} onClick={this.clearHistory.bind(this)}></div>
                    </div>
                    {/*搜索记录*/}
                    <div className={Css['search-keywords-wrap']}>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
                        <div className={Css['keywords']}>大码女装</div>
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
                                    <div key={key} className={Css['keywords']}>{val.title}</div>
                                )
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComponent;