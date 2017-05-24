import React, {Component} from 'react';
import {Router, Route, Redirect, IndexRoute, hashHistory,browserHistory, Link} from 'react-router';

export default class Roots extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

      /*if(this.props.location.pathname == "/") {

          /!*老的用户复制本地存的邀请链接*!/
          if (location.href.indexOf("hid") != -1){

              let hid = location.href.split("hid=")[1];

              console.log(hid);

              hid = hid.substring(0,8);

              location.href =getCompanyLink()+"?hid="+hid;

          }else{
              /!*重定下到hr.html*!/
              location.href= getCompanyLink();

          }
        }*/

    }




    render() {
        return (
            <div >


                    {this.props.children}

            </div>
        )
    }
}

