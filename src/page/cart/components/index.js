import React from 'react'
import { withRouter } from 'react-router-dom'
import Item from '../../../components/CratItem'
import axios from 'axios'


const styles = {
    wrap: {
        position: 'relative',
        width: 500,
        height: 'calc(100vh - 200px)',
        overflow: 'scroll',
        paddingTop: 30,
        paddingLeft: 30
    },
    title: {
        fontSize: 32,
        lineHeight: '32px',
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
        width: 500,
        height: 50,
        lineHeight: '50px',
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
        fontSize: 24
    },
    empty: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -132,
        fontSize: 24,
        color: '#999'
    }
}


class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }

    handleJumpToPayment = () => {
        const { history }  = this.props
        history.push('/payment/')
    }

    componentDidMount() {
        axios.get('/index.php?c=api/chimi/cart').then(res => {
            const { data: { data } = {} } = res || {}
            const { itemList = [] } = data || {}
            if(Array.isArray(itemList) && itemList.length) {
                this.setState({
                    list: itemList
                })
            }
        }).catch(error => console.error(error))
    }

    handleDeleteItem(id, num) {
        const { list = [] } = this.state
        axios.post('/index.php?c=api/chimipost/addcart',`id=${id}&num=-${num}`, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          const { data: { errorCode } = {} }  = res || {} 
          if(errorCode === 0) {
              alert('删除成功')
              window.location.reload()
          } else {
            alert('删除失败')   
          }
            
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { list } = this.state
        const isShowList = Array.isArray(list) && list.length
       
        return  (
            <div style={{...styles.wrap}}>
                <h2 style={{...styles.title}}>{'Cart'}</h2>
                    {
                        isShowList ? <div>
                        {
                            list.map((v, i) => {
                                const { id, num } = v || {}
                                return <Item {...v} key={`Cart-${i}`} onDelteILike={() => {
                                    
                                    this.handleDeleteItem(id, num)
                                }}/>
                            })
                        }
                    </div> : null
                    }
                    {
                        isShowList ? <div style={{...styles.buttonWrap}} onClick={this.handleJumpToPayment}>
                        <p style={{...styles.buttonText}}>{'Payment'}</p>
                    </div> : null
                    }
                    {
                        !isShowList ? <p style={{...styles.empty}}>{'Shopping Bag is Empty'}</p> :  null 
                    }
            </div>
        ) 
    }
}

export default withRouter(Cart)