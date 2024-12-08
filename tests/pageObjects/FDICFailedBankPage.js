import { By } from 'selenium-webdriver';

export const FDIC_FAILED_BANK_LIST = 'https://www.fdic.gov/bank-failures/failed-bank-list';

export const getFDICHomeLogo = (driver) => driver.findElement(By.css('.logo-img[title="Home"]'));
export const getFDICFailedBankListTitle = (driver) => driver.findElement(By.id('block-fdic-theme-node-title-block'));
export const getFDICSearchBox = (driver) => driver.findElement(By.css('[data-drupal-selector="edit-combine"]'));
export const getFDICApplyButton = (driver) => driver.findElement(By.css('[data-drupal-selector="edit-submit-failed-bank-list"]'));
export const getFDICFailedBankList = (driver) => driver.findElements(By.css('[data-once="tableheader"] tbody tr'));
export const getFDICBankName = (driver) => driver.findElement(By.css('[headers="view-title-table-column"]'));
export const getFDICPageDropdown = (driver) => driver.findElement(By.css('[data-drupal-selector="edit-items-per-page"]'));
export const getFDICPageDropdownALLOption = (driver) => driver.findElement(By.css('[data-drupal-selector="edit-items-per-page"][value="All"]'));
