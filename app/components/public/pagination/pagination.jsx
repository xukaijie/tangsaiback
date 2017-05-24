
/*
* 描述：分页组件
* 参数：nMaxPage.number.isrequired 最大页数
*       nCurrentPage.number.isrequired, 当前页
*       fPageHandle.func.isrequired 选择页数的回调函数 传入选择页数的值
*
*例子：<Pagination nCurrentPage={5} nMaxPage={10} fPageHandle={(num)=>{
        console.log(num)
        }}/>
* */


/*系统的安装包*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './pagination.css';

import {uuid} from 'cmPath/common.jsx';

let nPrevSpace = 2;
let nEndSpace = 0;

export default class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            nMaxPage:this.props.nMaxPage,
            nCurrentPage:this.props.nCurrentPage,

        }

        this.fOnSelectPage = this.fOnSelectPage.bind(this);
        this.fByPassPage = this.fByPassPage.bind(this);
    }


    componentWillReceiveProps(nextProps){

        this.setState({

            nMaxPage:nextProps.nMaxPage,
            nCurrentPage:nextProps.nCurrentPage,
        })
    }

    fOnSelectPage = (nPageNum,e)=>{

        var {fPageHandle} = this.props;

        e.stopPropagation();

        nPageNum = parseInt(nPageNum);

        if (isNaN(nPageNum)) {
            return ;
        }

        if (nPageNum > this.state.nMaxPage || nPageNum < 1){

            return;
        }

        this.setState({

            nCurrentPage:nPageNum
        })

        fPageHandle(nPageNum);
    }

    fByPassPage = (sIndex,nPage,e)=>{

        let nPageNum = 1;

        if (sIndex == "prev"){

            nPageNum = parseInt((1+nPage)/2);

        }else if (sIndex == "last"){

            nPageNum = parseInt((this.state.nMaxPage+nPage)/2);
        }

        this.fOnSelectPage(nPageNum,e);
        return;
    }


    fChangePage = (e)=>{

        let npage = e.target.value;

        if (npage == "" || npage == null || npage == undefined) {

            return;
        }

        this.fOnSelectPage(npage,e);

        return;
    }

    render() {

        let thiz = this;

        let aFirstPage = this.state.nCurrentPage == 1?[<span className={style.common} key={uuid()} style={{backgroundColor:"rgb(174, 230, 63)"}} onClick = {thiz.fOnSelectPage.bind(thiz,1)}>1</span>]:[<span className={style.common} onClick = {thiz.fOnSelectPage.bind(thiz,1)}>1</span>];

        let aStartbypass = [];

        let aMdidllePage = [];

        let aEndbypass = [];

        if (this.state.nCurrentPage-nPrevSpace>2){

            aStartbypass.push(<psan key={uuid()} className={style.common} onClick = {thiz.fByPassPage.bind(thiz,"prev",thiz.state.nCurrentPage-nPrevSpace)}>...</psan>)
        }

        if (this.state.nCurrentPage+nEndSpace<this.state.nMaxPage){

            aEndbypass.push(<psan key={uuid()} className={style.common} onClick = {thiz.fByPassPage.bind(thiz,"last",thiz.state.nCurrentPage+nEndSpace)}>...</psan>)
        }

        let nStart = aStartbypass.length > 0?(this.state.nCurrentPage-nPrevSpace):2;

        let nEnd = aEndbypass.length > 0?(this.state.nCurrentPage+nEndSpace):this.state.nMaxPage;

        for (let i = nStart;i<=nEnd;i++){

            if (i == this.state.nCurrentPage){

                aMdidllePage.push(<psan key={uuid()} className={style.common} style={{backgroundColor:"rgb(174, 230, 63)"}}>{i}</psan>)
            }else{

                aMdidllePage.push(<psan key={uuid()} className={style.common} onClick = {thiz.fOnSelectPage.bind(thiz,i)}>{i}</psan>)
            }
        }

        let aTotalArray = aFirstPage.concat(aStartbypass).concat(aMdidllePage).concat(aEndbypass);

       return (

           <div id={style.pagination}>

               <span id={style.prevPage} onClick = {thiz.fOnSelectPage.bind(thiz,this.state.nCurrentPage-1)}>上一页</span>

               {aTotalArray}

               <span id={style.nextPage} onClick = {thiz.fOnSelectPage.bind(thiz,this.state.nCurrentPage+1)}>下一页</span>


               <span id={style.allpage}>共{this.state.nMaxPage}页</span>

               <span>到</span>
               <input id={style.numpage} onChange={this.fChangePage.bind(this)}></input>
               <span>页</span>
           </div>
       )
    }


}


/*Pagination.propTypes = {
    nCurrentPage:React.PropTypes.number.isRequired,
    nMaxPage:React.PropTypes.number.isRequired,
    fPageHandle:React.PropTypes.func.isRequired,
}*/

