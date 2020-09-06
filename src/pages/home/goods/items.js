/*eslint-disable*/
import React from "react";
import config from "../../../assets/js/conf/config";
import Css from "../../../assets/css/home/goods/items.module.css";
import {Route, Switch} from "react-router-dom";
import {request} from "../../../assets/js/libs/request";

class GoodsItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aGoods: []
        }
    }

    componentDidMount() {
        console.log(this.props.location)
        this.getData();
    }

    getData() {
        request(config.baseUrl+"/api/home/category/show?cid=493&token="+config.token).then(res=>{
            if (res.code === 200) {
                this.setState({
                    aGoods: res.data
                });
                console.log(res.data)
            }
        })
    }

    render() {
        return (
            <div className={Css['goods-content-main']}>
                <div>
                    {
                        this.state.aGoods !== null && this.state.aGoods.map((val, key)=>{
                            return (
                                <div key={key} className={Css['goods-wrap']}>
                                    {/*标题*/}
                                    <div className={Css['classify-name']}>{val.title}</div>
                                    {/*内容*/}
                                    <div className={Css['goods-item-wrap']}>
                                        {
                                            val.goods !== null && val.goods.map((val1, key1)=>{
                                                return (
                                                    <ul key={key1}>
                                                        <li className={Css['image']}>
                                                            <img src={val1.image} alt=""/>
                                                        </li>
                                                        <li>
                                                            {val1.title}
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GoodsItems;