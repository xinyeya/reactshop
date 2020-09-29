import React from "react";
import Css from '../../../assets/css/user/myorder/add_review.css';
import {connect} from "react-redux";
import {AuthRoute} from "../../../routes/private";
import SubHeaderComponent from "../../../components/header/subheader";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {Toast} from "antd-mobile";
import {localParam} from "../../../assets/js/utils/util";

class addReview extends React.Component {
    constructor(props) {
        super(props);
        AuthRoute(props);
        this.state = {
            services: [],
            content: "",
        };
        this.gid = props.location.search ? localParam(props.location.search).search.gid : "";
        this.ordernum = props.location.search ? localParam(props.location.search).search.ordernum : "";
        this.isSubmit = true
    }

    componentDidMount() {
        this.getServices();
    }

    // 选择评价分数
    selectScore(index, index1) {
        let services = this.state.services;
        // 将所有的选中设置为false
        for (let i = 0; i < services[index].scores.length; i++) {
            services[index].scores[i].checked = false;
        }
        // 重新选中
        for (let i = 0; i <= index1; i++) {
            services[index].scores[i].checked = true;
        }
        this.setState({
            services: services
        });
    }

    // 获取星级选项数据
    getServices() {
        let url = config.baseUrl+"/api/home/reviews/service?token="+config.token;
        request(url).then(res=>{
            if (res.code === 200) {
                let services = res.data;
                for (let i=0;i<services.length;i++) {
                    services[i].scores = [
                        {
                            checked: false,
                            score: 1
                        },
                        {
                            checked: false,
                            score: 2
                        },
                        {
                            checked: false,
                            score: 3
                        },
                        {
                            checked: false,
                            score: 4
                        },
                        {
                            checked: false,
                            score: 5
                        }
                    ]
                }
                this.setState({
                    services: services
                });
            }
        })
    }

    // 提交评价
    submitSave() {
        if (this.isSubmit) {
            this.isSubmit = false;
            let services = this.state.services;
            let isChecked, scores, score, rsdata=[];

            // 判断是否选中星星
            for (let i=0; i<services.length; i++) {
                isChecked = false;
                for (let j=0; j<services[i].scores.length;j++) {
                    if (services[i].scores[j].checked) {
                        isChecked = true;
                        break;
                    }
                }
                if (!isChecked) {
                    this.isSubmit = true;
                    Toast.info("请选择"+services[i].title, 1);
                    return;
                }
            }

            // 判断评价内容是否为空
            if (this.state.content.match(/^\s*$/)) {
                Toast.info("请输入评价内容", 1);
                this.isSubmit = true;
                return;
            }

            // 组装评价数据
            for (let i=0; i<services.length; i++) {
                scores = [];
                for (let j=0; j<services[i].scores.length;j++) {
                    if (services[i].scores[j].checked) {
                        scores.push(services[i].scores[j].score);
                    }
                }
                score = scores[scores.length-1];
                rsdata.push({
                    gid: this.gid,
                    myid: this.props.state.user.uid,
                    rsid: services[i].rsid,
                    score: score
                });
            }

            let data = {
                uid: this.props.state.user.uid,
                gid: this.gid,
                content: this.state.content,
                ordernum: this.ordernum,
                rsdata: JSON.stringify(rsdata)
            };
            let url = config.baseUrl + "/api/home/reviews/add?token=" + config.token;
            request(url, "post", data).then(res=>{
                if (res.code === 200) {
                    Toast.info(res.data, 2);
                    this.isSubmit = true;
                    this.props.history.goBack();
                }else{
                    this.isSubmit = true;
                    Toast.info(res.data, 2);
                }
            })
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
                <SubHeaderComponent title={"评价"}></SubHeaderComponent>
                <div className={Css['main']}>
                    {
                        this.state.services.length > 0 ?
                            this.state.services.map((item, index)=>{
                                return (
                                    <ul className={Css['service']} key={index}>
                                        <li>
                                            {item.title}
                                        </li>
                                        <li>
                                            {
                                                item.scores !== undefined&&item.scores.length > 0 ?
                                                    item.scores.map((item1, index1)=>{
                                                        return (
                                                            <div key={index1} className={item1.checked ? Css['stars'] + " " + Css['active'] : Css['stars']} onClick={this.selectScore.bind(this, index, index1)}></div>
                                                        )
                                                    }):""
                                            }
                                        </li>
                                    </ul>
                                )
                            }) : ""
                    }
                    {/*评价内容*/}
                    <div className={Css['content-wrap']}>
                        <textarea placeholder={"来分享你的消费感受吧"} onChange={e=>{
                            this.setState({
                                content: e.target.value
                            });
                        }}></textarea>
                    </div>
                    {/*提交按钮*/}
                    <button className={Css['submit']} type={"button"} onClick={this.submitSave.bind(this)}>提交</button>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(addReview);