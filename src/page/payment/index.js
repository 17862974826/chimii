import React from 'react'
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
    }
}

class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adress: {
                title: 'Distribution addres',
                list: [
                    {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    {
                        type: 'text',
                        placeholder: 'Country/Region'
                    },
                    {
                        type: 'text',
                        placeholder: 'City'
                    },
                    {
                        type: 'text',
                        placeholder: 'Address'
                    },
                    {
                        type: 'text',
                        placeholder: 'Phone'
                    },
                    {
                        type: 'text',
                        placeholder: 'E-mail'
                    }
                ]
            },
            payment: {
                title: 'Payment method'
            }
        }
    }

    render() {
        const { adress, payment } = this.state
        const { title, list = [] } = adress || {}
        const { title: payTitle} = payment || {}
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.container}}>
                    <p style={{...styles.title}}>{title}</p>
                    {
                        list.map((v, i) => {
                            const { type, placeholder} =  v || {}
                            return (
                                <div style={{ height: 78, width: 600, borderBottom: '1px solid #ccc'}}>
                                   <input type={type} placeholder={placeholder} style={{height: 78, width: 600, fontSize: 20, paddingLeft: 20, color: '#000'}}/>
                                </div>
                            )
                        })
                    }
                    <div style={{marginTop: 97}}>
                        <p style={{...styles.title}}>{payTitle}</p>
                        <div style={{width: 435,marginTop: 35,  height: 89, background: '#F8C346', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={'https://s2.ax1x.com/2019/11/24/MXeJOg.png'} alt="" style={{ width: 162, height: 70, objectFit: 'contain'}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment