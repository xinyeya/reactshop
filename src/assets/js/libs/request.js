import ReactDOM from 'react-dom';
import {fetch} from "whatwg-fetch";

let oLoad=ReactDOM.findDOMNode(document.getElementById("page-load"));
// 发起get请求
function request(pUrl, pType='GET'.toLocaleLowerCase(), data={}){
    showLoad();
    let config = {}, headers = {}, params = '';
    if (pType === "get".toLocaleLowerCase()) {
        config = {
            method: pType
        }
    }else{
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        if (data instanceof Object) {
            for(let key in data) {
                // encodeURIComponent把中文转码
                params += `&${key}=${encodeURIComponent(data[key])}`;
            }
            params = params.slice(1)
        }
        config = {
            method: pType,
            headers: headers,
            body: params
        }
    }
    return fetch(pUrl, config).then(res=> {
            hideLoad();
            return res.json();
        }
    );
}

// 显示加载中图片
function showLoad(){
    oLoad.style.display="block";
}
// 隐藏加载图片
function hideLoad(){
    oLoad.style.display="none";
}
export {
    request
};