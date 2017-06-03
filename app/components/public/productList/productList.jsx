
/*系统引导库*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './productList.css';

import {HOST} from 'cmPath/config.jsx';

import {getproductlist} from 'actionPath/productAction.jsx'

export default class ProductList extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            files:[],
            name:"",

            productList:[],
            descp:"",
            feature:[{value:""},{value:""},{value:""},{value:""}]
        }
    }



    componentDidMount(){

        var {dispatch,productList} = this.props;

        var root = productList.rootName.replace(" ","");

        var parent = productList.parentName.replace(" ","");

        var currentpage = productList.currentPage;


        dispatch(getproductlist(root,parent,currentpage))
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

            name:e.target.value
        })
    }




    _upload(){

        var info = this.props.productList;

        var root = info.rootName

        var parent = info.parentName
        var name = this.state.name

        var url = HOST+"upload";


        let xhr = new XMLHttpRequest()

        // 开始上传
        xhr.open("POST", url, true)
        let form = new FormData();

        form.append('root',root);

        form.append('parent',parent);

        form.append('name',name);
        form.append('descp',this.state.descp);

        var ft = this.state.feature;
        var ftArray = [];
        for (var i = 0;i<ft.length;i++){

            if (ft[i].value != ''){

                ftArray.push(ft[i].value);
            }
        }

        var ftstring = ''
        for (var i = 0;i < ftArray.length;i++){

            ftstring+=ftArray[i];

            if (i != ftArray.length-1)
                ftstring+="_";
        }

        form.append('feature',ftstring);

        form.append("filedata", this.state.files[0]);

        console.log(form)

        xhr.send(form);

        alert("提交成功")
}

    subBtn = (e)=>{

        e.stopPropagation();

        if (this.state.name == ''){

            alert("请填写产品名称");
            return;
        }

        if (this.state.files.length == 0){

            alert("请上传产品图片");
            return;
        }


        if (this.state.descp == ''){

            alert("请添加产品描述");
            return;
        }



        this._upload();
    }


    addSescript = (e)=>{

        e.stopPropagation();

        this.setState({

            descp:e.target.value
        })
    }

    changeFt = (index,e)=>{

        e.stopPropagation();

        var _state = {...this.state};

        _state.feature[index].value = e.target.value;

        this.setState(_state);


    }

    render(){

        var info = this.props.productList;

        var thiz = this;
        return (

            <div className={style.container}>

                <div>

                    <span>{info.rootName}</span>
                    <span>-></span>
                    <span>{info.parentName}</span>
                </div>


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
                            <div>

                                <input type="button" className={style.submitBtn} value="提交" onClick={this.subBtn.bind(this)}/>
                            </div>

                        </form>
                    </div>

                    <div className={style.prodName}>
                    <div>
                        <span>名称名称:</span>
                        <input className={style.nameInput} value={this.state.name} onChange={this.setName.bind(this)}/>
                    </div>

                        <div>
                            <span>产品描述：</span>

                            <textarea value={this.state.descp} className={style.descCon} onChange={this.addSescript.bind(this)}></textarea>

                        </div>

                        <div>

                            <span>产品特性：</span>
                            {

                                this.state.feature.map(function(ft,index){


                                    return <input value={ft.value} className={style.ftcon} onChange={thiz.changeFt.bind(thiz,index)}/>
                                })
                            }

                        </div>

                    </div>

                </div>


            </div>

        )

    }

}
