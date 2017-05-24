/*系统引导库*/


import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {GETTALENTLIST,GETRESUMELIST,GETCANDIDATELIST,CHANGECHECKED,DELRESUME,DELCANDIDATE} from 'actionPath/searchResumeAction.jsx';

import style from './resumeSearch.css';
import SingleSelect from 'pubComp/singleSelect/singleSelect'
import TabControl from 'pubComp/tabControl/tabControl.jsx';
import Table from 'pubComp/table/table.jsx';
import Input from 'pubComp/input/input.jsx';
import {getTalentList,getResumeList,getCandidateList,changeChecked,delResume,delCandidate} from 'actionPath/searchResumeAction.jsx';

import Pagination from 'pubComp/pagination/pagination.jsx'
//短信编辑
class MessageEdit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			content:'',
			msgEditWarnHide:false,
		}
	}
	textChange = (event) =>{
		this.setState({
			content: event.target.value,
			msgEditWarnHide: false
		});

	}
	creatMsgEditWarn = () =>{
		if(this.state.msgEditWarnHide){
			return <p className={style.msgEditWarn}>最多输入500字</p>
		}
	}
	btnSendMsg = () =>{
		if(this.state.content.length>500){
			this.setState({
				msgEditWarnHide: true
			});
		}else{

			this.props.btnClick('invite','【辈出网】'+this.state.content)
		}
	}
	render(){

		return(
			<div className={style.shadow} >
				<div className={style.msgWrap}>
					<p className={style.msgTitle}>短信邀约</p>
					<div className={style.msgEditWrap}>
						<p className={style.msgEditTitle}>内容编辑:</p>
						{this.creatMsgEditWarn()}
						<textarea className={style.msgEdit} onChange={this.textChange}></textarea>
					</div>
					<div className={style.btnWrap}>
						<p className={style.btnShadow+' '+ style.mr50} onClick={this.btnSendMsg}>确认</p>
						<p className={style.btnShadow} onClick={this.props.btnCancel}>取消</p>
					</div>

				</div>
			</div>
		)

	}
}
//模态框---当选择人数和实际项目需求人数不等
class ModelWarn extends React.Component {
	constructor(props){
		super(props);

	}
	render(){

		return(
				<div className={style.shadow}>
					<div className={style.shadowContent}>
						<p>目前已核实<span className={style.textWarn}>{this.props.checkedNum}</span>位候选人,请筛选至<span className={style.textWarn}>{this.props.searchResumeList.sourceCandidateList.copies}</span>位</p>
						<p className={style.btnShadow} onClick={this.props.btnCancel}>好的</p>
					</div>
				</div>
			)

	}
}
//模态框---当选择人数和实际项目需求人数相等
class ModelGoing extends React.Component {
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div className={style.shadow}>
				<div className={style.shadowContent}>
					<p>您将推荐<span className={style.textWarn}>{this.props.searchResumeList.sourceCandidateList.copies}</span>位候选人完成服务</p>
					<p className={style.btnShadow+' '+ style.mr50}  onClick={this.props.btnClick.bind(this,'fns')}>是的</p>
					<p className={style.btnShadow } onClick={this.props.btnCancel}>我在考虑一下</p>
				</div>
			</div>
		)

	}
}
//人才库列表----------4 (*数字代表组件相对的等级*)
class TalentDatabase extends React.Component{
	constructor(props){

		super(props);



	}

	componentDidMount(){

		var {dispatch,searchResumeList} = this.props;

		var current = searchResumeList.sourceTalentList.current;

		dispatch(getTalentList(current))

	}

	pagnationCallback = (page)=>{

		var {dispatch} = this.props;

		dispatch(getTalentList(page,this.props.body))

	}



