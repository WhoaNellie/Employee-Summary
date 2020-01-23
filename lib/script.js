const fs = require('fs');
const axios = require("axios");
const inquirer = require("inquirer");

class Employee{
    constructor(name, id, title, email){
        this.name = name;
        this.id = id;
        this.title = title;
        this.email = email;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return 'Employee';
    }
}

class Manager extends Employee{
    constructor(name, id, title, email, officeNumber){
        super(name, id, title, email);

        this.officeNumber = officeNumber;
    }

    getOffice(){
        return this.officeNumber;
    }

    getRole(){
        return "Manager";
    }
}

class Engineer extends Employee{
    constructor(name, id, title, email, github){
        super(name, id, title, email);

        this.github = github;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        return "Engineer";
    }
}

class Intern extends Employee{
    constructor(name, id, title, email, school){
        super(name, id, title, email);

        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Intern";
    }
}

function init() {
    inquirer.prompt([{
        type: "number",
        message: "How many people are on your team?",
        name: "members"
    }]).then(function ({
        members
    }) {

        for (let i = 0; i < members; i++) {

            inquirer.prompt([{
                type: "list",
                message: `What is the role of team member #${i}?`,
                name: "role"
            }]).then(function ({role}) {
                // construct using employee class
                generateProfile(role);
            });
        }

    });
}

function generateProfile(role){
    
}

// init();

module.exports = Employee;
module.exports = Manager;
module.exports = Engineer;
module.exports = Intern;
