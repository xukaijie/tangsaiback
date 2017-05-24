import React from "react"

import style from './select.css';


export default class Select extends React.Component {

    constructor(props){

       super(props);

        let ctyle = props.style?{...props.style}:{};

       this.state = {

           style:ctyle,
           value:this.props.value || "",
           childShow:false
       }

    }

    componentWillReceiveProps(nextProps){

        let value = nextProps.value || "";

        this.setState({
            value:value

        })
    }


    selectItem = (val,e)=>{

        e.stopPropagation();

        if (this.props.handle){

            this.props.handle(val,this.props.ckey)
        }

        this.setState({

            childShow:false
        })
    }


    getChildShow = ()=>{

        return this.state.childShow == true?{display:'block'}:{}
    }

    selectChild = ()=>{

        this.setState({

            childShow:!this.state.childShow
        })
    }

    getChild = ()=>{

        let thiz = this

        if (! this.props.child)
            return;

        if (typeof this.props.child == 'function'){

            return this.props.child()
        }else{

            return (

                <ul className={style.childCl}>
                    {
                        this.props.child.map(function (item, index){


                            return <li key={"pubsel"+index} className={style.itemLi} onClick={thiz.selectItem.bind(thiz,item)}>{item}</li>
                        })
                    }

                </ul>
            )
        }
    }

    render(){

        return(

            <div className={style.container}>

                <div className={style.contentCl} style={this.state.style} onClick={this.selectChild.bind(this)}>

                    {this.props.value}
                    <img src={require('./img/down.png')} className={style.downIcon}/>

                    <div className={style.childCon} style={this.getChildShow()}>
                    {
                        this.getChild()

                    }
                    </div>

                </div>
            </div>
        )

    }

}