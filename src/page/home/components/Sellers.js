
import React from 'react'
import { getFontSize } from '../../../util'
import LazyLoad from 'react-lazy-load'

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    wrap: {
        width: 1440,
        height: 650,
        overflow: 'hidden'
    },
    title:{
        fontSize: getFontSize(46),
        lineHeight: '46px',
        fontWeight: '500',
        height: 46,
        color: '#921C59',
        textAlign: 'center'
    },
    subTitle:{
        marginTop: 20,
        marginBottom: 30,
        fontWeight: '500',
        fontSize: getFontSize(24),
        lineHeight: '24px',
        height: 24,
        color: '#921C59',
        textAlign: 'center' 
    },
    content: {
        height: 382,
        minHeight: 382,
        display: 'flex',
        justifyContent: 'center'
    },
    image:{
        width: 300,
        height: 300,
        objectFit: 'cover'
    },
    name:{
        width: 300,
        height: 24,
        marginTop: 15,
        marginBottom: 12,
        overflow: 'hidden',
        lineHeight: '24px',
        color: '#333',
        fontWeight: '500',
        textOverflow: 'ellipsis',
        fontSize: getFontSize(24),
    },
    priceWrap:{
        width: 300,
        height: 24,
        overflow: 'hidden',
        display: 'flex',

    }
}

export default  (props) => {
    const { title, subTitle, list = [], style } = props || {}
    return (
        <div style={{...styles.container}}>
            <div style={{...styles.wrap}}>
                <p style={{...styles.title}}>{title}</p>
                <p  style={{...styles.subTitle}}>{subTitle}</p>
                <div style={{...styles.content}}>
                {
                    list.map((value, i) => {
                        const { pic, title, price, originPrice, couponText} = value || {}
                        return (
                            <div key={`star-${i}`} style={{ flexShrink: 0, marginRight: i!== 3 ? 30 : 0, position: 'relative', zIndex: '1', ...style }}> 
                                <LazyLoad height={300} offsetVertical={200}>
                                    <img src={pic} alt="name" style={{...styles.image}}/>
                                </LazyLoad>
                                <p style={{...styles.name}}>{title}</p>
                                <p style={{...styles.priceWrap}}>
                                    <span style={{fontSize: getFontSize(18), color: '#000', marginRight: 4}}>{`$${price}`}</span>
                                    <span style={{fontSize: getFontSize(18), color: '#999'}}>{`$${originPrice}`}</span>
                                </p>
                                <p style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 242,
                                    color: '#fff',
                                    fontSize: getFontSize(18),
                                    padding: '3px 8px 3px 17px',
                                    backgroundColor: '#E83D49'
                                }}>{couponText}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
} 