export const GETTALENTLIST = 'GETTALENTLIST';
export const GETRESUMELIST = 'GETRESUMELIST';
export const GETCANDIDATELIST = 'GETCANDIDATELIST';
export const CHANGECHECKED = 'CHANGECHECKED';
export const DELRESUME = 'DELRESUME';
export const DELCANDIDATE = 'DELCANDIDATE';

import {HOST,VERSION,PAGESIZE} from 'cmPath/config.jsx';

import {AsyncPost} from 'cmPath/utils.jsx';

export const getTalentList = (currentPage,body,successcallback,failcallback)=>{

	let dic = {

		name:"search_resume",
		page:currentPage,

	}


	return dispatch =>{

		return AsyncPost(dic,body,(data)=>{

			if (data[0] == 0) {
				dispatch({type: GETTALENTLIST, data:data});
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


export const getResumeList = (currentPage,body,successcallback,failcallback) => {

	let dic = {
		name:"list_resume",
		page:currentPage,

	}


	return dispatch =>{

		return AsyncPost(dic,body,(data)=>{

			if (data[0] == 0) {
				dispatch({type: GETRESUMELIST, data:data});
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

export const getCandidateList = (body,successcallback,failcallback) => {

	let dic = {

		name:"list_resume_paid",


	}


	return dispatch =>{

		return AsyncPost(dic,body,(data)=>{

			if (data[0] == 0) {
				dispatch({type: GETCANDIDATELIST, data:data});
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

export const changeChecked = (val,index,choseType,successcallback,failcallback) => {

	return dispatch =>{

		dispatch({type: CHANGECHECKED, checkVal:val , chenckIndex:index,choseType:choseType});

	}

}

export const delResume = (body,btnType,successcallback,failcallback) => {
	if(btnType == 'del'){
		var dic = {

			name:"del_resume",


		}
	}else{
		var dic = {

			name:"send_sms_invite",


		}
	}



	return dispatch =>{

		return AsyncPost(dic,body,(data)=>{

			if (data[0] == 0) {
				dispatch({type: DELRESUME, data:data});
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

export const delCandidate = (body,btnType,successcallback,failcallback) => {
	var dic = {
		name:"resume_paid",

	}
	if(btnType == 'del'){
		dic.action = 'del'
	}else{
		dic.action = 'finish'
	}



	return dispatch =>{

		return AsyncPost(dic,body,(data)=>{

			if (data[0] == 0) {
				dispatch({type: DELCANDIDATE, data:data});
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



