const Intern = require("../lib/intern");
// test intern inputs
test('create intern object', ()=>{
    const intern = new Intern('josh', 12345, 'emailtest@gmail.com', 'UT')
    
    expect(intern.name).toEqual(expect.any(String))
    expect(intern.id).toEqual(expect.any(Number))
    expect(intern.email).toEqual(expect.any(String))
    expect(intern.school).toEqual(expect.any(String))
});

test('check for getRole()', ()=>{
    const intern = new Intern('josh', 12345, 'emailtest@gmail.com', 'UT')

    expect(intern.getRole()).toBe('Intern');
});

test('check for getSchool()', ()=>{
    const intern = new Intern('josh', 12345, 'emailtest@gmail.com', 'UT')

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});