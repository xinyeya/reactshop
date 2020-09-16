import echo from '../libs/echo.js';
// 图片懒加载
function lazyImg(){
    echo.init({
        offset : 100,//可是区域多少像素可以被加载
        throttle : 0 //设置图片延迟加载的时间
    });
}
// 获取get传值
function localParam(search, hash) {
    search = search || window.location.search;
    hash = hash || window.location.hash;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    }
    return {
        search : fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
        hash : fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
    };
}
// 防止白屏，自动把滚动条到最顶端
function setScrollTop(val = 0) {
    setTimeout(()=>{
        document.body.scrollTo = val;
        document.documentElement.scrollTop = val;
    },100);
}
export {
    lazyImg,
    localParam,
    setScrollTop
}