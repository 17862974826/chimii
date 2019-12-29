import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const styles = {
    wrap: {
        width: 1440,
        paddingTop: 80,
        paddingBottom: 122,
        minWidth: 1440,
        margin: '0 auto'
    },
    container: {
        width: 880,
        margin: '0 auto'
    },
    title: {
        fontSize: 46,
        color: '#000',
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
    }
}

class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartData: {},
            address: {
                title: 'Distribution addres',
                list: [
                    {
                        type: 'text',
                        placeholder: 'Name',
                        value: 'Luo',
                        key: 'name'
                    },
                    {
                        type: 'text',
                        placeholder: 'Country/Region',
                        value: 'china',
                        key: 'country'
                    },
                    {
                        type: 'text',
                        placeholder: 'City',
                        value: 'hangzhou',
                        key: 'city'
                    },
                    {
                        type: 'text',
                        placeholder: 'Address',
                        value: '文一西路',
                        key: 'adress'
                    },
                    {
                        type: 'text',
                        placeholder: 'Phone',
                        value: '182xxx',
                        key: 'phone'
                    },
                    {
                        type: 'text',
                        placeholder: 'E-mail',
                        value: '296@qq.com',
                        key: 'email'
                    }
                ]
            },
            payment: {
                title: 'Payment method'
            }
        }
    }

    handleCreateOrder = () => {
        const { address ,cartData} = this.state
        const { list = [] } = address || {}
       
        const _adress = list.map(v => {
            const { key, value } = v || {}
          
            return `${key}=${value}&`
        }).join('')
        const _cartData = Object.keys(cartData).map(v => {
            return `itemIds[]=${v},${cartData[v]}&`
        }).join('')
        const params = _cartData + _adress + 'code=null'
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


    componentDidMount() {
        axios.get('/index.php?c=api/chimi/cart').then(res => {
            const { data: { data } = {} } = res || {}
            const { cartData = {}, isLogin } = data || {}
            window.profile.isLogin = isLogin
            this.setState({
                cartData
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const { address, payment } = this.state
        const { title, list = [] } = address || {}
        const { title: payTitle} = payment || {}
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.container}}>
                    <p style={{...styles.title}}>{title}</p>
                    {
                        list.map((v, i) => {
                            const { type, placeholder, value} =  v || {}
                            return (
                                <div style={{ height: 78, width: 600, borderBottom: '1px solid #ccc'}}>
                                   <input type={type} placeholder={placeholder} value={value} style={{height: 78, width: 600, fontSize: 20, paddingLeft: 20, color: '#000'}}/>
                                </div>
                            )
                        })
                    }
                    {/**  payment 组件*/}
                    {/* <div style={{marginTop: 97}}>
                        <p style={{...styles.title}}>{payTitle}</p>
                        <iframe  id="pay"src='http://priceslash.online/tpl/pay.html'  scrolling="no" style={{ backgroundColor: 'transparent', border: 'none', width: 400}}></iframe>
                    </div> */}
                    <div style={{...styles.buttonWrap}} onClick={this.handleCreateOrder}>
                        <p style={{...styles.button}}>{'Payment'}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Payment)