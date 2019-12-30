
import React from 'react'

import '../../../App.css'

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    wrap: {
        width: 1110,
        height: 487,
        overflow: 'hidden'
    },
    title:{
        fontSize: 36,
        lineHeight: '36px',
        fontWeight: '500',
        height: 36,
        color: '#333',
        textAlign: 'center'
    },
    subTitle:{
        marginTop: 10,
        marginBottom: 30,
        fontWeight: '500',
        fontSize: 20,
        lineHeight: '20px',
        height: 20,
        color: '#333',
        textAlign: 'center' 
    },
    content: {
        height: 390,
        minHeight: 390,
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    image:{
        width: 240,
        height: 320,
        objectFit: 'cover'
    },
    name:{
        width: 240,
        marginTop: 5,
        marginBottom: 10,
        overflow: 'hidden',
        lineHeight: '24px',
        color: '#333',
        fontWeight: '500',
        textOverflow: 'ellipsis',
        fontSize: 16,
        height: 24,
    },
    desc:{
        width: 240,
        height: 20,
        overflow: 'hidden',
        lineHeight: '20px',
        color: '#333',
        textOverflow: 'ellipsis',
        fontSize: 12
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
                        const { pic, name, desc, id} = value || {}
                       
                        return (
                            <div onClick={() => {
                                id && history.push(`/celebrity/content/${id}`)
                                document.body.scrollTop = document.documentElement.scrollTop = 0
							}} key={`star-${i}`} style={{cursor: 'pointer', position: 'relative' }} > 
                                    <img src={pic} alt="name" style={{...styles.image}}/>
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