	render(){

		const columns = [
			{
				title:"No",
				key:"number"
			},
			{
				title:"姓名",
				key:"name"
			},
			{
				title:"年龄",
				key:"age"
			},
			{
				title:"工作年限",
				key:"seniority"
			},
			{
				title:"学历",
				key:"degree"
			},
			{
				title:"最近一份工作",
				key:"function"
			},
			{
				title:"更新时间",
				key:"renew"
			},
			{
				title:"现居地",
				key:"residence"
			},
			{
				title:"期望工作地",
				key:"location"
			},
			{
				title:"跟进人",
				key:"follow"
			},

		];

		var {dispatch,searchResumeList} = this.props;

		var current = parseInt(searchResumeList.sourceTalentList.current);

		var max =parseInt(searchResumeList.sourceTalentList.maxpage) ;

		return (
			<div style={{position:'relative'}}>
				<span className={style.totleNum}>共为您找到{this.props.searchResumeList.sourceTalentList.totle}份简历</span>
				<Table columns = {columns} source = {this.props.searchResumeList.sourceTalentList.data} ></Table>
				<br />
				<Pagination nCurrentPage={current} nMaxPage={max} fPageHandle={this.pagnationCallback}/>
			</div>
		)
	}


}
//简历库列表----------4
class ResumeLibrary extends  React.Component{
	constructor(props){

		super(props);
		this.state = {
			messageEditHide:true
		}


	}

	componentDidMount(){

		var {dispatch,searchResumeList} = this.props;

		var current = searchResumeList.sourceResumeList.current;

		dispatch(getResumeList(current,this.props.body))

	}
	btnStatus = () =>{
		var idArr = []
		for(var i = 0,j =this.props.searchResumeList.sourceResumeList.data.length;i<j;i++ ){
			if(this.props.searchResumeList.sourceResumeList.data[i].checked){
				idArr.push(this.props.searchResumeList.sourceResumeList.data[i].resumeId)
			}
		}
		if(idArr.length !=0){
			this.setState({
				messageEditHide:false,
			})
		}

	}
	btnCancel = () =>{
		this.setState({
			messageEditHide:true,
		})
	}
	choseIndex = (val,index) =>{
		var {dispatch} = this.props;

		dispatch(changeChecked(val,index,'resume'))


	}

	btnClick = (btnType,content)=>{
		this.setState ( {
			messageEditHide:true
		})
		let {dispatch,searchResumeList} = this.props;
		var current = searchResumeList.sourceResumeList.current;
		var idArr = []
		var idList = {}
		for(var i = 0,j =this.props.searchResumeList.sourceResumeList.data.length;i<j;i++ ){
			if(this.props.searchResumeList.sourceResumeList.data[i].checked){
				idArr.push(this.props.searchResumeList.sourceResumeList.data[i].resumeId)
			}
		}
		if(btnType == 'del'){
			idList.id_list = idArr
		}else{
			idList.resume_id_list = idArr
			idList.content = content
		}
		idArr.length !=0 && dispatch(delResume(idList,btnType,this.delCallback.bind(this,current,this.props.body)))

	}

	delCallback = (current,body) =>{

		let {dispatch} = this.props;
		dispatch(getResumeList(current,body))
	}

	pagnationCallback = (page)=>{


		var {dispatch} = this.props;

		dispatch(getResumeList(page,this.props.body))

	}
	creatMessageEdit = () =>{
		if(this.state.messageEditHide){

		}else {
			return <MessageEdit {...this.props}  btnCancel = {this.btnCancel} btnClick={this.btnClick}></MessageEdit>
		}
	}
	render(){


		const columns = [

			{
				title:"No",
				key:"number"
			},
			{
				title:"姓名",
				key:"name"
			},
			{
				title:"年龄",
				key:"age"
			},
			{
				title:"工作年限",
				key:"seniority"
			},
			{
				title:"学历",
				key:"degree"
			},
			{
				title:"最近一份工作",
				key:"function"
			},
			{
				title:"更新时间",
				key:"renew"
			},
			{
				title:"现居地",
				key:"residence"
			},
			{
				title:"期望工作地",
				key:"location"
			},


		];
		var {dispatch,searchResumeList} = this.props;

		var current = parseInt(searchResumeList.sourceResumeList.current);

		var max =parseInt(searchResumeList.sourceResumeList.maxpage) ;

		return (

			<div style={{position:'relative'}}>

				<span className={style.totleNum}>共为您找到{this.props.searchResumeList.sourceResumeList.totle}份简历</span>
				<p className={style.delteBtn} onClick={this.btnClick.bind(this,'del')}>移出</p>
				<p className={style.addBtn} onClick={this.btnStatus} >邀约</p>
				<Table columns = {columns} source = {this.props.searchResumeList.sourceResumeList.data} prev  checkedHandle={this.choseIndex}></Table>
				<br />
				<Pagination nCurrentPage={current} nMaxPage={max} fPageHandle={this.pagnationCallback}/>
				{this.creatMessageEdit()}
			</div>
		)
	}


}
//候选人列表
class CandidateList extends  React.Component{
	constructor(props){

		super(props);
		this.state = {
			modelWarnHide:true,
			checkedNum:0,
			modelGoingHide:true,
		}


	}

