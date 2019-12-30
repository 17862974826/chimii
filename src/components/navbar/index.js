import React, { Component }  from 'react'
import { getFontSize } from '../../util'
import { CSSTransition } from 'react-transition-group'
import '../../App.css'
import {
    withRouter
  } from "react-router-dom";
import axios from 'axios'
import Login from '../login'
import Search from '../../page/search/components/'
import ILike from '../iLike'
import Cart from '../../page/cart/components/'



class Navbar extends Component {

    constructor(props) {
        super(props)

        this.initStaticConfig()
        this.state = {
            bgColor: this.bgColor, 
            fontColor: this.fontColor,
            logo: this.logo,
            currentTab: null,
            clickTab: null,
            sign: null,
            show: false,
            navList:[],
            rightArea: [
                {
                    type: 'login',
                    title: 'Sign in',
                    icon: 'https://s2.ax1x.com/2019/11/22/M7LXY8.png'
                },
                {
                    type: 'search',
                    title: 'Search',
                    icon: 'https://s2.ax1x.com/2019/11/22/M7Om6J.png'
                },
                {
                    type: 'iLike',
                    title: 'iLike',
                    icon: 'https://s2.ax1x.com/2019/11/24/MOkWLR.png'
                },
                {
                    type: 'cart',
                    title: 'Cart',
                    icon: 'https://s2.ax1x.com/2019/11/24/MOk4dx.png'
                }
            ]
        }
    
    }

    initStaticConfig = () => {
        this.bgColor = '#fff'
        this.fontColor = '#000'
        this.logo = 'https://s2.ax1x.com/2019/12/04/Q1Y6IO.png'
        if(/detail/.test(window.location.href)) {
            this.bgColor = '#000'
            this.fontColor = '#fff'
            this.logo = 'https://s1.ax1x.com/2019/11/19/MRmKu4.png'
        }
    }


    componentWillReceiveProps(nextProps){
       this.initStaticConfig()
     
        this.setState({
            bgColor: this.bgColor ,
            fontColor: this.fontColor,
            logo: this.logo
        })
    }


