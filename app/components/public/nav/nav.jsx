/*系统引导库*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './nav.css';

export default class Nav extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            item: [
                    {
                        name: "Flashlights",
                        img: require('./imgs/u416.png'),
                        child: [

                            {name:"Rechargeable Flashlights"},
                            {name:"Battery Operated Flashlights"},
                            {name:"Plastic Flashlights"},
                        ],
                        childshow: false
                    },
                    {
                        name: "Headlights",
                        img: require('./imgs/u421.png'),
                        child: [
                            {name:"Aluminium Headlights"},
                            {name:"Plastic Headlights"},

                        ],
                        childshow: false
                    },
                    {
                        name: "Lanterns",
                        img: require('./imgs/u426.png'),
                        childshow: false,
                        child:
                            [
                                {
                                    name: "Rechargeable Lanterns",
                                },
                                {
                                    name: "Battery Operated Lanterns",
                                },

                            ]
                    },
                    {
                        name: "Spotlights",
                        img: require('./imgs/u431.png'),
                        child:
                            [
                                {
                                    name:"Rechargeable Spotlights"
                                },
                                {
                                    name:"Battery Operated Spotlights"
                                },

                        ],
                        childshow: false
                    },
                    {
                        name: "Bicycle Lights",
                        img: require('./imgs/u436.png'),
                        child: [

                            {
                                name:"Rechargeable Bicycle Lights"
                            },
                            {
                                name:"Battery Operated Bicycle Lights"
                            },
                        ],
                        childshow: false
                    },
                    {
                        name: "Work Lights",
                        img: require('./imgs/u441.png'),
                        child: [
                            {
                                name:"Rechargeable Work Lights"
                            },
                            {
                                name:"Battery Operated Work Lights"
                            },
                        ],
                        childshow: false
                    },
                    {
                        name: "Night Light",
                        img: require('./imgs/u441.png'),
                        child: [],
                        childshow: false
                    },
                    {
                        name: "Solar Lights",
                        img: require('./imgs/u441.png'),
                        child: [],
                        childshow: false
                    }
                ]
        }
    }

    clickFirstLi = (index, e) => {

        e.stopPropagation();

        let state = {...this.state}

        if (state.item[index].child.length == 0) {

            /*进行路由跳转*/
        } else {

            state.item[index].childshow = !state.item[index].childshow;
            this.setState(state)
        }
    }

    clickSecondLi = (index, ind, e) => {

        e.stopPropagation();

        browserHistory.push(this.state.item[index].child[ind].link)
    }

    secondUlShow = (index) => {

        let ret = {display: "none"};

        if (this.state.item[index].childshow == true) {

            return {display: "block"}
        }

        return ret;
    }


    render() {

        let thiz = this;
        return (

            <div className={style.container}>

                <ul>

                    <li className={style.navLogo}>
                        <img src={require('./imgs/logo.png')} className={style.logoCl}/>
                        <span>唐赛</span>
                    </li>
                    {
                        thiz.state.item.map(function (item, index) {

                            return (

                                <li className={style.firstLi} key={"item" + index}>
                                    <img src={item.img} className={style.navIcon}/>
                                    <span onClick={thiz.clickFirstLi.bind(thiz, index)}>{item.name}</span>
                                    {
                                        <ul className={style.secondUl} style={thiz.secondUlShow(index)}>
                                            {

                                                item.child.map(function (child, ind) {
                                                    return (

                                                        <li key={"child" + ind} className={style.secondLi}>
                                                            <span
                                                                onClick={thiz.clickSecondLi.bind(thiz, index, ind)}>{child.name}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    }
                                </li>
                            )
                        })
                    }

                </ul>

            </div>

        )

    }
}