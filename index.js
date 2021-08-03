const Joi = require('joi');
const express = require('express');

const app = express();
//PORT
const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [{
        id: 1,
        name: 'course no 1'
    },
    {
        id: 2,
        name: 'course no 2'
    },
    {
        id: 3,
        name: 'course no 3'
    },
]

app.get('/', (req, res) => {
    res.send('HTTP METHODS ELABORATION - Get, Post, Put, Delete');
})

app.get('/api/courses/getall', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/getone/:id', (req, res) => {
    courseId = req.params.id;
    const course = courses.find(FindC)

    function FindC(c) {
        return c.id == courseId;
    }
    if (!course) {
        res.status(404).send('course does not exist');
    } else {
        res.send(course);
    }
});

app.post('/api/courses/post', (req, res) => {
    const result = validator(req.body);
    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/put/:id', (req, res) => {
    //look up the course
    //if not existing return 404
    courseId = req.params.id;
    const course = courses.find(FindC)

    function FindC(c) {
        return c.id == courseId;
    }
    if (!course) {
        res.status(404).send('course does not exist');
        return;
    }
    //validate
    //if invalid, return 400 - bad request
    const result = validator(req.body);
    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return;
    }
    //update course
    course.name = req.body.name;
    //return the updated course
    res.send(course);
});
app.delete('/api/courses/delete/:id', (req, res) => {
    // look up the couse
    // not existing, return 404
    courseId = req.params.id;
    const course = courses.find(FindC)

    function FindC(c) {
        return c.id == courseId;
    }
    if (!course) {
        res.status(404).send('course does not exist');
        return;
    }
    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return the deleted course
    res.send(course);
})
app.listen(port, () => {
    console.log(`server up and running at localhost/${port}`);
})

function validator(course) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}