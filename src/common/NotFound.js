import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './NotFound.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import AdminNavbar from "../components/Navbars/AdminNavbar";
import BlankPage from './BlankPage';
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import NotificationSystem from "react-notification-system";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.jsx";
import routes from "../routes.js";

import image from "../assets/img/sidebar-3.jpg";

class NotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
          _notificationSystem: null,
          image: image,
          color: "black",
          hasImage: true,
          fixedClasses: "dropdown show-dropdown open"
        };
      }

      getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                render={props => (
                  <prop.component
                    {...props}
                    handleClick={this.handleNotificationClick}
                  />
                )}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };
    render() {
        return (
            <div >
            <div id="main-panel" className="wrapper" ref="mainPanel">
            <AdminNavbar ></AdminNavbar>
            <BlankPage></BlankPage>
            <Footer />
            </div>
            </div>);
    }
}

export default NotFound;