import Action from './';

export function setCustomerDetail(data){
    return {
        type: Action.Set_Customer_Detail,
        CustomerDetail: data
    };
}

