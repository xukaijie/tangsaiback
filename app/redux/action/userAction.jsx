export const LOGINOK = "LOGINOK";

export const LOGOUT  = "LOGOUT";


import {HOST,VERSION} from 'cmPath/config.jsx';

export const login = (user,password,successcallback,failcallback)=> {

    let url = HOST + VERSION + "login?account=" + user + "&password=" + password;

    return dispatch => {

        return fetch(url, {
            method: 'get',
            "Content-Type": "application/json",

        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json[0] == 0) {
                            dispatch({type: LOGINOK,data:json[1]});
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




