import React from 'react'

import {
    withRouter
    } from "react-router-dom";

import Item from '../../components/commonCell'
import axios from 'axios'

import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'

    
const styles = {
    wrap: {
        width: 1300,
        minWidth: 1300,
        margin: '0 auto',
        paddingBottom: 180
    },
    banner:{
        height: 300,
        width: 1050,
        minHeight: 300,
        minWidth: 1050,
        objectFit: 'cover'
        },
    content: {
        display: 'flex',
        minWidth: 1300,
        width: 1300,
        overflow: 'scroll'
    },
    tabInfo: {
        width: 250,
        marginRight: 40,
        paddingTop: 90,
    },
    tabINfoFixed: {
        position: 'fixed',
        flex: 1,
        width: 150,
        transition: 'transform 0.3s ease 0s',
        overflow: 'hidden',
        top: 0,
        zIndex: 90,
        paddingTop: 90,
        backgroundColor: '#fff'
    },
    contentInfo: {
        paddingTop: 90,
        flex: 1,
        width: 1050,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent:'flex-start'
    }
}

class Category extends React.Component {

    constructor(props){
        super(props)
        this.sum = 0
        this.state = {
            banner: [],
            isFixed: false,
            tabs: [],
            finished: false,
            content: []
        }
        this.idList = {}
        this.isSelect = false
        
    }

    handleScroll = e => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        const  isFinish = scrollTop >  this.distance  + 300

        const { finished } = this.state 
        
        if(finished !== isFinish) {
          
            this.setState({
                finished: isFinish
            })
        }


        
       
        if(!this.state.isFixed && (scrollTop > this.scrollTop - 90)) {
           
            this.setState({
                isFixed: true,
                finished
            })
            return 
        } 

