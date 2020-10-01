import React from "react";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import Css from "../../../assets/css/home/goods/details_content.css";
import {localParam, setScrollTop} from "../../../assets/js/utils/util";

class DetailsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bodys: "",
            gid: props.location.search !== '' ? localParam(props.location.search).search.gid : "",
        }
    }

    componentDidMount() {
        setScrollTop();
        let sUrl = config.baseUrl+"/api/home/goods/info?gid="+this.state.gid+"&type=details&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    bodys: res.data.bodys
                })
            }
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
                <div className={Css['content']} dangerouslySetInnerHTML={{__html:this.state.bodys}}></div>
            </div>
        );
    }
}

export default DetailsContent;