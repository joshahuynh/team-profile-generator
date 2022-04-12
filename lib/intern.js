const Employee = require("./employee");

// use super constructor from employee to get name, email, and id
class Intern extends Employee {
    constructor (name, id, email, school) {
        super (name, id, email);
        this.school = school;
    }
    // get role function
    getRole() {
        return "Intern";
    }
    // get name of school
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;