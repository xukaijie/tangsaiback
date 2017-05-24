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

            setTimeout(function () {
                this.setState({
                    show:{display:'none'}
                })
            }.bind(this), 3000)
        }
    }

    render() {
        return(
            <h1 className={style.sucmodal} style={this.state.show}>{this.props.value}</h1>
        )
    }
}

