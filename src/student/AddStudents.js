import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import { createStudent,checkEmailAvailability } from '../util/APIUtils';
import { Form, Input,Button, notification } from 'antd';
import {   NAME_MIN_LENGTH, NAME_MAX_LENGTH,EMAIL_MAX_LENGTH } from '../constants';
import './Student.css';


const FormItem = Form.Item;

class AddStudents extends Component {

    constructor() {
        super();
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);

        this.state = {
          firstName: {
              value: ''
          },
          lastName: {
              value: ''
          },
          studentEmail: {
              value: ''
          },
          parentEmail: {
              value: ''
          },
          doa: {
            value: ''
          },
          academicSessions: {
            value: '2019-2020'
          },

          enabled: {
            value: false
          }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateStudentEmailAvailability = this.validateStudentEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        
      }

     
    handleAdd(event) {
      event.preventDefault();
  
      const studentDataRequest = {
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        studentEmail: this.state.studentEmail.value,
        parentEmail: this.state.parentEmail.value,
        doa: this.state.doa.value,
        academicSessions:this.state.academicSessions.value,
        enabled:this.state.enabled
      };
      createStudent(studentDataRequest)
      .then(response => {
          notification.success({
              message: 'Polling App',
              description: "Student Successfully Added!",
          });          
          this.props.history.push("/student");
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

          this.setState({
            firstName: '',
            lastName: '',
            studentEmail: '',
            parentEmail: '',
            doa: '',
            academicSessions:'',
            enabled:false
        });
        this.props.toggleForm();

  }

  isFormInvalid() {
    return !(this.state.firstName.validateStatus === 'success' && 
        this.state.studentEmail.validateStatus === 'success' &&
        this.state.parentEmail.validateStatus === 'success'
        
    );
}

  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue
    }
    });
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.checked;

    this.setState({
      [inputName]: {
        value: inputValue
    }
    });
  }
  

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            value: inputValue,
            ...validationFun(inputValue)
        }
    });
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
          className="apt-addheading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
          <FaPlus /> Add Student
        </div>

        <div className="card-body">
        <Form onSubmit={this.handleAdd} className="add-student-form" >
           
                <FormItem label="First Name" 
                            validateStatus={this.state.firstName.validateStatus}
                            help={this.state.firstName.errorMsg} className="add-student-form-row">

                    <Input 
                      name="firstName"
                      size="large"
                      autoComplete="off"
                      placeholder="First Name"
                      value={this.state.firstName.value} 
                      onChange={(event) => this.handleInputChange(event, this.validateFirstName)} />   
                
                </FormItem>
      

                <FormItem label="Last Name" 
                            validateStatus={this.state.lastName.validateStatus}
                            help={this.state.lastName.errorMsg} className="add-student-form-row">
                    <Input 
                      name="lastName"
                      size="large"
                      autoComplete="off"
                      placeholder="Last Name"
                      value={this.state.lastName.value} 
                      onChange={(event) => this.handleChange(event)} />   
                </FormItem>

                <FormItem 
                            label="Student Email"
                            hasFeedback
                            validateStatus={this.state.studentEmail.validateStatus}
                            help={this.state.studentEmail.errorMsg}>
                           
                            <Input 
                                size="large"
                                name="studentEmail" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Student email"
                                value={this.state.studentEmail.value} 
                                onBlur={this.validateStudentEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateStudentEmail)} /> 
                
                                </FormItem>
                                
                  <FormItem 
                            label="Parent's Email"
                            hasFeedback
                            validateStatus={this.state.parentEmail.validateStatus}
                            help={this.state.parentEmail.errorMsg}>
                           
                            <Input 
                                size="large"
                                name="parentEmail"
                                type="email" 
                                autoComplete="off"
                                placeholder="Parent's email"
                                value={this.state.parentEmail.value} 
                                onBlur={this.validateParentEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateParentEmail)} /> 
                
                                </FormItem>
                                
                                
                        <FormItem label="Joining Date">
                           
                            <Input 
                                size="large"
                                name="doa"
                                type="date" 
                                value={this.state.doa.value} 
                                onBlur={this.validateParentEmailAvailability}
                                onChange={(event) => this.handleChange(event)} /> 
                
                                </FormItem>

                                <FormItem label="Academic Session">
                                <select className="form-control"  name="academicSessions" placeholder="Academic Session" defaultValue={this.state.academicSessions}
                    onChange={this.handleChange}>
                                        <option selected value="2019-2020">2019-2020</option>
                                        <option value="2018-2019">2018-2019</option>
                                        <option value="2017-2018">2017-2018</option>
                                        <option value="2016-2017">2016-2017</option>
                                        </select>  
                                </FormItem>                 
        
                                <FormItem label="Is Enabled">
                                <Input 
                                size="large"
                                name="enabled"
                                type="checkbox" 
                                defaultChecked={this.state.enabled.value}
                                onClick={this.handleCheckboxChange} /> 
                                </FormItem>      
                                <FormItem>
            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                  disabled={this.isFormInvalid()}
                >
                  Add Student
                </button>
              </div>
            </div>
            </FormItem>
            </Form>
        </div>
      </div>
    );
  }
  // Validation Functions

  validateFirstName = (firstName) => {
    if(firstName.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
        }
    } else if (firstName.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}

validateStudentEmail = (studentEmail) => {
    if(!studentEmail) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email may not be empty'                
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(studentEmail)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email not valid'
        }
    }

    if(studentEmail.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
        }
    }

    return {
        validateStatus: 'success',
        errorMsg: null
    }
}

validateParentEmail = (parentEmail) => {
  if(!parentEmail) {
      return {
          validateStatus: 'error',
          errorMsg: 'Email may not be empty'                
      }
  }

  const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
  if(!EMAIL_REGEX.test(parentEmail)) {
      return {
          validateStatus: 'error',
          errorMsg: 'Email not valid'
      }
  }

  if(parentEmail.length > EMAIL_MAX_LENGTH) {
      return {
          validateStatus: 'error',
          errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
      }
  }

  return {
      validateStatus: 'success',
      errorMsg: null
  }
}


validateStudentEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.studentEmail.value;
    const emailValidation = this.validateStudentEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
        this.setState({
            studentEmail: {
                value: emailValue,
                ...emailValidation
            }
        });    
        return;
    }

    this.setState({
        email: {
            value: emailValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    checkEmailAvailability(emailValue)
    .then(response => {
        if(response.available) {
            this.setState({
                studentEmail: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        } else {
            this.setState({
                studentEmail: {
                    value: emailValue,
                    validateStatus: 'error',
                    errorMsg: 'This Email for Student is already present in Systems'
                }
            });
        }
    }).catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
            studentEmail: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
    });
}


}

export default AddStudents;
