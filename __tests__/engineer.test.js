const Engineer = require("../lib/engineer");
// test engineer inputs
test('create engineer object', ()=>{
    const engineer = new Engineer('josh', 12345, 'emailtest@gmail.com', 'joshahuynh')
    
    expect(engineer.name).toEqual(expect.any(String))
    expect(engineer.id).toEqual(expect.any(Number))
    expect(engineer.email).toEqual(expect.any(String))
    expect(engineer.github).toEqual(expect.any(String))
});

test('check for getRole()', ()=>{
    const engineer = new Engineer('josh', 12345, 'emailtest@gmail.com', 'joshahuynh')

    expect(engineer.getRole()).toBe('Engineer');
});

test('check for getGithub()', ()=>{
    const engineer = new Engineer('josh', 12345, 'emailtest@gmail.com', 'joshahuynh')

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});