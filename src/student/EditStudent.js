import React, { Component } from 'react';
import './Student.css';
import { notification } from 'antd';
import { updateStudent } from '../util/APIUtils';

class EditStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
                id: this.props.students.id,
                registrationNo: this.props.students.registrationNo,
                firstName: this.props.students.firstName,
                lastName: this.props.students.lastName,
                studentEmail: this.props.students.studentEmail,
                parentEmail: this.props.students.parentEmail,
                doa: this.props.students.doa,
                academicSession:this.props.students.academicSession,
                isEnabled: this.props.students.isEnabled,
                rollNumber: this.props.students.rollNumber
            
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
      }
     
      handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const defaultValue= event.target.defaultValue;
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


      handleUpdate(event) {
        event.preventDefault();
        const studentData = {
                id: this.state.id,
                registrationNo: this.state.registrationNo,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                studentEmail: this.state.studentEmail,
                parentEmail: this.state.parentEmail,
                doa: this.state.doa,
                academicSession:this.state.academicSession,
                isEnabled: this.state.isEnabled,
                rollNumber: this.state.rollNumber
        };
        updateStudent(this.props.students.id,studentData)
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
                                <form onSubmit={this.handleUpdate}>
                                    <div className="row">

                                    <div className="col-md-5 pr-1">
                                    <div className="form-group">
                                        <label>Registration Number (disabled)</label>
                                        <input type="text" className="form-control" name="registrationNo" placeholder="Registration Number" defaultValue={this.props.students.registrationNo}/>
                                    </div>                                                          
                                    </div>
                                                                                                
                                    <div className="col-md-3 px-1">
                                    <div className="form-group">
                                        <label>Firstname</label>
                                        <input type="text" className="form-control" name="firstName" placeholder="FirstName" defaultValue={this.props.students.firstName} onChange={this.handleChange}/>
                                    </div>
                                    </div>
                                                                                               
                                     <div className="col-md-4 pl-1">
                                     <div className="form-group">
                                        <label for="LastName">Last Name</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="LastName" defaultValue={this.props.students.lastName}
                    onChange={this.handleChange}/>
                                    </div>
                                    </div>
                            </div>
                                                                                            
                            <div className="row">
                                <div className="col-md-6 pr-1">
                                    <div className="form-group">
                                        <label>Student Email</label>
                                        <input type="text" className="form-control" name="studentEmail" placeholder="Student Email" defaultValue={this.props.students.studentEmail}
                    onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                    <div className="form-group">
                                        <label>Parent Email</label>
                                        <input type="text" className="form-control" name="parentEmail" placeholder="Parent Email" defaultValue={this.props.students.parentEmail}
                    onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Academic Session</label>
                                        <select className="form-control"  name="academicSessions" placeholder="Academic Session" defaultValue={this.props.students.academicSessions}
                    onChange={this.handleChange}>
                                        <option selected value="2019-2020">2019-2020</option>
                                        <option value="2018-2019">2018-2019</option>
                                        <option value="2017-2018">2017-2018</option>
                                        <option value="2016-2017">2016-2017</option>
                                        </select>
                                        
                                    </div>
                                </div>
                            </div>
                                                                                            
                            <div className="row">
                                <div className="col-md-4 pr-1">
                                    <div className="form-group">
                                        <label>Roll Number</label>
                                        <input type="text" className="form-control" name="rollNumber" placeholder="Roll Number" defaultValue={this.props.students.rollNo} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-4 px-1">
                                    <div className="form-group">
                                        <label>Date of Admission</label>
                                        <input type="date" className="form-control" name="doa" placeholder="Date of Admission" defaultValue={this.props.students.doa}
                    onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-4 pl-1">
                                    <div className="form-group">
                                        <label>Enabled</label>
                                        <input type="checkbox" className="form-control" name="enabled" placeholder="Is Enabled" defaultValue={this.props.students.enabled} onC={this.handleChange}/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                        <div className="form-group">
                                            <label>About Me</label>
                                            <textarea rows="4" cols="80" className="form-control" placeholder="Here can be your description" value="ÄBC">Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.</textarea>
                                        </div>
                                </div>
                            </div>
                            <input type="hidden" name="id" value={this.props.students.id} />
                            <button type="submit" className="btn btn-info btn-fill pull-right">Update Profile</button>
                                                                                            
                            <div className="clearfix"></div>
                       </form>
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
        }  

        export default EditStudent;