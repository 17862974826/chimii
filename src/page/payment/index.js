import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const styles = {
    wrap: {
        position: 'relative',
        width: 1200,
        paddingTop: 78,
        paddingBottom: 90,
        minWidth: 1200,
        margin: '0 auto'
    },
    container: {
        width: 660
    },
    title: {
        fontSize: 30,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    buttonWrap: {
        width: 240,
        cursor: 'pointer',
        height: 40,
        margin: '40px auto',
        backgroundColor: 'rgb(146, 28, 89)'
    },
    button: {
        fontSize: 18,
        lineHeight: '40px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    temWrap: {
        position: 'relative',
        width: 260,
        height:260,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        marginBottom: 20,
        overflow: 'scroll'
    },
    item: {
        fontSize: 12,
        height: 22,
        lineHeight: '22px',
        marginBottom: 6,
        textOverflow: 'ellipsis',
        width: 230,
        overflow: 'hidden',
        color: '#000',
        flexShrink: 0,
        fontWeight: 'bold'
    },
    opt: {
        fontSize: 14,
        color: '#000',
        cursor: 'pointer'
    },
    payment: {
        marginTop: 50
    },
    order: {
        position: 'absolute',
        paddingTop: 40,
        paddingLeft: 30,
        paddingBottom: 30,
        paddingRight: 30,
        boxSizing: 'border-box',
        top: 130,
        right: 0,
        width: 460,
        height: 400,
        overflow: 'scroll',
        background: '#f5f5f5'
    },
    orderTitle: {
        marginBottom: 34,
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold'
    },
    orderLine: {
        marginTop: 30,
        marginBottom: 30,
        width: 400,
        height: 1,
        background: '#666'
    },
    buttonClick: {
        marginTop: 69,
        height: 50,
        background: '#921C59',
        lineHeight: '50px',
        textAlign: 'center',
        cursor: 'pointer'
    }
}

class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartData: {},
            priceInfo: {},
            feeList: [{
                price: '8',
                desc: '6 - 8 Business Days. With Detailed Tracking Information. Need Correct Phone Number.'
            }],
            address: {
                title: 'Distribution addres',
                list: []
            },
            payment: {
                title: 'Payment method'
            }
        }
    }

    handleCalPrice = (itemList = []) => {

        this.itemList = itemList.map(v => {
            const { id, num } = v || {}
            return `itemIds[]=${id},${num}`
        }).join('&')

        axios.get(`/index.php?c=api/chimi/price&${this.itemList}&code=${this.couponCode}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { prizeInfo } = data || {}
            this.setState({
                priceInfo: prizeInfo
            })
        }).catch(error => {
            console.error(error)
        })
    }

    handleCreateOrder = () => {
        const { address ,cartData } = this.state
        const { list } = address || {}
        const [ addressData = {} ] = list || []

        
        const _adress = JSON.stringify(addressData)

        const _cartData = Object.keys(cartData).map(v => {
            return `itemIds[]=${v},${cartData[v]}&`
        }).join('')
        const params = _cartData + `address=${_adress}&`
       
        axios.post('/index.php?c=api/chimipost/saveorder',params, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            const { data: {  errorCode } = {}} = res || {}
            
            if(errorCode === 0) {
                alert('保存成功')
                this.props.history.push('/demo')
            } else {
                alert('保存失败')
            }
        }).catch(e => {
            console.log(e)
        })
    }

    async handleGetData() {
       
        const result = await this.fetchData()
        const [ cartAllData, adressAllData ] = result || []
        const { data: { data } = {} } = cartAllData || {}
        const { data: { data: adreessData } = {}} = adressAllData || {}
        const {  cartData = {}, itemList = []  } = data || {}
        const { address  = [] } = adreessData || {}

        this.handleCalPrice(itemList)


        this.setState({
            cartData,
            itemList,
            address: {
                ...this.state.address,
                list: address
            }
        })


    }

    handleProcessCoupon = () => {
        const { itemList = [] } = this.state
        this.handleCalPrice(itemList)
    }

    async fetchData() {
        return Promise.all([axios.get('/index.php?c=api/chimi/cart'), axios.get('/index.php?c=api/chimi/udata&types=address')])
    }


    componentDidMount() {
        this.handleGetData()
    }

    render() {
        const { address, payment, feeList, priceInfo } = this.state
        const { title, list = [] } = address || {}
        const { title: payTitle} = payment || {}
        const { discountPrice, itemPrice, shippingPrice } = priceInfo || {}
        const { history } = this.props
      
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.container}}>
                    <p style={{...styles.title}}>{title}</p>
                    <div style={{ display: 'flex',  flex: 1, flexWrap: 'wrap' }}>
                        {
                            Array.isArray(list) && list.length ? list.slice(0, 3).map((v, i) => {
                               
                                return (
                                    <div key={`addresslist-${i}`} style={{ ...styles.temWrap, marginRight: 20, justifyContent: 'flex-start',alignItems: 'flex-start', paddingRight: 20,paddingLeft: 20, paddingTop: 20  }}>
                                   {
                                       i === 0 ?  <div  style={{position: 'absolute',left: 0,  top: 0, height: 6,width: 260, background: '#921C59'}}/> : null
                                   }
                                    {
                                        Object.keys(v).map((key, i) => ( <p key={`addressItem-${i}`} style={{...styles.item}}>{`${key}: ${v[key]}`}</p>))
                                    }
                                    <div style={{width: 230, display: 'flex', justifyContent: 'flex-end', paddingRight: 10, boxSizing: 'border-box'}}>
                                        <p style={{...styles.opt, marginRight: 20, marginBottom: 9, fontWeight: 'bold'}} onClick={() => {
                                            history.push(`/adress/add/update-${i}?from=payment`)
                                        }}>{'edit'}</p>
                                    </div>
                                </div>
                                )
                            }) : null
                        }
                        {
                             <div style={{ ...styles.temWrap, border: '1px dashed #ccc',  cursor: 'pointer', }} onClick={() => {
                                history.push('/adress/add/new?from=payment')
                            }}>
                                <img src="https://s2.ax1x.com/2019/12/22/QzDgEj.png" alt="" style={{width: 40, height: 40}} />
                                <p style={{marginTop: 20, fontSize: 16, color: '#4a4a4a', textAlign: 'center'}}>{'Add New Address'}</p>
                            </div>
                        }
                    </div>
                    <div style={{...styles.payment}}>
                        <p style={{marginBottom: 30, fontSize: 30, color: '#333', fontWeight: 'bold'}}>{'Payment Method'}</p>
                        <img src="https://s2.ax1x.com/2020/01/02/ltLOTH.png" alt="" style={{width: 206, height: 50, objectFit: 'contain'}}/>
                        <p style={{marginTop: 50,marginBottom: 40,  fontSize: 30, color: '#333', fontWeight: 'bold'}}>{'Choose Your Shipping Options'}</p>
                        {
                            feeList.map(v => {
                                const { price, desc } = v || {}
                                return (
                                    <div style={{flex: 1, display: 'flex', height: 38, alignItems: 'center'}}>
                                        <input type='radio'  style={{ WebkitAppearance: 'radio', 'cursor': 'pointer', width: 20, height: 20, border: '1px solid #921C59', borderRadius: 10}} />
                                        <div style={{marginLeft: 30}}>
                                            <div style={{marginBottom: 10}}>
                                                <span style={{fontSize: 14, color: '#333', fontWeight: 'bold'}}>{'STANDARD SHIPPING '}</span>
                                                <span style={{fontSize: 14, color: '#333', fontWeight: 'bold'}}>{`$${price}`}</span>
                                            </div>
                                            <p style={{fontSize: 12, color: '#333'}}>{desc}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                      
                    </div>
                    <div style={{...styles.order}}>
                    <p style={{...styles.orderTitle}}>{'Order Summary'}</p>
                    <div style={{display: 'flex',marginBottom: 20,  justifyContent: 'space-between'}}>
                        <p style={{fontSize: 14, color: '#000'}}>{'shippingPrice'}</p>
                        <p style={{fontSize: 14, color: '#333'}}>{shippingPrice}</p>
                    </div>
                    <div style={{display: 'flex', marginBottom: 20, justifyContent: 'space-between'}}>
                        <p style={{fontSize: 14, color: '#000'}}>{'itemPric'}</p>
                        <p style={{fontSize: 14, color: '#333'}}>{itemPrice}</p>
                    </div>
                    <div style={{display: 'flex', marginBottom: 20, justifyContent: 'space-between'}}>
                        <p style={{fontSize: 14, color: '#000'}}>{'discountPrice'}</p>
                        <p style={{fontSize: 14, color: '#333'}}>{discountPrice}</p>
                    </div>
                    <div style={{marginTop: 38}}>
                        <p style={{fontSize: 20,marginBottom: 8, color: '#000', fontWeight: 'bold'}}>{'My Coupon '}</p>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <input style={{width: 300, height: 30, border: '1px solid #979797'}} onChange={e => {
                                this.couponCode = e.target.value
                            }}/>
                            <div
                                onClick={this.handleProcessCoupon}
                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 30, border: '1px solid #921C59'}}>
                                 <p style={{color: '#921C59', fontSize: 16}}>{'APPLY'}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{...styles.buttonClick}} onClick={() => {
                        this.handleCreateOrder()
                    }}>
                        <p style={{color: '#fff', fontSize: 20}}>{'Continue'}</p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Payment)