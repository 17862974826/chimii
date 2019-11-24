import React from 'react'
import { withRouter } from 'react-router-dom'
import Item from '../../../components/CratItem'

const styles = {
    wrap: {
        position: 'relative',
        width: 720,
        height: 'calc(100vh - 200px)',
        overflow: 'scroll',
        paddingTop: 105,
        margin: '0 auto',
    },
    title: {
        fontSize: 46,
        lineHeight: '46px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 60
    },
    cellWrap: {
        width: 633, 
        display: 'flex',
        height: 300, 
        marginBottom: 60,
        overflow: 'hidden'
    },
    pic: {
        width: 300,
        marginRight: 60,
        border: '1px solid #999',
        height: 300,
        objectFit: 'cover'
    },
    content: {
        boxSizing: 'border-box',
        height: 300,
        paddingBottom: 50
    },
    itemTitle: {
        marginBottom: 30,
        fontSize: 24, 
        color: '#333',
        fontWeight: 'bold'
    },
    desc: {
        marginBottom: 30,
        fontSize: 24,
        color: '#666'
    },
    price: {
        marginRight: 12,
        color: '#000',
        fontSize: 24
    },
    originPrice: {
        color: '#999',
        fontSize: 24
    },
    buttonWrap: {
        width: 880,
        height: 90,
        lineHeight: '90px',
        dispaly: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        cursor: 'pointer',
        left: 0,
        background: '#921C59'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 36
    }
}


class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [
                {
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                    title: 'ITEM NAME',
                    desc: 'xxx say  “soooo cute～”',
                    price: '20.00',
                    originPrice: '40.00'
                },
                {
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                    title: 'ITEM NAME',
                    desc: 'xxx say  “soooo cute～”',
                    price: '20.00',
                    originPrice: '40.00'
                },
                {
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                    title: 'ITEM NAME',
                    desc: 'xxx say  “soooo cute～”',
                    price: '20.00',
                    originPrice: '40.00'
                },
                {
                    pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
                    title: 'ITEM NAME',
                    desc: 'xxx say  “soooo cute～”',
                    price: '20.00',
                    originPrice: '40.00'
                }
            ]
        }
    }

    handleJumpToPayment = () => {
        const { history }  = this.props
        history.push('/payment/1')
    }

    render() {
        const { list } = this.state
        return (
            <div style={{...styles.wrap}}>
                <h2 style={{...styles.title}}>{'Cart'}</h2>
                    <div>
                        {
                            list.map((v, i) => {
                                return <Item {...v} key={`Cart-${i}`} />
                            })
                        }
                    </div>
                <div style={{...styles.buttonWrap}} onClick={this.handleJumpToPayment}>
                    <p style={{...styles.buttonText}}>{'Payment'}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(Cart)