	componentDidMount(){

		var {dispatch,searchResumeList} = this.props;
		var body ={
			service_id:1726300045
		}

		dispatch(getCandidateList(body))

	}
	choseIndex = (val,index) =>{
		var {dispatch} = this.props;

		dispatch(changeChecked(val,index,'candidate'))


	}
	btnStatus = () =>{
		var idArr = []
		for(var i = 0,j =this.props.searchResumeList.sourceCandidateList.data.length;i<j;i++ ){
			if(this.props.searchResumeList.sourceCandidateList.data[i].checked){
				idArr.push(this.props.searchResumeList.sourceCandidateList.data[i].resumeId)
			}
		}
		if(this.props.searchResumeList.sourceCandidateList.complete == 1){
			if(idArr.length != this.props.searchResumeList.sourceCandidateList.copies){

				this.setState({
					modelWarnHide:false,
					checkedNum:idArr.length,
					modelGoingHide:true,
				})
			}else{
				this.setState({
					modelWarnHide:true,
					modelGoingHide:false,
				})
			}

		}else{

		}


	}
	btnCancel = () =>{
		this.setState({
			modelWarnHide:true,
			modelGoingHide:true,
		})
	}
	btnClick = (btnType)=>{

		this.setState({
			modelWarnHide:true,
			modelGoingHide:false,
		})
		let {dispatch,searchResumeList} = this.props;

		var idArr = []
		var idList = {}
		idList.service_id = 1726300045
		for(var i = 0,j =this.props.searchResumeList.sourceCandidateList.data.length;i<j;i++ ){
			if(this.props.searchResumeList.sourceCandidateList.data[i].checked){
				idArr.push(this.props.searchResumeList.sourceCandidateList.data[i].resumeId)
			}
		}
		idList.resume_id_list = idArr
		if(btnType == 'del'){

		}else{
			idList.order_user_id = ''
		}

		idArr.length !=0 && dispatch(delCandidate(idList,btnType,this.delCallback))

	}

	delCallback = () =>{

		let {dispatch} = this.props;

		var body ={
			service_id:1726300045
		}

		dispatch(getCandidateList(body))
	}

	creatModelWarn = () =>{
		if(this.state.modelWarnHide){

		}else {
			return <ModelWarn {...this.props} checkedNum={this.state.checkedNum} btnCancel = {this.btnCancel}></ModelWarn>
		}
	}
	creatModelGoing = () =>{
		if(this.state.modelGoingHide){

		}else {
			return <ModelGoing {...this.props}  btnCancel = {this.btnCancel} btnClick={this.btnClick}></ModelGoing>
		}
	}
	render(){

		const columns = [

			{
				title:"No",
				key:"number"
			},
			{
				title:"姓名",
				key:"name"
			},
			{
				title:"年龄",
				key:"age"
			},
			{
				title:"工作年限",
				key:"seniority"
			},
			{
				title:"学历",
				key:"degree"
			},
			{
				title:"最近一份工作",
				key:"function"
			},
			{
				title:"更新时间",
				key:"renew"
			},
			{
				title:"现居地",
				key:"residence"
			},
			{
				title:"期望工作地",
				key:"location"
			},
			{
				title:"进度",
				key:"progress"
			},
		];



		return (
			<div style={{position:'relative'}}>
				<p className={style.delteBtn}  onClick={this.btnClick.bind(this,'del')}>移出</p>
				<p className={this.props.searchResumeList.sourceCandidateList.complete == 1?style.addBtn:style.addBtnWarn} onClick={this.btnStatus}>提交</p>
				<Table columns = {columns} source = {this.props.searchResumeList.sourceCandidateList.data} prev checkedHandle={this.choseIndex}></Table>
				{this.creatModelWarn()}
				{this.creatModelGoing()}
			</div>
		)
	}

}
//tab导航-------------3
class ResumeList extends React.Component {

	constructor(props){

		super(props);



	}

	straitLineClick = () =>{

	}

