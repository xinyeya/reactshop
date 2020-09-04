import React from "react";
import Css from "../../../assets/css/home/index/index.module.css";
import { Carousel } from 'antd-mobile';

class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
        }
    }

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            // this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            // });
        }, 100);
    }

    beforeChange(from, to) {
        console.log(`slide from ${from} to ${to}`)
    }

    afterChange(index) {
        console.log('slide to', index)
    }
    imgOnload() {
        // fire window resize event to change height
        window.dispatchEvent(new Event('resize'));
        this.setState({ imgHeight: 'auto' });
    }

    render() {
        // 轮播图外框样式
        const swiperBox = { display: 'inline-block', width: '100%', height: this.state.imgHeight }
        const swiperImage = { width: '100%', verticalAlign: 'top' }
        return (
            <div>
                {/*头部搜索栏*/}
                <div className={Css["search-header"] + " " + Css['red-bg']}>
                    <div className={Css['classify-icon']}></div>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-icon']}></div>
                        <div className={Css['search-text']}>请输入宝贝名称</div>
                    </div>
                    <div className={Css["login-wrap"]}>
                        <div className={Css['login-text']}>登录</div>
                    </div>
                </div>
                {/*轮播图*/}
                <div className={Css['swiper-wrap']}>
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={this.beforeChange.bind(this)}
                        afterChange={this.afterChange.bind(this)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.baidu.com"
                                style={swiperBox}
                            >
                                <img
                                    src={`http://vueshop.glbuys.com/uploadfiles/1484285302.jpg`}
                                    alt=""
                                    style={swiperImage}
                                    onLoad={this.imgOnload.bind(this)}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default IndexComponent;