import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter,Switch, Route } from "react-router-dom";
import Adress from './components/address';
import Changepassword from './components/changePass'
import Coupon from './components/coupon'
import Order from './components/order'

const Test = (props) => {
    const { username } = props || {}
    const faceList = [
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: true
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        },
        {
            name: '圆形脸',
            id: '1',
            pic: '',
            checked: false
        }
    ]
    return (
        <div style={{marginLeft: 180, width: 560}}>
                <h2 style={{textAlign: 'center',marginBottom: 30,  fontSize: 32, color: '#000', fontWeight: 'bold'}}>{'My Profile'}</h2>
                <p style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>{'Information'}</p>
                <div style={{marginTop: 30}}>
                    <p style={{color: '#474747',fontSize: 12, marginBottom: 10}}>{'Email'}</p>
                    <input style={{ fontSize:12, color: '#000', width: 490, height: 40, backgroundColor: '#f5f5f5', paddingLeft: 20, paddingRight: 20}} />
                </div>
                <div style={{marginTop: 20}}>
                    <p style={{color: '#474747',fontSize: 12, marginBottom: 10}}>{'Ueser name(我们怎么称呼你) '}</p>
                    <input style={{ fontSize:12, color: '#000', width: 490, height: 40, backgroundColor: '#f5f5f5', paddingLeft: 20, paddingRight: 20}} />
                </div>
                <div style={{marginTop: 30}}>
                    <p style={{marginBottom: 20, fontSize: 14, color: '#000', fontWeight: 'bold'}}>{'Face  Shape'}</p>
                    <div style={{display:'flex', flexWrap: 'wrap'}}>
                        {
                            faceList.map((v, i)  => {
                                const { name, id, pic, checked } = v || {}
                                return (
                                    <div  key={`facelist-${i}`} style={{width: 120, height: 160, marginRight: 20}}>
                                        { pic ? <img src={pic} style={{width: 120,height: 120}} alt=""/> : <div style={{width: 120,height: 120}}/>}
                                        <p style={{fontSize: 12, textAlign: 'center', color: '#333'}}>{name}</p>
                                        <input onChange={e => {
                                            
                                        }} type="radio" checked style={{background: checked ? '#921C59': '#fff', marginLeft: 54, marginTop: 5, cursor: 'pointer', width: 12, height: 12, borderRadius: 6, border: '1px solid #D8D8D8'}}/>
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </div>
        </div>
    )
}

const styles = {
    wrap: {
        width: 1440,
        minWidth: 1440,
        paddingLeft: 135,
        paddingBottom: 140,
        paddingTop: 30,
        boxSizing: 'border-box',
        margin: '0 auto'
    },
    pathWrap: {
        display: 'flex',
        marginBottom: 50
    },
    pathItem: {
        fontSize: 12,
        color: '#999'
    },
    content: {
        display: 'flex'
    },
    profileListWrap: {
        width: 140,
        overflow: 'hidden'
    },
    profileListItem: {
        marginTop: 30,
        fontSize: 14,
        cursor: 'pointer',
        color: '#000',
        fontWeight: 'bold'
    },
    name: {
        fontSize: 32,
        color: '#000'
    }
}

const  pathList =  [
    {
        title: 'My Profile',
        path: '/',
        checked: false
    },
    {
        title: 'My Orders',
        path: '/order',
        checked:false
    },
    {
        title: 'My Coupons',
        path: '/coupon',
        checked:false
    },
    {
        title: 'Address Book',
        path: '/adress',
        checked:false 
    },
    {
        title: 'Change Password',
        path: '/changePassword',
        checked:false
    },
    {
        title: 'Sign Out',
        path: '',
        checked:false,
        isClick: true
    }
]

const Profile = (props) => {
    const { history } = props
    const { location: { pathname } = {} } = history || {}
    const _pathList = pathList.map((v, i) => {
        const pathStuff = v.path.split('/')[1]
        if(`${pathname.split('/')[2]}`.indexOf(pathStuff) !== -1) {
           
            if(pathStuff) {
                return {
                    ...v,
                    checked: true
                }
            } else {
                return {
                    ...v,
                    checked:  false
                }
            }
        }

        return v
    })
    const [state, setState] = useState({
        path: ['Home', '/My Account'],
        name: 'Geng',
        profileList: _pathList,
        data: {}
    })
    const { path, name, profileList, data } = state || {}
    const { username, coupons = [] } = data || {}

    useEffect(() => {
        axios.get('/index.php?c=api/chimi/udata&types=orders,coupon').then(res => {
            const { data: { data } = {} } = res || {}
            const { isLogin } = data || {}
            window.profile = {
                isLogin
            }
            setState({
                ...state,
                data
            })
        }).catch(err => console.error(err))
    }, [])


    const handleClickLogout = () => {
        axios.get('/index.php?c=api/chimipost/loginout').then(res => {
            const { data = {} } = res || {}
            const { errorCode } = data || {}
            if(errorCode === 0) {
                alert('退出登陆')
                window.location.reload()
            }

        }).catch( e => console.log())
    }
  
    return (
        <div style={{...styles.wrap}}>
            <ul style={{...styles.pathWrap}}>
               {
                    path.map((v,i) => (<li style={{...styles.pathItem}} key={`pathlist-${i}`}>{v}</li>))
               }
            </ul>
            <div style={{...styles.content}}>
               <div style={{...styles.profileListWrap}}>
                   {username ? <p style={{...styles.name}}>{username}</p> : null}
                   <ul>
                        {
                            profileList.map((v,i) => (<li onClick={() => {
                                if(v.isClick) {
                                    handleClickLogout()
                                    return 
                                }

                                if(v.path){
                                   
                                    const list = profileList.map((v, index) => {
                                        if(i ===index) {
                                            return {
                                                ...v,
                                            checked: true
                                            }
                                        } else {
                                            return {
                                                ...v, 
                                                checked: false
                                            }
                                        }
                                    })
                                   
                                    setState({
                                        ...state,
                                        path,
                                        name,
                                        profileList: list
                                    })

                                    history.push(`/profile${v.path}`)
                                }
                            }} style={{...styles.profileListItem, fontWeight: v.checked ? 'bold': 'normal'}} key={`profilelist-${i}`}>{v.title}</li>))
                        }
                   </ul>
               </div>
               <Switch>
                    <Route path='/profile' exact>
                        <Test {...data}/>
                    </Route>
                    <Route path='/profile/adress' exact>
                        <Adress {...data}/>
                    </Route>
                    <Route path='/profile/changepassword' exact>
                        <Changepassword {...data}/>
                    </Route>
                    <Route path='/profile/coupon' exact>
                       {
                           coupons.length ?    <Coupon {...data} /> : null
                       } 
                    </Route>
                    <Route path='/profile/order' exact>
                      <Order {...data}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Profile)