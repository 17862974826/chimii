import React, { Component }  from 'react'
import { getFontSize } from '../../util'

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
        }
}

class Footer extends Component {

    state = {

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
            desc: 'Room D,10/F,Tower A,Billion Centre,1 Wang Kwong Road,Kowloon Bay,Kowloon,Hong Kong.'
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

    render() {
        const { company, contact, policies } = this.state
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
                          <input style={{...styles.input}} placeholder={'Enter Email Address'}/>
                          <img src="http://chuantu.xyz/t6/703/1573987235x989559068.png" alt="" style={{marginLeft: 16}}/>
                      </div>
                      <div style={{marginTop: 24}}>
                        <input  type='radio' style={{width: 16, height: 16, background: '#fff'}}/>
                        <span style={{color: '#fff', fontSize: 16, lineHeight: '20px', marginLeft: 8}}>{'I have read and agreed to'}</span>
                        <span style={{textDecoration: 'underline', color: '#fff', fontSize: 16, lineHeight: '20px', marginLeft: 4}}>{'Privacy Policy'}</span>
                      </div>
                      <div style={{marginTop: 29}}>
                          <img src="http://chuantu.xyz/t6/703/1573988534x1033347913.png" alt="" style={{marginRight: 30}}/>
                          <img src="http://chuantu.xyz/t6/703/1573988677x1031866013.png" alt="" style={{marginRight: 30}}/>
                          <img src="http://chuantu.xyz/t6/703/1573988693x1031866013.png" alt="" style={{marginRight: 30}}/>
                      </div>
                   </div>
               </div>
           </div>
        )
    }

}

export default Footer