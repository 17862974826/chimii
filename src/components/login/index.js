import React from 'react'
import axios from 'axios'

const styles = {
    wrap: {
        width: 720,
        paddingTop: 105,
        margin: '0 auto'
    },
    title: {
        fontSize: 46,
        lineHeight: '46px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 60
    },
    input: {
        width: 720,
        height: 80,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#F5F5F5'
    },
    label: {
        fontSize: 20,
        lineHeight: '20px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10
    },
    buttonWrap: {
        height: 90,
        marginBottom: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#921C59',
        cursor: 'pointer'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 36,
    }
}


class Login extends React.Component {
    constructor(props){
        super(props)
        this.inputValue = {
            login: {},
            create: {}
        }
        this.state = {
            isLogin: true,
            title: 'Sign in',
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
          } else {
           
            this.handleShowStatus(String(errorCode))
          }
        }).catch(error => {
            console.log(error)
        })
    }

    handleClickLoginIn = () => {
        axios.post('/index.php?c=api/chimipost/login',this.handleProcessRequestFormData('login'), {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          const { data: { errorCode } = {} }  = res || {} 
          if(errorCode === 0 || errorCode === '0') {
            alert('登陆成功')
        } else {
          this.handleShowStatus(errorCode)
        }
        }).catch(error => {
            console.log(error)
        })
    }

    handleSaveValue = (e, key, status) => {
        const username = e.target.value
        this.inputValue[status][key] = username
    }


    render() {
        const { title, isLogin } = this.state
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
                            <p style={{...styles.label, marginTop: 50}}>{'Password'}</p>
                            <input style={{...styles.input, marginBottom: 90}} onChange={e => {
                                       this.handleSaveValue(e, 'passwd', 'login')
                                    }} type="password"/>
                            <div style={{...styles.buttonWrap}}>
                                <p style={{...styles.buttonText}} onClick={this.handleClickLoginIn}>{'Sign in'}</p>
                            </div>
                            <div onClick={() => {
                                this.handleChangePage(false)
                            }}>
                                <span style={{fontSize: 20, color: '#000'}}>{'Not a member？'}</span>
                                <span style={{fontS9ize: 20, color: '#5379F9', cursor: 'pointer'}}>{'  Sign up now'}</span>
                            </div>
                        </div>
                    </> : (
                        <>
                            <h2 style={{...styles.title}}>{'Sign up'}</h2>
                            <div>
                                <p style={{...styles.label, marginTop: 50}}>{'Username'}</p>
                                    <input style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'name', 'create')
                                    }}/>
                                <p style={{...styles.label, marginTop: 50}}>{'Email'}</p>
                                    <input style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'email', 'create')
                                    }}/>
                                <p style={{...styles.label, marginTop: 50}}>{'Password'}</p>
                                    <input style={{...styles.input}} onChange={e => {
                                       this.handleSaveValue(e, 'passwd', 'create')
                                    }}/>
                                <div style={{display: 'flex',background: '#fff', height: 60, marginTop: 24, marginBottom: 31}}>
                                    <input type="checkbox" style={{width: 20, height: 20, marginRight: 10}}/>
                                    <p style={{fontSize: 20, color: '#999'}}>{'Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.'}</p>
                                </div>
                                <div style={{...styles.buttonWrap}} onClick={this.handleCreateAccount}>
                                    <p style={{...styles.buttonText}}>{'Create Account'}</p>
                                </div>
                                <p style={{fontSize: 20, color: '#999'}}>{'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.'}</p>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default Login