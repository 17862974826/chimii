
import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default () => {
    const [ state, setState ] = useState('')
    const iframeCallback = (e) => {

       const { data } = e || {}
       const { orderID } = data || {}

       postPayStatus(orderID)

    }

    const postPayStatus = orderID => {
        if(!orderID) {
            console.log('没取到orderId')
            return 
        }
        axios.post('/index.php?c=api/chimipost/pay',`orderID=${orderID}`,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
           const { data: { data } = {} } = res || {}
           alert(JSON.stringify(data))
        }).catch(error => {
            console.error(error)
        })
        
    }


    useEffect(() => {
        const dom = document.getElementById('pay')
        dom.onload = function() {
            const [, params = ''] = window.location.search.split('?')
            const [, id] = params.split('=')

            this.contentWindow.postMessage({ id, from: 'order' },'*');
        }
       window.addEventListener("message", iframeCallback, false);
       return () => {
        window.removeEventListener("message", iframeCallback, false);
       }
      }, [state]);

    return (
       <iframe  id="pay"src='http://priceslash.online/tpl/pay.html'  scrolling="no" style={{ backgroundColor: 'transparent', border: 'none', width: 400}}></iframe>
    )
}