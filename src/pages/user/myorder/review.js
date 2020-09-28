import React from "react";
import Css from '../../../assets/css/user/myorder/review.css';
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import {AuthRoute} from "../../../routes/private";
import {request} from "../../../assets/js/libs/request";
import Uprefresh from '../../../assets/js/libs/uprefresh';
import {lazyImg} from "../../../assets/js/utils/util";

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aOrder: []
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

    // 获取数据
    getData() {
        let sUrl = config.baseUrl+"/api/user/myorder/reviewOrder?uid="+this.props.state.user.uid+"&page="+this.curPage+"&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.maxPage = res.pageinfo.pagenum;
                this.setState({
                    aOrder: res.data
                }, ()=>{
                    lazyImg();
                    this.getScrollPage();
                })
            }
        });
    }

    // 无限下拉刷新
    getScrollPage() {
        this.oUpRefresh = new Uprefresh({
            "curPage": this.curPage,
            "maxPage": this.maxPage,
            "offsetBottom": this.offsetBottom
        }, curPage => {
            let url = config.baseUrl+"/api/user/myorder/reviewOrder?uid="+this.props.state.user.uid+"&page="+curPage+"&token="+config.token;
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

    // 跳转页面
    pushPage(url) {
        this.props.history.push(config.path+url);
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
                    this.state.aOrder.length > 0?
                        this.state.aOrder.map((item, index)=>{
                            return (
                                <div className={Css['order-list']} key={index} onClick={this.pushPage.bind(this, 'order/detail?ordernum='+item.ordernum)}>
                                    {/*订单编号盒子*/}
                                    <div className={Css['ordernum-wrap']}>
                                        <div className={Css['order']}>订单编号: {item.ordernum}</div>
                                        <div className={Css['status']}>
                                            {item.status==="0"?"待付款":item.status==='1'?"待收货":item.status==='2'?"已收货":""}
                                        </div>
                                    </div>
                                    {/*单个商品*/}
                                    {
                                        item.goods.length > 0?item.goods.map((item1, index1)=>{
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
                                                    {/*按钮*/}
                                                    <div className={Css['status-btn']} onClick={e=>{
                                                        e.stopPropagation();
                                                        this.pushPage("order/add_review?gid="+item1.gid+"&ordernum="+item.ordernum)
                                                    }}>
                                                        {
                                                            item1.isreview === '0' ? "评价" : "追加评价"
                                                        }
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
})(ReviewPage);