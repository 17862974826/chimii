
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
        marginBottom: 560
    }
}


class Celebrity extends React.Component {

    state = {
        celeData: {},
        showStar: false,
        showCell: false,
        currentCellIndex: null,
    }

    handleJumpToDetail = id => {
        const { history } = this.props
        history.push(`/detail/${id}`)
    }

    handleChangeStar = (status, e) => {

        this.setState({
            showStar: status,
            showCell: false
        })
    }

    handleChangeCell = (status, i) => {
        this.setState({
            showStar: false,
            showCell: status,
            currentCellIndex: i
        })
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
        const { sartData: { pic, title } = {}, items } = currentData || {}

        const ItemValue = (items && items[currentCellIndex]) || {}
       
        return (
            <div style={{
                    ...styles.container
            }}>
                <div style={{...styles.content}}>
                    {
                        list.map((v, i) => {
                            const { sartData, items = []} = v|| {}
                            const { pic, title, desc, fllow, like } = sartData || {}
                            return (
                                <div key={`cele-wrap-${i}`} style={{...styles.contentItem}}>
                                    <div style={{height: 90, marginBottom: 30, display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={this.handleChangeStar.bind(null, true)}>
                                        <img src={pic} alt="" style={{ width: 90, height: 90, borderRadius: 45}}/>
                                        <div style={{height: 58, marginLeft: 20}}>
                                            <p style={{fontSize: 14, color: '#333',lineHeight: '14px', marginBottom: 8, fontWeight: 'bold'}}>{title}</p>
                                            <div style={{display: 'flex', marginBottom: 8, lineHeight: '14px'}}>
                                                { desc ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{desc}</p> : null}
                                                { like ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Like ${like}`}</p> : null}
                                                { fllow ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Fllow ${fllow}`}</p> : null}
                                            </div>
                                            <p style={{ color: '#921C59', fontSize: 12}}>{'Fllow and get her coupon'}</p>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>  
                                        {
                                            items.map((v, i) => {
                                                return (
                                                    <div key={`cele-${i}`}  onClick={() => {
                                                        this.handleChangeCell(true, i)
                                                    }}>
                                                        <Item {...v} history={history} imgStyle={{width: 300, height: 300}}/>
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
                {
                    showStar ? 
                    <div  onClick={this.handleChangeStar.bind(null, false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 99}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400, height: 240, boxSizing: 'border-box', backgroundColor: '#fff', paddingTop: 25}}>
                                    <img alt='' src={pic} style={{ width: 90, height: 90, borderRadius: 45}}/>
                                    <p onClick={e => {
                                        e.stopPropagation()
                                    }} style={{marginTop: 42, cursor: 'pointer', fontSize: 14, color: '#921C59'}}>{'Stop Fllow'}</p>
                            </div>
                    </div>  : null
                }
                {
                    showCell  ? (
                        <div onClick={() => {
                            this.handleChangeCell(false, null)
                        }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 99}}>
                            <div style={{width: 900, height: 600, backgroundColor: '#fff', display: 'flex'}}>
                                <img alt="" style={{width: 600, height: 600}} src={ItemValue.pic}/>
                                <div style={{flex: 1, paddingLeft: 20}}>
                                    <div style={{height: 100, display: 'flex',alignItems: 'center',  borderBottom: '1px solid #999'}}>
                                        <img src={pic} alt="" style={{ width: 60, height: 60, borderRadius: 30}}/>
                                        <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                            <p style={{fontSize: 12, color: '#000', fontFamily: 'bold'}}>{title}</p>
                                            <p style={{fontSize: 12, color: '#921C59', fontFamily: 'bold'}}>{'Fllow'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    ) : null
                }
            </div>
        )
    }
}

export default withRouter(Celebrity)