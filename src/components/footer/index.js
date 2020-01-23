import React, { Component }  from 'react'
import { getFontSize } from '../../util'
import axios from 'axios'


const styles = {
		wrap: {
            height: 315,
            minWidth: 1440,
            paddingTop: 60,
            boxSizing: 'border-box',
			backgroundImage: 'linear-gradient(#1F2023, #2B2C2E)'
		},
		contain:{
			width: 1440,
			minWidth: 1440,
            margin:  '0 auto',
            display: 'flex',
            justifyContent: 'space-around'
        },
        title:{
            color: '#fff',
            fontSize: getFontSize(24),
            fontWeight: 'bold',
            marginBottom: 20
        },
        item: {
            color: '#fff',
            fontSize: getFontSize(16),
            marginBottom: 12
        },
        desc:{
            fontSize: getFontSize(16),
            color: '#fff',
            lineHeight: '30px',
            width: 198,
            height: 120,
            overflow: 'hidden'
        },
        searchWrap:{
            width: 360
        },
        inputwrap:{
            width: 360,
            height: 50,
            borderRadius: 37,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#707070'
        },
        input:{
            width: 300,
            height: 50,
            paddingLeft: 20,
            color: '#fff',
            fontSize: 16
        },
        icon: {
            width: 50, 
            height: 50
        }
}

class Footer extends Component {

    inputValue = ''

    state = {
        checkStatus: false,
        company:{
            title: 'COMPANY',
            list:[
                {
                    title: 'About Us'
                },
                {
                    title: 'Sustainability'
                }
            ]
        },
        contact:{
            title: 'CONTACT US',
            desc: 'Room 2085, Building 20, 1399 Liangmu Road, Cangqian Street, Yuhang District, Hangzhou, China'
        },
        policies:{
            title: 'TERMS&POLICIES',
            list:[
                {
                    title: 'Track My Order'
                },
                {title: ' 90 Days Return'},
                {title: 'Terms & Privacy'},
                {title: 'FAQ'}
            ]
        }
    }

    async handlePostEmailEvent() {
        if(!this.inputValue) {
            alert('请输入邮箱订阅')
            return 
        }

        const result = await axios.post('/index.php?c=api/chimipost/addemail', `email=${this.inputValue}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const { data: { errorCode } = {} } = result || {}

        if(errorCode === 0 || errorCode === 100) {
            alert('订阅成功')
        } else {
            alert(`订阅成功, errorCode is ${errorCode}`)
        }
        
    }

    render() {
        const { company, contact, policies, checkStatus } = this.state
        const { title: ptitle ,list: plist} = policies 
        const { title: gtitle ,list: glist } = company || {}
        const { title ,desc } = contact || {}

        return (
           <div style={{...styles.wrap}}>
               <div style={{...styles.contain}}>
                   <div>
                        <p style={{...styles.title}}>{ptitle}</p>
                        <ul>
                            {   
                                plist.map(d => (<li style={{...styles.item}}>{d.title}</li>))
                            }
                        </ul>
                   </div>
                   <div>
                        <p style={{...styles.title}}>{gtitle}</p>
                        <ul>
                            {   
                                glist.map(d => (<li style={{...styles.item}}>{d.title}</li>))
                            }
                        </ul>
                   </div>
                   <div>
                        <p style={{...styles.title}}>{title}</p>
                        <p style={{...styles.desc}}>
                            {desc}
                        </p>
                   </div>
                   <div style={{...styles.searchWrap}}>
                      <div style={{...styles.inputwrap}}>
                          <input style={{...styles.input}} placeholder={'Enter Email Address'} onChange={e => {
                              this.inputValue = e.target.value
                          }}/>
                          <img src="https://s2.ax1x.com/2020/01/12/lTk5FO.png" alt="" style={{marginLeft: 16, width: 37, height: 37}}/>
                      </div>
                      <div style={{marginTop: 24}}>
                        <input  type='checkbox' checked={checkStatus} style={{ WebkitAppearance: 'checkbox', width: 16, height: 16, background: '#fff'}} onChange={e => {
                            const { checked } = e.target || {}
                            if(checked) {
                                this.handlePostEmailEvent()
                            }   
                            
                            this.setState({
                                checkStatus:checked
                            })
                        }}/>
                        <span style={{color: '#fff', fontSize: 16, lineHeight: '20px', marginLeft: 8}}>{'I have read and agreed to'}</span>
                        <span style={{textDecoration: 'underline', color: '#fff', fontSize: 16, lineHeight: '20px', marginLeft: 4}}>{'Privacy Policy'}</span>
                      </div>
                      <div style={{marginTop: 29}}>
                          <img src="https://s2.ax1x.com/2020/01/12/lTkjTf.png" alt="" style={{marginRight: 30, ...styles.icon}}/>
                          <img src="https://s2.ax1x.com/2020/01/12/lTAClj.png" alt="" style={{marginRight: 30,  ...styles.icon}}/>
                          <img src="https://s2.ax1x.com/2020/01/12/lTAE7V.png" alt="" style={{marginRight: 30,  ...styles.icon}}/>
                      </div>
                   </div>
               </div>
           </div>
        )
    }

}

export default Footer