import React from 'react'
import Item from '../../components/Items'
import axios from 'axios'
import {
    withRouter
    } from "react-router-dom";
const styles = {
    wrap: {
        width: 1440,
        minWidth: 1440,
        margin: '0 auto',
        paddingTop: 110
    },
    inputWrap: {
        position: 'relative',
        width: 720,
        margin: '0 auto',
        height: 62,
        borderBottom: '1px solid #666'
    },
    input: {
        width: 690,
        height: 62,
        fontSize: 36
    },
    searchIcon: {
        position: 'absolute',
        right: 0,
        bottom: 24,
        width: 32,
        height: 32
    },
    content: {
        width: 1300,
        minWidtj: 1300,
        margin: '120px auto'
    },
    influencerWrap: {
        height: 405,
        overflow: 'hidden'
    },
    itemWrap: {
        marginTop: 60
    }
}

class SearchResult extends React.Component {

    constructor(props){
        super(props)
        this.isloading = false
        this.state = {
            itemList: [],
            influencerList: []
            // itemList: [
            //     {
            //         title: 'ITEM NAME',
            //         price: 20,
            //         originPrice: '40.00',
            //         pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
            //     },
            //     {
            //         title: 'ITEM NAME',
            //         price: 20,
            //         originPrice: '40.00',
            //         pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
            //     },
            //     {
            //         title: 'ITEM NAME',
            //         price: 20,
            //         originPrice: '40.00',
            //         pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
            //     },
            //     {
            //         title: 'ITEM NAME',
            //         price: 20,
            //         originPrice: '40.00',
            //         pic: 'http://pic1.iqiyipic.com/image/20191010/a7/c5/v_115686092_m_601_m9_260_360.webp',
            //     }
            // ],
            // influencerList: [
            //     {
            //         pic: "https://s1.ax1x.com/2019/11/19/MRP78J.png",
            //         name: "name",
            //         desc: 'moment 27'
            //     },
            //     {
            //         pic: "https://s1.ax1x.com/2019/11/19/MRP78J.png",
            //         name: "name",
            //         desc: 'moment 27'
            //     }
            // ]
        }
    }

    handleKeyDownSearch = e => {
        if(e.keyCode === 13) {
            this.handleGetData()
        }
    }

    handleGetData = () => {
        this.handleGetSearchDaata(this.inputValue)
    }

    handleGetSearchDaata = value => {
        if(this.isloading) return 
        this.isloading = true
        const { match: { params } = {} } = this.props
        const { q: query } = params || {}
        axios.get(`/index.php?c=api/chimi/search&q=${value || query}`).then(res => {
            const { data: { data } = {}} = res || {}
           const { itemList = [] } = data || {}
           this.setState({
                itemList
            })
            this.isloading = false
        }).catch(error => {
            this.isloading = false
            console.error(error)
        })
    }


    componentDidMount(){
        this.handleGetSearchDaata()
        window.addEventListener('keydown', this.handleKeyDownSearch)
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyDownSearch);
    }


    componentWillReceiveProps() {
        this.handleGetSearchDaata()
    }


    render() {
        const { itemList, influencerList } = this.state
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.inputWrap}}>
                    <input type="text" style={{...styles.input}} placeholder={'search'} onChange={e => this.inputValue = e.target.value}/>
                    <img src={'https://s2.ax1x.com/2019/11/22/M7bJpQ.png'} alt="" style={{...styles.searchIcon}} onClick={this.handleGetData}/>
                </div>
                <div style={{...styles.content}}>
                    <div style={{...styles.influencerWrap}}>
                        <p style={{fontSize: 20, color: '#000', fontWeight: 'bold', marginBottom: 20}}>{'About Influencer'}</p>
                        <div style={{display: 'flex'}}>
                            {
                                influencerList.map((v, i)  => {
                                    const { pic, name, desc } = v|| {}
                                    return (
                                        <div key={`search-influencer-${i}`} style={{ display: 'flex', paddingTop: 23, boxSizing: 'border-box',  flexDirection: 'column', alignItems: 'center',  width: 260, height: 364, marginRight: i === 3 ? 0 : 80,  overflow: 'hidden'}}> 
                                            <img src={pic} alt="" style={{width: 140, height: 140, borderRadius: 70}}/>
                                            <p style={{marginTop: 20, fontSize: 30, color: '#333', fontWeight: 'bold'}}>{name}</p>
                                            <p style={{marginTop: 20, fontSize: 24, color: '#333'}}>{desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{...styles.itemWrap}}>
                        <p style={{fontSize: 20, color: '#000', fontWeight: 'bold', marginBottom: 20}}>{'About Item'}</p>
                        <div style={{display: 'flex'}}>
                            {
                                itemList.map((v, i)  => {
                                    return (
                                        <Item {...v} key={`search-item-${i}`} style={{marginRight: i  === 3 ? 0 : 30}}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(SearchResult)