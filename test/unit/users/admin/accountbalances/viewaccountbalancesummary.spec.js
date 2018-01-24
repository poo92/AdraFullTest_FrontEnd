import { ViewAccountBalanceSummary } from '../../../../../src/users/admin/accountbalances/viewaccountbalancesummary';
import * as CONSTANTS from '../../../../../src/custom/constants';

describe('the view account balance test suit', function () {    
    // create new login object before each 
    beforeEach(function () {
        this.ViewAccountBalanceSummary = new ViewAccountBalanceSummary();
        spyOn(window, 'alert');
    });
    // check constructor variables
    it('constructor variables', function () {
        expect(this.ViewAccountBalanceSummary.router).not.toBeNull();
        expect(this.ViewAccountBalanceSummary.startYear).toBe(2017);
        expect(this.ViewAccountBalanceSummary.endYear).toBe(2017);        
        expect(this.ViewAccountBalanceSummary.showmodal).toBe(false);
        expect(this.ViewAccountBalanceSummary.accountBalance).toBeNull();
        expect(this.ViewAccountBalanceSummary.monthsArray).toEqual(CONSTANTS.MONTHS_ARRAY);
        expect(this.ViewAccountBalanceSummary.active).toBe(false);
    });

    // it('view : year is not entered', function () {
    //     this.ViewAccountBalance.year = '';
    //     this.ViewAccountBalance.view();
    //     expect(window.alert).toHaveBeenCalledWith('Please select a year');
    // });

    // it('view : year is entered but less than 4 numbers', function () {
    //     this.ViewAccountBalance.year = "123";
    //     this.ViewAccountBalance.view();
    //     expect(window.alert).toHaveBeenCalledWith('Please enter a valid  year');
    // });

    // it('view : month is not selected', function () {
    //     this.ViewAccountBalance.month = null;
    //     this.ViewAccountBalance.view();
    //     expect(window.alert).toHaveBeenCalledWith('Please select a month');
    // });

    // it('upload : file is not selected', function () {
    //     expect(this.UploadAccountBalance.year).toBe(2017);       
    //     this.UploadAccountBalance.upload();
    //     expect(window.alert).toHaveBeenCalledWith('Please select a file to upload');     
    // });




});