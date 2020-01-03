
import React from 'react'
import { getFontSize } from '../../util'
import LazyLoad from 'react-lazy-load'
import {
    withRouter
    } from "react-router-dom";
import axios from 'axios'
import Item from '../../components/commonCell'

const styles = {
    container:{
        marginTop: 90,
        minWidth: 1000
    },
    content: {
        width: 1000,
        margin: '0 auto',
        overflow: 'hidden'
    },
    contentItem: {
        position: 'relative',
        marginBottom: 50
    },
    more: {
        position: 'absolute',
        right: 0,
        top: 100,
        fontSize: 12,
        color: '#921C59',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
}


class Celebrity extends React.Component {

    state = {
        celeData: {},
        showStar: false,
        showCell: false,
        currentCellIndex: null,
    }

    handleChangeStar = (status, i) => {

        this.setState({
            showStar: status,
            showCell: false,
            currentCellIndex: i
        })
    }

    handleChangeCell = (status, i) => {
        this.setState({
            showStar: false,
            showCell: status,
            currentCellIndex: i
        })
    }

    async handleFllowStar(id) {
       
        const  result = await  axios.post('/index.php?c=api/chimipost/addlike',`type=person&id=${id}&action=add`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        const { data: { errorCode } = {} } = result || {}
        if(errorCode === 0) {
            alert('收藏成功')
            window.location.reload()
        } else {
            alert('收藏失败')
        }

    }

    handleJumpStarDetail = id => {
        this.props.history.push(`/celebrity/content/${id}`)
    }

    async handleDeleteLike(id) {
        const  result = await  axios.post('/index.php?c=api/chimipost/addlike',`type=person&id=${id}&action=del`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          const { data: { errorCode } = {} } = result || {}
          if(errorCode === 0) {
              alert('取消成功')
              window.location.reload()
          } else {
              alert('取消失败')
          }
    }

    componentDidMount() {
        const { match: { params } = {} } = this.props
        const { id } = params || {}
        axios.get(`/index.php?c=api/chimi/wanghong&id=${id}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { list = [] , isLogin} = data || {}
            window.profile = {
                isLogin
            }
            if(Array.isArray(list) && list.length) {
                this.setState({
                    celeData: {
                        list
                    }
                })
            }
        }).catch(err => console.error(err))
    }
    
    render() {
        const { celeData, showStar, showCell, currentCellIndex } = this.state
        const { history } = this.props
        const { list = [] } = celeData || {}
        const [  currentData = {} ] = list || []
        const { sartData: { pic, title } = {} } = currentData || {}

        const { sartData: ItemValue = {} } = (list && list[currentCellIndex]) || {}
       
        return (
            <div style={{
                    ...styles.container
            }}>
                <div style={{...styles.content}}>
                    {
                        list.map((v, i) => {
                            const { sartData, items = []} = v|| {}
                            const { pic, title, desc, fllow, like, id, is_fllow } = sartData || {}
                          
                            return (
                                <div key={`cele-wrap-${i}`} style={{...styles.contentItem}}>
                                    <div style={{height: 90, marginBottom: 30, display: 'flex', alignItems: 'center'}} >
                                        <img src={pic} alt="" style={{ width: 90, height: 90, borderRadius: 45}}/>
                                        <div style={{height: 58, marginLeft: 20}}>
                                            <p style={{fontSize: 14, color: '#333',lineHeight: '14px', marginBottom: 8, fontWeight: 'bold'}}>{title}</p>
                                            <div style={{display: 'flex', marginBottom: 8, lineHeight: '14px'}}>
                                                { desc ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{desc}</p> : null}
                                                { like ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Like ${like}`}</p> : null}
                                                { fllow ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Fllow ${fllow}`}</p> : null}
                                            </div>
                                            {
                                                is_fllow ? <p onClick={this.handleChangeStar.bind(null, true, i)} style={{color: '#333',cursor: 'pointer',  fontSize: 12}}>{'Fllowing'}</p> : <p style={{ cursor: 'pointer', color: '#921C59', fontSize: 12}} onClick={e => {
                                                    e.stopPropagation()
                                                   this.handleFllowStar(id)
                                               }}>{'Fllow and get her coupon'}</p>
                                            }
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>  
                                        {
                                            items.map((v, i) => {
                                                const { pic } = v || {}
                                                return (
                                                    <div key={`cele-${i}`} style={{cursor: 'pointer'}}  onClick={e => {
                                                        window.profile.currentInf = i
                                                        this.handleJumpStarDetail(id)
                                                    }}>
                                                        <img style={{width: 320, height: 300, objectFit: 'cover'}} alt="" src={pic}/>
                                                      
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <p style={{...styles.more}} onClick={() => {
                                        this.handleJumpStarDetail(id)
                                    }}>{'More'}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    showStar ? 
                    <div  onClick={this.handleChangeStar.bind(null, false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 99}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400, height: 240, boxSizing: 'border-box', backgroundColor: '#fff', paddingTop: 25}}>
                                    <img alt='' src={ItemValue.pic} style={{ width: 90, height: 90, borderRadius: 45}}/>
                                    <p onClick={e => {
                                        e.stopPropagation()
                                        this.handleDeleteLike(ItemValue.id)
                                    }} style={{marginTop: 42, cursor: 'pointer', fontSize: 14, color: '#921C59'}}>{'Stop Fllow'}</p>
                            </div>
                    </div>  : null
                }
            </div>
        )
    }
}

export default withRouter(Celebrity)