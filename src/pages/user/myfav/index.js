import React from "react";
import {connect} from 'react-redux';
import Css from "../../../assets/css/user/myfav/index.css";
import SubHeaderComponent from "../../../components/header/subheader";
import {Modal, Toast} from "antd-mobile";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {lazyImg, safeAuth} from "../../../assets/js/utils/util";
import Uprefresh from '../../../assets/js/libs/uprefresh';

class MyFav extends React.Component {
    constructor(props) {
        super(props);
        safeAuth(props);
        this.state = {
            aGoods: []
        };
        this.oUpRefresh = null;
        this.curPage = 1;
        this.maxPage = 0;
        this.offsetBottom = 100;
    }

    componentDidMount() {
        this.getData();
    }

    // 获取数据
    getData() {
        let url = config.baseUrl+"/api/user/fav/index?uid="+this.props.state.user.uid+"&token="+config.token+"&page="+this.curPage;
        request(url).then(res=>{
            if (res.code === 200) {
                this.maxPage = res.pageinfo.pagenum;
                this.setState({
                    aGoods: res.data
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
            let url = config.baseUrl+"/api/user/fav/index?uid="+this.props.state.user.uid+"&token="+config.token+"&page="+curPage;
            request(url).then(res=>{
                if (res.code === 200) {
                    if (res.data.length>0){
                        let aGoods = this.state.aGoods;
                        for (let i=0; i<res.data.length; i++) {
                            aGoods.push(res.data[i]);
                        }
                        this.setState({
                            aGoods: aGoods
                        },()=>{
                            lazyImg();
                        })
                    }
                }
            })
        })
    }

    // 删除收藏
    delFav(fid, index) {
        Modal.alert("", "确定要删除吗？", [
            {"text": "取消", onPress: ()=>{}, style: "default"},
            {"text": "确定", onPress: ()=>{
                    let url = config.baseUrl+"/api/user/fav/del?uid="+this.props.state.user.uid+"&fid="+fid+"&token="+config.token;
                    request(url).then(res=>{
                        if (res.code === 200) {
                            let goods=this.state.aGoods;
                            goods.splice(index, 1);
                            this.setState({aGoods:goods},()=>{
                                lazyImg();
                            })
                            Toast.info(res.data, 2);
                        }else{
                            Toast.info(res.data, 2);
                        }
                    })
                }
            }
        ])
    }

    pushPage(url) {
        this.props.history.push(config.path+url)
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
            <div className={Css['page']}>
                <SubHeaderComponent title={"我的收藏"}></SubHeaderComponent>
                {/*主体*/}
                <div className={Css['main']}>
                    {/*单个商品*/}
                    {
                        this.state.aGoods.length>0?
                            this.state.aGoods.map((item, index)=>{
                                return (
                                    <div className={Css['goods-list']} key={index}>
                                        {/*预览图*/}
                                        <div className={Css['image']}>
                                            <img data-echo={item.image} src={require("../../../assets/images/common/lazyImg.jpg")} alt=""/>
                                        </div>
                                        {/*标题*/}
                                        <div className={Css['title']}>
                                            {item.title}
                                        </div>
                                        {/*价格*/}
                                        <div className={Css['price']}>
                                            ￥{item.price}
                                        </div>
                                        {/*按钮盒子*/}
                                        <div className={Css['btn-wrap']}>
                                            <div className={Css['btn']} onClick={this.pushPage.bind(this, "goods/details/item?gid="+item.gid)}>购买</div>
                                            <div className={Css['btn']} onClick={this.delFav.bind(this, item.fid,index)}>删除</div>
                                        </div>
                                    </div>
                                )
                            }):""
                    }
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(MyFav);