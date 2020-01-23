import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


const styles = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 1000,
        minWidth: 1000,
        paddingBottom: 60,
        paddingTop: 77,
        margin: '0 auto'
    },
    item: {
        width: 300,
        height: 300,
        cursor: 'pointer'
    },
    image: {
        width: 300,
        height: 300,
        flexShrink: 0
    }
}

export default withRouter((props) => {
    const [state, setState] = useState({
        sartData: {},
        items: [],
        commentList: [],
        showCell: window.profile.currentInf || window.profile.currentInf === 0,
        current: window.profile.currentInf || 0
    })
    const { id: netId } = props.match.params

    let inputValue = ''

    const handlePostCommit = () => {
        if(!inputValue) {
            alert('不能空提交')
            return 
        }
        axios.post('/index.php?c=api/chimipost/addcomment', `content=${inputValue}&type=wh&id=${netId}`).then(res => {
            const { data: { errorCode } = {} } = res || {}
            if(errorCode === 0) {
                alert('success')
                inputValue = ''
                axios.get(`/index.php?c=api/chimi/comment&id=${netId}&type=wh`).then(res => {
                    const { data: { data: { list: commentList = []} = {} } = {} } = res || {}
                    setState({
                        ...state,
                        commentList
                    })
                }).catch(e => {console.log(e)})
            }

        }).catch(e => {
            console.error(e)
        })
    }


    

    useEffect(() => {
        async function request (){
            const [result,comment ] = await  Promise.all([axios.get(`/index.php?c=api/chimi/wanghong&id=${netId}`), axios.get(`/index.php?c=api/chimi/comment&id=${netId}&type=wh`)])
            const { data: { data } = {} } = result || {}
            const { data: { data: { list: commentList = []} = {} } = {} } = comment || {}
            const { list = [] } = data || {}
            const [ netData ] = list || {}
            const { sartData, items } = netData || {}
            console.log(sartData)
            setState({
                ...state,
                sartData,
                items,
                commentList
            })
        }
        request()
     
        
    }, [netId])

    const { sartData, items, showCell , current, commentList = []} = state || {}

    const handleShowMask = (status, index) => {
        setState({
            ...state,
            showCell: status,
            current: index
        })
    }

    const { pic: currentPic}  = ( items && items[current] ) || {}

   
    const {pic, desc, like, fllow, isLike, title, id, itemPic }  = sartData || {}

    return (
        <div style={{...styles.wrap}}>
            <div style={{height: 90, marginBottom: 30, display: 'flex', alignItems: 'center', cursor: 'pointer'}} >
                <img src={pic} alt="" style={{ width: 90, height: 90, borderRadius: 45}}/>
                <div style={{height: 58, marginLeft: 20}}>
                    <p style={{fontSize: 14, color: '#333',lineHeight: '14px', marginBottom: 8, fontWeight: 'bold'}}>{title}</p>
                    <div style={{display: 'flex', marginBottom: 8, lineHeight: '14px'}}>
                        { desc ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{desc}</p> : null}
                        { like ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Like ${like}`}</p> : null}
                        { fllow ? <p style={{fontSize: 12, color: '#333', marginRight: 30}}>{`Fllow ${fllow}`}</p> : null}
                    </div>
                    {
                        isLike ? null : <p style={{ color: '#921C59', fontSize: 12}}>{'Fllow and get her coupon'}</p>
                    }
                </div>
            </div>
            <div style={{width: 1000, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    Array.isArray(items) ? items.map((v, i) => {
                        const { pic } = v || {}
                        return (
                            <div style={{...styles.item}} key={`wanghongItem-${i}`} onClick={() => {
                                handleShowMask(true, i)
                            }}>
                                <img alt="" src={pic} style={{...styles.image}}/>
                            </div>
                        )
                    }) : null
                }
            </div>
            {
                    showCell  ? (
                        <div onClick={e => {
                            const isClickMask = e.target.id 
                            isClickMask && handleShowMask(false,  null)
                        }} id="mask" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 99}}>
                            <div style={{width: 900, height: 600, backgroundColor: '#fff', display: 'flex'}}>
                                <img alt="" style={{width: 600, height: 600, objectFit: 'cover'}} src={currentPic}/>
                                <div style={{flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: 20}}>
                                    <div style={{height: 100, display: 'flex',alignItems: 'center',  borderBottom: '1px solid #999'}}>
                                        <img src={pic} alt="" style={{ width: 60, height: 60, borderRadius: 30}}/>
                                        <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                            <p style={{fontSize: 12, color: '#000', fontFamily: 'bold'}}>{title}</p>
                                            <p style={{fontSize: 12, color: '#921C59', fontFamily: 'bold'}}>{'Fllow'}</p>
                                        </div>
                                    </div>
                                    <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                        <div style={{height: 317, overflow: 'scroll'}}>
                                            {
                                                commentList.map(v => {
                                                    const { content } = v || {} 
                                                return <p style={{fontSize: 14,wordBreak: 'break-all', color: '#333', overflow: 'hidden',marginTop: 30, width: 264}}>{content}</p>
                                                })
                                            }
                                        </div>
                                        <div onClick={() => {
                                            props.history.push('/')
                                        }} style={{display: 'flex', cursor: 'pointer', alignItems: 'center', height: 60, marginTop: 12, border: '1px solid #D8D8D8'}}>
                                            <img src={pic} style={{ objectFit: 'cover', height: 60, width: 60, borderRight: '1px solid #D8D8D8'}} alt=""/>
                                            <p style={{marginLeft: 10, fontSize: 12, color: '#4A4A4A'}}>{title}</p>
                                        </div>
                                        <div style={{height: 90, paddingRight: 12, display: 'flex', alignItems: 'center'}}>
                                            <input style={{flex: 1, paddingRight: 12, fontSize: 14, color: '#999'}} onChange={ e => {
                                                e.stopPropagation()
                                                inputValue = e.target.value
                                            }}
                                            placeholder={'Add comments'}
                                            />
                                            <p onClick={handlePostCommit} style={{fontSize: 14,color: '#921C59', cursor: 'pointer'}}>{'Release'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    ) : null
            }
        </div>
    )
})