/*
*
* */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';

import style from './singleSelect.css';

export default class SingleSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUlShow : false
        }
    }

    listDown =(e)=> {
        e.stopPropagation();
        this.setState({
            isUlShow : !this.state.isUlShow
        })
    }

    liPick =(value,e)=> {
        this.props.changEvent(value,e)
        e.stopPropagation()
        this.setState({
            isUlShow : false
        })
    }

    creatList =()=> {
            if(this.props.listData){
                 let lis = this.props.listData.map(function(item,index){
                     
                    return(
                        <li key={item} onClick={this.liPick.bind(this,item)}>{item}</li>
                    )
                 }.bind(this))
                 return lis
            }
    }
    
    _Blur =(e)=>{
        //失去焦点隐藏
        let currentTarget = e.currentTarget;
        let self = this;
        if (!currentTarget.contains(document.activeElement)) {
            self.setState({isUlShow:false})
        }
    }

    render() {
        return(
            <div className={style.single_Select} onClick={this.listDown} tabIndex="0" onBlur={this._Blur}>
                <span className={!this.props.defaultInfo?style.single_left_placeholder:style.single_left}>{this.props.defaultInfo||this.props.placeholder}</span>
                <span className={style.single_down}></span>
                <span className={style.icon_triangle} style={this.state.isUlShow?{diplay:'block'}:{display:'none'}}></span>
                <ul className={style.single_showData} style={this.state.isUlShow?{diplay:'block'}:{display:'none'}}>
                    {
                        this.creatList()
                    }
                </ul>
            </div>
        )
    }
}
SingleSelect.propTypes = {
    listData: React.PropTypes.array.isRequired
};