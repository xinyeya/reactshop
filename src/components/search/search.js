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
            bHistory: true
        }
    }

    componentDidMount() {
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

    render() {
        return (
            <div style={{display: this.props.pageStyle}} className={Css['page']} onClick={this.props.childStyle.bind(this, {display: "none"})}>
                {/*头部*/}
                <div className={Css['search-header']}>
                    <div className={Css['close']}></div>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-input-wrap']}>
                            <input type="text" className={Css['search']} placeholder={"请输入宝贝名称"}/>
                        </div>
                        <button type={"button"} className={Css['search-btn']}></button>
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
            </div>
        );
    }
}

export default SearchComponent;