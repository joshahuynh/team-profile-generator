const inquirer = require("inquirer");
const fs = require("fs");
// link js files to index
const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const employees = [];

// initIndex function creates HTML and adds profiles to the HTML
function initIndex() {
    createHTML();
    addProfile();
}

// questions to add to profile
function addProfile() {
    inquirer.prompt([{
        type: "input",
        message: "Enter a team member's name:",
        name: "name"
    },
    {
        type: "list",
        message: "Choose the team member's role:",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ]
    },
    {
        type: "input",
        message: "Enter the team member's id:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter the team member's email address:",
        name: "email"
    }])
    // specific questions by role
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter the team member's ${roleInfo}:`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreProfiles"
        }])
        .then(function({roleInfo, moreProfiles}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            // add more profiles or finish the HTML
            employees.push(newMember);
            addToHTML(newMember)
            .then(function() {
                if (moreProfiles === "yes") {
                    addProfile();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

// create html template
function createHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    // write "team-profile.html" to "dist" folder
    fs.writeFile("./dist/team-profile.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Starting team profile generator!");
}

// add html for each member
function addToHTML(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-4">
            <div class="card mx-auto mb-5" style="width: 275px">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-4">
            <div class="card mx-auto mb-5" style="width: 275px">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const phone = member.getOfficeNumber();
            data = `<div class="col-4">
            <div class="card mx-auto mb-5" style="width: 275px">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${phone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding a team member...");
        fs.appendFile("./dist/team-profile.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    }); 
}

// finishHtml() wraps up team-profile.html by changing constant "html" to empty
function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/team-profile.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Generated team profile is located in 'dist' folder.");
}

// initializes html and adds profiles
initIndex();