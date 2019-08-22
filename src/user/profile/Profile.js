import React, { Component } from 'react';

import PollList from '../../poll/PollList';
import { getUserProfile } from '../../util/APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }


    handleChange(e){
    const itemName=e.target.name;
    const itemValue=e.target.value;

    this.setState({[itemName]:itemValue})
    }


    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        }); 
        
        
    }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    validateUsernameAvailability(){

    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">    
                                <Tabs defaultActiveKey="1" 
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                    
                                    <TabPane tab="Account Settings"  key="1">
                                            <div className="content">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                         <div className="col-md-8">
                                                             <div className="card">
                                                                                    <div className="card-header">
                                                                                        <h4 className="card-title">Edit Profile</h4>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <form>
                                                                                            <div className="row">
                                                                                                <div className="col-md-5 pr-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>School (disabled)</label>
                                                                                                        <input type="text" className="form-control" placeholder="Company" value={this.state.user.username}  />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-3 px-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>Username</label>
                                                                                                        <input type="text" className="form-control" placeholder="Username" value={this.state.user.username} onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-4 pl-1">
                                                                                                    <div className="form-group">
                                                                                                        <label for="exampleInputEmail1">Email address</label>
                                                                                                        <input type="email" className="form-control" placeholder="Email" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row">
                                                                                                <div className="col-md-6 pr-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>First Name</label>
                                                                                                        <input type="text" className="form-control" placeholder="Company" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-6 pl-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>Last Name</label>
                                                                                                        <input type="text" className="form-control" placeholder="Last Name" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row">
                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">
                                                                                                        <label>Address</label>
                                                                                                        <input type="text" className="form-control" placeholder="Home Address" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row">
                                                                                                <div className="col-md-4 pr-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>City</label>
                                                                                                        <input type="text" className="form-control" placeholder="City" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-4 px-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>Country</label>
                                                                                                        <input type="text" className="form-control" placeholder="Country" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-md-4 pl-1">
                                                                                                    <div className="form-group">
                                                                                                        <label>Postal Code</label>
                                                                                                        <input type="number" className="form-control" placeholder="ZIP Code" value={this.state.user.username}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row">
                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">
                                                                                                        <label>About Me</label>
                                                                                                        <textarea rows="4" cols="80" className="form-control" placeholder="Here can be your description" value={this.state.user.username}>Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.</textarea>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <button type="submit" className="btn btn-info btn-fill pull-right">Update Profile</button>
                                                                                            <div className="clearfix"></div>
                                                                                        </form>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div className="card card-user">
                                                                                    <div className="card-image">
                                                                                        <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <div className="author">
                                                                                            <a href="#">
                                                                                                <img className="avatar border-gray"  src="./assets/img/faces/face-3.jpg" alt="..."/>
                                                                                                <h5 className="title">{this.state.user.name}</h5>
                                                                                            </a>
                                                                                            <p className="description">
                                                                                                {this.state.user.username}
                                                                                            </p>
                                                                                        </div>
                                                                                        <p className="description text-center">
                                                                                            "Lamborghini Mercy
                                                                                            <br/> Your chick she so thirsty
                                                                                            <br/> I'm in that two seat Lambo"
                                                                                        </p>
                                                                                    </div>
                                                                                    <hr/>
                                                                                    <div className="button-container mr-auto ml-auto">
                                                                                        <button href="#" className="btn btn-simple btn-link btn-icon">
                                                                                            <i className="fa fa-facebook-square"></i>
                                                                                        </button>
                                                                                        <button href="#" className="btn btn-simple btn-link btn-icon">
                                                                                            <i className="fa fa-twitter"></i>
                                                                                        </button>
                                                                                        <button href="#" className="btn btn-simple btn-link btn-icon">
                                                                                            <i className="fa fa-google-plus-square"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                    </TabPane>

                                    <TabPane tab={`${this.state.user.pollCount} Polls`} key="2">
                                        <PollList username={this.props.match.params.username} type="USER_CREATED_POLLS" />
                                    </TabPane>
                                    <TabPane tab={`${this.state.user.voteCount} Votes`}  key="3">
                                        <PollList username={this.props.match.params.username} type="USER_VOTED_POLLS" />
                                    </TabPane>
                                </Tabs>
                            </div>  

                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;