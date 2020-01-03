import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


const styles = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 1000,
        minWidth: 1000,
        paddingBottom: 60,
        paddingTop: 77,
        margin: '0 auto'
    },
    item: {
        width: 300,
        height: 300,
        cursor: 'pointer'
    },
    image: {
        width: 300,
        height: 300,
        flexShrink: 0
    }
}

export default withRouter((props) => {
    const [state, setState] = useState({
        sartData: {},
        items: [],
        showCell: window.profile.currentInf || window.profile.currentInf === 0,
        current: window.profile.currentInf || 0
    })
    const { id: netId } = props.match.params

    useEffect(() => {
        async function request (){
            const result = await  axios.get(`/index.php?c=api/chimi/wanghong&id=${netId}`)
            const { data: { data } = {} } = result || {}
            const { list = [] } = data || {}
            const [ netData ] = list || {}
            const { sartData, items } = netData || {}
            setState({
                ...state,
                sartData,
                items
            })
        }
        request()
     
        
    }, [netId])

    const { sartData, items, showCell , current} = state || {}

    const handleShowMask = (status, index) => {
        setState({
            ...state,
            showCell: status,
            current: index
        })
    }

    const { pic: currentPic}  = ( items && items[current] ) || {}


    const {pic, desc, like, fllow, isLike, title, id }  = sartData || {}

    return (
        <div style={{...styles.wrap}}>
            <div style={{height: 90, marginBottom: 30, display: 'flex', alignItems: 'center', cursor: 'pointer'}} >
                <img src={pic} alt="" style={{ width: 90, height: 90, borderRadius: 45}}/>
                <div style={{height: 58, marginLeft: 20}}>
                    <p style={{fontSize: 14, color: '#333',lineHeight: '14px', marginBottom: 8, fontWeight: 'bold'}}>{title}</p>
                    <div style={{display: 'flex', marginBottom: 8, lineHeight: '14px'}}>
                        { desc ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{desc}</p> : null}
                        { like ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Like ${like}`}</p> : null}
                        { fllow ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Fllow ${fllow}`}</p> : null}
                    </div>
                    {
                        isLike ? null : <p style={{ color: '#921C59', fontSize: 12}}>{'Fllow and get her coupon'}</p>
                    }
                </div>
            </div>
            <div style={{width: 1000, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    Array.isArray(items) ? items.map((v, i) => {
                        const { pic } = v || {}
                        return (
                            <div style={{...styles.item}} key={`wanghongItem-${i}`} onClick={() => {
                                handleShowMask(true, i)
                            }}>
                                <img alt="" src={pic} style={{...styles.image}}/>
                            </div>
                        )
                    }) : null
                }
            </div>
            {
                    showCell  ? (
                        <div onClick={() => {
                            handleShowMask(false,  null)
                        }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 99}}>
                            <div style={{width: 900, height: 600, backgroundColor: '#fff', display: 'flex'}}>
                                <img alt="" style={{width: 600, height: 600, objectFit: 'cover'}} src={currentPic}/>
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
})