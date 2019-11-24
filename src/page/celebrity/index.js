
import React from 'react'
import { getFontSize } from '../../util'
import LazyLoad from 'react-lazy-load'
import {
    withRouter
    } from "react-router-dom";


const styles = {
    container:{
        marginTop: 90,
        minWidth: 1440
    },
    content: {
        width: 1440,
        margin: '0 auto',
        overflow: 'hidden'
    },
    contentItem: {
        marginBottom: 560
    }
}

class Celebrity extends React.Component {

    state = {
        celeData: {
            list: [
                {
                    sartData: {
                        pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                        title: 'Name',
                        desc: 'moment 27'
                    },
                    items: [
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        }
                    ]
                },
                {
                    sartData: {
                        pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                        title: 'Name',
                        desc: 'moment 27'
                    },
                    items: [
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        },
                        {
                            pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png',
                            id: '1'
                        }
                    ]
                }
            ]
        }
    }

    handleJumpToDetail = id => {
        const { history } = this.props
        history.push(`/detail/${id}`)
    }
    
    render() {
        const { celeData } = this.state
        const { list = [] } = celeData || {}
        return (
            <div style={{
                    ...styles.container
            }}>
                <div style={{...styles.content}}>
                    {
                        list.map((v, i) => {
                            const { sartData, items = []} = v|| {}
                            const { pic, title, desc} = sartData || {}
                            return (
                                <div key={`cele-wrap-${i}`} style={{...styles.contentItem}}>
                                    <div style={{height: 225, marginBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <img src={pic} alt="" style={{ width: 140, height: 140, borderRadius: 70}}/>
                                        <p style={{gontSize: 30, color: '#333', marginTop: 12, marginBottom: 12, fontWeight: 'bold'}}>{title}</p>
                                        <p style={{gontSize: 24, color: '#333'}}>{desc}</p>
                                    </div>
                                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                        {
                                            items.map((v, i) => {
                                                const { pic, id } = v|| {}
                                                return (
                                                    <div key={`cele-${i}`} style={{marginBottom: 20, marginRight: 30}} onClick={() => {
                                                        this.handleJumpToDetail(id)
                                                    }}>
                                                        <LazyLoad height={360} offsetVertical={300}>
                                                            <img src={pic} alt="" style={{width: 360, height: 360}}/>
                                                        </LazyLoad>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Celebrity)