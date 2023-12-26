const express = require('express');
const fs = require('fs');
const port = 3000;
const app = express();

app.use(express.json());

let admins = [{username:"prathamesh",password:"1234"}];
let users = [];
let courses = [];


const adminAuthentication = (req,res,next) => {
    const {username, password} = req.headers;
    if(admins.find(a => a.username === username && a.password === password)){
        next();
    }else{
        res.status(403).json({message : "Admin authentication failed"});
    }
}


// admin routes

app.post('/admin/signup', (req,res) => {
    const admin = req.body; 
    if(admins.find(a => a.username === admin.username)){
        res.status(403).json({message: "Admin already exists"});
    }else{
        admins.push(admin);
        res.json({message: "Admin created successfully"});
    }
});

app.post('/admin/login', adminAuthentication, (req,res) => {
    res.json({message: "Logged in successfully"});
});

app.post('/admin/courses', adminAuthentication, (req,res) => {
    const course = req.body;
    if(!course.title){
        return res.json(411).send({message: "Empty title"});
    }
    course.id = Date.now();
    courses.push(course);
    res.json({message: "course created successfully", courseId : course.id});
});

app.put('/admin/courses/:courseId', adminAuthentication, (req,res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find(c => c.id === courseId);
    if(course){
        Object.assign(course, req.body);
        res.json({message: "course updated successfully"});
    }else{
        res.status(404).json({message: "Course not found"});
    }
});

app.get('/admin/courses', adminAuthentication, (req,res) => {
    res.json({courses: courses});
});

//login routes

app.post('/users/signup', (req,res) => {

});

app.post('/users/login', (req,res) => {

});

app.get('/users/courses', (req,res) => {

});

app.get('/users/courses/:courseId', (req,res) => {

});

app.get('/users/purchasedCourses', (req,res) => {

});



function checkfn(){
    console.log(`server running on port ${port}`);
};

app.listen(port,checkfn);