    handleClickToCategory = (id, index) => {
        const { history } = this.props
        this.setState({
            clickTab: index
        }, () => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
            history.push(`/category/${id}`)
        })
    }

    handleJumuToPath  = type => {
       let url = ''
       switch(type) {
           case 'cart': 
           url = '/cart'
           break;
           default:
            break;
       }
       if(url) {
            document.body.scrollTop = document.documentElement.scrollTop = 0
           this.props.history.push(url)
       }
    }



    handleChangeNavigationStatus = (index, status) =>{
        const { navList = [] } =  this.state
        const _navList = navList.map((v,i) => {
            if(i === index) {
                return {
                    ...v,
                    showMask: status
                }
            }
            return {
                ...v,
                showMask: false
            }
        })

        this.setState({
            currentTab:  status ? index : null,
            navList: _navList
        })

    }


    componentDidMount(){
        axios.get('/index.php?c=api/chimi/nav').then(res => {
            const { data: { data } = {} } = res || {}
            const { navList = [] } = data || {}
            const _navList = navList.map(v => {
                return {
                    ...v,
                    showMask: false
                }
            })
            
            this.setState({
                navList: [..._navList, {
                    title: 'INFLUENCER',
                    isPath: true,
                    path: '/celebrity/all'
                }]
            })

        }).catch(e => console.error(e))
    }

    render() {
        const { navList = [], rightArea = [], bgColor, fontColor, logo, currentTab, clickTab } = this.state
        return (
            <div style={{
                height: 50,
                position: 'sticky',
                zIndex: 20,
                top: 0,
                left: 0,
                minHeight: 50,
                minWidth: 1440,
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: bgColor
            }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 60}} onClick={() => {
                  this.props.history.push('/')
                  
               }}>
                   <img src={logo} alt ='' style={{
                       width: 117,
                       height: 25,
                       objectFit: 'contain'
                   }}/>
               </div>
               <div style={{
                   height: '100%'
               }}>
                   <div style={{
                       margin: '0 auto',
                       height: '100%',
                       display: 'flex',
                   }}>
                       {
                           navList.map((value, i) => {
                               const { title, id, showMask, isPath, path,  items = [] } = value || {}
                               const isCurrntTab = currentTab === i
                               const isClick  = clickTab === i

                               if(isPath) {
                                   return (
                                    <div 
                                    onClick={() =>{
                                        const { history } = this.props
                                        this.setState({
                                            clickTab: i
                                        }, () => {
                                            document.body.scrollTop = document.documentElement.scrollTop = 0
                                            history.push(path)
                                        })
                                    }}
                                    style={{
                                        position: 'relative', 
                                        lineHeight: '50px',
                                        height: 50,
                                        color: fontColor,
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        fontFamily: 'Helvetica'
                                    }}>
                                        <p style={{
                                            color: isClick ? '#921C59': fontColor,
                                            fontSize: 12,
                                            height: 50,
                                            lineHeight: '55px',
                                            cursor: 'pointer',
                                        }}>{title}</p>
                                    </div>
                                   )
                               }


                               return (
                                <div onMouseEnter={e => {
                                    
                                    this.handleChangeNavigationStatus(i,true)
                                   }}
                                   onMouseLeave={e =>{
                                    this.handleChangeNavigationStatus(i,false)
                                   }}
                                   onClick={() =>{
                                       this.handleClickToCategory(id, i)
                                   }}
                                   key={`nav-${i}`} id={`tab${i}`} style={{
                                       lineHeight: '50px',
                                       height: 50,
                                       color: fontColor,
                                       fontSize: 12,
                                       fontWeight: 'bold',
                                       paddingLeft: 15,
                                       paddingRight: 15,
                                       fontFamily: 'Helvetica',
                                   }}>
                                       <div style={{position: 'relative'}}>
                                            <p style={{
                                                color: isClick ? '#921C59': fontColor,
                                                fontSize: 12,
                                                height: 50,
                                                lineHeight: '55px',
                                                cursor: 'pointer',
                                            }}>{title}</p>
                                            {
                                                isCurrntTab ? <div style={{height: 2, right: 0, background: '#000', position: 'absolute', bottom: 0, left: 0}}/> : null
                                            }
                                       </div>
                                       {
                                            showMask ? 
                                            <div 
                                            style={{
                                                position: 'absolute',
                                                top: 50,
                                                paddingTop: 51,
                                                left: 0,
                                                right: 0,
                                                minWidth: 1440,
                                                paddingBottom: 12,
                                                background: '#fff'
                                            }}>
                                                <div style={{
                                                    width: 1440,
                                                    paddingLeft: 24,
                                                    paddingRight: 24,
                                                    margin: '0 auto',
                                                    display: 'flex',
                                                    justifyContent: 'space-around'
                                                }}>
                                                    {
                                                        Array.isArray(items) ? items.map(value => {
                                                            const { title, list = [] } = value || {}
                                                            return (
                                                                <div>
                                                                    <p style={{
                                                                        fontSize: 12,
                                                                        lineHeight: '14px',
                                                                        color: '#333',
                                                                        fontFamily: 'Helvetica',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                    >{title}</p>
                                                                    <ul>
                                                                        {
                                                                           Array.isArray(list) ? list.map((value, i) => (<li key={`li-${i}`} style={{
                                                                               marginTop: 30,
                                                                               fontSize: 12,
                                                                               height: 24,
                                                                               lineHeight: '14px',
                                                                               color: '#333',
                                                                               width: 167,
                                                                               overflow: 'hidden',
                                                                               textOverflow: 'ellipsis'
                                                                           }}>{value.title}</li>))  : null
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }) : null
                                                    }
                                                </div>
                                            </div> : null
                                            
                                        }
                                </div>
                               )
                           })
                       }
                   </div>
                </div>
               <div  style={{display: 'flex'}} onMouseOver={e => {
                 
                   const id = e.target.id
                   const { history } = this.props
                   const { type } = rightArea[id] || {}

                   let Component = null

                   switch(type) {
                        case 'login':
                            Component = <Login history={history}/>;
                         break;
                        case 'search':
                            Component = <Search/>;
                        break;
                        case 'iLike':
                            Component = <ILike/>;
                        break;
                        case 'cart':
                            Component = <Cart/>;
                        break;
                        default:
                         break;
                   }


                   
                   const params = {
                    show: true
                   }

                   if(Component) {
                       params.Component = Component
                   }



                   this.setState({
                       ...params
                    })
                       
                   }} 
                   onMouseLeave={() => {
                    this.setState({
                        show: false
                    })
                }}>
                   <div style={{height: 50, display: 'flex', alignItems: 'center'}}>
                       {
                           rightArea.map((v, i) => {
                                const {  icon, type} =  v || {}
                                return (
                                    <div key={`rightArea-${i}`} id={i} style={{display: 'flex', cursor: 'pointer', marginRight: 30, height: 50, alignItems: 'center'}} onClick={() => {
                                        this.handleJumuToPath(type)
                                    }}>
                                        <img src={icon} alt="" style={{width: 20, height: 20 }} id={i}/>
                                    </div>
                                )
                           })
                       }
                   </div>
                   
                   <CSSTransition
                        in={this.state.show} // 如果this.state.show从false变为true，则动画入场，反之out出场
                        timeout={200} //动画执行1秒
                        classNames='star' //自定义的class名
                    >
                        <div className="star" >
                            {this.state.Component}
                        </div>
                </CSSTransition>
               </div>
            </div>
        )
    }

}

export default withRouter(Navbar)