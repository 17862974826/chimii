import React from 'react'
import axios from 'axios'
import {
    withRouter
	} from "react-router-dom";

const styles = {
    wrap: {
        position: 'relative',
        width: 1440,
        minWidtj: 1440,
        paddingTop: 90,
        paddingBottom: 152,
        margin: '0 auto'
    },
    title: {
        fontSize: 46,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 25,
    },
    line: {
        width: 900,
        height: 2,
        background: '#999',
        marginBottom: 30,
    },
    cellWrrap: {
        width: 900,
        height: 300,
        marginBottom: 30,
        display: 'flex',
        overflow: 'hidden'
    },
    pic: {
        width: 300,
        height: 300,
        marginRight: 30
    },
    content: {
        width: 570,
        height: 300,
        overflow: 'hidden'
    },
    itemTitle: {
        marginBottom: 90,
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold'
    },
    contentInfo: {
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',    
        alignItems: 'flex-end'
    },
    label: {
        marginBottom: 18,
        fontSize: 20,
        color: '#666'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    },
    order: {
        position: 'fixed',
        paddingTop: 30,
        paddingLeft: 50,
        paddingBottom: 40,
        paddingRight: 50,
        boxSizing: 'border-box',
        top: 170,
        right: 40,
        width: 500,
        height: 658,
        overflow: 'scroll',
        background: '#f5f5f5'
    },
    orderTitle: {
        marginBottom: 60,
        fontSize: 46,
        color: '#333',
        fontWeight: 'bold'
    },
    orderLine: {
        marginTop: 30,
        marginBottom: 30,
        width: 400,
        height: 2,
        background: '#666'
    },
    button: {
        marginTop: 60,
        width: 400,
        height: 90,
        background: '#921C59',
        lineHeight: '90px',
        textAlign: 'center',
        cursor: 'pointer'
    }
}


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            priceInfo: {}
        }
    }

    handleDeletePriduct = index => {
        const { cart = [] } = this.state

        const _cart = cart.map((v, i) => {
            let  { num } = v || {}

            if(i === index) {
                return {
                    ...v,
                    num: num <= 1 ? 1: --num
                }
           } 

           return {
               ...v
           }
         
        })

        this.handleCalPrice(_cart)
       
        this.setState({
            cart: _cart
        })
    }

    handleAddProduct = (index) => {

        const { cart = [] } = this.state

        const _cart = cart.map((v, i) => {
            let  { num } = v || {}

            if(i === index) {
                return {
                    ...v,
                    num: num ? ++num : 1
                }
           } 

           return {
               ...v
           }
         
        })

        this.handleCalPrice(_cart)
       
        this.setState({
            cart: _cart
        })
    }

    handleCalPrice = (itemList = []) => {

        this.itemList = itemList.map(v => {
            const { id, num } = v || {}
            return `itemIds[]=${id},${num}`
        }).join('&')

        axios.get(`/index.php?c=api/chimi/price&${this.itemList}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { prizeInfo } = data || {}
            this.setState({
                priceInfo: prizeInfo
            })
        }).catch(error => {
            console.error(error)
        })
    }

    componentDidMount() {
        axios.get('/index.php?c=api/chimi/cart').then(res => {
            const { data: { data } = {} } = res || {}
            const { itemList = [] } = data || {}
            if(Array.isArray(itemList) && itemList.length) {
                
                this.setState({
                    cart: itemList
                })

                this.handleCalPrice(itemList)
            }
        }).catch(error => console.error(error))
    }

    render() {
        const { cart, priceInfo } = this.state
        const { itemPrice, discountPrice } = priceInfo || {}
        return (
           <div style={{...styles.wrap}}>
               <p style={{...styles.title}}>{'Cart'}</p>
               <div style={{...styles.line}}/>
                <div>
                    {
                        cart.map((v, i) => {
                            const { pic, title, price, size, num } = v || {}
                            return (
                                <div style={{...styles.cellWrrap}} key={`all-cart-${i}`}>
                                    <img src={pic} alt="" style={{...styles.pic}}/>
                                    <div style={{...styles.content}}>
                                        <p style={{...styles.itemTitle}}>{title}</p>
                                        <div style={{...styles.contentInfo}}>
                                            <div>
                                                <p style={{...styles.label}}>{'Size'}</p>
                                                <p style={{...styles.text}}>{size}</p>
                                            </div>
                                            <div>
                                                <p style={{...styles.label}}>{'Number'}</p>
                                                <div>
                                                     <span style={{...styles.text, cursor: 'pointer'}} onClick={() => {
                                                        this.handleDeletePriduct(i, false)
                                                    }}>{'-'}</span>
                                                    <span style={{...styles.text, marginRight: 30, marginLeft: 30}}>{num}</span>
                                                    <span style={{...styles.text, cursor: 'pointer'}} onClick={() => {
                                                        this.handleAddProduct(i, true)
                                                    }}>{'+'}</span>
                                               </div>
                                            </div>
                                            <div>
                                               <p style={{...styles.text}}>{`$${price}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{...styles.order}}>
                    <p style={{...styles.orderTitle}}>{'Order'}</p>
                    {
                        cart.map((v, i) => {
                            const { price, title , num} = v|| {}
                            return (
                                <div key={`price-cart-${i}`} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                                    <p style={{flex: 1, fontSize: 20, color: '#333'}}>{title}</p>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                        <p style={{marginRight: 40}}>{`x ${num}`}</p>
                                        <p style={{fontSize: 20, color: '#333'}}>{`$${price}`}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: 20, color: '#000'}}>{'Logistics cost'}</p>
                        <p style={{fontSize: 20, color: '#333'}}>{discountPrice}</p>
                    </div>
                    <div style={{...styles.orderLine}}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: 20, color: '#000'}}>{'Sum'}</p>
                        <p style={{fontSize: 20, color: '#333'}}>{itemPrice}</p>
                    </div>
                    <div style={{...styles.button}} onClick={() => {
                        this.props.history.push('/payment')
                    }}>
                        <p style={{color: '#fff', fontSize: 36}}>{'Continue'}</p>
                    </div>
                </div>
           </div>
        )
    }
}


export default withRouter(Cart)