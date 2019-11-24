import React from 'react'

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
                            <input style={{...styles.input}}/>
                            <p style={{...styles.label, marginTop: 50}}>{'Password'}</p>
                            <input style={{...styles.input, marginBottom: 90}}/>
                            <div style={{...styles.buttonWrap}}>
                                <p style={{...styles.buttonText}}>{'Sign in'}</p>
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
                                <input style={{...styles.input}}/>
                                <p style={{...styles.label, marginTop: 50}}>{'Email'}</p>
                                <input style={{...styles.input}}/>
                                <p style={{...styles.label, marginTop: 50}}>{'Password'}</p>
                                <input style={{...styles.input}}/>
                                <div style={{display: 'flex',background: '#fff', height: 60, marginTop: 24, marginBottom: 31}}>
                                    <input type="checkbox" style={{width: 20, height: 20, marginRight: 10}}/>
                                    <p style={{fontSize: 20, color: '#999'}}>{'Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.'}</p>
                                </div>
                                <div style={{...styles.buttonWrap}}>
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