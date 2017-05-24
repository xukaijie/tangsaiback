import React from 'react';
import ReactDOM from 'react-dom';

import style from './modal.css'
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            show:{display:"none"}
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.show == true){
            this.setState({
                show:{display:'block'}
            });
        }
    }

    onClickBtn = (e)=>{

        e.stopPropagation();

        this.setState({
            show:{display:'none'}
        });
    }

    render() {
        return(
            <div className={style.tipmodal}  style={this.state.show}>

                <h1 >{this.props.value}</h1>

                <input type="button" className={style.btn} onClick={this.onClickBtn.bind(this)}/>

            </div>
        )
    }
}

