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
		height: 450,
		minWidth: 1440,
        width: '100%',
        minHeight: 450,
        objectFit: 'cover'
		},
		wrap: {
			paddingTop: 60,
			paddingBottom: 60,
			width: 1110,
			margin:  '0 auto',
			backgroundColor: '#fff'
		},
		contain:{
			width: 1110,
			minWidth: 1110
		}
}

class Home extends Component {


	state = {
		banner: '',
		star: {},
		sellersTop: {},
		itemList: []
	}

	componentDidMount() {
		
		axios.get('/index.php?c=api/chimi/index').then(res => {
			const { data: { data } = {}  } = res || {}
			const { HomeData = {}, isLogin } = data || {}

			window.profile.isLogin = isLogin
			
			
			this.setState({
				...HomeData,
			})
		}).catch(e => {
			console.error(e)
		})
	 }

    render() {
				const { banner = '', star = {}, sellersTop = {} , itemList = [] } = this.state
				const { onChangeNavbarStatus, history } = this.props

				
        return (
            <>	
            	<img src={banner} alt="" style={{...styles.banner}} />
							<div style={{...styles.wrap}}>
								<div style={{...styles.contain}}>
									
									<Star {...star} {...this.props} onChangeNavbarStatus={onChangeNavbarStatus} />
									{
										itemList.map((d, i) => {
											return <Item history={history} key={`list-wrap-${i}`} {...d} />
										} )
									}
								</div>
								<Sellers {...sellersTop}  history={history}/>
							</div>
            </>
        )
    }

}

export default withRouter(Home)