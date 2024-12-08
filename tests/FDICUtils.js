import { Select } from 'selenium-webdriver';
import * as chai from 'chai';
import { getFDICApplyButton, getFDICFailedBankList, getFDICPageDropdown, getFDICSearchBox } from './pageObjects/FDICFailedBankPage.js';

const { expect } = chai;

export const searchAndApply = async (driver, searchTerm) => {
    const searchBox = await getFDICSearchBox(driver); 
    await searchBox.sendKeys(searchTerm);
    await clickApplyButton(driver);
};

export const verifyResults = async (driver, expectedLength) => {

    // Check the page height dynamically before scrolling then Scroll to the bottom of the page
    const pageHeight = await driver.executeScript("return document.body.scrollHeight");
    await driver.executeScript(`window.scrollTo(0, ${Math.min(2000, pageHeight)})`);

    // Wait for the list to load and check the length of the list of failed banks  
    await driver.wait(async () => {
        const failedBankList = await getFDICFailedBankList(driver);
        return failedBankList.length > 0;
    }, 10000);

    const failedBankList = await getFDICFailedBankList(driver);
    const actualLength = await failedBankList.length;

    if (actualLength !== expectedLength) {
        throw new Error(`Expected ${expectedLength} results, but found ${actualLength}`);
    }
};

export const selectAllFromDropdown = async (driver) => {
    const dropdown = await getFDICPageDropdown(driver);
    const select = new Select(dropdown);
    await select.selectByVisibleText('- All -');
}

export const selectFromDropdown = async (driver, optionText) => {
    const dropdown = await getFDICPageDropdown(driver);
    const select = new Select(dropdown);
    await select.selectByVisibleText(optionText);
}

export const clickApplyButton = async (driver) => {
    const applyButton = getFDICApplyButton(driver);
    await applyButton.click();
}

export const isElementVisible = async (element) =>{
    expect (await element.isDisplayed()).to.be.true;
}