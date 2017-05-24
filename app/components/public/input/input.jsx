/*
*
* 参数说明  1、style的所有参数（可选）
*         2、placeholder
*         3、value(可选)
*         4、handle：回调函数(可选)
*         5、ckey:必填 input组件的标示
*
* */


import React from "react"

import style from './input.css'


export default class Input extends React.Component {


        constructor(props){

            super(props);

            let ctyle = props.style?{...props.style}:{};

            this.state = {

                style:ctyle,
                placeholder:props.placeholder || "",
                value:props.value || "",
            }
        }

        componentWillReceiveProps(nextProps){

           let value = nextProps.value;

           this.setState({
               value:value

           })
        }

        setChange = (e)=>{

            e.stopPropagation();

            if (this.props.handle)
                this.props.handle(e.target.value,this.props.ckey)
        }

        getIconShow = ()=>{

            if (this.props.prev)

                return {display:'inline-block'}

            return {};
        }



/*
        onMouseHandle = (type)=>{

            let _style = {...this.state.style};

            if (type == 'enter'){

                _style.border = '1px solid #99CC00';

            }else{

                _style.border = '1px';
            }

            this.setState({style:_style})

        }*/

        render(){

            return (

                <div className={style.container} >

                    <input style={this.state.style} className={style.inputCl} placeholder={this.state.placeholder}
                           value={this.state.value} onChange={this.setChange.bind(this)}/>
                    <img src={require('./img/search.png')} style={this.getIconShow()} className={style.searchIcon}/>
                </div>

            )
        }

}