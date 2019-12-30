import React , { useState } from 'react'
import Collect from './collection/index'

export default (props) => {
    const { history, pic, imgStyle = {} , couponText, id, isLike, desc, price, title, originPrice, itemPic } = props || {}


    const [ state, setState] = useState({
        star: 'item',
        item: 'back'
    })

    const {star, item} = state || {}

    const  handleProcesscClassStatus = (id, status) => {
       
        setState(status)
    }
                      
    return (
        <div 
        onClick={() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }} 
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
            handleProcesscClassStatus(id, {
                star: 'item',
                item: 'back'
            }) 
        }}>     
            <div  className={star} style={{ position: 'absolute', height: 320, overflow: 'hidden', top: 0, left: 0, background: '#fff', zIndex: 1}}>
                    <img   src={pic} alt="" style={{...imgStyle}}/>
            </div>
            <div  className={item} style={{width: 240, height: 320, background: '#F0F0F0', ...imgStyle}}>
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
}