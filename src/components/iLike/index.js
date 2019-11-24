import React from 'react'
import { withRouter } from 'react-router-dom'
import Item from '../CratItem'

const styles = {
    wrap: {
        width: 720,
        paddingTop: 105,
        overflow: 'scroll',
        height: '100%',
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
    }

}


class ILike extends React.Component {
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

    render() {
        const { list } = this.state
        return (
            <div style={{...styles.wrap}}>
                <h2 style={{...styles.title}}>{'iLike'}</h2>
                    <div>
                        {
                            list.map((v, i) => {
                                return <Item {...v} key={`ilike-${i}`} />
                            })
                        }
                    </div>
            </div>
        )
    }
}

export default withRouter(ILike)