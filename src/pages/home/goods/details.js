import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import AsyncComponent from "../../../components/async/AsyncComponent";
import config from "../../../assets/js/conf/config";
import Css from "../../../assets/css/home/goods/datails.module.css";
import {localParam} from "../../../assets/js/utils/util";
const DetailsItem = AsyncComponent(()=>import('./details_item'));
const DetailsContent = AsyncComponent(()=>import('./details_content'));
const DetailsReview = AsyncComponent(()=>import('./details_review'));

class GoodsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gid: props.location.search !== "" ? localParam(props.location.search).search.gid : "",
            tabStyle: {
                bItem: true,
                bContent: false,
                bReviews: false
            }
        }
    }

    componentDidMount() {
        this.setTabStyle(this.props)
    }

    // 判断路由跳转刷新页面
    componentWillReceiveProps(newProps) {
        this.setTabStyle(newProps)
    }

    // 设置选项卡切换的样式
    setTabStyle(props) {
        switch (props.location.pathname) {
            case config.path+"goods/details/item":
                this.setState({
                    tabStyle: {bItem: true, bContent: false, bReviews: false}
                });
                break;
            case config.path+"goods/details/content":
                this.setState({
                    tabStyle: {bItem: false, bContent: true, bReviews: false}
                });
                break;
            case config.path+"goods/details/review":
                this.setState({
                    tabStyle: {bItem: false, bContent: false, bReviews: true}
                });
                break;
            default:
                this.setState({
                    tabStyle: {bItem: true, bContent: false, bReviews: false}
                });
                break;
        }
    }

    // 返回上一页
    goBack() {
        this.props.history.goBack();
    }

    // 跳转页面
    replacePage(url) {
        this.props.history.replace(config.path + url);
    }

    // 跳转购物车
    pushPage(url) {
        this.props.history.push(config.path + url);
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
                {/*头部*/}
                <div className={Css['details-header']}>
                    {/*返回按钮*/}
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    {/*tab栏*/}
                    <div className={Css['tab-wrap']}>
                        <div className={this.state.tabStyle.bItem ? Css['tab-name'] + " " + Css['active'] : Css['tab-name']} onClick={this.replacePage.bind(this, `goods/details/item?gid=${this.state.gid}`)}>商品</div>
                        <div className={this.state.tabStyle.bContent ? Css['tab-name'] + " " + Css['active'] : Css['tab-name']} onClick={this.replacePage.bind(this, `goods/details/content?gid=${this.state.gid}`)}>详情</div>
                        <div className={this.state.tabStyle.bReviews ? Css['tab-name'] + " " + Css['active'] : Css['tab-name']} onClick={this.replacePage.bind(this, `goods/details/review?gid=${this.state.gid}`)}>评论</div>
                    </div>
                    {/*购物车*/}
                    <div id={"cart-icon"} className={Css['cart-icon']} onClick={this.pushPage.bind(this, "home/cart")}>
                        <div className={this.props.state.cart.aCartData.length > 0 ? Css['spot'] : Css['spot'] + " hide"}></div>
                    </div>
                </div>
                {/* 路由 */}
                <div className={Css['sub-page']}>
                    <Switch>
                        <Route path={config.path+"goods/details/item"} component={DetailsItem}/>
                        <Route path={config.path+"goods/details/content"} component={DetailsContent}/>
                        <Route path={config.path+"goods/details/review"} component={DetailsReview}/>
                        <Redirect to={config.path + "goods/details/item"}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(GoodsDetails);