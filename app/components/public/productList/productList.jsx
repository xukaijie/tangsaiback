
/*系统引导库*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './productList.css';

export default class ProductList extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            files:[],
            name:""
        }
    }

    handleChange(event) {
        event.preventDefault()
        let target = event.target
        let files = target.files
        let count = this.state.multiple ? files.length : 1
        for (let i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i])
        }
        // convert to array
        files = Array.prototype.slice.call(files, 0)
        files = files.filter(function (file) {
            return /image/i.test(file.type)
        })

        this.setState({files: files})
    }

    _renderPreview() {
        if (this.state.files.length != 0) {
            return this.state.files.map((item, idx) => {
                return (
                    <div>
                        <img src={item.thumb}/>
                    </div>
                )
            })
        } else {
            return null;
        }
    }

    setName = (e)=>{

        e.stopPropagation();

        this.setState({

            nam
        })
    }


    render(){

        return (

            <div className={style.container}>

                <div className={style.upLoadCon}>

                    <br />
                    <p style={{fontSize:"20px"}}>增加你的产品</p>

                    <br />

                    <div className={style.imgForm}>
                        <form  method="post" encType="multipart/form-data">

                                        <input
                                            type="file"
                                            onChange={(v)=>this.handleChange(v)}
                                            name="fileSelect"
                                            accept="image/*"
                                            multiple={false} />


                                    <div  className={style.imgShow}>
                                        {this._renderPreview()}
                                    </div>

                                {/*<div className={this.state.files.length?
                                    "upload-submit":"upload-submit ry-hidden"}>
                                    <button type="button"
                                            onClick={()=>this.handleUpload()}
                                            class="upload-submit-btn">确认上传图片</button>
                                </div>
                                <div className="upload-info">{this._renderUploadInfos()}</div>*/}

                        </form>
                    </div>

                    <div className={style.prodName}>

                        <span>名称:</span>
                        <input className={style.nameInput} value={this.state.name} onChange={this.setName.bind(this)}/>
                    </div>

                </div>

                <div>

                    <input type="button" className={style.submitBtn} value="提交"/>
                </div>

            </div>

        )

    }

}