        if(this.state.isFixed && (scrollTop < this.scrollTop - 90)) {

            this.setState({
                isFixed: false,
                finished
            })
            return 
        }

        
    }

    getData = () => {
        let id =Object.keys(this.idList).reduce((prev, next) => {
           if(this.idList[next]) {
            return prev + `${next},`
           }
           return prev
        }, '')


        if(!id) {
            id =  this.cateId
        }


       
        axios.get(`/index.php?c=api/chimi/tags&id=${id}`).then(res => {
            const { data: { data } = {} } = res || {}
            const {  content} = data || {}
           
            
            if(Array.isArray(content) && content.length) {
                 this.setState({
                     content
                 })
            } else {
                alert('请求失败，没有数据')
            }
         }).catch(error => { 
            alert('网络错误')
         })
    }


    componentDidUpdate() {
        const { match: { params = {}} = {}, history } = this.props
        let { cate } = params || {}
        if(this.cateId === cate) return 
        this.cateId = cate

        this.setState({
            banner: []
        })

        axios.get(`/index.php?c=api/chimi/tags&id=${cate}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { tabs = [], content = [] , banner = [] } = data || {}
            this.distance = content.length / 4 * 320 
            if(Array.isArray(content) && content.length) {
                 this.setState({
                     tabs,
                     content,
                     banner
                 }, () => {
                    this.swiper  = null
                    this.swiper = new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项
                        speed: 1000,
                        autoplay: {
                            disableOnInteraction: false,
                            delay: 2000,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable :true
                        },
                        observer: true,//修改swiper自己或子元素时，自动初始化swiper
					    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    }) 
                 })
            } else {
                 history.push('/error')
            }
         }).catch(error => { 
             history.push('/error')
         })
        
    }

    componentDidMount() {
       
        const { match: { params = {}} = {}, history } = this.props
        let { cate } = params || {}
        this.cateId = cate
        axios.get(`/index.php?c=api/chimi/tags&id=${cate}`).then(res => {
           const { data: { data } = {} } = res || {}
           const { tabs = [], content = [], banner = []} = data || {}
           this.distance = content.length / 4 * 320 
           
           if(Array.isArray(content) && content.length) {
                this.setState({
                    tabs,
                    content,
                    banner
                }, () => {
                    if(this.swiper) return 
                    this.swiper = new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项
                        speed: 1000,
                        autoplay: {
                            disableOnInteraction: false,
                            delay: 2000,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable :true
                        }
                    }) 
                })
           } else {
                history.push('/error')
           }
        }).catch(error => { 
            history.push('/error')
        })

        const tabInfo = document.getElementById('tabInfo')
        this.scrollTop = tabInfo && tabInfo.offsetTop
        this.scrollLeft = document.getElementById('tabWrap').offsetLeft
        window.addEventListener('scroll', this.handleScroll);
        
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
        this.swiper = null
      }

    render(){
        const { banner, isFixed, tabs = [], content = [], finished } = this.state


        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.content}}>
                    <div id="tabWrap" 
                        style={{ 
                            flex: 1,
                            marginRight: 40,
                            paddingTop: 90, 
                            overflow: 'hidden',
                            backgroundColor: '#fff'
                        }}>
                        <div id="tabInfo" className="scroll-set" style={isFixed ? { ...styles.tabINfoFixed, width: 210, paddingLeft: 60,  transform: finished ? `translateY(calc(100vh - 455px - 100vh))`: 'translateY(0)', left: this.scrollLeft, height: '100%', overflow: 'scroll',marginLeft: 0 } : {marginLeft: 60,  flex: 1, height: '100%', overflow: 'scroll' }}>
                            {
                                Array.isArray(tabs) ?  tabs.map(((v, index) => {
                                    const { title, list = [] } = v|| {}
                                    
                                    return (
                                       <ul>
                                           <li style={{whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 14, color: '#000',height: 50, lineHeight:'50px', fontWeight: 'bold'}}>{title}</li>
                                          {
                                             Array.isArray(list) ?  list.map((d, i) => {
                                                  const { id, title } = d || {}
                                                  return <li style={{ cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 12, color: '#333',height: 50, lineHeight:'50px'}}>
                                                      <input id={`cate${index}${i}`} type={'checkbox'} style={{width: 18, height: 18, 'WebkitAppearance': 'checkbox', marginRight: 10}} onChange={e => {
                                                        const status = e.target.checked
                                                          this.idList[id] = status
                                                          this.isSelect  = true
                                                          this.getData()
                                                      }}/>
                                                      <label style={{flex: 1, cursor: 'pointer', overflow: 'hidden', paddingRight:10}} htmlFor={`cate${index}${i}`}>{title}</label>
                                                  </li>
                                              }) : null
                                          }
                                       </ul>
                                    )
                                })) : null
                            }
                        </div>
                    </div>
                    <div style={{...styles.contentInfo}}>
                        {
                            Array.isArray(banner) && banner.length ?    (<div className="swiper-container" style={{width: 1050,  marginBottom: 30}}>
                            <div className="swiper-wrapper">
                                {
                                    banner.map((v,i) => {
                                        const { pic  = '' } = v || {}
                                        return  pic ? <img key={`banner-${i}`} src={pic} className="swiper-slide" alt="" style={{...styles.banner}} /> : null 
                                    })
                                }
                            </div>
                            <div className="swiper-pagination"></div>
                            </div>) : <div style={{width: 1050,  marginBottom: 30}} />
                        }
                        {
                            content.map((v, i) => {
                                const { itemPic, pic, subPic, ...extParams } = v || {}
                                const _pic = pic || itemPic || subPic
                                const _itemPic = subPic || itemPic || pic
                                return (
                                    <div style={{cursor: 'pointer', marginBottom: 30, marginRight: 20, backgroundColor: '#fff'}} onClick={() => {
                                        this.props.history.push(`/detail/${v.id}`)
                                    }}>
                                        <Item key={`cate-${i}`} pic={_pic} itemPic={_itemPic} {...extParams} imgStyle={{ height: 320, width: 240, objectFit: 'cover', overflow: 'hidden'}} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Category)