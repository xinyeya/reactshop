import React from 'react';
import Css from '../../../assets/css/cart/index.css'
import SubHeaderComponent from "../../../components/header/subheader";
export default class  CartIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            iAmount: 1,
        }
    }

    componentDidMount(){

    }
    // 防止出现内存溢出
    // 页面离开时自动调用
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    // 增加数量
    incAmount() {
        let iAmount = this.state.iAmount;
        this.setState({
            iAmount: ++iAmount
        })
    }

    // 减少数量
    decAmount() {
        let iAmount = this.state.iAmount;
        if (iAmount > 1) {
            this.setState({
                iAmount: --iAmount
            })
        }
    }

    // 监听件数的值
    changePrice(e) {
        this.setState({
            iAmount: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|;|,|+|=|\-|"|'|\/|\\|、|、|。|，|“|”|‘|’]/g, "")
        },()=>{
            if (this.state.iAmount === "") {
                this.setState({
                    iAmount: 1
                });
            }
        });
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
                    <div className={Css['cart-list']}>
                        {/*选择框*/}
                        <div className={Css['select-btn'] + " " + Css['active']}></div>
                        {/*左侧*/}
                        <div className={Css['image-wrap']}>
                            {/*放图片的盒子*/}
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524558126.png" alt=""/>
                            </div>
                            {/*删除按钮*/}
                            <div className={Css['del']}>
                                删除
                            </div>
                        </div>
                        {/*右侧*/}
                        <div className={Css['goods-wrap']}>
                            {/*标题*/}
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*属性*/}
                            <div className={Css['goods-attr']}>
                                <span>颜色: 黑色</span>
                                <span>屏幕尺寸: 15.6</span>
                            </div>
                            {/*购买盒子*/}
                            <div className={Css['buy-wrap']}>
                                <div className={Css['price']}>￥2799</div>
                                {/*输入数量盒子*/}
                                <div className={Css['amount-input-wrap']}>
                                    <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                                    <div className={Css['amount-input']}>
                                        <input type="tel" value={this.state.iAmount} onChange={e=>{
                                            this.changePrice(e)
                                        }}/>
                                    </div>
                                    <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['cart-list']}>
                        {/*选择框*/}
                        <div className={Css['select-btn']}></div>
                        {/*左侧*/}
                        <div className={Css['image-wrap']}>
                            {/*放图片的盒子*/}
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524558126.png" alt=""/>
                            </div>
                            {/*删除按钮*/}
                            <div className={Css['del']}>
                                删除
                            </div>
                        </div>
                        {/*右侧*/}
                        <div className={Css['goods-wrap']}>
                            {/*标题*/}
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*属性*/}
                            <div className={Css['goods-attr']}>
                                <span>颜色: 黑色</span>
                                <span>屏幕尺寸: 15.6</span>
                            </div>
                            {/*购买盒子*/}
                            <div className={Css['buy-wrap']}>
                                <div className={Css['price']}>￥2799</div>
                                {/*输入数量盒子*/}
                                <div className={Css['amount-input-wrap']}>
                                    <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                                    <div className={Css['amount-input']}>
                                        <input type="tel" value={this.state.iAmount} onChange={e=>{
                                            this.changePrice(e)
                                        }}/>
                                    </div>
                                    <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['cart-list']}>
                        {/*选择框*/}
                        <div className={Css['select-btn'] + " " + Css['active']}></div>
                        {/*左侧*/}
                        <div className={Css['image-wrap']}>
                            {/*放图片的盒子*/}
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524558126.png" alt=""/>
                            </div>
                            {/*删除按钮*/}
                            <div className={Css['del']}>
                                删除
                            </div>
                        </div>
                        {/*右侧*/}
                        <div className={Css['goods-wrap']}>
                            {/*标题*/}
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*属性*/}
                            <div className={Css['goods-attr']}>
                                <span>颜色: 黑色</span>
                                <span>屏幕尺寸: 15.6</span>
                            </div>
                            {/*购买盒子*/}
                            <div className={Css['buy-wrap']}>
                                <div className={Css['price']}>￥2799</div>
                                {/*输入数量盒子*/}
                                <div className={Css['amount-input-wrap']}>
                                    <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                                    <div className={Css['amount-input']}>
                                        <input type="tel" value={this.state.iAmount} onChange={e=>{
                                            this.changePrice(e)
                                        }}/>
                                    </div>
                                    <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['cart-list']}>
                        {/*选择框*/}
                        <div className={Css['select-btn']}></div>
                        {/*左侧*/}
                        <div className={Css['image-wrap']}>
                            {/*放图片的盒子*/}
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524558126.png" alt=""/>
                            </div>
                            {/*删除按钮*/}
                            <div className={Css['del']}>
                                删除
                            </div>
                        </div>
                        {/*右侧*/}
                        <div className={Css['goods-wrap']}>
                            {/*标题*/}
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*属性*/}
                            <div className={Css['goods-attr']}>
                                <span>颜色: 黑色</span>
                                <span>屏幕尺寸: 15.6</span>
                            </div>
                            {/*购买盒子*/}
                            <div className={Css['buy-wrap']}>
                                <div className={Css['price']}>￥2799</div>
                                {/*输入数量盒子*/}
                                <div className={Css['amount-input-wrap']}>
                                    <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                                    <div className={Css['amount-input']}>
                                        <input type="tel" value={this.state.iAmount} onChange={e=>{
                                            this.changePrice(e)
                                        }}/>
                                    </div>
                                    <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['cart-list']}>
                        {/*选择框*/}
                        <div className={Css['select-btn'] + " " + Css['active']}></div>
                        {/*左侧*/}
                        <div className={Css['image-wrap']}>
                            {/*放图片的盒子*/}
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524558126.png" alt=""/>
                            </div>
                            {/*删除按钮*/}
                            <div className={Css['del']}>
                                删除
                            </div>
                        </div>
                        {/*右侧*/}
                        <div className={Css['goods-wrap']}>
                            {/*标题*/}
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*属性*/}
                            <div className={Css['goods-attr']}>
                                <span>颜色: 黑色</span>
                                <span>屏幕尺寸: 15.6</span>
                            </div>
                            {/*购买盒子*/}
                            <div className={Css['buy-wrap']}>
                                <div className={Css['price']}>￥2799</div>
                                {/*输入数量盒子*/}
                                <div className={Css['amount-input-wrap']}>
                                    <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                                    <div className={Css['amount-input']}>
                                        <input type="tel" value={this.state.iAmount} onChange={e=>{
                                            this.changePrice(e)
                                        }}/>
                                    </div>
                                    <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['cart-list']}>
                        {/*选择框*/}
                        <div className={Css['select-btn']}></div>
                        {/*左侧*/}
                        <div className={Css['image-wrap']}>
                            {/*放图片的盒子*/}
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524558126.png" alt=""/>
                            </div>
                            {/*删除按钮*/}
                            <div className={Css['del']}>
                                删除
                            </div>
                        </div>
                        {/*右侧*/}
                        <div className={Css['goods-wrap']}>
                            {/*标题*/}
                            <div className={Css['goods-title']}>
                                高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带
                            </div>
                            {/*属性*/}
                            <div className={Css['goods-attr']}>
                                <span>颜色: 黑色</span>
                                <span>屏幕尺寸: 15.6</span>
                            </div>
                            {/*购买盒子*/}
                            <div className={Css['buy-wrap']}>
                                <div className={Css['price']}>￥2799</div>
                                {/*输入数量盒子*/}
                                <div className={Css['amount-input-wrap']}>
                                    <div className={this.state.iAmount <=1 ? Css['btn'] + " " + Css['dec'] + " " + Css['active'] : Css['btn'] + " " + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                                    <div className={Css['amount-input']}>
                                        <input type="tel" value={this.state.iAmount} onChange={e=>{
                                            this.changePrice(e)
                                        }}/>
                                    </div>
                                    <div className={Css['btn'] + " " + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*底部结算盒子*/}
                <div className={Css['orderend-wrap']}>
                    <div className={Css['select-area']}>
                        {/*全选按钮*/}
                        <div className={Css['select-wrap']}>
                            <div className={Css['select-btn']+" "+Css['active']}></div>
                            <div className={Css['select-text']}>全选</div>
                        </div>
                        <div>
                            <div className={Css['total']}>合计: <span>￥3950</span></div>
                        </div>
                    </div>
                    <div className={Css['orderend-btn']}>
                        去结算
                    </div>
                </div>
            </div>
        );
    }
}