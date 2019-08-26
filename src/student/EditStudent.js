import React, { Component } from 'react';
import './Student.css';

import { updateStudent,checkStudentEmailAvailability } from '../util/APIUtils';
import { Form, Input, notification } from 'antd';
import {   NAME_MIN_LENGTH, NAME_MAX_LENGTH,EMAIL_MAX_LENGTH } from '../constants';

const FormItem = Form.Item;

class EditStudent extends Component {

    constructor(props) {
        super(props);

        this.state={

            id: {
                value: ''
            },
            registrationNo: {
                value: ''
            },
            firstName: {
                value: '',
                validateStatus: 'success',
                errorMsg: null
            },
            lastName: {
                value: ''
            },
            studentEmail: {
              value: '',
              validateStatus: 'success',
              errorMsg: null
            },
            parentEmail: {
              value: '',
              validateStatus: 'success',
              errorMsg: null
            },
            doa: {
                value: ''
              },
            academicSession: {
                value: ''
              },
            rollNumber: {
                value: ''
              },
              enabled:''
          };

        this.handleBeforeChange=this.handleBeforeChange.bind(this);        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateStudentEmailAvailability = this.validateStudentEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleCheckboxChange=this.handleCheckboxChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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
        const defaultValue= event.target.defaultValue;

        if(inputValue)
        {
    
        this.setState({
            [inputName] : {
                value: inputValue
            }
        });
        }
        else
        {
            this.setState({
            [inputName]: defaultValue
        });
        }
        
      }

    
      handleCheckboxChange(event) {
        const name = event.target.name;
        const value = event.target.checked;
        const defaultValue= event.target.defaultChecked;
    
        if(value)
        {
            this.setState({
                [name]: value
              })
            
        }
        else{
            this.setState({
            [name]: defaultValue
          })
        }
      }
      
      handleBeforeChange(event){
        const target = event.target;
        const inputName = target.name;        
        const defaultValue= event.target.defaultValue;

        this.setState({

            [inputName] : {
                value: defaultValue
            }
        });
      }
    
      handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        const defaultValue= event.target.defaultValue;

        if(inputValue)
        {
    
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });

    }
        else{
            this.setState({
            [inputName]: defaultValue,
            ...validationFun(defaultValue)
        });
    }

      }
      handleUpdate(event) {
        event.preventDefault();
        const studentData = {
                id: this.state.id.value,
                registrationNo: this.state.registrationNo.value,
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                studentEmail: this.state.studentEmail.value,
                parentEmail: this.state.parentEmail.value,
                doa: this.state.doa.value,
                academicSession:this.state.academicSession.value,
                isEnabled: this.state.isEnabled.value,
                rollNumber: this.state.rollNumber.value
        };
        updateStudent(this.state.students.id,studentData)
        .then(response => {
            notification.success({
              message: 'Polling App',
              description: "Student Record Successfully Updated",
          });          
          this.props.history.push("/student/new");
          this.props.closePopup();

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
        


  render() {
    return (  
        <div className='popup'>  
        <div className='popup\_inner'>  
        <h1>{this.props.text}</h1>  
        <button onClick={this.props.closePopup}>close me</button>  

        <div className="content">
			<div className="container-fluid">
				<div className="row">
                    <div className="col-md-8">
                         <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Edit Student Record</h4>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={this.handleUpdate} >
                                <FormItem label="Registration Number (disabled)" className="add-student-form-row">

                                        <Input type="text"
                                        autoFocus="true"
                                        name="registrationNo"
                                        size="large"
                                        disabled="true"
                                        defaultValue={this.props.students.registrationNo} />   
                                
                                </FormItem>
                                <FormItem label="First Name" 
                                    validateStatus={this.state.firstName.validateStatus}
                                    help={this.state.firstName.errorMsg} className="add-student-form-row">

                                    <Input 
                                    name="firstName"
                                    size="large"
                                    autoComplete="off"
                                    placeholder="First Name"
                                    onFocus={(event)=>this.handleBeforeChange(event)}
                                    defaultValue={this.props.students.firstName} 
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
                                    onFocus={(event)=>this.handleBeforeChange(event)}
                                    defaultValue={this.props.students.lastName} 
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
                                        defaultValue={this.props.students.studentEmail} 
                                        onFocus={(event)=>this.handleBeforeChange(event)}
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
                                        defaultValue={this.props.students.parentEmail} 
                                        onFocus={(event)=>this.handleBeforeChange(event)}
                                        onChange={(event) => this.handleInputChange(event, this.validateParentEmail)} /> 
                
                                </FormItem>
                                <FormItem label="Joining Date">
                           
                                    <Input 
                                        size="large"
                                        name="doa"
                                        type="date" 
                                        defaultValue={this.props.students.doa}
                                        onFocus={(event)=>this.handleBeforeChange(event)} 
                                        onClick={(event) => this.handleChange(event)} /> 
                
                                </FormItem>
                                <FormItem label="Academic Session">
                                    <select className="form-control" onFocus={(event)=>this.handleBeforeChange(event)} defaultValue={this.props.students.academicSession}  name="academicSession" placeholder="Academic Session" defaultValue={this.props.students.academicSession}
                                        onChange={this.handleChange}>
                                        <option value="2019-2020">2019-2020</option>
                                        <option value="2018-2019">2018-2019</option>
                                        <option value="2017-2018">2017-2018</option>
                                        <option value="2016-2017">2016-2017</option>
                                    </select>  
                                </FormItem> 
                                <FormItem label="Roll Number">
                           
                                    <Input 
                                        size="large"
                                        name="rollNumber"
                                        type="text" 
                                        onFocus={(event)=>this.handleBeforeChange(event)}
                                        defaultValue={this.props.students.rollNo} 
                                        onChange={(event) => this.handleChange(event)} /> 
                
                                </FormItem>                                                            
                                <FormItem label="Is Enabled">
                                    <Input 
                                    size="large"
                                    name="enabled"
                                    type="checkbox" 
                                    defaultChecked={this.props.students.enabled}
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
                                        Update Student
                                        </button>
                                    </div>
                                    </div>
                                </FormItem>                                                       
                                </Form>
                </div>
            </div>
        </div>
                                                                            
    </div>
</div>
</div>




        </div>  
        </div>  
        );  
        }
        
        

        validateFirstName = (firstName) => {
            
            if(firstName.length < NAME_MIN_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
                }
            }
            else if (firstName.length > NAME_MAX_LENGTH) {
                return {
                    validateStatus: 'error',
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
            if(studentEmail.length< NAME_MIN_LENGTH) {
                return {
                    validateStatus:'error',
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
        
            checkStudentEmailAvailability(emailValue)
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

        export default EditStudent;