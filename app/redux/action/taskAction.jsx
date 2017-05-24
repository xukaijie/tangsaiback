export const GETSTRAIT = 'GETSTRAIT';
export const GETSTRAITDETAIL = 'GETSTRAITDETAIL';

import {HOST,VERSION,PAGESIZE} from 'cmPath/config.jsx';

import {AsyncPost} from 'cmPath/utils.jsx';

export const getStaritList = (currentPage,successcallback,failcallback)=>{

    let dic = {

        name:"list_service",
        page:currentPage,
        pagesize:PAGESIZE,
        order_name:'直约保'
    }


    return dispatch =>{

        return AsyncPost(dic,"",(data)=>{

            if (data[0] == 0) {
                dispatch({type: GETSTRAIT, data:data});
                if (successcallback){
                    successcallback(data);
                }
            }else{
                if (failcallback)
                    failcallback(data)
            }

        },(data)=>{

            if (failcallback)
                failcallback(data)
        })
    }

}


export const getStraitDetail = (job_id,order_user_id,service_id,successcallback,failcallback)=>{

    let dic = {

        name:"service_details",
        job_id:job_id,
        order_user_id:order_user_id,
        service_id:service_id
    }

    return dispatch =>{

        return AsyncPost(dic,"",(data)=>{

            if (data[0] == 0) {
                dispatch({type: GETSTRAITDETAIL, data:data,job_id:job_id,order_user_id:order_user_id,service_id:service_id});
                if (successcallback){
                    successcallback(data);
                }
            }else{
                if (failcallback)
                    failcallback(data)
            }

        },(data)=>{

            if (failcallback)
                failcallback(data)
        })
    }

}

export const submitJobNote = (order_user_id,job_id,service_id,body,successcallback,failcallback)=>{


    let dic = {

        name:"job_note",
        action:'add',
        job_id:job_id,
        order_user_id:order_user_id,
        service_id:service_id,
        ...body
    }

    return AsyncPost(dic,"",(data)=>{

        if (data[0] == 0) {
            if (successcallback){
                successcallback(data);
            }
        }else{
            if (failcallback)
                failcallback(data)
        }

    },(data)=>{

        if (failcallback)
            failcallback(data)
    })

}

export const receiveService = (service_id,job_id,successcallback,failcallback)=>{

    let dic = {

        name:"receive_service",
        job_id:job_id,
        service_id:service_id,
    }

    return AsyncPost(dic,"",(data)=>{

        if (data[0] == 0) {
            if (successcallback){
                successcallback(data);
            }
        }else{
            if (failcallback)
                failcallback(data)
        }

    },(data)=>{

        if (failcallback)
            failcallback(data)
    })

}