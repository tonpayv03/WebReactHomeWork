import Action from './';

export function setPageID(data){
    return {
        type: Action.Set_Page_ID,
        PageID: data
    };
}