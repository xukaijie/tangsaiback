
/*系统引导库*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './taskDetail.css';
import TabControl from 'pubComp/tabControl/tabControl.jsx';
import Table from 'pubComp/table/table.jsx';
import Pagination from 'pubComp/pagination/pagination.jsx'
import Location from 'pubComp/location/location.jsx'



import StraitDetail from './straitDetail/straitDetail.jsx';

import {getStaritList,getStraitDetail} from 'actionPath/taskAction.jsx';


class StraitEnsure extends React.Component{

    constructor(props){

        super(props);
    }

    componentDidMount(){

        var {dispatch,taskList} = this.props;

        var current = taskList.strait.current;

        dispatch(getStaritList(current))

    }

    pagnationCallback = (page)=>{

        var {dispatch} = this.props;

        dispatch(getStaritList(page))

    }


    lineClick = (para)=>{

        if (this.props.lineClick){

            this.props.lineClick(para)
        }
    }

    render(){

        const columns = [
            {
                title:"No",
                key:"number"
            },
            {
                title:"保障职位",
                key:"position"
            },
            {
                title:"发布时间",
                key:"ctime"
            },
            {
                title:"需核实",
                key:"confirm"
            },
            {
                title:"参与人员",
                key:"people"
            }

        ];

        var {dipatch,taskList} = this.props;

        var current = taskList.strait.current;

        var max = taskList.strait.maxpage;

        return (
            <div>
            <Table columns = {columns} source = {this.props.taskList.strait.data} lineClick = {this.lineClick}></Table>
                <br />
            <Pagination nCurrentPage={current} nMaxPage={max} fPageHandle={this.pagnationCallback}/>
            </div>
        )
    }
}

 class TaskDetail extends React.Component {

    constructor(props){

        super(props);

    }

     straitLineClick = (para)=>{

        let {dispatch} = this.props;

         dispatch(getStraitDetail(para.job_id,para.order_user_id,para.service_id));

    }

    render(){

        let profile = this.props.taskList.profile
        return (

            <div className={style.container}>

                {/*<Location />*/}
               <div className={style.leftSide}>

                   <div className={style.profile}>
                       <div className={style.profileItem}>
                           <span>总数：{profile.total}</span>
                       </div>
                        <div className={style.profileItem}>
                           <span>待处理任务:{profile.pending}</span>
                        </div>
                        <div className={style.profileItem}>
                           <span>今日完成项目:{profile.complete}</span>
                        </div>
                   </div>
                   <br />
                   <br />
                <TabControl>

                    <div name = "直约保" className={style.tableItem}>
                        <StraitEnsure {...this.props} lineClick={this.straitLineClick}/>
                    </div>
                    <div name = "到面保">
                        暂无
                    </div>
                    <div name = "入职保">
                        暂无
                    </div>
                </TabControl>
               </div>

                <div className={style.rightSide}>

                    <StraitDetail {...this.props}/>

                </div>

            </div>

        )

    }

}

module.exports = connect((state)=>{

    return {taskList:state.taskList}
})(TaskDetail);