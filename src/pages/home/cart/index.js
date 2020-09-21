import React from 'react';
import {connect} from  'react-redux';
import action from '../../../actions';
import Css from '../../../assets/css/cart/index.css';
import SubHeaderComponent from "../../../components/header/subheader";
import config from "../../../assets/js/conf/config";
class  CartIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bAllChecked: true
        }
    }

    componentDidMount(){
        this.isAllCheck();
    }
    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    // 删除商品
    delItem(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            this.props.dispatch(action.cart.delItem({index: index}));
        }
        this.isAllCheck();
    }

    // 选择商品
    checkItem(index, checked) {
        if (this.props.state.cart.aCartData.length>0) {
            this.props.dispatch(action.cart.checkItem({
                index: index,
                checked: checked
            }));
            this.isAllCheck();
        }
    }

    // 是否全选
    isAllCheck() {
        if (this.props.state.cart.aCartData.length>0) {
            let bChecked = true;
            // 判断是否全部选中
            for (let key in this.props.state.cart.aCartData) {
                // 只要有一个没有选中就取消选中按钮
                if (!this.props.state.cart.aCartData[key].checked) {
                    this.setState({
                        bAllChecked: false
                    });
                    bChecked = false;
                    break;
                }
            }
            // 如果全部选中
            if (bChecked) {
                this.setState({
                    bAllChecked: true
                });
            }
        }else{
            this.setState({
                bAllChecked: false
            })
        }
    }

    // 点击全选
    setAllChecked (checked) {
        if (this.props.state.cart.aCartData.length > 0) {
            this.setState({
                bAllChecked: checked
            });
            this.props.dispatch(action.cart.setAllChecked({
                checked: checked
            }));
        }
    }

    // 增加数量
    incAmount(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.props.state.cart.aCartData[index].checked) {
                this.props.dispatch(action.cart.incAmount({
                    index: index
                }))
            }
        }
    }

    // 减少数量
    decAmount(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.props.state.cart.aCartData[index].checked) {
                this.props.dispatch(action.cart.decAmount({
                    index: index
                }))
            }
        }
    }

    // 监听件数的值
    changeAmount(e, index) {
        if (this.props.state.cart.aCartData.length > 0) {
            let iAmount = 1;
            iAmount = e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|;|,|+|=|\-|"|'|\/|\\|、|、|。|，|“|”|‘|’|/\s+]/g, "");
            this.props.dispatch(action.cart.changeAmount({
                amount: iAmount,
                index: index
            }))
        }
    }

    // 去结算
    goBalance() {
        if (this.props.state.cart.total > 0) {
            this.props.history.push(config.path+"balance/index");
        }
    }

    render(){
        return(
            <div>
                {/*头部*/}
                <SubHeaderComponent
                    title={"个人资料"}
                    right-text={"保存"}>
                </SubHeaderComponent>
                {/*主页面*/}
                <div className={Css['cart-main']}>
                    {/*单项商品*/}
                    {
                        this.props.state.cart.aCartData.length > 0 ?
                            this.props.state.cart.aCartData.map((item, index)=>{
                            return (
                                <div key={index} className={Css['cart-list']}>
                                    {/*选择框*/}
                                    <div className={item.checked ? Css['select-btn'] + " " + Css['active'] : Css['select-btn']} onClick={this.checkItem.bind(this, index, !item.checked)}></div>
                                    {/*左侧*/}
                                    <div className={Css['image-wrap']}>
                                        {/*放图片的盒子*/}
                                        <div className={Css['image']}>
                                            <img src={item.img} alt={item.title}/>
                                        </div>
                                        {/*删除按钮*/}
                                        <div className={Css['del']} onClick={this.delItem.bind(this, index)}>
                                            删除
                                        </div>
                                    </div>
                                    {/*右侧*/}
                                    <div className={Css['goods-wrap']}>
                                        {/*标题*/}
                                        <div className={Css['goods-title']}>
                                            {item.title}
                                        </div>
                                        {/*属性*/}
                                        <div className={Css['goods-attr']}>
                                            {
                                                item.attrs.map((item2, index2)=>{
                                                    return (
                                                        <span key={index2}>{item2.title}: {
                                                            item2.param.length > 0 ? item2.param.map((item3, index3)=>{
                                                                return (
                                                                    <React.Fragment key={index3}>
                                                                        {item3.value}
                                                                    </React.Fragment>
                                                                )
                                                            }) : ""
                                                        }</span>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/*购买盒子*/}
                                        <div className={Css['buy-wrap']}>
                                            <div className={Css['price']}>￥{item.price}</div>
                                            {/*输入数量盒子*/}
                                            <div className={Css['amount-input-wrap']}>
                                                <div className={this.props.state.cart.aCartData[index].amount > 1 ? Css['btn'] + " " + Css['dec'] : Css['btn'] + " " + Css['dec'] + " " + Css['active']} onClick={this.decAmount.bind(this, index)}>-</div>
                                                <div className={Css['amount-input']}>
                                                    <input type="tel" value={item.amount} onChange={e=>{
                                                        this.changeAmount(e, index)
                                                    }}/>
                                                </div>
                                                <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this, index)}>+</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                            : <div className={"null-item"} style={{marginTop: "1rem"}}>您还没有选购商品，快去选择您喜欢的宝贝吧！</div>
                    }
                </div>
                {/*底部结算盒子*/}
                <div className={Css['orderend-wrap']}>
                    <div className={Css['select-area']}>
                        {/*全选按钮*/}
                        <div className={Css['select-wrap']} onClick={this.setAllChecked.bind(this, !this.state.bAllChecked)}>
                            <div className={this.state.bAllChecked ? Css['select-btn']+" "+Css['active'] : Css['select-btn']}></div>
                            <div className={Css['select-text']}>全选</div>
                        </div>
                        <div>
                            <div className={Css['total']}>合计: <span>￥{this.props.state.cart.total}</span></div>
                        </div>
                    </div>
                    <div className={this.props.state.cart.total>0 ? Css['orderend-btn'] : Css['orderend-btn'] + " " + Css['disable']} onClick={this.goBalance.bind(this)}>
                        去结算
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {
        state
    }
})(CartIndex);