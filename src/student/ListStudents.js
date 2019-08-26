import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';
import { Grid, Row, Col, Table } from "react-bootstrap";
import { thArray } from "../variables/Variables.jsx";
import Card from "../components/Card/Card.jsx";
import { updateStudent, getStudentByID } from '../util/APIUtils';
import { Button } from 'antd';

import EditStudent from './EditStudent';

class ListStudents extends Component {

  constructor(props){  
    super(props); 
    { 
    this.state = { 
      students: [],
      showPopup: false
     };  
  }
     
    this.togglePopup = this.togglePopup.bind(this);
    
  }


    togglePopup(itemId) {  

      this.setState({
        showPopup: !this.state.showPopup
   });

   const apiUrl = 'http://localhost:8192/v1/student/';

   fetch(apiUrl+itemId)
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({
        students: result
       });
     }
     ,
        (error) => {
          this.setState({ error });
        }
      )
  }

  
  
    render() {
        return (
          <div >
             <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Student Records"
                    category="Total Records:"
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <Table striped hover>
                        <thead>
                          <tr>
                            {thArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                        <th >
                        {this.props.students.map(item => {
                          return <tr>{item.registrationNo}</tr>;      
                        })}
                        </th>
                        <th >
                        {this.props.students.map(item => {
                          return <tr>{item.firstName} {item.lastName}</tr>;      
                        })}
                        </th>
                        <th >
                        {this.props.students.map(item => {
                          return <tr>{item.doa}</tr>;      
                        })}
                        </th>
                        <th >
                        {this.props.students.map(item => {
                          return <tr>{item.rollNo}</tr>;      
                        })}
                        </th>
                        <th >
                        {this.props.students.map(item => {
                          return <tr>{item.academicSessions}</tr>;      
                        })}
                        </th>
                        <th >
                        {this.props.students.map(item => {
                          return <tr>{item.studentEmail}</tr>;      
                        })}
                        </th>
                        <th>
                        {this.props.students.map(item => {
                        return <tr><Button type="submit" className="btn btn-primary d-block ml-auto"  onClick={()=> this.togglePopup(item.id) }>Edit</Button></tr>;      
                        })}                         
                        </th>
                        <th >
                        {this.props.students.map(item => {
                          return <tr><Button type="submit" className="btn btn-primary d-block ml-auto" 
                          >Delete</Button></tr>;      
                        })}
                        </th>
                        
                        </tbody>
                      </Table>
                      }
                      />
                    </Col>
                      </Row>
                      </Grid>
                      </div>                               
                  
                      {this.state.showPopup ? <EditStudent closePopup={this.togglePopup.bind(this)} students={this.state.students}/> : null}  
                </div>     
              
        );
      }
    }
    
    export default ListStudents;
    