import './app.css';
// import Appbar from './component/appbar'
import Header from './component/layout/header'

import Menu from './component/layout/menubar'
import { Link, Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Login from './component/login'
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>


          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route exact path="/">

            <Menu style={{ width: '100%', height: '100%' }}></Menu>
          </Route>
          <Redirect path="*" to="/"></Redirect>

        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
