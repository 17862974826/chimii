import React, { useState } from 'react'

const styles = {
    wrap: {
        width: 260,
        height:260,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        border: '1px dashed #ccc',
        cursor: 'pointer'
    },
    item: {
        width: 280,
        height: 135,
        overflow: 'hidden'
    },
    itemInfo: {
        height: 120,
        paddingTop: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    coupon: {
        fontSize: 30,
        marginBOttom: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    title: {
        fontSize: 12,
        color: '#2A2728'
    },
    timeWrap: {
        display: 'flex'
    },
    time: {
        fontSize: 12,
        color: '#2A2728'
    }
}

export default (props) => {
    const { coupons = []  } = props || {}
    const [ state, setState ] = useState({
        list: [
            {
                title: 'Unused Coupons',
                unuse: coupons,
                checked: true
            },
            {
                title: 'Expired Coupons',
                expired: [],
                checked: false
            }
        ]
    })
    const { list = [] } = state || {}
   
    return (
        <div style={{marginLeft: 171, width: 560}}>
                <h2 style={{textAlign: 'center',marginBottom: 30,  fontSize: 32, color: '#000', fontWeight: 'bold'}}>{'My Coupons'}</h2>
                <div style={{marginTop: 50, display: 'flex', cursor: 'pointer',  marginBottom: 30}}>
                    {
                        list.map(v => {
                            const { title, checked, unuse, expired } = v || {}
                            return <p style={{marginRight: 60, fontSize: 14, color: '#000', fontWeight: checked ? 'bold': 'normal'}}>{title}</p>
                        })
                    }
                </div>
                <div style={{display: 'flex'}}>
                {
                        coupons.map(v => {
                           
                            const { coupon, title, start_time, end_time } = v || {}
                            return (
                                <div style={{...styles.item}}>
                                    <div style={{...styles.itemInfo}}>
                                        <p style={{...styles.coupon}}>{coupon}</p>
                                        <p style={{...styles.title}}>{title}</p>
                                        <div style={{...styles.timeWrap}}>
                                                 <p style={{...styles.time}}>{start_time}</p>
                                                <span style={{...styles.time, marginLeft: 5, marginRight: 5}}>{'~'}</span>
                                                 <p style={{...styles.time}}>{end_time}</p>
                                        </div>
                                    </div>
                                </div>
                            ) 
                        })
                }
                </div>
        </div>
    )



}