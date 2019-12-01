import React from 'react'
import axios from 'axios'

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
            cart: []
        }
    }

    handleAddProduct = index => {

        if(this.state.cart[index].number) {
            this.state.cart[index].number += 1
        } else {
            this.state.cart[index].number = 1
        }

        this.setState({
            cart: this.state.cart
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
            }
        }).catch(error => console.error(error))
    }

    render() {
        const { cart } = this.state
        return (
           <div style={{...styles.wrap}}>
               <p style={{...styles.title}}>{'Cart'}</p>
               <div style={{...styles.line}}/>
                <div>
                    {
                        cart.map((v, i) => {
                            const { pic, title, price, size, number } = v || {}
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
                                                    <span style={{...styles.text, marginRight: 30}}>{number}</span>
                                                    <span style={{...styles.text, cursor: 'pointer'}} onClick={() => {
                                                        this.handleAddProduct(i)
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
                {/* <div style={{...styles.order}}>
                    <p style={{...styles.orderTitle}}>{'Order'}</p>
                    {
                        cart.map((v, i) => {
                            const { price, title , number} = v|| {}
                            return (
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                                    <p style={{flex: 1, fontSize: 20, color: '#333'}}>{title}</p>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                        <p style={{marginRight: 40}}>{`x${number}`}</p>
                                        <p style={{fontSize: 20, color: '#333'}}>{`$${price}`}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: 20, color: '#000'}}>{'Logistics cost'}</p>
                        <p style={{fontSize: 20, color: '#333'}}>{'$20.00'}</p>
                    </div>
                    <div style={{...styles.orderLine}}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p style={{fontSize: 20, color: '#000'}}>{'Sum'}</p>
                        <p style={{fontSize: 20, color: '#333'}}>{'$40.00'}</p>
                    </div>
                    <div style={{...styles.button}}>
                        <p style={{color: '#fff', fontSize: 36}}>{'Continue'}</p>
                    </div>
                </div> */}
           </div>
        )
    }
}


export default Cart