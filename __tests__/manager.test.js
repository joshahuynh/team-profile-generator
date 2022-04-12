const Manager = require("../lib/manager");
// test manager inputs
test('create manager object', ()=>{
    const manager = new Manager('josh', 12345, 'emailtest@gmail.com', 5129543103)
    
    expect(manager.name).toEqual(expect.any(String))
    expect(manager.id).toEqual(expect.any(Number))
    expect(manager.email).toEqual(expect.any(String))
    expect(manager.officeNumber).toEqual(expect.any(Number))
});

test('check for getRole()', ()=>{
    const manager = new Manager('josh', 12345, 'emailtest@gmail.com', 5129543103)

    expect(manager.getRole()).toBe('Manager');
});

test('check for getOfficeNumber()', ()=>{
    const manager = new Manager('josh', 12345, 'emailtest@gmail.com', 5129543103)

    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));
});
