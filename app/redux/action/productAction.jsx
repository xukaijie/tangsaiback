export const GETPRODUCTLIST = "GETPRODUCTLIST";

import {HOST} from 'cmPath/config.jsx';

export const getproductlist = (root,parent,currentpage,successcallback,failcallback)=> {

    let url = HOST +"product_list?root="+root+"&parent="+parent+"&currentpage="+currentpage+"&pagesize=10";

    return dispatch => {

        return fetch(url, {
            method: 'get',
            "Content-Type": "application/json",

        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json.err == 0) {
                            dispatch({type: GETPRODUCTLIST,data:json});
                            if (successcallback)
                                successcallback()
                        }else if (failcallback){

                            failcallback()
                        }
                    })
                } else {
                    console.log("status", response.status);
                    if (failcallback){

                        failcallback()
                    }
                }
            })
            .catch(error => console.log(error))
    };
}




