import React from 'react'


const styles ={
    content:{
        display: 'flex',
        width: 500,
        overflow: 'hidden',
    },
    image: {
        width: 120,
        height: 120,
        marginRight: 20,
        cursor: 'pointer',
        objectFit: 'cover'
    },
    bigPic:{
        width: 500,
        height: 500,
        overflow: 'hidden',
        marginBottom: 20,
        objectFit: 'cover',
        border:'1px solid rgb(220, 220, 220)'
    }
}

class Magnifier extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentBigPicIndez: 0,
            ...props
        }
    }

    handleMouseEnter = index => {
        this.setState({
            currentBigPicIndez: index
        })
    }

    render() {
        const { list, currentBigPicIndez = 0 } = this.state
        const { bigPic } = list[currentBigPicIndez]
        return (
            <div >
                <div>
                    <img src={bigPic} alt="" style={{...styles.bigPic}}/>
                </div >
                <div style={{...styles.content}}>
                {
                    list.map((v, i) => {
                        const { pic } = v || {}
                        return (
                            <div key={`magnifier-${i}`} onMouseEnter={this.handleMouseEnter.bind(null, i)}>
                                <img src={pic} alt="" style={{...styles.image}}/>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

}



export default Magnifier