import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect ,hashHistory,browserHistory} from 'react-router';

import style from "./table.css";

export default class Table extends React.Component{

    constructor(props){
        super(props);

        var checked = [];
        var allChecked = true;

        if (props.prev) {
            for (var i = 0; i < props.source.length; i++) {

                if (props.source[i].checked == true)
                    checked.push(true);
                else {
                    checked.push(false);
                    allChecked = false;
                }
            }

            if (allChecked == true)
                checked.push(true);/*为了头部的选择*/
            else
                checked.push(false);
            /*为了头部的选择*/
        }

        this.state = {
            selected: props.selected || -1,
            checked:checked,

        }

    }

    componentWillReceiveProps(nextProps){


        var checked = [];
        var allChecked = true;


        if (this.props.prev) {
            for (var i = 0; i < nextProps.source.length; i++) {

                if (nextProps.source[i].checked == true)
                    checked.push(true);
                else {
                    checked.push(false);
                    allChecked = false;
                }
            }

            if (allChecked == true)
                checked.push(true);/*为了头部的选择*/
            else
                checked.push(false);
            /*为了头部的选择*/
        }

        this.setState({
            checked:checked,
        })
    }


    clickLine = (para,index,e)=>{

        e.stopPropagation();

        this.setState({

            selected:index
        })

        if (this.props.lineClick){

            this.props.lineClick(para)
        }
    }

    getSelectedLine = (index)=>{

        return index == this.state.selected?{backgroundColor:"#cccccc"}:{}


    }

    clickCheck = (index,e)=>{

        e.stopPropagation();


        if (this.props.checkedHandle){

            this.props.checkedHandle(e.target.checked,index)


        }


    }

    render(){

        const thiz = this;
        //console.log(thiz.state.checked)
        function uuid() {
            return Math.random().toString(36).substring(3,8)
        }

        let srcLen = thiz.props.source.length;


        return(
            <div className={style.container}>

                <table className={style.table}>
                    <thead>
                    <tr>
                        {

                            ['b'].map(function(check,index){

                                if (thiz.props.prev){

                                    return <td><input type="checkbox"  onChange={thiz.clickCheck.bind(thiz,srcLen)} checked={thiz.state.checked[srcLen]}/></td>
                                }
                            })
                        }
                        {
                            this.props.columns.map(function(item){

                                return <td key={item.key}>{item.title}</td>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>

                    {

                        thiz.props.source.map(function (item,index) {

                            var array = [];

                            if (thiz.props.prev){

                                array.push(<td><input type="checkbox" onChange={thiz.clickCheck.bind(thiz,index)} checked={thiz.state.checked[index]}/></td>)
                            }

                            for (var i =0;i < thiz.props.columns.length;i++){

                                for(var key in item){

                                    if (key == thiz.props.columns[i].key){

                                        if (thiz.props.columns[i].render){

                                            array.push(<td key={uuid()}>{thiz.props.columns[i].render(item[key],index)}</td>)

                                        }else{
                                            array.push(<td key={uuid()} onClick={thiz.clickLine.bind(thiz,item,index)}>{item[key]}</td>)

                                        }
                                    }
                                }
                            }

                            return <tr key={uuid()} style={thiz.getSelectedLine(index)}>{array}</tr>
                        })

                    }

                    </tbody>
                </table>


            </div>
        )

    }

}
