import React from 'react'

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


export default () => {
    return (
        <div style={{...styles.wrap}}>
            <p style={{...styles.title}}>{'Add New Address'}</p>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <input style={{...styles.nameInput}} placeholder={'* First Name'}/>
                    <input style={{...styles.nameInput}} placeholder={'* last Name'}/>
                </div>
                <input style={{...styles.address}} placeholder={'* Address LIne 1: Street name and street number，company name'}/>
                <input style={{...styles.address}} placeholder={'Building/Apartment/Suite no,Unit,Floor,etc(optional)'}/>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <input style={{...styles.nameInput}} placeholder={'* City'}/>
                    <input style={{...styles.nameInput}} placeholder={'* State/Province'}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <input style={{...styles.nameInput}} placeholder={'* Post/Zip Code'}/>
                    <select style={{...styles.nameInput}}>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                    <select style={{...styles.nameInput}}>
                        <option value=""  style={{display: 'none'}}>count code</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <input style={{...styles.nameInput}} placeholder={'* Post/Zip Code'}/>
                </div>
            </div>
            <div style={{...styles.buttonWrap}}>
                <p style={{...styles.button}}>{'SAVE'}</p>
            </div>
        </div>
    )
}