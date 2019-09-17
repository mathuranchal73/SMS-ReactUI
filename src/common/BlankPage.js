import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import image from "../assets/img/error.jpg";

class BlankPage extends Component {

    render() {
        return(
            <div className="page-not-found">
           
                <h1 className="title">
                    
                </h1>
              <div ><img src={image}></img></div>
                <div className="desc">
                    The Page you're looking for was not found.
                </div>
              
                <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
              
            </div>
        );
    }
}
    export default BlankPage;
