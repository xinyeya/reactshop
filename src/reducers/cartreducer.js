// 要传回去的值
let cartData = {
    aCartData: localStorage['cartData'] !=undefined ? JSON.parse(localStorage['cartData']) : [],
    total: localStorage['total'] !=undefined ? parseFloat(localStorage['total']) : 0,
    freight: 0
};
// 对要传回去的的数据做处理
function cartReducer(state=cartData,action){
    switch (action.type){
        case "addCart":
            addCart(state, action.data);
            return Object.assign({},state, action);
        case "delItem":
            delItem(state, action.data);
            return Object.assign({},state, action);
        case "checkItem":
            checkItem(state, action.data);
            return Object.assign({}, state, action);
        case "allItem":
            setAllChecked(state, action.data);
            return Object.assign({}, state, action);
        case "incAmount":
            incAmount(state, action.data);
            return Object.assign({}, state, action);
        case "decAmount":
            decAmount(state, action.data);
            return Object.assign({}, state, action);
        case "changeAmount":
            changeAmount(state, action.data);
            return Object.assign({}, state, action);
        default:
            return state;
    }
}

// 重新计算总价
function setTotal(state) {
    let total = 0;
    // 计算总价
    for (let key in state.aCartData) {
        if (state.aCartData[key].checked) {
            total += parseFloat(state.aCartData[key].price) * parseFloat(state.aCartData[key].amount);
        }
    }
    // 四舍五入，取两位小数
    state.total = parseFloat(Math.round(total).toFixed(2));
    localStorage['total'] = JSON.stringify(state.total);
}

// 添加商品
function addCart(state, action) {
    let bSameItem = false;
    // 购物车有相同的商品的数量加新购买的数量
    if (state.aCartData.length > 0) {
        for (let key in state.aCartData) {
            if (state.aCartData[key].gid === action.gid && JSON.stringify(state.aCartData[key].attrs) === JSON.stringify(action.attrs)) {
                state.aCartData[key].amount+=action.amount;
                bSameItem=true;
                break;
            }
        }
    }
    // 购物车没有相同的数据的情况下增加购物车商品
    if (!bSameItem) {
        state.aCartData.push(action);
    }

    // 计算总价
    setTotal(state);
    // 计算运费
    setFreight(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData)
}

// 删除商品
function delItem(state, action) {
    state.aCartData.splice(action.index, 1);
    // 计算总价
    setTotal(state);
    // 计算运费
    setFreight(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}

// 选择商品
function checkItem(state, action) {
    state.aCartData[action.index].checked = action.checked;
    // 计算总价
    setTotal(state);
    // 计算运费
    setFreight(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}

// 商品全选
function setAllChecked(state, action) {
    if (action.checked) {
        for (let key in state.aCartData) {
            state.aCartData[key].checked = true;
        }
    }else{
        for (let key in state.aCartData) {
            state.aCartData[key].checked = false;
        }
    }
    // 计算总价
    setTotal(state);
    // 计算运费
    setFreight(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}

// 增加个数
function incAmount(state, action) {
    state.aCartData[action.index].amount += 1;
    setTotal(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}

// 减少个数
function decAmount(state, action) {
    if (state.aCartData[action.index].amount > 1) {
        state.aCartData[action.index].amount -= 1;
        setTotal(state);
        localStorage['cartData'] = JSON.stringify(state.aCartData);
    }
}

// 改变个数
function changeAmount(state, action) {
    state.aCartData[action.index].amount = action.amount;
    setTotal(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}

// 计算运费
function setFreight(state, action) {
    let aFreight = [];
    for (let key in state.aCartData) {
        if (state.aCartData[key].checked) {
            aFreight.push(state.aCartData[key].freight);
        }
    }
    // 取出最大值
    state.freight = Math.max.apply(null, aFreight);
    localStorage['freight'] = state.freight;
}

export default cartReducer;