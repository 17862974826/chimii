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
        paddingTop: 77,
        margin: '0 auto'
    },
    item: {
        width: 300,
        height: 300
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
        items: []
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
                sartData,
                items
            })
        }
        request()
     
        
    }, [netId])
    const { sartData, items } = state || {}
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
                        isLike ? null : <p style={{ color: '#921C59', fontSize: 12}} onClick={e => {
                            e.stopPropagation()
                            this.handleFllowStar(id)
                        }}>{'Fllow and get her coupon'}</p>
                    }
                </div>
            </div>
            <div style={{width: 1000, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    Array.isArray(items) ? items.map((v, i) => {
                        const { pic } = v || {}
                        return (
                            <div style={{...styles.item}} key={`wanghongItem-${i}`}>
                                <img alt="" src={pic} style={{...styles.image}}/>
                            </div>
                        )
                    }) : null
                }
            </div>
        </div>
    )
})