export const GETPRODUCTLIST = "GETPRODUCTLIST";

import  HOST from 'cmPath/config.jsx';

export const getproductlist = (node,parent,successcallback,failcallback)=> {

    let url = HOST +"product_list?node="+node+"&parent="+parent;

    return dispatch => {

        return fetch(url, {
            method: 'get',
            "Content-Type": "application/json",

        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json[0] == 0) {
                            dispatch({type: GETPRODUCTLIST,data:json[1]});
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




