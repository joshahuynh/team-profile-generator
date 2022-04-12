const Employee = require ("./employee");

// use super constructor from employee to get name, email, and id
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email);
        this.officeNumber = officeNumber;
    }
    // get role function
    getRole() {
        return "Manager";
    }
    // get office number
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;