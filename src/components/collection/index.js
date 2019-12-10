import React, { useState } from 'react'
import axios from 'axios'

const selected  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAaBJREFUOBGllD9LQlEUwM+5PpNKsBo0IsvFvkFDECQ0NjQUiVFQNEQggd+gsTFSbAgqrIhqaXFqCRoaW2ooQiwhKAjBLCj0nc7RLmQ9S3pnuOeef79z37vvPIQvEu+NjIGJYQIYRCACghyhOuwkb/LR/dRCL+UYOzkGfiIqAuKpchqr0UzqWmM4BrAZmGl7Lr2t83ZcB2o0wgMStHIjd42fDQYUUTnmonc7BxJTshTL72usrGGSQOCzglVD4DbN8n6iZ3JabEz4J0dNoiMx7Agi3HvajT7FnSN2QLqW33hXIW+G5ZH7tdOuZmhQTthsF6TrCU2v4lu61A7bmvBcAeGxbdAnwImOE+XzBFf4sq9sQxE2FnLbF2riculdOWgWAV//C0XETIdLxaS+8mFHb/fOwFAj/4Fyza3haBqeutktCLAyerIRiQemQlAy0zyvLVXP72sFZjSFFrJbWZ1ZAxRno1ArmNT/ADYCrQerC5RAsjsyVAJM85+hVWwtv8Ekx/KEuvg79C/Yn0BJSPRGBsjEZR7RvMtpLM5nUne6oZX+AGcLlTAv4LysAAAAAElFTkSuQmCC'

const collection = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAaBJREFUOBGl1EsoRFEcx/EzdzyyIFKz0nTRsBErRRYzpWYnaWThsZqNoiyULGehpJSFR1J2GLFRrGyw80wKKdHMlFdW8ihp7vH9l1smUzN3/OvTnXPu/f/O3HOmUSq1QgzXcI877GMYRSjHGHZxgzPMoAZ/qpSZdWg8YRPLOIfMPeIVFi6xBfuezHchpaKMkhhHYcodpdoYx3CCpjlvd9m02RvQkYjBuBrHkEX7oFxoxwYmMIp05WZSFlSz3p7OpGXxNq6E29A9A4noEdOyNR7USOAqWlGBT2Ss+apu39eXniQ06DKMlsH4kuzvNsLytRshq2QVxnOq/3blejBc26G0PtOWJW+2B9lfnwTKCcrGOipXJGIpw5BT9u8E+KzUOzwSeIEGOK78PH2gtXoZOlyop7kYpxIyAjmlkAxyrCn6JKNO+gtwhQdUwmkFaZBXXvzd2MxA9iAOJ6H+n74briVIqQAjJ6ES9oYYTKStALPZhGYVZq+QKdRRWKbQnMLsULvZPih7HOMB037I6dUOeabxAzGY+FfJT2oP8o/kzZT0DbtGfmkMfezvAAAAAElFTkSuQmCC'

const styles = {
    wrap: {
        position: 'absolute', 
        right: 10, 
        top: 10, 
        zIndex: 2
    },
    img: {
        width: 19,
        height: 17
    }
}

export default (props) => {

    const { isCollect = false, id, style } = props || {}

    const [status, setStatus] = useState(isCollect)

    const handleProcessRequestFormData = () => {
        const json = {
            id,
            type: 'item',
            action: 'add' 
        }

        return Object.keys(json).map(v => {
            return `${v}=${json[v]}`
        }).join('&')
    }

    return (
        <div style={{...styles.wrap, ...style}} onClick={e => {
            e.stopPropagation()
            if(!status) {

                axios.post('/index.php?c=api/chimipost/addlike',handleProcessRequestFormData(), {
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                  const { data: { errorCode } = {} }  = res || {} 
                  if(errorCode === 0 || errorCode === '0') {
                    alert('收藏成功')
                    setStatus(true)
                  } else {
                    alert('收藏失败')
                  }
                }).catch(error => {
                    console.log(error)
                })
            }
        }}>
            <img src={status? selected : collection} alt="" style={{...styles.img}}/>
        </div>
    )

}