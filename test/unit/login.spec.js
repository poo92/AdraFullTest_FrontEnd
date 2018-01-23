import { Login } from '../../src/login';

describe('the login test suit', function () {
    // create new login object before each 
    beforeEach(function () {
        this.Login = new Login();
    });
    // check constructor variables
    it('check constructor variables', function () {
        expect(this.Login.active).toBe(false);
        expect(this.Login.router).not.toBeNull();;
    });
});