const scraperObject = {
    async scraper(browser, url, pathsToScrape) {
        let page = await browser.newPage();

        // fix new page load by digitec?
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');

        console.log(`Navigating to ${url}...`);
        await page.setViewport({ width: 1366, height: 768});
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36 Edg/86.0.622.51");
        await page.goto(url);
        let scrapedData = [];

        console.log(`Scrap ${pathsToScrape.length} different data`);
        for(let pathObj of pathsToScrape){
            console.log(`search data for path name: ${pathObj.name}`);
            const name = pathObj.name;
            const data = await scrapePath(pathObj.path);
            scrapedData.push({name, data})
        }

        async function scrapePath(path) {
            await page.waitForXPath(path);
            const [elHandle] = await page.$x(path);
            return await page.evaluate(name => name.innerText, elHandle);
        }

        await page.close();
        return scrapedData;

    }
}

module.exports = scraperObject;
