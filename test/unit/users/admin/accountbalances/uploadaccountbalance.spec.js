import { UploadAccountBalance } from '../../../../../src/users/admin/accountbalances/uploadaccountbalance';

describe('the upload account balance test suit', function () {
    // create new login object before each 
    beforeEach(function () {
        this.UploadAccountBalance = new UploadAccountBalance();
        spyOn(window, 'alert');
    });
    // check constructor variables
    it('constructor variables', function () {
        expect(this.UploadAccountBalance.active).toBe(false);
        expect(this.UploadAccountBalance.router).not.toBeNull();
        expect(this.UploadAccountBalance.filecontent).toBe("");
        expect(this.UploadAccountBalance.year).toBe(2017);        
    });

    it('upload : year is not entered', function () {
        this.UploadAccountBalance.year = '';            
        this.UploadAccountBalance.upload();
        expect(window.alert).toHaveBeenCalledWith('Please select a year');     
    });

    it('upload : year is entered but less than 4 numbers', function () {
        this.UploadAccountBalance.year = "123";            
        this.UploadAccountBalance.upload();
        expect(window.alert).toHaveBeenCalledWith('Please enter a valid  year');     
    });
    
    it('upload : file is not selected', function () {
        expect(this.UploadAccountBalance.year).toBe(2017);       
        this.UploadAccountBalance.upload();
        expect(window.alert).toHaveBeenCalledWith('Please select a file to upload');     
    });

});