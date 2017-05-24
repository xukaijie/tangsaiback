
import {GETSTRAIT,GETSTRAITDETAIL} from 'actionPath/taskAction.jsx';

import {DATAFORMATE} from 'cmPath/config.jsx';

import {dataFormat} from 'cmPath/common.jsx';

import {PAGESIZE} from 'cmPath/config.jsx';

const initialstate={

    strait:{current:1,maxpage:5,data:[]},

    straitDetail:{

        taskinfo:{
            taskType:"直约保",
            find_job_num:"",
            total_num:"",
            start_time:"",
            service_id:"",
            order_user_id:"",
            job_id:"",
            receiveTag:false,
        },

        hrinfo:{

            company_contact:"",  /* contact*/
            company_location:"",/* company_area_txt*/
            company_position:"",/* position*/
            company_industry:"",/* company_industry*/
            company_phone:"", /*phone*/
            company_name:"", /*company_name*/
            company_email:"",/*email*/

        },

        jobinfo:{

            job_company:"",/*company_name*/
            job_company_checked:"", /*job_company_name*/
            job_name:"",  /*name*/
            job_name_checked:"",/*job_name*/
            job_degree:"",/*degree_from*/
            job_degree_checked:"", /*degree_from*/
            job_exp:"",/*work_year*/
            job_exp_checked:'',/*work_year*/
            job_salary:"",/*salary_from  salary_to*/
            job_salary_checked:"",/*salary_from  salary_to**/
            job_type:"", /*term*/
            job_type_checked:"", /*term*/
            job_location:"",/*area_txt  address*/
            job_location_checked:"",/*area_txt  address*/
            job_duty:"",/*info*/
            job_require:"", /*info*/
            job_pefrence:"",
            job_pefrence_checked:"",

        }



    },
    profile:{
       total:123,
        pending:80,
        complete:30
    },


}

export default function taskList(state= initialstate, action) {

    switch (action.type) {

        case GETSTRAIT:

            var data = action.data;

            var _strait = {...state.strait};

            _strait.current = data[2];
            _strait.maxpage = data[3];

            _strait.data = [];

            for (var i = 0;i < data[1].length;i++){

                var _data = data[1][i];

                _strait.data.push({
                    number:(i+1)+((parseInt(_strait.current)-1)*PAGESIZE),
                    position:_data.name || "",
                    ctime:_data.ctime?dataFormat(DATAFORMATE,_data.ctime):"",
                    confirm:_data.find_job_num +"/"+_data.total_num,
                    job_id:_data.job_id,
                    service_id:_data.service_id,
                    order_user_id:_data.user_id,
                })
            }

            return {

                ...state,
                strait:_strait
            }



        case GETSTRAITDETAIL:

            var straitDetail = {...state.straitDetail};

            var data = action.data[1];

            var taskinfo = data.service_info;
            var hrinfo = data.hr_info;
            var job_details = data.job_details;
            var job_note = data.job_note;

            /*####################基本信息###################################*/

            straitDetail.taskinfo.start_time = taskinfo.start_time?dataFormat(DATAFORMATE,taskinfo.start_time):"";
            straitDetail.taskinfo.end_time = taskinfo.start_time?dataFormat(DATAFORMATE,taskinfo.start_time+86400):"";


            straitDetail.taskinfo.find_job_num = taskinfo.find_job_num;
            straitDetail.taskinfo.total_num = taskinfo.total_num;

            straitDetail.taskinfo.receiveTag = taskinfo.receive == 0?false:true; /*0代表未领取任务*/

            straitDetail.taskinfo.service_id = action.service_id;
            straitDetail.taskinfo.order_user_id = action.order_user_id;
            straitDetail.taskinfo.job_id = action.job_id;


            /*####################hr信息####################################*/

            straitDetail.hrinfo.company_contact = hrinfo.contact || "";
            straitDetail.hrinfo.company_location = hrinfo.company_area_txt ||"";
            straitDetail.hrinfo.company_position = hrinfo.position || "";
            straitDetail.hrinfo.company_industry = hrinfo.company_industry || "";
            straitDetail.hrinfo.company_phone = hrinfo.phone || "";
            straitDetail.hrinfo.company_name = hrinfo.company_name ||"";
            straitDetail.hrinfo.company_email = hrinfo.email || "";


            /*#######################岗位信息##################################*/

            straitDetail.jobinfo.job_company = job_details.company_name || "";
            straitDetail.jobinfo.job_company_checked = job_note.company_name || "";

            straitDetail.jobinfo.job_name = job_details.job_name || "";
            straitDetail.jobinfo.job_name_checked = job_note.job_name || "";

            straitDetail.jobinfo.job_degree = job_details.degree_from || "";
            straitDetail.jobinfo.job_degree_checked = job_note.degree_from || "";

            straitDetail.jobinfo.job_exp = job_details.work_year || "";
            straitDetail.jobinfo.job_exp_checked = job_note.work_year || "";

            straitDetail.jobinfo.job_type = job_details.term || "";
            straitDetail.jobinfo.job_type_checked = job_note.term || "";

            straitDetail.jobinfo.job_location = (job_details.area|| "") + (job_details.address || "");
            straitDetail.jobinfo.job_location_checked = (job_note.address|| "");

            straitDetail.jobinfo.job_salary = (job_details.salary_from|| "") + "-"+(job_details.salary_to || "");

            straitDetail.jobinfo.job_salary_checked = (job_note.salary_from|| "") + "-"+(job_note.salary_to || "");


            /*########################偏好#######################################*/

            straitDetail.jobinfo.job_pefrence = job_details.preference || "";
            straitDetail.jobinfo.job_pefrence_checked = job_note.preference || "";



            var str1 = "";
            var str2 = "";

            if (job_details.info.indexOf("岗位职责") != -1){

                var pos1 = job_details.info.indexOf("岗位要求");

                str1 = job_details.info.substring(5,pos1);

            }

            if (job_details.info.split("岗位要求:")&&job_details.info.split("岗位要求:")[1]){

                 str2 = job_details.info.split("岗位要求:")[1];
            }

            straitDetail.jobinfo.job_duty =str1;
            straitDetail.jobinfo.job_require =str2;



            return {

                ...state,
                straitDetail:straitDetail,

            }


        default:
            return state
    }
}



