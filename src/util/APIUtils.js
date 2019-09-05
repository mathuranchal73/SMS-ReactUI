import { POLL_API_BASE_URL,AUTH_API_BASE_URL,USER_API_BASE_URL,STUDENT_API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';
import axios, { post } from 'axios';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
      //headers.append('Authorization', localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllStudents() {
   

    return request({
        url: STUDENT_API_BASE_URL ,
        method: 'GET'
    });
}

export function getStudentByID(id) {

    return request({
        url: STUDENT_API_BASE_URL +id,
        method: 'GET'
    });
}

export function deleteStudentByID(id) { 

    return request({
        url: STUDENT_API_BASE_URL +id,
        method: 'DELETE'
    });
}

export function updateStudent(studentId,studentData){
    return request({
        url: STUDENT_API_BASE_URL +"update/"+studentId,
        method: 'PUT',
        body: JSON.stringify(studentData)
    });

}

export function uploadStudents(file) {
    const url = STUDENT_API_BASE_URL +"bulkUpload";
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
}

export function createStudent(studentData) {
    return request({
        url: STUDENT_API_BASE_URL + "create",
        method: 'POST',
        body: JSON.stringify(studentData)         
    });
}


export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: POLL_API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: POLL_API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
}

export function castVote(voteData) {
    return request({
        url: POLL_API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        //url: AUTH_API_BASE_URL + "/auth/signin",
        url: AUTH_API_BASE_URL + "/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: USER_API_BASE_URL + "/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: USER_API_BASE_URL + "/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: USER_API_BASE_URL + "/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function checkStudentEmailAvailability(email) {
    return request({
        url: STUDENT_API_BASE_URL + "checkStudentEmailAvailability?studentEmail=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
       // url: USER_API_BASE_URL + "/user/me",
       url: USER_API_BASE_URL + "/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: USER_API_BASE_URL + "/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: POLL_API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: POLL_API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}