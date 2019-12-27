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
        border: '1px dashed #ccc',
        cursor: 'pointer'
    },
    label: {
        fontSize: 12,
        color: '#000',
    },
    input: {
        width: 440,
        height: 40,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        border: '1px solid #4A4A4A'
    }
}

export default () => {
    const [ state, setState ] = useState()
    let emailValue = ''
    let OldPassValue = ''
    let newPassValue = ''

    const handleUpdatePassword = () => {
        console.log(emailValue, OldPassValue, newPassValue)
        if(!emailValue || !OldPassValue || !newPassValue) {
            alert('请输入完整参数')
            return 
        }
        const params = `email=${emailValue}&newpasswd=${newPassValue}&passwd=${OldPassValue}`
        axios.post('/index.php?c=api/chimipost/passwdchange', params, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            const { data: { errorCode } = {} } = res || {}
            if(errorCode === 0) {
                alert('修改成功')
            } else {
                alert('修改失败')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div style={{marginLeft: 180, width: 440}}>
                <h2 style={{textAlign: 'center',marginBottom: 30,  fontSize: 32, color: '#000', fontWeight: 'bold'}}>{'Change Password'}</h2>
                <h4 style={{textAlign: 'center',fontSize: 12, color: '#4A4A4A', marginTop: 30}}>{'If you want to change your password, you can edit it here.'}</h4>
                <div style={{marginTop: 40}}>
                    <div style={{marginBottom: 40}}>
                        <p style={{...styles.label}}>{'Email *'}</p>
                        <input style={{...styles.input}} onChange={e => {
                            emailValue = e.target.value
                        }} type="text"/>
                    </div>
                    <div style={{marginBottom: 40}}>
                        <p style={{...styles.label}}>{'Old Password *'}</p>
                        <input style={{...styles.input }} onChange={e => {
                            OldPassValue = e.target.value
                        }} type="password"/>
                    </div>
                    <div style={{marginBottom: 40}}>
                        <p style={{...styles.label}}>{'New Password  *'}</p>
                        <input style={{...styles.input}} onChange={e => {
                            newPassValue = e.target.value
                        }} type="password"/>
                    </div>
                    <div onClick={handleUpdatePassword} style={{margin: '0 auto', cursor: 'pointer', width: 180, height: 40,backgroundColor: '#921C59', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{color: '#fff'}}>{'SUBMIT'}</p>
                    </div>
                </div>
        </div>
    )



}