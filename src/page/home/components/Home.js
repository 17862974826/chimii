import React, { Component }  from 'react'
import {
    withRouter
	} from "react-router-dom";
import Star from './Star'
import Item from './List'
import Sellers from './Sellers'


const styles = {
    banner:{
        height: 653,
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
				banner: 'http://pic3.iqiyipic.com/common/lego/20191116/4752d3433d4e45a8aa892f113f1fc67b.webp',
				star: {
					title: 'HERS LOVE CHIMI',
					subTitle: 'we love us，share our life',
					list:[
						{
							pic: 'http://pic9.iqiyipic.com/image/20191115/76/ca/v_141153995_m_601_260_360.webp',
							name: 'Name',
							desc: 'moment 17'
						},
						{
							pic: 'http://pic9.iqiyipic.com/image/20191115/76/ca/v_141153995_m_601_260_360.webp',
							name: 'Name',
							desc: 'moment 17'
						},
						{
							pic: 'http://pic9.iqiyipic.com/image/20191115/76/ca/v_141153995_m_601_260_360.webp',
							name: 'Name',
							desc: 'moment 17'
						}
					]
				},
				itemList:[
					{
						title: 'WE LOVE SWIMMING',
						subTitle: 'we love us，share our life',
						list:[
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							}
						]
					},
					{
						title: 'TREVELLING',
						subTitle: 'we love us，share our life',
						list:[
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic2.iqiyipic.com/image/20190913/3a/f2/a_100338371_m_601_m3_260_360.webp'
							},
							{
								pic: 'http://pic1.iqiyipic.com/image/20190917/df/f3/v_138066156_m_601_m4_220_124.webp'
							}
						]
					}
				],
				sellers: {
					title: 'TOP SELLERS',
					subTitle: 'we love us，share our life',
					list:[
						{
							title: 'ITEM NAME',
							price: 20,
							originPrice: '40.00',
							couponText: '50% OFF',
							pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
						},
						{
							title: 'ITEM NAME',
							price: 20,
							originPrice: '40.00',
							couponText: '50% OFF',
							pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
						},
						{
							title: 'ITEM NAME',
							price: 20,
							originPrice: '40.00',
							couponText: '50% OFF',
							pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
						},
						{
							title: 'ITEM NAME',
							price: 20,
							originPrice: '40.00',
							couponText: '50% OFF',
							pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
						}
					]
				}
	}
	
	handleJumpToDetail = id => {
		
		this.props.history.push(`/detail/${id}`)
		document.body.scrollTop = document.documentElement.scrollTop = 0
	}

    render() {
				const { banner, star, sellers, itemList = [] } = this.state
				const { onChangeNavbarStatus } = this.props
			
        return (
            <>
            	<img src={banner} alt="" style={{...styles.banner}} />
							<div style={{...styles.wrap}}>
								<div style={{...styles.contain}}>
									<Star {...star} {...this.props} onChangeNavbarStatus={onChangeNavbarStatus}/>
									{
										itemList.map((d, i) => <Item key={`list-wrap-${i}`} {...d} onJumpToDetail={this.handleJumpToDetail.bind(null, i)}/> )
									}
								</div>
								<Sellers {...sellers}/>
							</div>
            </>
        )
    }

}

export default withRouter(Home)