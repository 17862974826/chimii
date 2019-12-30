import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home } from './page/home/index'
import Detail from './page/detail'
import Category from './page/category'
import Celebrity from './page/celebrity'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Error from './components/Error'
import Search from './page/search'
import Cart from './page/cart'
import Payment from './page/payment'
import Demo from './Demo'
import Profile from './page/profile'
import AddAdress from './page/profile/components/addAdress'
import CelebrityDeatil from './page/celebrity/components/detail'


window.profile = {
  isLogin: false
}


const RouteEnter = (props) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0
  return props.children
}


class App extends React.Component {


  state = {
    show: false,
    fontColor: '#000',
    bgColor: '#fff'
  }

  handleChangeNavbarStatus = (params = {} ) => {
    this.setState({
      ...params
    })
  }

  render(){
    const { fontColor, bgColor } = this.state
    const navbarParams = {
      fontColor,
      bgColor
    }


    return (
      <>
      <Router>
        <Navbar {...navbarParams}/>
        <Switch>
            <Route path="/" exact>
              <RouteEnter>
                <Home onChRouteEnterngeNavbarStatus={this.handleChangeNavbarStatus} />
              </RouteEnter>
            </Route>
            <Route path="/detail/:id" exact>
              <Detail />
            </Route>
            <Route path="/category/:cate" >
              <Category />
            </Route>
            <Route path="/celebrity/:id" exact>
              <Celebrity />
            </Route>
            <Route path="/search/:q" exact>
              <Search />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/payment/" exact>
              <Payment />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/adress/add/:type" >
              <AddAdress />
            </Route>
            <Route path="/demo" exact>
              <Demo />
            </Route>
            <Route path="/celebrity/content/:id" exact>
              <CelebrityDeatil />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <Footer/>
      </Router>
    </>
    );
  }
}

export default App;
