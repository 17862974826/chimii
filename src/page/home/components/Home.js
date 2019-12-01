import React, { Component }  from 'react'
import {
    withRouter
	} from "react-router-dom";
import axios from 'axios'
import Star from './Star'
import Item from './List'
import Sellers from './Sellers'


const styles = {
    banner:{
		height: 653,
		minWidth: 1440,
        width: '100%',
        minHeight: 653,
        objectFit: 'cover'
		},
		wrap: {
			paddingTop: 150,
			backgroundColor: '#fff'
		},
		contain:{
			width: 1440,
			minWidth: 1440,
			margin:  '0 auto',
		}
}

class Home extends Component {


	state = {
		banner: '',
		star: {},
		sellersTop: {},
		itemList: []
	}
	
	handleJumpToDetail = id => {
		this.props.history.push(`/detail/${id}`)
		document.body.scrollTop = document.documentElement.scrollTop = 0
	}

	componentDidMount() {
		axios.get('/index.php?c=api/chimi/index').then(res => {
			const { data: { data } = {}  } = res || {}
			const { HomeData = {} } = data || {}
			this.setState({
				...HomeData,
			})
		}).catch(e => {
			console.error(e)
		})
	 }

    render() {
				const { banner = '', star = {}, sellersTop = {} , itemList = [] } = this.state
				const { onChangeNavbarStatus } = this.props

				
        return (
            <>
            	<img src={banner} alt="" style={{...styles.banner}} />
							<div style={{...styles.wrap}}>
								<div style={{...styles.contain}}>
									<Star {...star} {...this.props} onChangeNavbarStatus={onChangeNavbarStatus}/>
									{
										itemList.map((d, i) => {
											const { id } = d || {}
											return <Item key={`list-wrap-${i}`} {...d} onJumpToDetail={this.handleJumpToDetail.bind(null, id)}/>
										} )
									}
								</div>
								<Sellers {...sellersTop} onJumpToDetail={this.handleJumpToDetail}/>
							</div>
            </>
        )
    }

}

export default withRouter(Home)