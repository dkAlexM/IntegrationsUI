import logo from './logo.svg';
import './App.css';

import { Home } from './Pages/Home/Home';
import { Companies } from './Pages/Companies/Companies';
import { ChannelConfig } from './Pages/Apis/ChannelConfig';
import { ChannelInstance } from './Pages/Channels/ChannelInstance';
import { Reservation } from './Pages/Reservations/Reservations';
import { ChannelLog } from './Pages/ChannelEvents/ChannelLog';
import { Audit } from './Pages/Audit/Audit';
import { SystemEvent } from './Pages/SystemEvents/SystemEvent';

import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <div>
          <div class="shadow p-3 mb-2 bg-white rounded">

            
            <nav className="navbar navbar-expand-sm bg-white" activeKey="/home">
              
              <a class="navbar-brand">Surya Learning App</a>  

              <ul className="navbar-nav">

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/home">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/companies">
                    Companies
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/channelConfig">
                    Apis
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/channelInstance">
                    Channels
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/reservations">
                    Reservations
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/channelLog">
                    Channel Events
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/audit">
                    Audit
                  </NavLink>
                </li>

                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary btn-sm" to="/systemEvent">
                    System Events
                  </NavLink>
                </li>

              </ul>

            </nav>

          </div>

          <div class="shadow p-3 mb-2 bg-white rounded">

            <Routes>
                <Route path='/home' Component={Home}></Route>
                <Route path='/companies' Component={Companies}></Route>
                <Route path='/channelConfig' Component={ChannelConfig}></Route>
                <Route path='/channelInstance' Component={ChannelInstance}></Route>
                <Route path='/reservations' Component={Reservation}></Route>
                <Route path='/channelLog' Component={ChannelLog}></Route>
                <Route path='/audit' Component={Audit}></Route>
                <Route path='/systemEvent' Component={SystemEvent}></Route>
            </Routes>

          </div>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;