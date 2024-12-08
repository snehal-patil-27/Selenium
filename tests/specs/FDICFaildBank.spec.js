import { setupDriver, getDriver } from '../setup.js';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { FDIC_FAILED_BANK_LIST, getFDICHomeLogo, getFDICFailedBankListTitle, getFDICSearchBox, getFDICApplyButton, getFDICBankName, getFDICPageDropdown
       } from '../pageObjects/FDICFailedBankPage.js';
import { clickApplyButton, isElementVisible, searchAndApply, selectAllFromDropdown, verifyResults,selectFromDropdown } from '../FDICUtils.js';
import options from '../data/dropDownOptions.json' assert { type: 'json' };

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Failed FDIC Bank', function () {
    this.timeout(20000); // Set timeout for asynchronous operations
    setupDriver();

    context('UI Validation', () => {
        it('Validates all UI components and the correct URL', async () => {
            const driver = getDriver();

            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.equal(FDIC_FAILED_BANK_LIST);

            // Validate Home Logo visibility
            const homeLogo = await getFDICHomeLogo(driver);
            await isElementVisible(homeLogo);

            // Validate the Failed Bank List title
            const title = await getFDICFailedBankListTitle(driver);
            const titleText = await title.getText();
            expect(titleText.trim()).to.equal('Failed Bank List');

            // Validate Search Box placeholder and visibility
            const searchBox = await getFDICSearchBox(driver);
            await isElementVisible(searchBox);
            expect(await searchBox.getAttribute('placeholder')).to.equal('Search this Listing');

            // Validate Apply Button visibility
            const applyButton = await getFDICApplyButton(driver);
            await isElementVisible(applyButton);

            // Verify Results (using a custom utility function, you can adapt this to your needs)
            await verifyResults(driver, 10); 
        });
    });

    context('Search Functionality', () => {
        const SEARCH_TERM = 'Silicon';

        it('Search for Silicon and validate exactly one result is returned', async () => {
            const driver = getDriver();
            await searchAndApply(driver, SEARCH_TERM);
            await verifyResults(driver, 1);

            // Validate that the bank name contains the search term
            const bankName = await getFDICBankName(driver);
            const bankText = await bankName.getText();
            expect(bankText).to.contain(SEARCH_TERM);
        });

        it('Validate that there are 570 banks in the list', async () => {
            const driver = getDriver();
            await selectAllFromDropdown(driver);
            await clickApplyButton(driver);
            await verifyResults(driver, 570);
        });

        it('Validate all the dropdown options', async () => {
            const driver = getDriver();
            // Options are imported from json file
            for(const option of options) {
                await selectFromDropdown(driver, option.text);
                await clickApplyButton(driver);
                await verifyResults(driver, option.expectedCount);
            }
        })
    });
});