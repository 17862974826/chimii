import React from 'react'


const styles ={
    content:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        overflow: 'hidden',
        marginRight: 20
    },
    image: {
        width: 150,
        height: 150,
        cursor: 'pointer',
        boxSizing: 'border-box',
        objectFit: 'cover' ,
        border:'1.5px solid rgb(220, 220, 220)'
        
    },
    bigPic:{
        width: 464,
        height: 464,
        overflow: 'hidden',
        boxSizing: 'border-box',
        objectFit: 'cover',
        border:'1px solid rgb(220, 220, 220)'
    }
}

class Magnifier extends React.Component {
    constructor(props){
        super(props)
      
        this.state = {
            currentBigPicIndez: 0
        }
    }

    handleMouseEnter = index => {
        this.setState({
            currentBigPicIndez: index
        })
    }

    render() {
        const {  currentBigPicIndez = 0 } = this.state
        const { list = [] } = this.props
       
        const { bigPic } = list[currentBigPicIndez] || {}

        return (
            <div >
                <div style={{display: 'flex'}}>
                    <div style={{...styles.content}}>
                    {
                        list.map((v, i) => {
                            const { pic } = v || {}
                            return (
                                <div key={`magnifier-${i}`} onMouseEnter={this.handleMouseEnter.bind(null, i)} style={{height: 150, overflow: 'hidden'}}>
                                    <img src={pic} alt="" style={{...styles.image}}/>
                                </div>
                            )
                        })
                    }
                    </div>
                    <img src={bigPic} alt="" style={{...styles.bigPic}}/>
                </div >
            </div>
        )
    }

}



export default Magnifier