	render(){

		return(
			<div className={style.mt10}  >

				<TabControl  {...this.props}>

					<div name = "人才库" className={style.tableItem}   onClick={this.props.changeType.bind(this,'talent')}>
						<TalentDatabase {...this.props}/>
					</div>
					<div name = "简历库" className={style.tableItem} onClick={this.props.changeType.bind(this,'resume')}>
						<ResumeLibrary {...this.props} />
					</div>
					<div name = "项目候选人" className={style.tableItem} onClick={this.props.changeType.bind(this,'candidate')}>
						<CandidateList {...this.props}></CandidateList>
					</div>
				</TabControl>
			</div>

		)
	}

}
//简历搜索------------2
class ResumeSelect extends React.Component{

	constructor(props){

		super(props);
		this.state={
			degree: ['不限', '高中', '大专', '本科', '硕士', '博士'],
			exp: ['不限', '应届生', '1-3年', '3-5年', '5-10年', '10年以上'],
			workstate: ['离职-随时到岗', '在职-暂不考虑', '在职-考虑机会'],
			userDegree:'',//学历
			userExp:'',//工作年限
			userState:'',//在职状态
			usernearWork:"",//最近一份职位
			userDetails:'',//关键字搜索
			userResidence:'',//现居地
			userExceptedWork:'',//期望工作
			userExceptedWorkArea:'',//期望工作地
			userAgeFrom:'',//年纪
			userAgeTo:'',
			refTime:'',//更新时间
			salaryBegin:'',//薪水
			salaryEnd:'',
			userIndustry:'',//所在行业
			resumeId:'',//简历ID
			tagSearch:'',//标签搜索
			keyWordEliminate:'',//关键字排除
			pageSize:'',//每页显示数量
			body:'',
			type:'talent',
		}


	}
	changeType = (val)=>{
		if(this.state.type != val){
			this.setState({
				type:val
			});
		}
	}


	search = (e) =>{





		var {dispatch} = this.props;

		this.state.body = {

			degree : this.state.userDegree,//学历
			seniority: this.state.userExp,//工作经验
			status:this.state.userState,//在职状态
			function:this.state.usernearWork,//最近一份职位
			details	:this.state.userDetails,//关键字
			residence:this.state.userResidence,//现居地
			//userExceptedWork:this.state.userExceptedWork,//期望工作
			location:this.state.userExceptedWorkArea,//期望地
			age_from:this.state.userAgeFrom,//年龄开始(年龄为空不做默认)
			age_to:this.state.userAgeTo,//年龄结束(年龄为空不做默认)
			mtime_date:this.state.refTime,//更新时间
			salary_begin:this.state.salaryBegin,//薪水开始(薪水为空不做默认)
			salary_end:this.state.salaryEnd,//薪水结束(薪水为空不做默认)
			industry:this.state.userIndustry,//所在行业
			//resumeId:this.state.resumeId,//简历ID
			//tagSearch:this.state.tagSearch,//标签搜索
			delete_job:this.state.keyWordEliminate,//关键字排除
			pagesize:this.state.pageSize||10,//每页显示数量

		}

		if (this.state.type == 'talent'){
			dispatch(getTalentList(1,this.state.body))
		}else{
			dispatch(getResumeList(1,this.state.body))
		}




	}

	handleState = (e) =>{
		this.setState({
			userDegree:'',//学历
			userExp:'',//工作年限
			userState:'',//在职状态
			usernearWork:'',//最近一份职位
			userDetails:'',//关键字搜索
			userResidence:'',//现居地
			userExceptedWork:'',//期望工作
			userExceptedWorkArea:'',//期望工作
			userAgeFrom:'',//年纪
			userAgeTo:'',
			refTime:'',//更新时间
			salaryBegin:'',//薪水
			salaryEnd:'',
			userIndustry:'',//所在行业
			resumeId:'',//简历ID
			tagSearch:'',//标签搜索
			keyWordEliminate:'',//关键字排除
			pageSize:'',//每页显示数量
		})
	}
	changeIpt = (val,key)=> {

		var obj = {...this.state};
		obj[key] = val;

		this.setState(obj);

	}
	changeState = (type, select, e)=> {
		var obj = {}
		obj[type] = select
		this.setState(obj)
	}

