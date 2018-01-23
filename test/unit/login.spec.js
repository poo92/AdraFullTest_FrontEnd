import { Login } from '../../src/login';


describe('the login test suit', function () {
    // create new login object before each 
    beforeEach(function () {
        this.Login = new Login();
        spyOn(window, 'alert');
    });
    // check constructor variables
    it('constructor variables', function () {
        expect(this.Login.active).toBe(false);
        expect(this.Login.router).not.toBeNull();
    });

    it('login : username and password both undefined', function () {
        expect(this.Login.username).toBeUndefined();
        expect(this.Login.password).toBeUndefined();
        this.Login.login();
        expect(window.alert).toHaveBeenCalledWith('Please enter a username.');     
    });

    it('login : username defined,password undefined', function () {
        this.Login.username = "admin@gmail.com";
        expect(this.Login.password).toBeUndefined();
        this.Login.login();
        expect(window.alert).toHaveBeenCalledWith('Please enter a password.');     
    });

    it('login : username and password defined, invalid login', function () {
        this.Login.username = "admin@gmail.com";
        this.Login.password = "user@123";        
        this.Login.login();
        expect(this.Login.active).toBe(false);        
        expect(window.alert).toHaveBeenCalledWith("The user name or password is incorrect.");     
    });

});