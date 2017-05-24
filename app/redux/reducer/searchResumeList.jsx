import {GETTALENTLIST,GETRESUMELIST,GETCANDIDATELIST,CHANGECHECKED,DELRESUME,DELCANDIDATE} from 'actionPath/searchResumeAction.jsx';

import {PAGESIZE} from 'cmPath/config.jsx';

const initialstate={

	sourceTalentList:{
			current:1,
			maxpage:5,
			data:[],
			total:0,
	},
	sourceResumeList:{
			current:1,
			maxpage:5,
			data:[],
			total:0,
	},
	sourceCandidateList:{
			data:[],
			copies:10,
			complete:1,
	}


}

export default function searchResumeList(state= initialstate, action) {

	switch (action.type) {

		case GETTALENTLIST:

			var data = action.data;

			var _strait = {...state.sourceTalentList};

			_strait.current = data[2];
			_strait.maxpage = data[3];
			_strait.totle = data[4];
			_strait.data = [];


			for (var i = 0;i < data[1].length;i++){

				var _data = data[1][i];


				_strait.data.push({

					number:(i+1)+((parseInt(_strait.current)-1)*data[1].length),
					name:_data.name.replace(/\d+/g,'') || "",
					age:_data.age.toString().replace(/\s+/g, "").substr(0, 2)+'岁'|| "" ,
					seniority:_data.seniority.toString().replace(/[^0-9]/ig,"")+'年'||"",
					degree:_data.degree,
					function:_data.last_job.replace(/\s+/g, ""),
					renew:_data.update_time,
					residence:_data.residence.toString().replace(/(\s*$)/g, "").replace(/\s+/g, "-").replace(/&emsp;/g, ","),
					location:_data.objective_location.toString().replace(/(\s*$)/g, "").replace(/\s+/g, "-").replace(/&emsp;/g, ","),
					follow:'user'
				})
			}

			return {

				...state,
				sourceTalentList:_strait
			}


		case GETRESUMELIST:

			var data = action.data;

			var _strait = {...state.sourceResumeList};

			_strait.current = data[2];
			_strait.maxpage = data[3];
			_strait.totle = data[4];
			_strait.data = [];

			for (var i = 0;i < data[1].length;i++){

				var _data = data[1][i];

				_strait.data.push({

					number:(i+1)+((parseInt(_strait.current)-1)*data[1].length),
					name:_data.name.replace(/\d+/g,'') || "",
					age:_data.age.toString().replace(/\s+/g, "").substr(0, 2)+'岁'|| "" ,
					seniority:_data.seniority.toString().replace(/[^0-9]/ig,"")+'年'||"",
					degree:_data.degree,
					function:_data.last_job.replace(/\s+/g, ""),
					renew:_data.update_time,
					residence:_data.residence.toString().replace(/(\s*$)/g, "").replace(/\s+/g, "-").replace(/&emsp;/g, ","),
					location:_data.objective_location.toString().replace(/(\s*$)/g, "").replace(/\s+/g, "-").replace(/&emsp;/g, ","),
					resumeId:_data.resume_id,
					checked:false,
				})
			}

			return {

				...state,
				sourceResumeList:_strait
			}


		case GETCANDIDATELIST:

			var data = action.data;

			var _strait = {...state.sourceCandidateList};


			_strait.data = [];
			_strait.copies = data[2]
			_strait.complete = data[3]
			for (var i = 0;i < data[1].length;i++){

				var _data = data[1][i];

				_strait.data.push({

					number:(i+1),
					name:_data.name.replace(/\d+/g,'') || "",
					age:_data.age.toString().replace(/\s+/g, "").substr(0, 2)+'岁'|| "" ,
					seniority:_data.seniority.toString().replace(/[^0-9]/ig,"")+'年'||"",
					degree:_data.degree,
					function:_data.last_job.replace(/\s+/g, ""),
					renew:_data.update_time,
					residence:_data.residence.toString().replace(/(\s*$)/g, "").replace(/\s+/g, "-").replace(/&emsp;/g, ","),
					location:_data.objective_location.toString().replace(/(\s*$)/g, "").replace(/\s+/g, "-").replace(/&emsp;/g, ","),
					progress:_data.status,
					resumeId:_data.resume_id,
					checked:false,
				})
			}

			return {

				...state,
				sourceCandidateList:_strait
			}

		case CHANGECHECKED:

			var checkIndex = action.chenckIndex;
			var checkVal = action.checkVal
			var _strait
			action.choseType == 'resume'?_strait = {...state.sourceResumeList}:_strait = {...state.sourceCandidateList}

			if(checkIndex<_strait.data.length){
				_strait.data[checkIndex].checked = checkVal;
			}else{
				for (var i = 0,j = _strait.data.length;i<j;i++ ){
					_strait.data[i].checked = checkVal
				}
			}
			if(action.choseType == 'resume'){
				return {

					...state,

					sourceResumeList:_strait
				}
			}else{
				return {

					...state,

					sourceCandidateList:_strait
				}
			}

		case DELRESUME:
			if(action.data[0]==0){

			}

		default:
			return state
	}
}