// 接收组件传递的值
function login(data) {
    return {
        type: "login",
        data: data
    }
}

// 安全退出
function outLogin() {
    return {
        type: "outLogin",
        data: {}
    }
}
export{
    login,
    outLogin
}