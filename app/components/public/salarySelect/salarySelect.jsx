import React from "react"

import style from './salarySelect.css';

import Select from 'pubComp/select/select.jsx';


export default class SalarySelect extends React.Component {

    constructor(props){

        super(props);

        let ctyle = props.style?{...props.style}:{};

        var salary_from_list = [];

        for (var i = 1;i <= 50;i++){

            salary_from_list.push(i+'k')
        }

        for (var i = 60;i <= 100;i=i+10){

            salary_from_list.push(i+'k')

        }

        this.state = {

            style:ctyle,
            salary_from:props.value[0] || "",
            salary_to:props.value[1] || "",
            salary_from_list:salary_from_list
        }


    }

    componentWillReceiveProps(nextProps){

        var salary_from = nextProps.value[0] || "";
        var salary_to = nextProps.value[1] || "";

        this.setState({

            salary_from:salary_from,
            salary_to:salary_to
        })
    }

    calcSalaryTo = (val)=>{

        var salary_to = [];

        console.log(val);

        if (val == '' || val == undefined || val == null)
            return [];

        val = parseInt(val.replace('k',''));

        console.log(val)

        if (0< val <= 50){

            console.log(val+1)
            console.log(2*val)
            for (var i = val+1;i <=2*val;i++){

                salary_to.push(i+'k');
            }

            return salary_to;
        }else if (val>50 && val<100){

            for (var i = val+10;i <=100;i=i+10){

                salary_to.push(i+'k');
            }
            return salary_to;

        }else if (val == 100){

            return [150+'k']
        }

    }


    handleCallback = (val,ckey)=>{

        var salary = [];

        if (ckey == 'salary_from'){

            salary = [val,this.state.salary_to];

        }else{

            salary = [this.state.salary_from,val];

        }

        if (this.props.handle)
            this.props.handle(salary,this.props.ckey)

    }

    render(){

        var thiz = this;

        var salary_to_list = this.calcSalaryTo(this.state.salary_from);

        console.log(salary_to_list)

        return(

            <div className={style.container}>

                <Select  handle={thiz.handleCallback}
                         style={this.state.style} value={this.state.salary_from} child={this.state.salary_from_list} ckey={'salary_from'}/>
                <span> - </span>

                <Select  handle={thiz.handleCallback}
                        style={this.state.style} value={this.state.salary_to} child={salary_to_list} ckey={'salary_to'}/>
            </div>
        )

    }

}