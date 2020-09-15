import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        // 防止出现内存溢出
        // 页面离开时自动调用
        componentWillUnmount() {
            this.setState = (state, callback) => {
                return;
            }
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}