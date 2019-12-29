import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const styles = {
    wrap: {
        width: 620,
        minHeight: 640,
        paddingBottom: 50,
        margin: '0 auto',
        paddingTop: 67
    },
    title: {
        fontSize: 32,
        color: '#921C59',
        textAlign: 'center',
        marginBottom: 50,
        fontWeight: 'bold'
    },
    nameInput: {
        width: 300, 
        height: 50, 
        paddingLeft: 10,
        paddingRight: 10,
        border: '1px solid #999',
        fontSize: 12
    },
    address: {
        width: 620,
        height: 50,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        border: '1px solid #999',
    },
    buttonWrap: {
        marginTop: 50,
        width: 240,
        height: 40,
        marginLeft: 180,
        backgroundColor: '#921C59'
    },
    button: {
        lineHeight: '46px',
        color: '#fff',
        height: 40,
        fontSize: 18,
        cursor: 'pointer',
        textAlign: 'center'
    }
}


export default withRouter((props) => {


    const inputValue = {}

    const type = props.match.params.type
   
    const processRequestParams = () => {
        return Object.keys(inputValue).reduce((p, v) => {
            return {
                ...p,
                [v]: inputValue[v]
            }
        }, {})
    }

    const handleClickAddAddress = () => {
       const params = processRequestParams()
       const [ stuff, id] = type && type.split('-')
       
       let requestParams = `address=${JSON.stringify(params)}`

       if(stuff ==='update' && id) {
        requestParams = requestParams + '&type=update' + `&id=${id}`
       }
       
       axios.post('/index.php?c=api/chimipost/addaddress',requestParams, {
           headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then(res => {
           const { data: { errorCode } = {} } = res || {}
           if(errorCode === 0) {
               alert('操作成功')
               props.history.push('/profile/adress')
           } else {
               alert('新增失败')
           }
       }).catch(err => {
           console.log(err)
       })

    }

    const handleChangeValue = (e, key) => {
       const value  = e.target.value
       if(value) {
        inputValue[key] = value
       }
    }

    return (
        <div style={{...styles.wrap}}>
            <p style={{...styles.title}}>{'Add New Address'}</p>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <input style={{...styles.nameInput}} placeholder={'* First Name'} onChange={e => {
                        handleChangeValue(e, 'firstName')
                    }}/>
                    <input style={{...styles.nameInput}} placeholder={'* last Name'} onChange={e => {
                        handleChangeValue(e, 'lastName')
                    }}/>
                </div>
                <input style={{...styles.address}} placeholder={'* Address LIne 1: Street name and street number，company name'} onChange={e => {
                        handleChangeValue(e, 'street')
                    }}/>
                <input style={{...styles.address}} placeholder={'Building/Apartment/Suite no,Unit,Floor,etc(optional)'} onChange={e => {
                        handleChangeValue(e, 'apartment')
                    }}/>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <input style={{...styles.nameInput}} placeholder={'* City'} onChange={e => {
                        handleChangeValue(e, 'city')
                    }}/>
                    <input style={{...styles.nameInput}} placeholder={'* State/Province'} onChange={e => {
                        handleChangeValue(e, 'province')
                    }}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <input style={{...styles.nameInput}} placeholder={'* Post/Zip Code'} onChange={e => {
                        handleChangeValue(e, 'postCode')
                    }}/>
                    <select style={{...styles.nameInput}} onChange={e => {
                        handleChangeValue(e, 'country')
                    }}>
                        <option value=""  style={{display: 'none'}}>{'* Country'}</option>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <select style={{...styles.nameInput}} onChange={e => {
                        handleChangeValue(e, 'countryCode')
                    }}>
                        <option value=""  style={{display: 'none'}}>{'* Country Code'}</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <input style={{...styles.nameInput}} placeholder={'* iphone'} onChange={e => {
                        handleChangeValue(e, 'iphone')
                    }}/>
                </div>
            </div>
            <div style={{...styles.buttonWrap}} onClick={handleClickAddAddress}>
                <p style={{...styles.button}}>{'SAVE'}</p>
            </div>
        </div>
    )
})