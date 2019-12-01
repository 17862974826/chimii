
import React from 'react'
import { getFontSize } from '../../../util'
import LazyLoad from 'react-lazy-load'

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    wrap: {
        width: 1440,
        height: 950,
        overflow: 'hidden'
    },
    title:{
        fontSize: getFontSize(46),
        lineHeight: '46px',
        fontWeight: '500',
        height: 46,
        color: '#333',
        textAlign: 'center'
    },
    subTitle:{
        marginTop: 20,
        fontWeight: '500',
        marginBottom: 30,
        fontSize: getFontSize(24),
        lineHeight: '24px',
        height: 24,
        color: '#333',
        textAlign: 'center' 
    },
    content: {
        height: 740,
        minHeight: 740,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    image:{
        width: 360,
        height: 360,
        objectFit: 'cover'
    }
}

export default  (props) => {
    const { title, subTitle, list = [],onJumpToDetail  } = props || {}
    return (
        <div style={{...styles.container}} onClick={onJumpToDetail}>
            <div style={{...styles.wrap}}>
                <p style={{...styles.title}}>{title}</p>
                <p  style={{...styles.subTitle}}>{subTitle}</p>
                <div style={{...styles.content}}>
                {
                    list.map((value, i) => {
                        const { pic } = value || {}
                        return (
                            <div key={`itemlist-${i}`}  style={{ margin: i === 1 || i === 4 ? '0px 30px' : 0 }} > 
                                <LazyLoad height={360} offsetVertical={200} style={{background: '#ccc'}}>
                                    <img src={pic} alt="name" style={{...styles.image}}/>
                                </LazyLoad>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
} 