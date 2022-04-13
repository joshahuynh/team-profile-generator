const inquirer = require("inquirer");
const fs = require("fs");
// dependencies declaration
const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");



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
        name: "name",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a name!');
                return false;
            }
        }
    },
    {
        type: "list",
        message: "Choose the team member's role:",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name:"role",
    },
    {
        type: "input",
        message: "Enter the team member's id:",
        name: "id",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter an ID!');
                return false;
            }
        }
    },
    {
        type: "input",
        message: "Enter the team member's email address:",
        name: "email",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter an email!');
                return false;
            }
        }
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
            <link rel="stylesheet" href="style.css">
            <title>Team Profile</title>
        </head>
        <body>
            <header class="header">
                Team Profile
            </header>
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
            data = `
                    <div class="col-12 col-sm-6 col-md-4" id="card">
                        <h5 class="card-header" id="card-header">${name}<br /><br />💻 Engineer</h5>
                        <ul class="list-group list-group-flush" id="list">
                            <li class="list-group-item">ID: ${id}</li>
                            <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                            <li class="list-group-item"> GitHub Username: <a href="https://github.com/${gitHub}">${gitHub}</a></li>
                        </ul>
                    </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `
                    <div class="col-12 col-sm-6 col-md-4" id="card">
                        <h5 class="card-header" id="card-header">${name}<br /><br />📚 Intern</h5>
                        <ul class="list-group list-group-flush" id="list">
                            <li class="list-group-item">ID: ${id}</li>
                            <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                            <li class="list-group-item">School: ${school}</li>
                        </ul>
                    </div>`;
        } else {
            const phone = member.getOfficeNumber();
            data = `
                    <div class="col-12 col-sm-6 col-md-4" id="card">
                        <h5 class="card-header" id="card-header">${name}<br /><br />💼 Manager</h5>
                        <ul class="list-group list-group-flush" id="list">
                            <li class="list-group-item">ID: ${id}</li>
                            <li class="list-group-item">Email Address: <a href="mailto:${email}">${email}</a></li>
                            <li class="list-group-item">Office Phone: <a href="tel:${phone}">${phone}</a></li>
                        </ul>
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
    const html = ` 
                </div>
            </div>
            <footer class="footer">Created by joshahuynh on ${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}</footer>
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