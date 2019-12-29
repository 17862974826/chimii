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
                        value: '',
                        key: 'name'
                    },
                    {
                        type: 'text',
                        placeholder: 'Country/Region',
                        value: '',
                        key: 'country'
                    },
                    {
                        type: 'text',
                        placeholder: 'City',
                        value: '',
                        key: 'city'
                    },
                    {
                        type: 'text',
                        placeholder: 'Address',
                        value: '',
                        key: 'adress'
                    },
                    {
                        type: 'text',
                        placeholder: 'Phone',
                        value: '',
                        key: 'phone'
                    },
                    {
                        type: 'text',
                        placeholder: 'E-mail',
                        value: '',
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

    async handleGetData() {
       
        const result = await this.fetchData()
        const [ cartAllData, adressAllData ] = result || []
        const { data: { data } = {} } = cartAllData || {}
        const { data: { data: adreessData } = {}} = adressAllData || {}
        const { isLogin, cartData = {}  } = data || {}
        const { address } = adreessData || {}
        const [ deafultAddress = {} ] = address || []
        window.profile.isLogin = isLogin

        const list = Object.keys(deafultAddress).map(d => {
            return {
                value: deafultAddress[d],
                key: d
            }
        })

        this.setState({
            cartData,
            address: {
                ...this.state.address,
                list
            }
        })


    }

    async fetchData() {
        return Promise.all([axios.get('/index.php?c=api/chimi/cart'), axios.get('/index.php?c=api/chimi/udata&types=address')])
    }


    componentDidMount() {
        this.handleGetData()
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