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
    }
}

export default props => {
    const { history } = props
    return (
        <div style={{marginLeft: 180, width: 560}} onClick={() => {
            history.push('/adress/add')
        }}>
                <h2 style={{textAlign: 'center',marginBottom: 30,  fontSize: 32, color: '#000', fontWeight: 'bold'}}>{'Address Book'}</h2>
                <div>
                    <div style={{ ...styles.wrap }}>
                        <img src="https://s2.ax1x.com/2019/12/22/QzDgEj.png" alt="" style={{width: 40, height: 40}} />
                        <p style={{marginTop: 20, fontSize: 16, color: '#4a4a4a', textAlign: 'center'}}>{'Add New Address'}</p>
                    </div>
                </div>
        </div>
    )



}