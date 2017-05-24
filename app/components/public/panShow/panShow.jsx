import React from "react"
import style from "./panShow.css"

class PanShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {

            compstyle:{

                width:this.props.width ||'100px',
                height:this.props.height || '30px',
                lineHeight:this.props.height || '30px'
            }
        }

    }

    render(){

        let _this = this;
        return(
            <div className={style.container} style={this.state.compstyle}>
               <span className={style.title}>{this.props.title}:</span><span className={style.content}>{this.props.content}</span>
            </div>
        )
    }
}

export default PanShow