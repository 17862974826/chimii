import React from 'react'

const styles = {
    wrap: {
        width: 720,
        paddingTop: 105,
        margin: '0 auto',
    },
    title: {
        fontSize: 46,
        lineHeight: '46px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 60
    },
    cellWrap: {
        width: 633, 
        display: 'flex',
        height: 300, 
        marginBottom: 60,
        overflow: 'hidden'
    },
    pic: {
        width: 300,
        marginRight: 60,
        height: 300,
        objectFit: 'cover'
    },
    content: {
        boxSizing: 'onDelteILike-box',
        height: 300,
        paddingBottom: 50
    },
    itemTitle: {
        marginBottom: 30,
        fontSize: 24, 
        color: '#333',
        fontWeight: 'bold'
    },
    desc: {
        marginBottom: 30,
        fontSize: 24,
        color: '#666'
    },
    price: {
        marginRight: 12,
        color: '#000',
        fontSize: 24
    },
    originPrice: {
        color: '#999',
        fontSize: 24
    }

}


export default  (props) => {
    const { pic, title ,desc, price, originPrice, onDelteILike, id} = props || {}
        return (
            <div  style={{...styles.cellWrap}}>
                <img src={pic} alt="" style={{...styles.pic}}/>
                <div style={{...styles.content}}>
                    <p style={{...styles.itemTitle}}>{title}</p>
                    <p style={{...styles.desc }}>{desc}</p>
                    <div>
                        <span style={{...styles.price}}>{`$${price}`}</span>
                        <span  style={{...styles.originPrice}}>{`$${originPrice}`}</span>
                    </div>
                    <p style={{marginTop: 87, fontSize: 24, color: '#000', cursor: 'pointer'}} onClick={() => {
                        if(typeof onDelteILike === 'function') onDelteILike(id)
                    }}>{'Delete'}</p>
                </div>
            </div>
        )
}          
