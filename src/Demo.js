
import React, { useEffect, useCallback  } from 'react'
import axios from 'axios'


export default () => {
    
    let order_id = ''
    const iframeCallback = useCallback((e) => {

        const { data } = e || {}
        const { orderID } = data || {}
 
        postPayStatus(orderID)
 
     }, [])

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

    const successCallback = useCallback(res => {
        const { data: { data } = {} } = res || {}
        const { orderId } = data || {}
        const dom = document.getElementById('pay')
        dom.onload = function() {
            this.contentWindow.postMessage({ id: orderId, from: 'order' },'*');
        }
    }, [])


    useEffect(() => {
       
        axios.get('/index.php?c=api/chimipost/createorder').then(successCallback).catch(err => {
            console.log(err)
        })
       window.addEventListener("message", iframeCallback, false);
       return () => {
        window.removeEventListener("message", iframeCallback, false);
       }
      }, [iframeCallback, successCallback]);

    return (
       <iframe  id="pay"src='http://priceslash.online/tpl/pay.html'  scrolling="no" style={{ backgroundColor: 'transparent', border: 'none', width: 400}}></iframe>
    )
}