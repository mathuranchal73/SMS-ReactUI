import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import { uploadStudents } from '../util/APIUtils';
import axios, { post } from 'axios';
import {notification } from 'antd';

class BulkUploadStudents extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
   
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    uploadStudents(this.state.file)
    .then(response => {
      notification.success({
        message: 'Polling App',
        description: "Students Successfully Uploaded",
    });          
    this.props.history.push("/student/new");
  }).catch(error => {
      if(error.status === 401) {
          this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create student.');    
      } else {
          notification.error({
              message: 'Polling App',
              description: error.message || 'Sorry! Something went wrong. Please try again!'
          });              
      }
  });
}

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }



    render() {
        return (
          <div
            className={
              'card textcenter mt-3 ' +
              (this.props.formDisplay ? '' : 'add-appointment')
            }
          >
              <div
                className="apt-addheading card-header bg-primary text-white">
                <FaPlus /> Bulk Upload Students
              </div>
    
            


            <div className="card-body">
              <form id="bulkUploadForm" noValidate onSubmit={this.onFormSubmit}> 

                <div className="form-group form-row">
                
                  <div className="col-md-4">
                    <input type="file" className="btn-primary d-block ml-auto"  onChange={this.onChange}/>  
                  </div>
          
                  <div className="offset-md-2 col-md-10">
                  <button  type="submit" className="btn btn-primary d-block ml-auto">Upload File</button>
                  </div>
                
                </div>  
                  
              </form>
            </div>
          </div>
        );
      }
    }


export default BulkUploadStudents;
