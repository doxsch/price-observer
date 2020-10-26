const browserObject = require('./price-observer/browser');
const scraperController = require('./price-observer/pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)
