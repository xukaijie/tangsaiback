import React from "react"
import style from "./tabControl.css"

class TabControl extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentIndex : 0
        }
    }

    check_title_index( index ){
        return index === this.state.currentIndex ? {backgroundColor:"#ffffff",color:"rgb(174, 230, 63)"} : {}
    }

    check_item_index( index ){
        return index === this.state.currentIndex ? {display:"block"} : {display:"none"}
    }

    tabNavClick = (index)=>{
        this.setState({ currentIndex : index })
        this.props.children[index].props.onClick? this.props.children[index].props.onClick():''
    }

    render(  ){
        let _this = this
        return(
            <div>
                { /* 动态生成Tab导航 */ }
                <div className={style.tab_title_wrap}>
                    {
                        React.Children.map( this.props.children , ( element,index ) => {

                            return(
                                <div onClick={ (  ) => { _this.tabNavClick(index) } }
                                     className={style.tab_title} style = {this.check_title_index(index)}>{ element.props.name }</div>
                            )
                        })
                    }
                </div>
                { /* Tab内容区域 */ }
                <div className="tab_item_wrap">
                    {
                        React.Children.map(this.props.children,( element,index )=>{
                            return(
                                <div style = {this.check_item_index(index)}>{ element }</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TabControl