const pageScraper = require('./pageScraper');
const genericPageScraper = require('./genericPageScraper');
const fs = require('fs');
const path = require("path");

const dataToObserve = require('../config.json');

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = {};
        // Call the scraper for different set of books to be scraped
        //scrapedData['Travel'] = await pageScraper.scraper(browser, 'Travel');
        //scrapedData['HistoricalFiction'] = await pageScraper.scraper(browser, 'Historical Fiction');
        //scrapedData['Mystery'] = await pageScraper.scraper(browser, 'Mystery');
        for (let id in dataToObserve) {
            console.log(dataToObserve);
            scrapedData[id] = await genericPageScraper.scraper(browser, dataToObserve[id].url, dataToObserve[id].paths)
        }
        await browser.close();
        /*fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file exists
        })*/

        let data = {};
        fs.readFile(path.resolve(__dirname, "../data/data.json"),'utf8', (err, data)=>{
            if (err) {
                console.log(err);
                data = '{}'
            }

            data = JSON.parse(data.toString());

            let today = new Date().toISOString().split('T')[0];
            for(let id in dataToObserve){
                if(data[id] === undefined){
                    data[id] = {};
                    data[id][today] = scrapedData[id];
                }else{
                    data[id][today] = scrapedData[id];
                }
            }
            fs.mkdirSync('data', { recursive: true });

            fs.writeFile("data/data.json", JSON.stringify(data), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The data has been scraped and saved successfully! View it at './data/data.json'");
            });
        });

    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
