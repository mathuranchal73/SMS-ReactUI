import React, { Component } from 'react';

import AddStudents from './AddStudents';
import SearchStudents from './SearchStudents';
import ListStudents from './ListStudents';
import BulkUploadStudents from './BulkUploadStudents';
import { updateStudent,getAllStudents,getStudentByID } from '../util/APIUtils';

import { findIndex, without } from 'lodash';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/index.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';


class App2 extends Component {
  constructor() {
    super();
    this.state = {
      myStudents: [],
      formDisplay: false,
      orderBy: 'firstName',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0
    };
    this.deleteStudent = this.deleteStudent.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addStudents = this.AddStudents.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchStudents = this.searchStudents.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }


  searchStudents(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }


  AddStudents(student) {
    let tempStudents = this.state.myStudents;
    student.id = this.state.lastIndex;
    tempStudents.unshift(student);
    this.setState({
        myStudents: tempStudents,
      lastIndex: this.state.lastIndex + 1
    });
  }

  updateStudent(studentId,studentData) {
    updateStudent(studentId,studentData);
  }

  deleteStudent(studentID){

  }

  componentDidMount() {
  getAllStudents()
  //fetch('../data1.json')
      //.then(response => response.json())
      .then(result => {
        const students = result.map(item => {
          return item;
        });
        this.setState({
            myStudents: students
        });
      }); 
  }

  componentDidUpdate(nextProps) {
    if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
        // Reset State
        this.setState({
          myStudents: [],
          formDisplay: false,
          orderBy: 'firstName',
          orderDir: 'asc',
          queryText: '',
          lastIndex: 0
        });    
        this.getAllStudents();
    }
}

  render() {
    let order;
    let filteredStudents = this.state.myStudents;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredStudents = filteredStudents
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['firstName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['lastName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddStudents
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addStudents={this.AddStudents}
                />
                <BulkUploadStudents></BulkUploadStudents>
                <SearchStudents
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchStudents={this.searchStudents}
                />
                <ListStudents
                  students={filteredStudents}
                  deleteStudent={this.deleteStudent}
                  updateStudent={this.updateStudent}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App2;
