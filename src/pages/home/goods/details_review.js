import React from "react";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Css from "../../../assets/css/home/goods/details_reviews.css";
import {lazyImg, localParam} from "../../../assets/js/utils/util";
import Uprefresh from "../../../assets/js/libs/uprefresh";

class DetailsReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aReviews: [],
            iReviewTotal: '',
            gid: props.location.search !== "" ? localParam(props.location.search).search.gid : "",
        }
        this.oUpRefresh = null;
        this.curPage = 1;
        this.maxPage = 0;
        this.offsetBottom = 100;
    }

    componentDidMount() {
        this.getReviews()
    }

    // 获取评论数据
    getReviews() {
        let sUrl = config.baseUrl+"/api/home/reviews/index?gid="+this.state.gid+"&token="+config.token+"&page=1";
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aReviews: res.data,
                    iReviewTotal: res.pageinfo.total
                }, ()=>{
                    lazyImg()
                });
                this.maxPage = res.pageinfo.pagenum;
                this.getScrollPage();
            }else{
                this.setState({
                    aReviews: []
                })
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
            let sUrl = config.baseUrl+"/api/home/reviews/index?gid="+this.state.gid+"&token="+config.token+"&page="+curPage;
            request(sUrl).then(res=>{
                if (res.code === 200) {
                    if (res.data.length>0){
                        let aReviews = this.state.aReviews;
                        for (let i=0; i<res.data.length; i++) {
                            aReviews.push(res.data[i]);
                        }
                        this.setState({
                            aReviews: aReviews
                        },()=>{
                            lazyImg();
                        })
                    }
                }
            })
        })
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
            <div className={Css['page']}>
                <div className={Css['reviews-wrap']}>
                    {
                        this.state.aReviews.length > 0 ? this.state.aReviews.map((item, index)=>{
                            return (
                                <div key={index} className={Css['reviews-list']}>
                                    {/*用户信息*/}
                                    <div className={Css['uinfo']}>
                                        {/*头像*/}
                                        <div className={Css['head']}>
                                            <img data-echo={item.head} src={require("../../../assets/images/common/lazyImg.jpg")} alt={item.nickname}/>
                                        </div>
                                        <div className={Css['nickname']}>{item.nickname}</div>
                                    </div>
                                    {/*评价内容*/}
                                    <div className={Css['reviews-content']}>
                                        {item.content}
                                    </div>
                                    {/*时间*/}
                                    <div className={Css['reviews-date']}>
                                        {item.times}
                                    </div>
                                </div>
                            )
                        }) : <div className={"null-item"}>没有任何评价</div>
                    }
                </div>
            </div>
        );
    }
}

export default DetailsReviews;