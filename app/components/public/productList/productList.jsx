
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
            feature:[{value:""},{value:""},{value:""},{value:""}],
            specials:[{value:""},{value:""},{value:""},{value:""},{value:""},{value:""}],
            deleteName:"",

            subfiles:[]
        }
    }



    componentDidMount(){

  /*      var {dispatch,productList} = this.props;

        var root = productList.rootName.replace(" ","");

        var parent = productList.parentName.replace(" ","");

        var currentpage = productList.currentPage;


        dispatch(getproductlist(root,parent,currentpage))*/
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


    handleSubChange(event,index) {
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

        var _state = {...this.state};

        _state.subfiles[index] = files;

        this.setState(_state)
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

    _renderSubPreview(index){

        var thiz = this;
        if (this.state.subfiles[index]) {
           return <div>
                <img src={thiz.state.subfiles[index][0].thumb}/>
            </div>

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

        var sp = this.state.specials;
        var spArray = [];
        for (var i = 0;i<sp.length;i++){

            if (sp[i].value != ''){

                spArray.push(sp[i].value);
            }
        }

        var spstring = ''
        for (var i = 0;i < spArray.length;i++){

            spstring+=spArray[i];

            if (i != spArray.length-1)
                spstring+="_";
        }

        form.append('special',spstring);

        form.append("filedata", this.state.files[0]);


        var subfile_num = 0;
        for (var i = 0;i < this.state.subfiles.length;i++){

            if (this.state.subfiles[i]){

                form.append("filedata"+(i+1), this.state.subfiles[i][0]);
                subfile_num++;
            }
        }


        form.append("subfile_num", subfile_num);


        xhr.send(form);




      /*  var url2 = HOST+"uploadsub";



        for (var i = 0;i < this.state.subfiles.length;i++){

            if (this.state.subfiles[i]){

                var  xhr2= new XMLHttpRequest()

                // 开始上传
                xhr2.open("POST", url2, true)

                var  form2 = new FormData();
                form2.append("filedata", this.state.subfiles[i][0]);
                form2.append('root',root);

                form2.append('parent',parent);

                form2.append('name',name);
                xhr2.send(form2);

            }
        }*/


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


    changeSp = (index,e)=>{

        e.stopPropagation();

        var _state = {...this.state};

        _state.specials[index].value = e.target.value;

        this.setState(_state);


    }

    setValue = (key,e)=>{

        e.stopPropagation();

        var _state = {...this.state};

        _state[key] = e.target.value;

        this.setState(_state)

    }


    deleteProd = (e)=>{
        e.stopPropagation();


        var url = HOST+'delete';

        var info = this.props.productList;

        var root = info.rootName

        var body = {

            name:this.state.deleteName,
            root:root
        }

        return fetch(url,{
            method: "post",
            "Content-Type": "application/json",
            body: JSON.stringify(body)

        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json.err == 0){

                            alert('删除成功')
                        }else{

                            alert('删除失败')

                        }

                    })
                } else {

                }
            })
            .catch(error => console.log(error))
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

                        </form>

                        <form  method="post" encType="multipart/form-data">

                            <input
                                type="file"
                                onChange={(v)=>this.handleSubChange(v,0)}
                                name="fileSelect"
                                accept="image/*"
                                multiple={false} />


                            <div  className={style.imgShow}>
                                {this._renderSubPreview(0)}
                            </div>

                            {/*<div className={this.state.files.length?
                             "upload-submit":"upload-submit ry-hidden"}>
                             <button type="button"
                             onClick={()=>this.handleUpload()}
                             class="upload-submit-btn">确认上传图片</button>
                             </div>
                             <div className="upload-info">{this._renderUploadInfos()}</div>*/}

                        </form>

                        <form  method="post" encType="multipart/form-data">

                            <input
                                type="file"
                                onChange={(v)=>this.handleSubChange(v,1)}
                                name="fileSelect"
                                accept="image/*"
                                multiple={false} />


                            <div  className={style.imgShow}>
                                {this._renderSubPreview(1)}
                            </div>

                            {/*<div className={this.state.files.length?
                             "upload-submit":"upload-submit ry-hidden"}>
                             <button type="button"
                             onClick={()=>this.handleUpload()}
                             class="upload-submit-btn">确认上传图片</button>
                             </div>
                             <div className="upload-info">{this._renderUploadInfos()}</div>*/}

                        </form>

                        <form  method="post" encType="multipart/form-data">

                            <input
                                type="file"
                                onChange={(v)=>this.handleSubChange(v,2)}
                                name="fileSelect"
                                accept="image/*"
                                multiple={false} />


                            <div  className={style.imgShow}>
                                {this._renderSubPreview(2)}
                            </div>

                            {/*<div className={this.state.files.length?
                             "upload-submit":"upload-submit ry-hidden"}>
                             <button type="button"
                             onClick={()=>this.handleUpload()}
                             class="upload-submit-btn">确认上传图片</button>
                             </div>
                             <div className="upload-info">{this._renderUploadInfos()}</div>*/}

                        </form>

                        <form  method="post" encType="multipart/form-data">

                            <input
                                type="file"
                                onChange={(v)=>this.handleSubChange(v,3)}
                                name="fileSelect"
                                accept="image/*"
                                multiple={false} />


                            <div  className={style.imgShow}>
                                {this._renderSubPreview(3)}
                            </div>

                            {/*<div className={this.state.files.length?
                             "upload-submit":"upload-submit ry-hidden"}>
                             <button type="button"
                             onClick={()=>this.handleUpload()}
                             class="upload-submit-btn">确认上传图片</button>
                             </div>
                             <div className="upload-info">{this._renderUploadInfos()}</div>*/}

                        </form>


                        <div>

                            <input type="button" className={style.submitBtn} value="提交" onClick={this.subBtn.bind(this)}/>
                        </div>

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

                        <div>

                            <span>产品规格：</span>
                            {

                                this.state.specials.map(function(sp,index){


                                    return <input value={sp.value} className={style.ftcon} onChange={thiz.changeSp.bind(thiz,index)}/>
                                })
                            }

                        </div>

                    </div>

                </div>


                <div>
                    <h1>删除产品</h1>

                    <span>产品名称</span>
                    <input value={this.state.deleteName} onChange={this.setValue.bind(this,'deleteName')} style={{width:"300px",height:"30px"}}/>

                    <input value="确定" type="button" className={style.delBtn} onClick={this.deleteProd.bind(thiz)}/>

                </div>


            </div>

        )

    }

}
