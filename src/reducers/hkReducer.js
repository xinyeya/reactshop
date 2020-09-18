// 传回去的值
let aKeywords=localStorage['hk']!==undefined?JSON.parse(localStorage['hk']):[];

// 处理数据
function hkReducer(state={keywords:aKeywords},action){
    switch (action.type){
        case "addHk":
            return Object.assign({},state, action);
        default:
            return state;
    }
}
export default hkReducer;