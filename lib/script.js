const fs = require('fs');
const inquirer = require("inquirer");
const Handlebars = require("handlebars");

let team = [];

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);

        this.officeNumber = officeNumber;
        this.role = "Manager";
        this.icon = "fas fa-mug-hot";
        this.offShow = "show"
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);

        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);

        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

async function init() {
    let {members} = await inquirer.prompt([{
        type: "number",
        message: "How many people are on your team?",
        name: "members"
    }]);
    
        for (let i = 0; i < members; i++) {

            let questions = [{
                type: "list",
                message: `What is the role of team member #${i+1}?`,
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            }, {
                type: "input",
                message: `What is name of this Team member?`,
                name: "name"
            }, {
                type: "input",
                message: `What is email of this Team member?`,
                name: "email"
            }];

            let res = await inquirer.prompt(questions);
            let role = res.role;
            let name = res.name;
            let id = i + 1;
            let email = res.email;

            if (role == "Manager") {

                let res = await inquirer.prompt({
                    type: "number",
                    message: `What is ${name}'s office number?`,
                    name: "officeNumber"
                });
 
                team.push(new Manager(name, id, email, res.officeNumber));

            } else if (role == "Engineer") {

                let res = await inquirer.prompt({
                    type: "input",
                    message: `What is ${name}'s Github username?`,
                    name: "github"
                });

                team.push(new Engineer(name, id, email, res.github));

            } else if (role == "Intern") {
                let res = inquirer.prompt({
                    type: "input",
                    message: `What is ${name}'s school?`,
                    name: "school"
                });
                
                team.push(new Intern(name, id, email, res.school));
                
            }
        }

        let cardStr = "";
        let cardObj = {};

        let source = getHTML("card");
        let template = Handlebars.compile(source);
        // console.log(source);
        for(let i = 0; i < team.length; i++){
            let result = template(team[i]);
            console.log("result");
            console.log(result);
            cardStr = cardStr.concat(result);
            console.log(cardStr);
        }


        cardObj.cards = cardStr;
        console.log(cardObj);

        let mainSource = getHTML("main");
        let mainTemp = Handlebars.compile(mainSource);
        let mainResult = mainTemp(cardObj);

        fs.writeFileSync("../output/team.html",mainResult);
    

}

init();

function getHTML(temp){
    console.log(team);


    let data = fs.readFileSync(`../templates/${temp}.html`,'utf8');

    return data;
    // <i class="fas fa-mug-hot"></i>
    // <i class="fas fa-glasses"></i>
    // <i class="fas fa-user-graduate"></i>
}

function generateFile(){
        fs.writeFile("../output/team.html",team[0].name, error => console.log(error));
}

module.exports = {
    Employee,
    Manager,
    Engineer,
    Intern
};