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
            banner: 'https://img.ltwebstatic.com/images3_acp/2019/12/04/157542876188155f1c9169a27f035883128df332ec.gif',
            isFixed: false,
            tabs: [],
            content: []
        }
        
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


    componentDidUpdate(){
        const { match: { params = {}} = {}, history } = this.props
        let { cate } = params || {}
        if(this.cateId === cate) return 
        this.cateId = cate
        axios.get(`/index.php?c=api/chimi/tags&id=${cate}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { tabs = [], content} = data || {}
           
            
            if(Array.isArray(content) && content.length) {
                 this.setState({
                     tabs,
                     content
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
           const { tabs = [], content} = data || {}
          
           
           if(Array.isArray(content) && content.length) {
                this.setState({
                    tabs,
                    content
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
                        <div id="tabInfo" style={isFixed ? { ...styles.tabINfoFixed, left: this.scrollLeft, height: 690, overflow: 'scroll' } : { flex: 1, height: 600, overflow: 'scroll' }}>
                            {
                                Array.isArray(tabs) ?  tabs.map((v => {
                                    const { title, list = [] } = v|| {}
                                    
                                    return (
                                       <ul>
                                           <li style={{whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 20, color: '#333',height: 50, lineHeight:'50px', fontWeight: 'bold'}}>{title}</li>
                                          {
                                             Array.isArray(list) ?  list.map(d => {
                                                  return <li style={{ cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 20, color: '#333',height: 50, lineHeight:'50px'}}>{d.title}</li>
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
                                return <Item key={`cate-${i}`} {...v} style={{width: 300,marginRight: 30, height: 382,  marginBottom: 30}}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Category)