import React from 'react'

import {
    withRouter
    } from "react-router-dom";

import Item from '../../components/Items'
    
const styles = {
    banner:{
        height: 653,
            width: '100%',
            minHeight: 653,
            minWidth: 1440,
            objectFit: 'cover'
        },
    content: {
        display: 'flex',
        minWidth: 1440,
        width: 1440,
        overflow: 'scroll',
        paddingBottom: 180,
        margin: '0 auto'
    },
    tabInfo: {
        width: 250,
        paddingLeft: 60,
        marginRight: 40,
        paddingTop: 90,
    },
    tabINfoFixed: {
        position: 'fixed',
        left: 60,
        top: 0,
        paddingTop: 90,
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
            banner: 'http://pic3.iqiyipic.com/common/lego/20191122/238dd8ae71754426b8765249756aa105.jpg',
            isFixed: false,
            tabs: [
                {
                    title: 'Popular Styles',
                    list: [
                       {
                            title: 'chinas'
                       },
                       {
                            title: 'chinas'
                        }
                    ]
                },
                {
                    title: 'Popular Styles',
                    list: [
                       {
                            title: 'chinas'
                       },
                       {
                            title: 'chinas'
                        }
                    ]
                },
                {
                    title: 'Popular Styles',
                    list: [
                       {
                            title: 'chinas'
                       },
                       {
                            title: 'chinas'
                        }
                    ]
                },
                {
                    title: 'Popular Styles',
                    list: [
                       {
                            title: 'chinas'
                       },
                       {
                            title: 'chinas'
                        }
                    ]
                },
                {
                    title: 'Popular Styles',
                    list: [
                       {
                            title: 'chinas'
                       },
                       {
                            title: 'chinas'
                        }
                    ]
                },
                {
                    title: 'Popular Styles',
                    list: [
                       {
                            title: 'chinas'
                       },
                       {
                            title: 'chinas'
                        }
                    ]
                }
            ],
            content: [
                {
                    title: 'ITEM NAME',
                    price: 20,
                    originPrice: '40.00',
                    couponText: '50% OFF',
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                },
                {
                    title: 'ITEM NAME',
                    price: 20,
                    originPrice: '40.00',
                    couponText: '50% OFF',
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                },
                {
                    title: 'ITEM NAME',
                    price: 20,
                    originPrice: '40.00',
                    couponText: '50% OFF',
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                },
                {
                    title: 'ITEM NAME',
                    price: 20,
                    originPrice: '40.00',
                    couponText: '50% OFF',
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                }
            ]
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

    componentDidMount() {
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
            <>
                <img src={banner} alt="" style={{...styles.banner}} />
                <div style={{...styles.content}}>
                    <div id="tabWrap" 
                        style={{ 
                            width: 250,
                            paddingLeft: 60,
                            marginRight: 40,
                            paddingTop: 90, 
                            overflow: 'hidden',
                        }}>
                        <div id="tabInfo" style={isFixed ? { ...styles.tabINfoFixed, left: this.scrollLeft + 60, height: 400, overflow: 'scroll' } : { width:  250 }}>
                            {
                                tabs.map((v => {
                                    const { title, list = []} = v|| {}
                                    return (
                                       <ul>
                                           <li style={{whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 20, color: '#333',height: 50, lineHeight:'50px', fontWeight: 'bold'}}>{title}</li>
                                          {
                                              list.map(d => {
                                                  return <li style={{whiteSpace: 'nowrap', overflow: 'hidden',  textOverflow: 'ellipsis', fontSize: 20, color: '#333',height: 50, lineHeight:'50px'}}>{d.title}</li>
                                              })
                                          }
                                       </ul>
                                    )
                                }))
                            }
                        </div>
                    </div>
                    <div style={{...styles.contentInfo}}>
                        {
                            content.map((v, i) => {
                                return <Item key={`cate-${i}`} {...v} style={{width: 300,marginRight: 30, height: 382,  marginBottom: 30}}/>
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Category)