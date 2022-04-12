const Employee = require("./employee");

// use super constructor from employee to get name, email, and id
class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    //get role function
    getRole() {
        return "Engineer";
    }
    // get Github username function
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;
