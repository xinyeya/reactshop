import React from "react";
import Css from '../../../assets/css/user/myorder/add_review.css';
import {connect} from "react-redux";
import {AuthRoute} from "../../../routes/private";
import SubHeaderComponent from "../../../components/header/subheader";

class addReview extends React.Component {
    constructor(props) {
        super(props);
        AuthRoute(props);
        this.state = {

        };
    }

    componentDidMount() {
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
                    <ul className={Css['service']}>
                        <li>
                            整体
                        </li>
                        <li>
                            <div className={Css['stars'] + " " + Css['active']}></div>
                            <div className={Css['stars']}></div>
                            <div className={Css['stars']}></div>
                            <div className={Css['stars']}></div>
                            <div className={Css['stars']}></div>
                        </li>
                    </ul>
                    <ul className={Css['service']}>
                        <li>
                            服务
                        </li>
                        <li>
                            <div className={Css['stars'] + " " + Css['active']}></div>
                            <div className={Css['stars']}></div>
                            <div className={Css['stars']}></div>
                            <div className={Css['stars']}></div>
                            <div className={Css['stars']}></div>
                        </li>
                    </ul>
                    {/*评价内容*/}
                    <div className={Css['content-wrap']}>
                        <textarea placeholder={"来分享你的消费感受吧"}></textarea>
                    </div>
                    {/*提交按钮*/}
                    <button className={Css['submit']} type={"button"}>提交</button>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(addReview);