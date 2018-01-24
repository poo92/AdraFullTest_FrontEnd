import { ViewAccountBalance } from '../../../../../src/users/admin/accountbalances/viewaccountbalance';

describe('the view account balance test suit', function () {
    let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // create new login object before each 
    beforeEach(function () {
        this.ViewAccountBalance = new ViewAccountBalance();
        spyOn(window, 'alert');
    });
    // check constructor variables
    it('constructor variables', function () {
        expect(this.ViewAccountBalance.router).not.toBeNull();
        expect(this.ViewAccountBalance.year).toBe(2017);
        expect(this.ViewAccountBalance.showmodal).toBe(false);
        expect(this.ViewAccountBalance.accountBalance).toBeNull();
        expect(this.ViewAccountBalance.monthsArray).toEqual(monthsArray);
        expect(this.ViewAccountBalance.active).toBe(false);


    });

    it('view : year is not entered', function () {
        this.ViewAccountBalance.year = '';
        this.ViewAccountBalance.view();
        expect(window.alert).toHaveBeenCalledWith('Please select a year');
    });

    it('view : year is entered but less than 4 numbers', function () {
        this.ViewAccountBalance.year = "123";
        this.ViewAccountBalance.view();
        expect(window.alert).toHaveBeenCalledWith('Please enter a valid  year');
    });

    it('view : month is not selected', function () {
        this.ViewAccountBalance.month = null;
        this.ViewAccountBalance.view();
        expect(window.alert).toHaveBeenCalledWith('Please select a month');
    });

    // it('upload : file is not selected', function () {
    //     expect(this.UploadAccountBalance.year).toBe(2017);       
    //     this.UploadAccountBalance.upload();
    //     expect(window.alert).toHaveBeenCalledWith('Please select a file to upload');     
    // });




});