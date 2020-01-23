import React from 'react'
import axios from 'axios'

const styles = {
    wrap: {
        position: 'realtive',
        width: 500,
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
    input: {
        width: 440,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 12,
        backgroundColor: '#F5F5F5'
    },
    label: {
        fontSize: 12,
        lineHeight: '12px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10
    },
    buttonWrap: {
        height: 40,
        width: 440,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#921C59',
        cursor: 'pointer'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }
}


class Login extends React.Component {
    constructor(props){
        super(props)
        this.inputValue = {
            login: {},
            create: {}
        }
       
        this.isLoading = false
        const loginStatus = window.profile.isLogin
      
        this.state = {
            isLogin: true,
            loginStatus,
            title: 'Sign in',
            success: false
        }
    }

    handleChangePage = (status) => {
        this.setState({
            isLogin: status
        })
    }

    handleShowStatus = errorCode => {
      
        switch(errorCode) {
            case '2001':
                alert('email send error')
            break;
            case '2002':
                alert('email has registered')
            break;
            case '2003':
                alert('registe db error')
            break;
            case '2004':
                alert('login error')
            break;
            case '2005':
                alert('add cart error')
            break;
            case '2006':
                alert('reg code times limit')
            break;
            case '2007':
                alert('reg code check fail')
            break;
            case '2008':
                alert('payapl create order error')
            break;
            
            default:
                break;
        }
    }

    handleProcessRequestFormData = (status) => {
        const json = this.inputValue[status]

        return Object.keys(json).map(v => {
            return `${v}=${json[v]}`
        }).join('&')
    }


    handleCreateAccount = () => {

        /*
            2001=>"email send error",
            2002=>"email has registered",
            2003=>"registe db error",
            2004=>"login error",
            2005=>"add cart error",
            2006=>"reg code times limit",
            2007=>"reg code check fail",
            2008=>"payapl create order error",
        **/
       
        axios.post('/index.php?c=api/chimipost/register',this.handleProcessRequestFormData('create'), {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          const { data: { errorCode } = {} }  = res || {} 
          if(errorCode === 0 || errorCode === '0') {
              alert('注册成功')
              window.location.reload()
          } else {
           
            this.handleShowStatus(String(errorCode))
          }
        }).catch(error => {
            console.log(error)
        })
    }

    handleClickLoginIn = () => {
        if(this.isLoading) {
            alert('操作繁忙，稍后再试')
            return 
        } 
        this.isLoading = true
        axios.post('/index.php?c=api/chimipost/login',this.handleProcessRequestFormData('login'), {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          const { data: { errorCode } = {} }  = res || {} 
          this.isLoading = false
          if(errorCode === 0 || errorCode === '0') {
            alert('登陆成功')
            window.location.reload()
        } else {
          this.handleShowStatus(String(errorCode))
        }
        }).catch(error => {
            this.isLoading = false
            console.log(error)
        })
    }

    handleSaveValue = (e, key, status) => {
        const username = e.target.value
        this.inputValue[status][key] = username
    }

     handleClickLogout = () => {
        axios.get('/index.php?c=api/chimipost/loginout').then(res => {
            const { data = {} } = res || {}
            const { errorCode } = data || {}
            if(errorCode === 0) {
                alert('退出登陆')
                window.location.reload()
            }

        }).catch( e => console.log())
    }


    renderProfilePage = () => {
       
        const { history } = this.props
        const pathList = [
            {
                path: '/profile',
                title: 'My Profile'
            },
            {
                path: '/profile/order',
                title: 'My Orders'
            },
            {
                path: '/profile/coupon',
                title: 'My Coupons'
            },
            {
                path: '/profile/adress',
                title: 'Address Book'
            },
            {
                path: '/profile/changePassword',
                title: 'Change Password'
            },
            {
                path: '',
                click: true,
                title: 'Sign out'
            }
        ]
        return (
            <div style={{paddingTop: 30, paddingLeft: 60}}>
                <p style={{fontSize: 32, color: '#000', marginBottom: 50}}>{'Hello World'}</p>
                {
                    pathList.map((v,i) => {
                        const { path, title, click } = v || {}
                        return (
                             <p  key={`loginlist-${i}`} onClick={() => {

                                if(click) {
                                    this.handleClickLogout()
                                    return 
                                }
                                history.push(path)
                                
                             }} style={{ fontSize: 14, color: '#000', marginBottom: 30, cursor: 'pointer'}}>{title}</p>
                        )
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        axios.get('/index.php?c=api/chimi/udata').then(res => {
            const { data: { data } = {} } = res || {}
            const { isLogin } = data || {}
            this.setState({
                loginStatus: isLogin,
                success: true
            })
        }).catch(e => {
            this.setState({
                success: true
            })
        })
    }


    render() {
        const { title, isLogin , loginStatus, success } = this.state

        if(!success) {
            return null
        }

        if( loginStatus) {
            return this.renderProfilePage()
        }

        return (
            <div style={{...styles.wrap}}>
                {
                    isLogin ? 
                    <>
                        <h2 style={{...styles.title}}>{title}</h2>
                        <div>
                            <p style={{...styles.label}}>{'Username or Email Address'}</p>
                            <input style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'email', 'login')
                                    }}/>
                            <p style={{...styles.label, marginTop: 30}}>{'Password'}</p>
                            <input style={{...styles.input, marginBottom: 52}} onChange={e => {
                                       this.handleSaveValue(e, 'passwd', 'login')
                                    }} type="password"/>
                            <div style={{...styles.buttonWrap}} onClick={this.handleClickLoginIn}>
                                <p style={{...styles.buttonText}} >{'Sign in'}</p>
                            </div>
                            <div onClick={() => {
                                this.handleChangePage(false)
                            }}>
                                <span style={{fontSize: 12, color: '#000'}}>{'Not a member？'}</span>
                                <span style={{fontS9ize: 12, color: '#5379F9', cursor: 'pointer'}}>{'  Sign up now'}</span>
                            </div>
                            <p style={{position: 'absolute',cursor: 'pointer', right: 30, top: 286, color: '#5379F9', fontSize:12}}>{'Forgot password？'}</p>
                        </div>
                    </> : (
                        <>
                            <h2 style={{...styles.title}}>{'Sign up'}</h2>
                            <div>
                                <p style={{...styles.label, marginTop: 30}}>{'Username'}</p>
                                    <input style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'name', 'create')
                                    }}/>
                                <p style={{...styles.label, marginTop: 30}}>{'Email'}</p>
                                    <input style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'email', 'create')
                                    }}/>
                                <p style={{...styles.label, marginTop: 30}}>{'Password'}</p>
                                    <input type="password" style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'passwd', 'create')
                                    }}/>
                                <div style={{...styles.buttonWrap, marginTop: 30}} onClick={this.handleCreateAccount}>
                                    <p style={{...styles.buttonText}}>{'Create Account'}</p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default Login