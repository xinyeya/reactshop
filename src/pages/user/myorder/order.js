import React from "react";
import Css from '../../../assets/css/user/myorder/order.css';
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {lazyImg, localParam} from "../../../assets/js/utils/util";
import Uprefresh from '../../../assets/js/libs/uprefresh';
import {AuthRoute} from "../../../routes/private";
import {Modal, Toast} from "antd-mobile";

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: localParam(props.location.search).search.status ? localParam(props.location.search).search.status : '',
            aOrder: [],
        };
        this.oUpRefresh = null;
        this.curPage = 1;
        this.maxPage = 0;
        this.oType = "all";
        this.offsetBottom = 100;
        AuthRoute(props);
    }

    componentDidMount() {
        this.getData();
    }

    // 获取我的订单数据
    getData() {
        let sUrl = config.baseUrl+"/api/user/myorder/index?uid="+this.props.state.user.uid+"&status="+this.state.status+"&token="+config.token+"&page="+this.curPage;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.maxPage = res.pageinfo.pagenum;
                this.setState({
                    aOrder: res.data
                }, ()=>{
                    lazyImg();
                    this.getScrollPage();
                });
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
            let url = config.baseUrl+"/api/user/myorder/index?uid="+this.props.state.user.uid+"&status="+this.state.status+"&token="+config.token+"&page="+curPage;
            request(url).then(res=>{
                if (res.code === 200) {
                    if (res.data.length>0){
                        let aOrder = this.state.aOrder;
                        for (let i=0; i<res.data.length; i++) {
                            aOrder.push(res.data[i]);
                        }
                        this.setState({
                            aOrder: aOrder
                        },()=>{
                            lazyImg();
                        })
                    }
                }
            })
        })
    }

    // 取消订单
    cancelOrder(ordernum, index) {
        Modal.alert("", "确认要取消订单吗?", [
            {text: "取消", onPress: () => {}, style: "default"},
            {text: "确认", onPress: () => {
                    let sUrl = config.baseUrl+"/api/user/myorder/clearorder?uid="+this.props.state.user.uid+"&ordernum="+ordernum+"&token="+config.token;
                    request(sUrl).then(res=>{
                        if (res.code === 200) {
                            let aOrder = this.state.aOrder;
                            aOrder.splice(index, 1);
                            this.setState({
                                aOrder: aOrder
                            }, ()=>{
                                Toast.info(res.data, 1);
                            });
                        }
                    });
                }
            }
        ])
    }

    // 确认收货
    firmOrder(ordernum, index) {
        let sUrl = config.baseUrl+"/api/user/myorder/finalorder?uid="+this.props.state.user.uid+"&ordernum="+ordernum+"&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                let aOrder = this.state.aOrder;
                aOrder[index].status = '2';
                this.setState({
                    aOrder: aOrder
                })
            }
            Toast.info(res.data, 1);
        })
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.oUpRefresh = null;
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <React.Fragment>
                {/*订单列表盒子*/}
                {
                    this.state.aOrder.length > 0 ? this.state.aOrder.map((item, index)=>{
                        return (
                            <div className={Css['order-list']} key={index}>
                                {/*订单编号盒子*/}
                                <div className={Css['ordernum-wrap']}>
                                    <div className={Css['order']}>订单编号: {item.ordernum}</div>
                                    <div className={Css['status']}>
                                        {item.status==="0"?"待付款":item.status==='1'?"待收货":item.status==='2'?"已收货":""}
                                    </div>
                                </div>
                                {/*单个商品*/}
                                {
                                    item.goods.length>0 ? item.goods.map((item1,index1)=>{
                                        return (
                                            <div className={Css['item-list']} key={index1}>
                                                {/*缩略图*/}
                                                <div className={Css['image']}>
                                                    <img data-echo={item1.image} src={require('../../../assets/images/common/lazyImg.jpg')} alt=""/>
                                                </div>
                                                <div className={Css['title']}>
                                                    {item1.title}
                                                </div>
                                                <div className={Css['amount']}>
                                                    × {item1.amount}
                                                </div>
                                            </div>
                                        )
                                    }):""
                                }
                                {/*总价*/}
                                <div className={Css['total-wrap']}>
                                    <div className={Css['total']}>
                                        实付金额: ￥{item.total}
                                    </div>
                                    {/*按钮*/}
                                    {
                                        item.status !== '2' ?
                                            <div className={Css['status-btn']} onClick={
                                                item.status==='0'?this.cancelOrder.bind(this, item.ordernum, index):
                                                    item.status==='1'?this.firmOrder.bind(this, item.ordernum, index):
                                                        ()=>{}
                                            }>
                                                {
                                                    item.status==='0'?"取消订单":item.status==="1"?"确认收货":""
                                                }
                                            </div>
                                            : ""
                                    }
                                </div>
                            </div>
                        )
                    }):""
                }
            </React.Fragment>
        );
    }
}

export default connect(state=>{
    return {state}
})(OrderPage);