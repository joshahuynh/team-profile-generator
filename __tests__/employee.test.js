const Employee = require("../lib/employee");
// test employee inputs
test('create employee object', ()=>{
    const employee = new Employee('josh', 12345, 'emailtest@gmail.com')
    
    expect(employee.name).toEqual(expect.any(String))
    expect(employee.id).toEqual(expect.any(Number))
    expect(employee.email).toEqual(expect.any(String))
});

test('check for getName()', ()=>{
    const employee = new Employee('josh', '12345', 'emailtest@gmail.com')

    expect(employee.getName()).toEqual(expect.stringContaining(employee.name.toString()));
});

test('check for getId()', ()=>{
    const employee = new Employee('josh', '12345', 'emailtest@gmail.com')

    expect(employee.getId()).toEqual(expect.stringContaining(employee.id.toString()));
});

test('check for getEmail()', ()=>{
    const employee = new Employee('josh', '12345', 'emailtest@gmail.com')

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

test('check for getRole()', ()=>{
    const employee = new Employee('josh', '12345', 'emailtest@gmail.com')

    expect(employee.getRole()).toBe('Employee');
});