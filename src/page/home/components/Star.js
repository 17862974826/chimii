
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
        height: 785,
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
        marginBottom: 30,
        fontWeight: '500',
        fontSize: getFontSize(24),
        lineHeight: '24px',
        height: 24,
        color: '#333',
        textAlign: 'center' 
    },
    content: {
        height: 575,
        minHeight: 575,
        display: 'flex',
        justifyContent: 'center'
    },
    image:{
        width: 360,
        height: 480,
        objectFit: 'cover'
    },
    name:{
        width: 360,
        height: 30,
        marginTop: 30,
        marginBottom: 20,
        overflow: 'hidden',
        lineHeight: '30px',
        color: '#333',
        fontWeight: '500',
        textOverflow: 'ellipsis',
        fontSize: getFontSize(30),
    },
    desc:{
        width: 360,
        height: 24,
        overflow: 'hidden',
        lineHeight: '24px',
        color: '#333',
        textOverflow: 'ellipsis',
        fontSize: getFontSize(24),
    }
}

export default  (props) => {
    const { title, subTitle, list = [], history } = props || {}

    return (
        <div style={{...styles.container}}>
            <div style={{...styles.wrap}}>
                <p style={{...styles.title}} onClick={() => {
                                history.push('/detail/1')
                                document.body.scrollTop = document.documentElement.scrollTop = 0
                             
							}}>{title}</p>
                <p  style={{...styles.subTitle}}>{subTitle}</p>
                <div style={{...styles.content}}>
                {
                    list.map((value, i) => {
                        const { pic, name, desc} = value || {}
                        return (
                            <div onClick={() => {
                                history.push('/celebrity/1')
                                document.body.scrollTop = document.documentElement.scrollTop = 0
                             
							}} key={`star-${i}`} style={{ margin: i === 1 ? '0px 30px' : 0 }}> 
                                <LazyLoad height={480} offsetVertical={300}>
                                    <img src={pic} alt="name" style={{...styles.image}}/>
                                </LazyLoad>
                                <p style={{...styles.name}}>{name}</p>
                                <p style={{...styles.desc}}>{desc}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
} 