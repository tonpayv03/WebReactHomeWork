import Action from './';

export function setCustomerName(data){
    return {
        type: Action.Set_Customer_Name,
        CustomerName: data
    };
}

export function setCustomerTelNo(data){
    return {
        type: Action.Set_Customer_TelNo,
        CustomerTelNo: data
    };
}

export function setCustomerEmail(data){
    return {
        type: Action.Set_Customer_Email,
        CustomerEmail: data
    };
}

export function setProvinceName(data){
    return {
        type: Action.Set_Customer_ProvinceName,
        ProvinceName: data
    };
}

export function setDistrictName(data){
    return {
        type: Action.Set_Customer_DistrictName,
        DistrictName: data
    };
}

export function setSubDistrictName(data){
    return {
        type: Action.Set_Customer_SubDistrictName,
        SubDistrictName: data
    };
}

export function setZipCode(data){
    return {
        type: Action.Set_Customer_ZipCode,
        ZipCode: data
    };
}

export function setAddress(data){
    return {
        type: Action.Set_Customer_Address,
        Address: data
    };
}

export function setAddressDiscription(data){
    return {
        type: Action.Set_Customer_AddressDiscription,
        AddressDiscription: data
    };
}

export function setCustomerDetail(data){
    return {
        type: Action.Set_Customer_Detail,
        CustomerDetail: data
    };
}

