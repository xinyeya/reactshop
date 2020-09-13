import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import AsyncComponent from "../../../components/async/AsyncComponent";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Css from "../../../assets/css/home/goods/datails.module.css";
import {lazyImg, localParam} from "../../../assets/js/utils/util";
const DetailsItem = AsyncComponent(()=>import('./details_item'));
const DetailsContent = AsyncComponent(()=>import('./details_content'));
const DetailsReview = AsyncComponent(()=>import('./details_review'));

class GoodsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    goBack() {
        this.props.history.goBack();
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
                        <div className={Css['tab-name'] + " " + Css['active']}>商品</div>
                        <div className={Css['tab-name']}>详情</div>
                        <div className={Css['tab-name']}>评论</div>
                    </div>
                    {/*购物车*/}
                    <div className={Css['cart-icon']}>
                        <div className={Css['spot']}></div>
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

export default GoodsDetails;