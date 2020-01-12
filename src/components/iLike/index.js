import React from 'react'
import { withRouter } from 'react-router-dom'
import Item from '../CratItem'
import axios from 'axios'

const styles = {
    wrap: {
        width: 500,
        paddingTop: 30,
        paddingLeft: 30,
        overflow: 'scroll',
        height: '100%',
    },
    title: {
        fontSize: 32,
        lineHeight: '32px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 60
    },
    cellWrap: {
        width: 347, 
        display: 'flex',
        height: 180, 
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
    empty: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -132,
        fontSize: 24,
        color: '#999'
    }

}


class ILike extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }


    handleGetLikeData = () => {
        axios.get('/index.php?c=api/chimi/like').then(res => {
            const { data: { data = {} } = {} } = res || {}
            const { list } = data || {}
            if(Array.isArray(list) && list.length) {
                this.setState({
                    list
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }

    componentDidMount(){
        this.handleGetLikeData()
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { list: nextList } = nextState
        const { list } = this.state
        if(list.length !== nextList.length) return true

        return  false
    }

    notifyMessage = message => {
        alert(message)
    }

     handleProcessRequestFormData = (id) => {
        const json = {
            id,
            type: 'item',
            action: 'del' 
        }

        return Object.keys(json).map(v => {
            return `${v}=${json[v]}`
        }).join('&')
    }


    handleDelteILike = (id) => {
       if(!id) {
           this.notifyMessage('取消关注失败')
       }
       axios.post('/index.php?c=api/chimipost/addlike',this.handleProcessRequestFormData(id), {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
      const { data: { errorCode } = {} }  = res || {} 
      if(errorCode === 0 || errorCode === '0') {
        this.notifyMessage('取消关注成功')
        window.location.reload()
      } else {
        this.notifyMessage('取消关注失败')
      }
    }).catch(error => {
        console.log(error)
    })
    }

    render() {
        const { list } = this.state
        const isShowList = Array.isArray(list) && list.length
        return (
            <div style={{...styles.wrap}}>
                <h2 style={{...styles.title}}>{'Wish'}</h2>
                    <div>
                        {
                            list.map((v, i) => {
                                return <Item {...v} showOpt={false} key={`ilike-${i}`} onDelteILike={this.handleDelteILike}/>
                            })
                        }
                        {
                            !isShowList ? <p style={{...styles.empty}}>{'Shopping Bag is Empty'}</p> :  null 
                        }
                    </div>
            </div>
        )
    }
}

export default withRouter(ILike)