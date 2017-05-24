
/*系统引导库*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './straitDetail.css';
import PanShow from 'pubComp/panShow/panShow.jsx';

import {getStraitDetail,submitJobNote,receiveService} from 'actionPath/taskAction.jsx';

import Select from 'pubComp/select/select.jsx';
import Input from 'pubComp/input/input.jsx';
import SalarySelect from 'pubComp/salarySelect/salarySelect.jsx';

import TipModal from 'pubComp/modal/tipModal.jsx';

import {work_year,degree_list} from 'cmPath/config.jsx';

class TaskInfo extends React.Component {

    constructor(props){

        super(props);

        var info = props.taskList.straitDetail.taskinfo;
        this.state = {

            taskInfo:{

                content:{info:[[{title:"任务ID：",detail:"178903457"},{title:"发布时间：",detail:info.start_time}],
                                [{title:"任务类型：",detail:info.taskType},{title:"截至日期：",detail:info.end_time}]]}
            },

            taskFont:info.receiveTag == true?"开始任务":"领取任务"
        }

    }

    componentWillReceiveProps(nextProps){

        var info = nextProps.taskList.straitDetail.taskinfo;
        var _state = {

            taskInfo:{

                content:{info:[[{title:"任务ID：",detail:info.service_id},{title:"发布时间：",detail:info.start_time}],
                    [{title:"任务类型：",detail:info.taskType},{title:"截至日期：",detail:info.end_time}]]}
            },

            taskFont:info.receiveTag == true?"开始任务":"领取任务"

        }

        this.setState(_state)

    }

    startTaskBtn = (e)=>{

        let thiz = this;

        var {dispatch} = this.props;

        e.stopPropagation();

        var service_id = this.props.taskList.straitDetail.taskinfo.service_id;
        var job_id = this.props.taskList.straitDetail.taskinfo.job_id;
        var order_user_id = this.props.taskList.straitDetail.taskinfo.order_user_id;

        if (this.state.taskFont == '开始任务'){


            browserHistory.push("/guide/implementation/resumesearch/"+service_id+"/"+order_user_id+"/"+job_id);

        }else {


            receiveService(service_id, job_id, () => {

                dispatch(getStraitDetail(job_id,order_user_id,service_id));
            });
        }
    }

    render(){

        let thiz = this;

        let panshow = {width:'200px',height:'30px'};

        var info = this.props.taskList.straitDetail.taskinfo;

        return (

            <div className={style.taskCon}>
                <h2 className={style.taskTitle}>任务信息</h2>
                <div className={style.taskLeft}>
                {

                    this.state.taskInfo.content.info.map(function(info,index){

                        let ret = [];

                        ret = info.map(function(item,ind){

                            return (
                                <div className={style.taskLine} key={'taskinfo'+ind}>

                                    <span className={style.lineTitle}>{item.title}</span>
                                    <span>{item.detail}</span>
                                </div>
                            )

                        })

                        return  <div className={style.taskItem} key={'taskinfo'+index}>{ret}</div>
                    })
                }
                </div>

                <div className={style.taskRight}>

                    <p>已核实{info.find_job_num}/{info.total_num}</p>

                    <input type="button" className={style.startTask} value={this.state.taskFont} onClick={this.startTaskBtn.bind(this)}/>
                </div>

            </div>
        )
    }

}

class HRinfo extends React.Component {


    constructor(props) {

        super(props);

        var info = props.taskList.straitDetail.hrinfo;

        this.state = {

            hrInfo:  [[{title: "联系人：", detail: info.company_contact}, {title: "所在地区：", detail: info.company_location}],
                        [{title: "职位：", detail:  info.company_position}, {title: "所在行业：", detail:  info.company_industry}],
                        [{title: "手机：", detail:  info.company_phone}, {title: "所在公司：", detail:  info.company_name}],
                        [{title: "邮箱：", detail:  info.company_email}],]
        }
    }

    componentWillReceiveProps(nextProps){

        var info = nextProps.taskList.straitDetail.hrinfo;
        var _state = {

            hrInfo:  [[{title: "联系人：", detail: info.company_contact}, {title: "所在地区：", detail: info.company_location}],
                [{title: "职位：", detail:  info.company_position}, {title: "所在行业：", detail:  info.company_industry}],
                [{title: "手机：", detail:  info.company_phone}, {title: "所在公司：", detail:  info.company_name}],
                [{title: "邮箱：", detail:  info.company_email}],]
        }

        this.setState(_state)
    }

        render(){

            return (

                <div className={style.hrCon}>

                    <p className={style.hrTitle}>HR信息</p>

                    <div className={style.hrContentCon}>

                        {

                            this.state.hrInfo.map(function(info,index){

                                let ret = [];

                                ret=info.map(function(hr,ind){

                                    return(
                                        <div className={style.infoItem} key={'hr'+ind}>
                                        <span className={style.hrConTitle}>{hr.title}</span>
                                        <span>{hr.detail}</span>
                                    </div>
                                    )
                                })

                                return <div className={style.infoLine} key={'hrinfo'+index}>{ret}</div>
                            })
                        }
                    </div>

                </div>
            )

        }


}


class PositionInfo extends React.Component {


    constructor(props){

        super(props);

        var info = props.taskList.straitDetail.jobinfo;

        this.state = {

            checkStatus:false,

            info:  [{title:"公司名称：",detail:info.job_company,check:info.job_company_checked,select_check:info.job_company_checked,chktype:"input",ckey:'job_company'},
                {title:"招聘岗位：",detail:info.job_name,check:info.job_name_checked,select_check:info.job_name_checked,chktype:"input",child:[],ckey:"job_name"},
                {title:"学历要求：",detail:info.job_degree,check:info.job_degree_checked,select_check:info.job_degree_checked,chktype:"select",child:degree_list,ckey:"job_degree"},
                {title:"工作经验：",detail:info.job_exp,check:info.job_exp_checked,select_check:info.job_exp_checked,chktype:"select",child:work_year,ckey:"job_exp"},
                {title:"薪资要求：",detail:info.job_salary,check:info.job_salary_checked,select_check:info.job_salary_checked,chktype:"select",child:[],ckey:"job_salary"},
                {title:"工作性质：",detail:info.job_type,check:info.job_type_checked,select_check:info.job_type_checked,chktype:"select",child:['全职','兼职','实习'],ckey:"job_type"},
                {title:"工作地点：",detail:info.job_location,check:info.job_location_checked,select_check:info.job_location_checked,chktype:"input",ckey:'job_location'}],

            posDuty:info.job_duty,
            posRequire:info.job_require
        }

    }

    componentWillReceiveProps(nextProps){

        var info = nextProps.taskList.straitDetail.jobinfo;
        var _state = {

            checkStatus:false,

            info:  [{title:"公司名称：",detail:info.job_company,check:info.job_company_checked,select_check:info.job_company_checked,chktype:"input",ckey:'job_company'},
                {title:"招聘岗位：",detail:info.job_name,check:info.job_name_checked,select_check:info.job_name_checked,chktype:"input",child:[],ckey:"job_name"},
                {title:"学历要求：",detail:info.job_degree,check:info.job_degree_checked,select_check:info.job_degree_checked,chktype:"select",child:degree_list,ckey:"job_degree"},
                {title:"工作经验：",detail:info.job_exp,check:info.job_exp_checked,select_check:info.job_exp_checked,chktype:"select",child:work_year,ckey:"job_exp"},
                {title:"薪资要求：",detail:info.job_salary,check:info.job_salary_checked,select_check:info.job_salary_checked,chktype:"select",child:[],ckey:"job_salary"},
                {title:"工作性质：",detail:info.job_type,check:info.job_type_checked,select_check:info.job_type_checked,chktype:"select",child:['全职','兼职','实习'],ckey:"job_type"},
                {title:"工作地点：",detail:info.job_location,check:info.job_location_checked,select_check:info.job_location_checked,chktype:"input",ckey:'job_location'}],

            posDuty:info.job_duty,
            posRequire:info.job_require
        }

        this.setState(_state)
    }

    getCheckBtn = (type)=>{

        if (type == 'check'){

            return this.state.checkStatus == false?{}:{display:'none'}
        }else if(type == 'edit'){

            return this.state.checkStatus == true?{}:{display:'none'}

        }

    }

    checkClick = (e)=>{

        e.stopPropagation();

        var info = this.props.taskList.straitDetail.taskinfo;


        if (info.receiveTag != true){

            alert("请先领取任务")
            return
        }

        this.setState({

            checkStatus:true
        })
    }

    getKeyValue = (ckey)=>{

        let _state = {...this.state};

        for (var i = 0;i < _state.info.length;i++){

            if (_state.info[i].ckey && ckey == _state.info[i].ckey){

                return _state.info[i].select_check;
            }
        }
    }

    saveJobNote = ()=>{

        var thiz = this;

        var {dispatch} = this.props;

        var service_id = this.props.taskList.straitDetail.taskinfo.service_id;
        var order_user_id = this.props.taskList.straitDetail.taskinfo.order_user_id;
        var job_id = this.props.taskList.straitDetail.taskinfo.job_id;

        var body = {

            job_name:thiz.getKeyValue('job_name'),
            salary_from:thiz.getKeyValue('job_salary').split('-')[0],
            salary_to:thiz.getKeyValue('job_salary').split('-')[1],
            company_name:thiz.getKeyValue('job_company'),
            work_year:thiz.getKeyValue('job_exp'),
            term:thiz.getKeyValue('job_type'),
            degree_from:thiz.getKeyValue('job_degree'),
            address:thiz.getKeyValue('job_location'),
        }

        submitJobNote(order_user_id,job_id,service_id,body,()=>{

            dispatch(getStraitDetail(job_id,order_user_id,service_id));
        })
    }


    editBtnClick = (type,e)=>{

        e.stopPropagation();

        if (type == 'cancel'){

            this.setState({

                checkStatus:false

            })
        }else{

            this.saveJobNote();
        }
    }


    handleCallback = (val,ckey)=>{


        let _state = {...this.state};

        for (var i = 0;i < _state.info.length;i++){

            if (_state.info[i].ckey && ckey == _state.info[i].ckey){

                _state.info[i].select_check = val;
                break;
            }
        }

        this.setState(_state);
    }

    handleSalary = (val,ckey)=>{

        let _state = {...this.state};

        for (var i = 0;i < _state.info.length;i++){

            if (_state.info[i].ckey && ckey == _state.info[i].ckey){

                _state.info[i].select_check = val[0]+'-'+val[1];
                break;
            }
        }

        this.setState(_state);
    }


    showCheckEditConetnt = (item)=>{

        let thiz = this;

        if (this.state.checkStatus == false){

            return <div className={style.posLineSide}><span>{item.check}</span></div>
        }else{

            if (item.ckey == 'job_salary'){

                var salaryArray = [item.select_check.split('-')[0],item.select_check.split('-')[1]]

               return <SalarySelect style={{width:'83px',height:'18px'}} handle={this.handleSalary} value={salaryArray} ckey = {item.ckey}/>
            }
            else if (item.chktype == 'select'){

               return <Select  handle={thiz.handleCallback}
                              style={{width:'180px',height:'18px'}} value={item.select_check} child={item.child} ckey={item.ckey}></Select>
            }else if (item.chktype == 'input'){

                return <Input  handle={thiz.handleCallback}
                              style={{width:'180px',height:'18px',backgroundColor:'rgba(249, 249, 249, 1)',textIndent:"20px"}} value={item.select_check}  ckey={item.ckey}></Input>
            }

        }
    }

    render(){

        let thiz = this;
        return (


            <div className={style.posCon}>

                <input value="核实" type="button" style={this.getCheckBtn('check')}
                       className={style.posCheckBtn} onClick={this.checkClick.bind(this)}/>

                <div className={style.editBtnGroup} style={this.getCheckBtn('edit')}>
                    <input value="修改" onClick={this.editBtnClick.bind(this,'edit')} type="button"/>
                    <input value="取消" onClick={this.editBtnClick.bind(this,'cancel')} type="button"/>
                </div>

                <div className={style.posTitle}>

                    <span>岗位信息</span>
                    <span className={style.checkTitle}>核实信息</span>
                </div>

                <div className={style.posContentCon}>

                    {

                        this.state.info.map(function(item,index){

                            return(
                                <div key={'position'+index} className={style.posLine}>
                                    <div className={style.posLineSide}>
                                        <span className={style.posConTitle}>{item.title}</span>
                                        <span>{item.detail}</span>
                                    </div>

                                    {

                                        thiz.showCheckEditConetnt(item)
                                    }




                                </div>
                            )

                        })
                    }


                </div>

                <div className={style.posDuty}>
                    <p>岗位职责</p>
                    <span>{this.state.posDuty}</span>

                </div>


                <div className={style.posRequire}>
                    <p>岗位要求</p>
                    <span>{this.state.posRequire}</span>

                </div>

            </div>
        )
    }

}



class Preference extends React.Component {

    constructor(props){

        super(props);

        var info = props.taskList.straitDetail.jobinfo;

        this.state = {

            checkStatus:false,
            checkedValue:info.job_pefrence_checked
        }

    }

    componentWillReceiveProps(nextProps) {

        var info = nextProps.taskList.straitDetail.jobinfo;

        this.setState({

            checkStatus:false,
            checkedValue:info.job_pefrence_checked

        })
    }

    getCheckBtn = (type)=>{

        if (type == 'check'){

            return this.state.checkStatus == false?{}:{display:'none'}
        }else if(type == 'edit'){

            return this.state.checkStatus == true?{}:{display:'none'}

        }

    }

    saveJobNote = ()=>{

        var thiz = this;

        var {dispatch} = this.props;

        var service_id = this.props.taskList.straitDetail.taskinfo.service_id;
        var order_user_id = this.props.taskList.straitDetail.taskinfo.order_user_id;
        var job_id = this.props.taskList.straitDetail.taskinfo.job_id;

        var body = {

            preference:this.state.checkedValue
        }

        submitJobNote(order_user_id,job_id,service_id,body,()=>{

            dispatch(getStraitDetail(job_id,order_user_id,service_id));
        })
    }

    editBtnClick = (type,e)=>{

        e.stopPropagation();

        if (type == 'cancel'){

            this.setState({

                checkStatus:false

            })
        }else{

            this.saveJobNote();
        }
    }

    checkClick = (e)=>{

        e.stopPropagation();


        var info = this.props.taskList.straitDetail.taskinfo;


        if (info.receiveTag != true){

            alert("请先领取任务")
            return
        }

        this.setState({

            checkStatus:true
        })
    }

    setChange = (key,e)=>{

        e.stopPropagation();

        var _state = {...this.state};

        _state[key] = e.target.value;

        this.setState(_state)
    }

    render(){

        var info = this.props.taskList.straitDetail.jobinfo;

        return (

            <div className={style.loveCon}>

                <span className={style.loveTitle}>岗位偏好</span>
                <span className={style.checkTitle}>核实信息</span>

                <div >
                    <input value="核实" type="button" style={this.getCheckBtn('check')}
                           className={style.checkBtnCon} onClick={this.checkClick.bind(this)}/>
                </div>

                <div className={style.editBtnGroup} style={this.getCheckBtn('edit')}>
                    <input value="修改" onClick={this.editBtnClick.bind(this,'edit')} type="button"/>
                    <input value="取消" onClick={this.editBtnClick.bind(this,'cancel')} type="button"/>
                </div>


                <div className={style.loveDetail}>

                    <span style={{fontWeight:"700"}}>学校类型</span>
                    <span>985/211</span>
                </div>

                <div className={style.loveChecked}>

                    <span style={this.getCheckBtn('check')}>{info.job_pefrence_checked}</span>

                    <input value={this.state.checkedValue} onChange={this.setChange.bind(this,'checkedValue')} style={this.getCheckBtn('edit')}/>
                </div>
            </div>
        )

    }

}

export default class StraitDetail extends React.Component {

    constructor(props){

        super(props);
    }

    render(){

        return (

            <div className={style.container}>

                <TaskInfo {...this.props}/>
                <br />

                <HRinfo {...this.props}/>
                <br />

                <PositionInfo {...this.props}/>
                <br />


                <Preference {...this.props}/>
                <br />

                <br />


            </div>


        )

    }

}
