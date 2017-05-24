/*
 *
 * 参数说明  1、ckey:必填
 *          2、handle：必填
 * */


import React from "react"

import style from './location.css'

import {getProArray,getCityArray,getAreaArray} from 'cmPath/common.jsx';

export default class Location extends React.Component {

        constructor(props){

            super(props);

            this.state={

                globalcity:"",
                provinceList:[],
                currentProv:"",
                cityList:[],
                currentCity:"",
                areaList:[]
            }
        }

        componentDidMount(){

            fetch('/static_c/json/address.json')
                .then((res) => {return res.json(); })
                .then((data) => { this.setState({globalcity:data,provinceList:getProArray(data)})})
                .catch((e) => { console.log(e.message);});
        }

        getCityList = (prov)=>{

             let citylist = getCityArray(prov,this.state.globalcity);

             this.setState({

                 cityList:citylist,
                 currentProv:prov
             })

        }


        getAreaList = (city)=>{

            let areaList = getAreaArray(this.state.currentProv,city,this.state.globalcity);

            this.setState({

                areaList:areaList,
                currentCity:city
            })

        }

        getMouseEnter = (val,key)=>{

            return val == this.state[key]?{cursor:"pointer",color:"#99CC00"}:{}
        }

        selectCity = (city)=>{

            if (this.props.handle){

                this.props.handle([this.state.currentProv,city,""],this.props.ckey)
            }
        }


        selectArea = (area)=>{

            if (this.props.handle){

                this.props.handle([this.state.currentProv,this.state.currentCity,area],this.props.ckey)
            }
        }

        render(){

            let thiz = this;

            return (

                <div className={style.container}>

                    <div className={style.provCon}>
                        <ul>
                            {

                                this.state.provinceList.map(function(prov,index){

                                    return <li key={'prov'+index} style={thiz.getMouseEnter(prov,'currentProv')}
                                               onMouseEnter={thiz.getCityList.bind(thiz,prov)}>{prov}</li>
                                })
                            }

                        </ul>
                    </div>

                    <div className={style.cityCon}>
                        <ul>
                        {
                            this.state.cityList.map(function(city,index){

                                return <li key={'city'+index} className={style.cityCl}  style={thiz.getMouseEnter(city,'currentCity')}
                                           onMouseEnter={thiz.getAreaList.bind(thiz,city)}
                                           onClick={thiz.selectCity.bind(thiz,city)} >{city}</li>
                            })

                        }
                        </ul>

                    </div>

                    <div className={style.areaCon}>
                        <ul>
                            {
                                this.state.areaList.map(function(area,index){

                                    return <li key={'area'+index} className={style.areaCl} onClick={thiz.selectArea.bind(thiz,area)}>{area}</li>
                                })

                            }
                        </ul>

                    </div>

                </div>

            )

        }

}