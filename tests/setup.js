import {Builder} from 'selenium-webdriver';
import {FDIC_FAILED_BANK_LIST} from './pageObjects/FDICFailedBankPage.js'

let driver;

export const setupDriver = () => {
    beforeEach(async () => {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        await driver.get(FDIC_FAILED_BANK_LIST);
    });

    afterEach(async () => {
        if (driver) {
            await driver.quit();
        }
    });
};

export const getDriver = () => driver;