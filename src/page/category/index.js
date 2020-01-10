import React from 'react'

import {
    withRouter
    } from "react-router-dom";

import Item from '../../components/Items'
import axios from 'axios'
    
const styles = {
    wrap: {
        width: 1300,
        minWidth: 1300,
        margin: '0 auto',
        paddingBottom: 180
    },
    banner:{
        height: 300,
        marginBottom: 30,
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
        top: 0,
        marginTop: 90,
    },
    contentInfo: {
        paddingTop: 90,
        flex: 1,
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
            banner: '',
            isFixed: false,
            tabs: [],
            content: []
        }
        this.idList = {}
        this.isSelect = false
        
    }

    handleScroll = (e) => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
       
        if(!this.state.isFixed && (scrollTop > this.scrollTop - 90)) {
           
            this.setState({
                isFixed: true
            })
            return 
        } 

        if(this.state.isFixed && (scrollTop < this.scrollTop - 90)) {
            this.setState({
                isFixed: false
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


    componentDidUpdate(){
        const { match: { params = {}} = {}, history } = this.props
        let { cate } = params || {}
        if(this.cateId === cate) return 
        this.cateId = cate
        axios.get(`/index.php?c=api/chimi/tags&id=${cate}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { tabs = [], content } = data || {}
            
            if(Array.isArray(content) && content.length) {
                 this.setState({
                     tabs,
                     content,
                     
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
           const { tabs = [], content, banner} = data || {}
          
           
           if(Array.isArray(content) && content.length) {
                this.setState({
                    tabs,
                    content,
                    banner
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
      }

    render(){
        const { banner, isFixed, tabs = [], content = [] } = this.state
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.content}}>
                    <div id="tabWrap" 
                        style={{ 
                            flex: 1,
                            marginRight: 40,
                            paddingTop: 90, 
                            overflow: 'hidden',
                        }}>
                        <div id="tabInfo" className="scroll-set" style={isFixed ? { ...styles.tabINfoFixed, left: this.scrollLeft + 60, height: 'calc(100vh - 455px)', overflow: 'scroll',marginLeft: 0 } : {marginLeft: 60,  flex: 1, height: 690, overflow: 'scroll' }}>
                            {
                                Array.isArray(tabs) ?  tabs.map((v => {
                                    const { title, list = [] } = v|| {}
                                    
                                    return (
                                       <ul>
                                           <li style={{whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 14, color: '#000',height: 50, lineHeight:'50px', fontWeight: 'bold'}}>{title}</li>
                                          {
                                             Array.isArray(list) ?  list.map((d, i) => {
                                                  const { id, title } = d || {}
                                                  return <li style={{ cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 12, color: '#333',height: 50, lineHeight:'50px'}}>
                                                      <input id={`cate${i}`} type={'checkbox'} style={{width: 18, height: 18, 'WebkitAppearance': 'checkbox', marginRight: 10}} onChange={e => {
                                                        const status = e.target.checked
                                                          this.idList[id] = status
                                                          this.isSelect  = true
                                                          this.getData()
                                                      }}/>
                                                      <label style={{flex: 1, overflow: 'hidden', paddingRight:10}} for={`cate${i}`}>{title}</label>
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
                        <img src={banner} alt="" style={{...styles.banner}} />
                        {
                            content.map((v, i) => {
                                return (
                                    <div style={{cursor: 'pointer'}} onClick={() => {
                                        this.props.history.push(`/detail/${v.id}`)
                                    }}>
                                        <Item key={`cate-${i}`} {...v} style={{width: 300,marginRight: 30, height: 382,  marginBottom: 30}}/>
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