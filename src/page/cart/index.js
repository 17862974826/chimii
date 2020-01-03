import React from 'react'
import axios from 'axios'
import {
    withRouter
	} from "react-router-dom";

const styles = {
    wrap: {
        position: 'relative',
        width: 1203,
        minWidth: 1203,
        paddingTop: 78,
        paddingBottom: 100,
        margin: '0 auto'
    },
    title: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    line: {
        width: 660,
        height: 1,
        background: '#666',
        marginBottom: 21,
    },
    cellWrrap: {
        width: 660,
        height: 180,
        marginBottom: 30,
        display: 'flex',
        overflow: 'hidden'
    },
    pic: {
        width: 180,
        height: 180,
        marginRight: 30
    },
    content: {
        flex: 1,
        height: 180,
        overflow: 'hidden'
    },
    itemTitle: {
        marginBottom: 72,
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    contentInfo: {
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',    
        alignItems: 'flex-end'
    },
    label: {
        marginBottom: 20,
        fontSize: 16,
        color: '#999'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000'
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
    button: {
        marginTop: 30,
        width: 420,
        height: 50,
        background: '#921C59',
        lineHeight: '50px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    select: {
        fontSize: 16,
        color: '#000',
        background: '#fff',
        border: 'none'
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
                            const { pic, title, price, originPrice, size, num } = v || {}
                            return (
                                <div style={{...styles.cellWrrap}} key={`all-cart-${i}`}>
                                    <img src={pic} alt="" style={{...styles.pic}}/>
                                    <div style={{...styles.content}}>
                                       { title ?  <p style={{...styles.itemTitle}}>{title}</p> : <div style={{...styles.itemTitle}}/> }
                                        <div style={{...styles.contentInfo}}>
                                            <div>
                                                <p style={{...styles.label}}>{'Size'}</p>
                                                <select style={{...styles.select}} >
                                                        <option value=""  style={{display: 'none'}}>{'Medium'}</option>
                                                        <option value ="volvo">Volvo</option>
                                                        <option value ="saab">Saab</option>
                                                        <option value="opel">Opel</option>
                                                        <option value="audi">Audi</option>
                                                </select>
                                            </div>
                                            <div>
                                                <p style={{...styles.label}}>{'Number'}</p>
                                                <div>
                                                     <span style={{...styles.text, cursor: 'pointer'}} onClick={() => {
                                                        this.handleDeletePriduct(i, false)
                                                    }}>{'-'}</span>
                                                    <span style={{...styles.text, marginRight: 10, marginLeft: 10}}>{num}</span>
                                                    <span style={{...styles.text, cursor: 'pointer'}} onClick={() => {
                                                        this.handleAddProduct(i, true)
                                                    }}>{'+'}</span>
                                               </div>
                                            </div>
                                            <div style={{display: 'flex'}}>
                                               <p style={{...styles.text, marginRight: 20, color: '#999'}}>{`$${originPrice}`}</p>
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
                    <p style={{...styles.orderTitle}}>{'Order Summary'}</p>
                    {
                        cart.map((v, i) => {
                            const { price, title , num} = v|| {}
                           
                            return (
                                <div key={`price-cart-${i}`} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                                    <p style={{flex: 1, fontSize: 14, color: '#333'}}>{title}</p>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                        <p style={{marginRight: 68, fontSize: 14,color: '#333'}}>{`x ${num}`}</p>
                                        <p style={{fontSize: 14, color: '#333'}}>{`$${price}`}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: 14, color: '#000'}}>{'Logistics cost'}</p>
                        <p style={{fontSize: 14, color: '#333'}}>{discountPrice}</p>
                    </div>
                    <div style={{...styles.orderLine}}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: 14, color: '#000'}}>{'Sum'}</p>
                        <p style={{fontSize: 14, color: '#333'}}>{itemPrice}</p>
                    </div>
                    <div style={{...styles.button}} onClick={() => {
                        this.props.history.push('/payment')
                    }}>
                        <p style={{color: '#fff', fontSize: 20}}>{'Continue'}</p>
                    </div>
                </div>
           </div>
        )
    }
}


export default withRouter(Cart)