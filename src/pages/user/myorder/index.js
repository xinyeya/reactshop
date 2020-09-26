import React from "react";
import {connect} from 'react-redux';
import Css from '../../../assets/css/user/myorder/index.css';
import SubHeaderComponent from "../../../components/header/subheader";
import TagComponent from "../../../components/tags/tags";
import {Switch, Route} from 'react-router-dom';
import config from "../../../assets/js/conf/config";
import AsyncComponent from "../../../components/async/AsyncComponent";
import {localParam} from "../../../assets/js/utils/util";
const OrderPage = AsyncComponent(()=>import('./order'));
const ReviewPage = AsyncComponent(()=>import('./review'));

class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: localParam(props.location.search).search.status ? localParam(props.location.search).search.status : '',
            title: ""
        }
    }

    componentDidMount() {
        this.getTitle();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            status: localParam(newProps.location.search).search.status
        }, ()=>{
            this.getTitle();
        })
    }

    getTitle() {
        switch (this.state.status) {
            case "all":
                this.setState({title: "全部订单"});
                break;
            case "0":
                this.setState({title: "待付款"});
                break;
            case "1":
                this.setState({title: "待收货"});
                break;
            case "2":
                this.setState({title: "待评价"});
                break;
            default:
                this.setState({title: "全部订单"});
                break;
        }
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title={this.state.title}></SubHeaderComponent>
                <TagComponent></TagComponent>
                <div className={Css['main']}>
                    <Switch>
                        <Route path={config.path+"myorder/order"} component={OrderPage}/>
                        <Route path={config.path+"myorder/review"} component={ReviewPage}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return { state };
})(MyOrder);