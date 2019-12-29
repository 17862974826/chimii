import React, { useState } from 'react'

const styles = {
    cellWrap: {
        width: 347, 
        display: 'flex',
        height: 184, 
        marginBottom: 20,
        overflow: 'hidden' 
    },
    pic: {
        width: 180,
        marginRight: 30,
        height: 180,
        border: '1px solid #999',
        objectFit: 'cover'
    },
    content: {
        height: 180,
        flex: 1,
    },
    itemTitle: {
        marginBottom: 10,
        fontSize: 16, 
        height: 20,
        overflow: 'hidden',
        color: '#333',
        fontWeight: 'bold'
    },
    desc: {
        marginBottom: 16,
        fontSize: 12,
        lineHeight: '16px',
        height: 16,
        overflow: 'hidden',
        color: '#666'
    },
    price: {
        marginRight: 5,
        color: '#000',
        fontSize: 16
    },
    originPrice: {
        color: '#999',
        fontSize: 16
    },
    symbol: {
        cursor: 'pointer',
        color: '#333',
        fontWeight: 'bold'
    }

}


export default  (props) => {
    const { count = 1, pic, title ,desc, price, originPrice, onDelteILike, id} = props || {}
    const [state, setCount ] = useState(count)
    const handleChangeItemNum = symbol => {
        let count = state
        if(symbol) {
            count +=1 
        } else {
            count = count > 0 ? --count : 0
        }
      
        setCount(count)
    }
        return (
            <div  style={{...styles.cellWrap}}>
                <img src={pic} alt="" style={{...styles.pic}}/>
                <div style={{...styles.content}}>
                   { title ?  <p style={{...styles.itemTitle}}>{title}</p> : <div style={{...styles.itemTitle}} />}
                   {  desc ?  <p style={{...styles.desc }}>{desc}</p> : <div style={{...styles.desc }}/>}
                    <div>
                        <span style={{...styles.price}}>{`$${price}`}</span>
                        <span  style={{...styles.originPrice}}>{`$${originPrice}`}</span>
                    </div>
                    <div style={{marginTop: 20, display: 'flex'}}>
                        <p style={{...styles.symbol}} onClick={handleChangeItemNum.bind(null, 0)}>{'-'}</p>
                        <p style={{margin: '0 20px'}}>{state}</p>
                        <p style={{...styles.symbol}} onClick={handleChangeItemNum.bind(null, 1)}>{'+'}</p>
                    </div>
                    <p style={{marginTop: 22, fontSize: 12, color: '#000', cursor: 'pointer'}} onClick={() => {
                        if(typeof onDelteILike === 'function') onDelteILike(id)
                    }}>{'Delete'}</p>
                </div>
            </div>
        )
}          
