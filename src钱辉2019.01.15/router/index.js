import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import  './index.scss'

import Home from '../pages/Home';
import Mask from '../pages/Mask';
import Global from '../pages/Global';
import Life from '../pages/Life';
import Header from '../components/commons/Header';
import List from '../pages/List';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Discount from '../pages/Discount';
import ShoppingCart from '../pages/ShoppingCart';
import ItemDetial from '../components/List-Nav/ItemDetial'

const App = () => (
    
    <BrowserRouter>
        <div id='App'>
            <div>
                <Header/>
            </div>
            <div className='app-second'>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/mask" component={Mask} />
                    <Route path="/life" component={Life} />
                    <Route path="/global" component={Global} />
                    <Route path="/list" component={List}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/discount" component={Discount}/>
                    <Route path="/shoppingCart" component={ShoppingCart}/>
                    <Route path="/itemDetial" component={ItemDetial}/>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
)
export default App;