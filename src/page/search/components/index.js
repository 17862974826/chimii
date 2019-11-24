import React from 'react'
import { withRouter } from 'react-router-dom'

const styles = {
    wrap: {
        width: 720,
        paddingTop: 105,
        margin: '0 auto',
    },
    title: {
        fontSize: 46,
        lineHeight: '46px',
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 60
    },
    inputWrap: {
        position: 'relative',
        width: 720,
        margin: '0 auto',
        height: 62,
        borderBottom: '1px solid #666',
        marginBottom: 110,
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
        height: 32,
        curson: 'pointer'
    }
}


class SearchList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchList: [
                {
                    q: 'taobao'
                },
                {
                    q: '淘宝'
                }
            ]
        }
    }

    handleChangePage = (status) => {
       
    }

    handleKeyDownSearch = e => {
        if(e.keyCode === 13) {
            this.handleGetData()
        }
    }

    handleGetData = () => {
       const { history } = this.props
       history.push(`/search/${encodeURIComponent(this.value)}`)
       
    }

    handleChangeInoutValue = e => {
       this.value = e.target.value
    }


    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDownSearch)
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyDownSearch);
    }


    render() {
        const { searchList } = this.state
        return (
            <div style={{...styles.wrap}}>
                <h2 style={{...styles.title}}>{'Search'}</h2>
                <div style={{...styles.inputWrap}}>
                    <input type="text" style={{...styles.input}} onChange={this.handleChangeInoutValue} placeholder={'search influencer or item'} />
                    <img src={'https://s2.ax1x.com/2019/11/22/M7bJpQ.png'} alt="" style={{...styles.searchIcon}} onClick={this.handleGetData}/>
                </div>
                <div>
                    <p style={{marginBottom: 30, fontSize: 24, color: '#999'}}>{'搜索历史'}</p>
                    <ul>
                        {
                            searchList.map((v, i) => {
                                return <li key={`search-list-${i}`} style={{fontSize: 24, color: '#333', marginBottom: 60}}>{v.q}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchList)