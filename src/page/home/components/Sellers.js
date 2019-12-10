
import React, { useState } from 'react'
import Collect from '../../../components/collection/' 
import '../../../App.css'

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
    },
    wrap: {
        width: 1110,
        height: 426,
        minHeight: 426,
        overflow: 'hidden'
    },
    title:{
        fontSize: 36,
        lineHeight: '36px',
        fontWeight: '500',
        height: 36,
        color: '#921C59',
        textAlign: 'center'
    },
    subTitle:{
        marginTop: 10,
        fontWeight: '500',
        marginBottom: 30,
        fontSize: 20,
        lineHeight: '20px',
        height: 20,
        color: '#921C59',
        textAlign: 'center' 
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 320,
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    image:{
        width: 240,
        height: 320,
        objectFit: 'cover'
    }
}

export default  (props) => {
    const { title, subTitle, list = [], history  } = props || {}
    
    if(!Array.isArray(list) || !list.length) return null
    
    const defaultList = list.map(v => ({
        star: 'item',
        item: 'back'
    }))
    
    const [classNameList, setClassName] = useState(defaultList)


    const handleProcesscClassStatus = (id, status) => {
        const _classNameList = classNameList.map((v, i) => {
            if(status) {
                if(id === `card${i}` ) {
                    return status
                }
                return v
            }
            return {
                star: 'item',
                item: 'back'
            }
        })
        setClassName(_classNameList)
    }


    return (
        <div style={{...styles.container}} >
            <div style={{...styles.wrap}}>
                <p style={{...styles.title}}>{title}</p>
                <p  style={{...styles.subTitle}}>{subTitle}</p>
                <div style={{...styles.content}}>
                {
                    list.map((value, i) => {
                        const { pic, couponText, id, isLike, desc, price, title, originPrice, itemPic } = value || {}
                      
                        return (
                            <div 
                            onClick={() => {
                                history.push(`/detail/${id}`)
                                document.body.scrollTop = document.documentElement.scrollTop = 0
                            }} 
                            key={`itemlist-${i}`} 
                            style={{cursor: 'pointer', position: 'relative', perspective:1200 }} 
                            onMouseEnter={(e) => {
                                const id = e.target.id
                              
                                handleProcesscClassStatus(id, {
                                    star: 'item1',
                                    item: 'back1'
                                })         

                            }} 
                            onMouseLeave={e => {
                                const id = e.target.id
                                handleProcesscClassStatus(id) 
                            }}>     
                                <div  className={classNameList[i] && classNameList[i].star} style={{ position: 'absolute', height: 320, overflow: 'hidden', top: 0, left: 0, background: '#fff', zIndex: 1}}>
                                        <img  id={`card${i}`} src={pic} alt="" style={{...styles.image}}/>
                                  </div>
                                  <div  className={classNameList[i] && classNameList[i].item} style={{width: 240, height: 320, background: '#F0F0F0'}}>
                                      <img src={itemPic} alt="" style={{width: 240, height: 240, objectFit: 'cover'}}/>
                                      <div style={{marginTop: 16}}>
                                           {title ?  <p style={{marginBottom: 10, fontSize: 12, color: '#000', textAlign: 'center'}}>{title}</p> : null }
                                           <div style={{display: 'flex', justifyContent: 'center'}}>
                                                {price ? <p style={{fontSize: 12, color: '#000', marginRight: 7}}>{`$${price}`}</p> : null}
                                                {originPrice ? <p style={{fontSize: 12, color: '#999'}}>{`$${originPrice}`}</p> : null}
                                           </div>
                                      </div>
                                  </div>
                                  <Collect isCollect={isLike} id={id}/>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
} 