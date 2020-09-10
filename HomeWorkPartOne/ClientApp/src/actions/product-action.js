import Action from './';

export function setProductList(data) {
    return {
        type: Action.Set_Product_List,
        ProductList: data
        // เอา data มา setState
    };
}

export function setProductID(data){
    return{
        type: Action.Set_Product_ID,
        ProductID: data
    }
}

export function setSelectProductItem(data){
    return{
        type: Action.Set_Select_Product_Item,
        SelectProductItem: data
    }
}

export function setDefaultProductValue(data){
    return{
        type: Action.Set_Default_Product_Value,
        DefaultProductValue: data
    }
}