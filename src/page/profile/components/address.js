import React, { useState } from 'react'
import axios from 'axios'

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
        border: '1px solid #ccc',
        marginBottom: 20
    },
    item: {
        fontSize: 12,
        height: 22,
        lineHeight: '22px',
        marginBottom: 6,
        textOverflow: 'ellipsis',
        width: 230,
        overflow: 'hidden',
        color: '#000',
        flexShrink: 0,
        fontWeight: 'bold'
    },
    opt: {
        fontSize: 12,
        color: '#5379F9',
        cursor: 'pointer'
    }
}

export default props => {
    const { history } = props
    const [ state, setState ] = useState(
       {
            address: props.address || []
       }
    )
    const {  address } = state || {}
    const handleDeleteAdress = (index) => {
       axios.post('/index.php?c=api/chimipost/addaddress', `type=delete&id=${index}`, {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
       }).then(res => {
        const { data: { errorCode } = {} } = res || {}
        if(errorCode === 0) {
            alert('删除成功')
            window.location.reload()
        }
       }).catch(err => {
           console.log(err)
       })
    }
        
    return (
        <div style={{marginLeft: 180, width: 840 }} >
                <h2 style={{textAlign: 'center',marginBottom: 30,  fontSize: 32, color: '#000', fontWeight: 'bold'}}>{'Address Book'}</h2>
                <div style={{display: 'flex', flexWrap: 'wrap' }}>
                    {
                        Array.isArray(address) ? address.map(v => {
                            const { firstName, lastName,city, country, province, street, iphone } = v || {}
                            return {
                                firstName,
                                lastName,
                                city,
                                country,
                                province,
                                street,
                                iphone
                            }
                        }).map((v, i) => {
                            
                            return (
                                <div key={`addresslist-${i}`} style={{ ...styles.wrap, marginRight: 20, justifyContent: 'flex-start',alignItems: 'flex-start', paddingRight: 20,paddingLeft: 20, paddingTop: 20  }}>
                                    {
                                        Object.keys(v).map((key, i) => ( <p key={`addressItem-${i}`} style={{...styles.item}}>{`${key}: ${v[key]}`}</p>))
                                    }
                                    <div style={{width: 230, display: 'flex', justifyContent: 'flex-end', paddingRight: 10, boxSizing: 'border-box'}}>
                                        <p style={{...styles.opt, marginRight: 20}} onClick={() => {
                                            history.push(`/adress/add/update-${i}`)
                                        }}>{'Modify'}</p>
                                        <p style={{...styles.opt}} onClick={() => {
                                            handleDeleteAdress(i)
                                        }}>{'Delete'}</p>
                                    </div>
                                </div>
                            )
                        }) : null
                    }
                    <div style={{ ...styles.wrap, border: '1px dashed #ccc',  cursor: 'pointer', }} onClick={() => {
                        history.push('/adress/add/new')
                    }}>
                        <img src="https://s2.ax1x.com/2019/12/22/QzDgEj.png" alt="" style={{width: 40, height: 40}} />
                        <p style={{marginTop: 20, fontSize: 16, color: '#4a4a4a', textAlign: 'center'}}>{'Add New Address'}</p>
                    </div>
                </div>
        </div>
    )



}