import React from 'react'
import  Magnifier from './components/Magnifier'
import axios from 'axios'
import {
    withRouter
    } from "react-router-dom";
import { setState } from 'expect/build/jestMatchersObject';

const star = 'https://s2.ax1x.com/2020/01/05/lDP78I.png'


const allStar = 'https://s2.ax1x.com/2020/01/05/lDpe3V.png' 

const styles = {
    wrap: {
        minWidth: 1263,
        paddingBottom: 50,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    container: {
        width: 1263,
        margin: '0 auto'
    },
    content:{
        width: 1263,
        paddingTop: 50,
        boxSizing: 'border-box',
        minWidth: 1263,
        height: 541,
        minHeight: 541,
        display: 'flex',
        overflow: 'hidden',
    },
    contentInfo:{
        width: 580,
        marginLeft: 50,
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
    title:{
        fontSize: 18,
        heightL: 20,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '18px',
        color: '#000',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 24,
        lineHeight: '24px',
        color: '#333',
        marginBottom: 60
    },
    priceInfo:{
        display: 'flex',
        height: 20,
        marginBottom: 20,
        overflow: 'hidden'
    },
    coupon:{
        display: 'inline',
        fontSize: 18,
        color: '#fff',
        paddingLeft: 17,
        paddingTop: 3,
        paddingBottom: 3,
        paddingRight: 7,
        backgroundColor: '#E83D49',
    },
    like:{
        marginTop: 20,
        fontSize: 18,
        color: '#000',
        marginBottom: 10
    },
    share:{ 
        fontSize: 18,
        color: '#000',
        marginBottom: 39
    },
    buttonWrap:{
        width: 520,
        height: 50,
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: '#921C59'
    },
    button:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: '20px'
    },
    more:{
        display: 'flex',
        marginTop: 70,
        justifyContent: 'space-between',
        width: 1263,
        minWidth: 1263,
        overflow: 'hidden',
        paddingBottom: 60
    },
    productInfo:{
        width: 1000,
        overflow: 'hidden'
    },
    recommendInfo:{
        width: 250,
        overflow: 'hidden'
    },
    productTitle:{
        height: 50,
        lineHeight: '30px',
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        borderBottom: '1px solid #4A4A4A'
    },
    recommendTitle: {
        height: 50,
        lineHeight: '50px',
        marginBottom: 20,
        fontSize: 18,
        color: '#000',
        borderBottom: '1px solid #4A4A4A'
    },
    itemWrap: {
        position: 'relative',
        width: 250,
        height: 252,
        marginBottom: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid #eee'
    },
    itemPic:{
        objectFit: 'cover',
        height: 248,
        width: 248
    },
    shareContent: {
        width: 1360,
        minWidth: 1360,
        margin: '0 auto',
        overflow: 'hidden'
    },
    shareImage: {
        width: 340,
        height: 340,
        flexShrink: 0
    },
    shareImageWrap: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    shareButtonWrap: {
        height: 110,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    shareButton: {
        width: 420,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E83D49'
    },
    shareButtonText: {
        fontSize: 18,
        color: '#fff'
    },
    starWrap: {
        display: 'flex'
    }
}

class Detail extends React.Component {

    state = {
        num: 1,
        productInfo: {},
        wanghongInfo: {},
        MagnifierData: {
            list:[]
        },
        comment: [],
        recommendItem: [],
       
    }

    cellNum = 1


    async getData(id) {
        const result = await Promise.all([axios.get(`/index.php?c=api/chimi/detail&id=${id}`), axios.get(`/index.php?c=api/chimi/comment&id=${id}&type=item`)])
        const [showData, recommendData] = result || []
        
        const { data: { data: _showdata = {} } = {} } = showData || {}
        const { data: { data: { list = [] } = {} } = {} } = recommendData || {}

       this.setState({
           ..._showdata,
           comment: list
       })
    }

    componentDidMount() {
        const { match: { params } = {} } = this.props
        const { id } = params || {}
        this.getData(id)
        
    }

    handleSetProductNum = (type) => {
        switch(type) {
            case 'add':
                this.cellNum += 1
                break;
            case 'del':
                this.cellNum -= 1
                if(this.cellNum < 1) {
                    this.cellNum = 1
                }
               
                break;
            default: 
                break;
        }

        this.setState({
            num: this.cellNum
        })


    }


    handleClickAddProduct = () => {
        const { match: { params } = {} } = this.props
        const { id } = params || {}

        axios.post('/index.php?c=api/chimipost/addcart',`id=${id}&num=${this.cellNum}`, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          const { data: { errorCode } = {} }  = res || {} 
          if(errorCode === 0) {
              alert('加购成功')
          } else {
            alert('加购失败')   
          }
            
        }).catch(error => {
            console.log(error)
        })
    }


    render() {
       
        const { productInfo, comment = [],  recommendItem = [], wanghongInfo } = this.state
        const  {  name = '1', pic = 'https://s2.ax1x.com/2020/01/05/lDSHne.png' , desc: whDesc = '1' } = wanghongInfo || {}
 
        const { title = '', desc = '', price = '', originPrice = '', couponText = '', like = '', share = '', starRatio = [true, false] } = productInfo || {}
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.container}}>
                    <div style={{...styles.content}}>
                        <div>
                            <Magnifier {...this.state.MagnifierData}/>
                        </div>
                        <div style={{...styles.contentInfo}}>
                            <p style={{...styles.title}}>{title}</p>
                            <div style={{...styles.starWrap}}>
                                {
                                    Array.isArray(starRatio) && starRatio.length ? starRatio.map(v => {
                                    
                                        const url = v ? allStar : star
                                        return <img alt="" src={url} style={{width: 20, height: 20, marginRight: 6}}/>
                                    }) : null
                                }
                            </div>
                            <div style={{display: 'flex', width: 520, boxSizeing: 'border', paddingTop: 8, paddingLeft: 20, height: 80, border: '1px solid #eee', marginTop: 20}}>
                                <div>
                                    <img alt="" src={pic} style={{width: 40, height: 40, borderRadius: 20}}/>
                                    <p style={{fontSize: 12, color: '#333',lineHeight:'12px', marginTop: 5 }}>{name}</p>
                                </div>
                                <p style={{marginTop: 20, fontSize: 12,color: '#333'}}>
                                    {whDesc}
                                </p>
                            </div>
                            <p style={{fontSize: 30, color: '#000', marginTop: 90, lineHeight: '30px'}}>{`$${price}`}</p> 
                            <div style={{display: 'flex', marginTop: 61}}>
                                <p style={{fontSize: 12, color: '#000'}}>{'Qty'}</p>
                                <div style={{display: 'flex', marginLeft: 30}}>
                                    <span style={{fontSize: 20, color: '#000', cursor: 'pointer'}} onClick={() => {
                                        this.handleSetProductNum('del')
                                    }}>{'-'}</span>
                                    <span style={{fontSize: 20, color: '#000', margin: '0 20px'}}>{this.cellNum}</span>
                                    <span style={{fontSize: 20, color: '#000', cursor: 'pointer'}} onClick={() => {
                                        this.handleSetProductNum('add')
                                    }}>{'+'}</span>
                                </div>
                            </div>
                            <div style={{...styles.buttonWrap}} onClick={this.handleClickAddProduct}>
                                <p style={{...styles.button}}>{'ADD TO BAG'}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{...styles.more}}>
                        <div style={{...styles.productInfo}}>
                            <p style={{...styles.productTitle}}>{'SHE SAY'}</p>
                            {
                                comment.map(v => {
                                    console.log(v)
                                    const { title, uname, content } = v ||{}
                                    return (
                                        <div style={{
                                            height: 202,
                                            flex: 1,
                                            paddingTop: 30,
                                            boxSizing: 'border-box',
                                            borderBottom: '1px solid #ccc',
                                            display: 'flex'
                                        }}>
                                           <div style={{marginRight: 87}}>
                                                <p style={{fontSize: 12, color: '#000', fontWeight: 'bold'}}>{uname}</p>
                                           </div>
                                           <p style={{fontSize: 12, color: '#333'}}>
                                            {content}
                                           </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{...styles.recommendInfo}}>
                            <p style={{...styles.recommendTitle}}>{'推荐商品'}</p>
                            {
                                recommendItem.map((v, i) => {
                                    const { pic, id, title ,price, originPrice, coupon} = v|| {}
                                   
                                    return pic ? (
                                        <div style={{...styles.itemWrap}} key={`recomend-${i}`} onClick={() => {
                                            this.props.history.push(`/detail/${id}`)
                                            window.location.reload()
                                            document.body.scrollTop = document.documentElement.scrollTop = 0
                                           
                                        }}>
                                            <img src={pic} alt="" style={{...styles.itemPic}}/>
                                    
                                        </div> 
                                    ): null
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Detail)