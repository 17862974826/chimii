import React, { Component }  from 'react'
import {
    withRouter
	} from "react-router-dom";
import axios from 'axios'
import Star from './Star'
import Item from './List'
import Sellers from './Sellers'

import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'


const styles = {
    banner:{
		height: 450,
		minHeight: 450,
		width: '100%',
		minWidth: '100%',
		objectFit: 'cover',
		cursor: 'pointer'
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
		banner: [],
		star: {},
		sellersTop: {},
		itemList: []
	}

	componentWillUnmount() {
		this.swiper =  null
	}

	componentDidMount() {
		
		axios.get('/index.php?c=api/chimi/index').then(res => {
			const { data: { data } = {}  } = res || {}
			const { HomeData = {}, isLogin } = data || {}

			window.profile.isLogin = isLogin
			
			
			this.setState({
				...HomeData,
			}, () => {
				if(this.swiper) return 
				this.swiper = new Swiper ('.swiper-container', {
					loop: true, // 循环模式选项
					speed: 1000,
					autoplay: {
						disableOnInteraction: false,
						delay: 2000,
					},
					pagination: {
						el: '.swiper-pagination',
						clickable :true
					},
					observer: true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents: true,//修改swiper的父元素时，自动初始化swiper
				  }) 
			})
		}).catch(e => {
			console.error(e)
		})
	 }


    render() {
				const { banner =[] , star = {}, sellersTop = {} , itemList = [] } = this.state
				const { onChangeNavbarStatus, history } = this.props

				
        return (
            <>	
				<div className="swiper-container">
						<div className="swiper-wrapper">
							{
								Array.isArray(banner) ? banner.map((v,i) => {
									const { pic  = '' } = v || {}
									return  pic ? <img key={`banner-${i}`} src={pic} className="swiper-slide" alt="" style={{...styles.banner}} /> : null 
								}) :null
							}
						</div>
						<div className="swiper-pagination"></div>
       			 </div>
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