import React from 'react'
import  Magnifier from './components/Magnifier'
import axios from 'axios'
import {
    withRouter
    } from "react-router-dom";

const styles = {
    wrap: {
        minWidth: 1440,
        paddingBottom: 87,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    container: {
        width: 1440,
        margin: '0 auto'
    },
    content:{
        margin: '0 auto',
        width: 1160,
        paddingTop: 51,
        boxSizing: 'border-box',
        minWidth: 1160,
        height: 790,
        minHeight: 790,
        display: 'flex',
        justifyContent: 'space-between'
    },
    contentInfo:{
        width: 650,
        paddingLeft: 61,
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
    title:{
        fontSize: 24,
        lineHeight: '24px',
        color: '#333',
        marginBottom: 6,
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
        width: 420,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: '#E83D49'
    },
    button:{
        color: '#fff',
        fontSize: 18
    },
    more:{
        display: 'flex',
        justifyContent: 'space-between',
        width: 1160,
        minWidth: 1160,
        overflow: 'hidden',
        margin: '0 auto',
        paddingBottom: 60
    },
    productInfo:{
        width: 800,
        overflow: 'hidden'
    },
    recommendInfo:{
        width: 250,
        overflow: 'hidden'
    },
    productTitle:{
        height: 50,
        lineHeight: '50px',
        fontSize: 18,
        color: '#000',
        marginBottom: 80,
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
        width: 260,
        height: 382,
        marginBottom: 20,
        overflow: 'hidden'
    },
    itemPic:{
        objectFit: 'cover',
        height: 260
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
    }
}

class Detail extends React.Component {

    state = {
        productInfo: {},
        MagnifierData: {
            list:[]
        },
        recommendItem: [],
        shareImages: [
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            },
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            },
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            },
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            },
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            },
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            },
            {
                pic: 'https://s1.ax1x.com/2019/11/19/MRP78J.png'
            }
        ]
    }

    componentDidMount() {
        const { match: { params } = {} } = this.props
        const { id } = params || {}
        axios.get(`/index.php?c=api/chimi/detail&id=${id}`).then(res => {
            const { data: { data } = {} } = res || {}
          
            this.setState({
                ...data
            })
        }).catch(err => {
            console.error(err)
        })
    }


    handleClickAddProduct = () => {
        const { match: { params } = {} } = this.props
        const { id } = params || {}

        axios.post('/index.php?c=api/chimipost/addcart',`id=${id}&num=1`, {
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
       
        const { productInfo,  recommendItem = [], shareImages = [], } = this.state
 
        const { title = '', desc = '', price = '', originPrice = '', couponText = '', like = '', share = '' } = productInfo || {}
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.container}}>
                    <div style={{...styles.content}}>
                        <div>
                            <Magnifier {...this.state.MagnifierData}/>
                        </div>
                        <div style={{...styles.contentInfo}}>
                            <p style={{...styles.title}}>{title}</p>
                            <p style={{...styles.desc}}>{desc}</p>
                            <div style={{...styles.priceInfo}}>
                                { price ? <p style={{fontSize: 18, color: '#000', marginRight: 10}}>{`$${price}`}</p> : null}
                               { originPrice ?  <p style={{fontSize: 18, color: '#999'}}>{`$${originPrice}`}</p> : null }
                            </div>
                           { couponText ?  <p style={{...styles.coupon}}>{couponText}</p> : null }
                           { like || like === 0?  <p style={{...styles.like}}>{`${like}人喜欢`}</p> : null}
                            { share || share === 0 ? <p style={{...styles.share}}>{`${share}人分享`}</p> : null}
                            <div style={{...styles.buttonWrap}} onClick={this.handleClickAddProduct}>
                                <p style={{...styles.button}}>{'+加入购物车'}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{...styles.more}}>
                        <div style={{...styles.productInfo}}>
                            <p style={{...styles.productTitle}}>{'产品介绍'}</p>
                            <img src="https://s1.ax1x.com/2019/11/19/MR9e54.png" alt="" style={{objectFit: 'cover'}}/>
                            <img src="https://s1.ax1x.com/2019/11/19/MR9e54.png" alt="" style={{objectFit: 'cover'}}/>
                            <img src="https://s1.ax1x.com/2019/11/19/MR9e54.png" alt="" style={{objectFit: 'cover'}}/>
                            <img src="https://s1.ax1x.com/2019/11/19/MR9e54.png" alt="" style={{objectFit: 'cover'}}/>
                        </div>
                        <div style={{...styles.recommendInfo}}>
                            <p style={{...styles.recommendTitle}}>{'推荐商品'}</p>
                            {
                                recommendItem.map((v, i) => {
                                    const { pic, title ,price, originPrice, coupon} = v|| {}
                                    return (
                                        <div style={{...styles.itemWrap}} key={`recomend-${i}`}>
                                            <img src={pic} alt="" style={{...styles.itemPic}}/>
                                            <p style={{ marginTop: 20, marginBottom: 20, fontSize: 24, color: '#000'}}>{title}</p>
                                           <div style={{...styles.priceInfo}}>
                                                <p style={{fontSize: 18, color: '#000', marginRight: 4}}>{`$${price}`}</p>
                                                <p style={{fontSize: 18, color: '#999'}}>{`$${originPrice}`}</p>
                                           </div>
                                           <p style={{position: 'absolute', top: 202, left: 0,  fontSize: 18, color: '#fff', paddingLeft: 17, paddingTop: 3, paddingBottom: 3, paddingRight: 7,  backgroundColor: '#E83D49'}}>{coupon}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{...styles.shareContent}}>
                        <div style={{...styles.shareImageWrap}}>
                            {
                                shareImages.map((v, i) => (<img key={`share-img-${i}`} src="https://s1.ax1x.com/2019/11/19/MRP78J.png" alt=""  style={{...styles.shareImage}}/>))
                            }
                        </div>
                        <div style={{...styles.shareButtonWrap}}>
                            <div style={{...styles.shareButton}}>
                                <p style={{...styles.shareButtonText}}>{'分享该商品佩戴照片'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Detail)