	render() {
		return(
			<div>
				<div className={style.serchWrap}>

					<div className={style.sinSlect+' '+style.mr10} >
						<Input
							value={this.state.usernearWork}
							style={{width:'140px',height:'30px'}}
							ckey="usernearWork" prev
							handle={this.changeIpt.bind(this)}
							placeholder="最近一份工作职位" />
					</div>

					<div className={style.sinSlect+' '+style.mr10} >
						<Input
							value={this.state.userDetails}
							handle={this.changeIpt.bind(this)}
							placeholder="关键字搜索"
							style={{width:'140px',height:'30px'}}
							ckey="userDetails"  />

					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="现居地"
							value={this.state.userResidence}
							style={{width:'140px',height:'30px'}}
							ckey="userResidence" />
					</div>

					<div className={style.sinSlect} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="期望职位"
							value={this.state.userExceptedWork}
							style={{width:'140px',height:'30px'}}
							ckey="userExceptedWork"/>
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<SingleSelect defaultInfo={this.state.userExp}
						              changEvent={this.changeState.bind(this,'userExp')}
						              listData={this.state.exp} placeholder="工作年限"/>
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<SingleSelect defaultInfo={this.state.userDegree}
						              changEvent={this.changeState.bind(this,'userDegree')}
						              listData={this.state.degree} placeholder="学历" />
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="期望工作地"
							value={this.state.userExceptedWorkArea}
							style={{width:'140px',height:'30px'}}
							ckey="userExceptedWorkArea"  />
					</div>

					<div className={style.sinSlect} style={{width:'140px'}}>
						<SingleSelect defaultInfo={this.state.userState}
						              changEvent={this.changeState.bind(this,'userState')}
						              listData={this.state.workstate} placeholder="在职状态"/>
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="岁"
							value={this.state.userAgeFrom}
							style={{width:'60px',height:'30px'}}
							ckey="userAgeFrom"  />
						<span className={style.join}>-</span>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="岁"
							value={this.state.userAgeTo}
							style={{width:'60px',height:'30px'}}
							ckey="userAgeTo" />
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="更新时间"
							value={this.state.refTime}
							style={{width:'140px',height:'30px'}}
							ckey="refTime" />
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="¥"
							value={this.state.salaryBegin}
							style={{width:'60px',height:'30px'}}
							ckey="salaryBegin"  />
						<span className={style.join}>-</span>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="¥"
							value={this.state.salaryEnd}
							style={{width:'60px',height:'30px'}}
							ckey="salaryEnd"  />
					</div>

					<div className={style.sinSlect} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="所在行业"
							value={this.state.userIndustry}
							style={{width:'140px',height:'30px'}}
							ckey="userIndustry"  />
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="简历ID"
							value={this.state.resumeId}
							style={{width:'140px',height:'30px'}}
							ckey="resumeId" prev />
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="标签搜索"
							value={this.state.tagSearch}
							style={{width:'140px',height:'30px'}}
							ckey="tagSearch"  />
					</div>

					<div className={style.sinSlect+' '+style.mr10} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="关键字排除"
							value={this.state.keyWordEliminate}
							style={{width:'140px',height:'30px'}}
							ckey="keyWordEliminate"  />
					</div>

					<div className={style.sinSlect} style={{width:'140px'}}>
						<Input
							handle={this.changeIpt.bind(this)}
							placeholder="每页显示数量"
							value={this.state.pageSize}
							style={{width:'140px',height:'30px'}}
							ckey="pageSize"/>
					</div>

					<div className={style.searchBtn} style={{marginLeft:'206px'}} onClick={this.search}>简历搜索</div>
					<div className={style.searchBtn} style={{marginLeft:'20px'}} onClick={this.handleState}>清空搜索</div>


					<div className={style.clear}></div>
				</div>

				<ResumeList {...this.props} body={this.state.body} changeType={this.changeType}></ResumeList>
			</div>
		)
	}


}
//右侧岗位信息---------2
class JobInformation extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className={style.jobInforWrap}>

			</div>
		)
	}
}
//根组件-------1
class ResumeScreening extends React.Component{

	constructor(props){

		super(props);



	}
	render(){
		return(
			<div className={style.container}>
				<div className={style.leftSide}>
					<ResumeSelect {...this.props}></ResumeSelect>
				</div>
				<div className={style.rightSide}>
					<JobInformation></JobInformation>

				</div>

			</div>
		)
	}
}

module.exports = connect((state)=>{

	return {searchResumeList:state.searchResumeList}

})(ResumeScreening);
