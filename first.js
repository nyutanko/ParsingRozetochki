const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

let link = 'https://rozetka.com.ua/notebooks/c80004/page=';

(async () => {
    let flag = true
    let res = []
    let counter = 1

    try{
        const browser = await puppeteer.launch({headless: false, slowMo: 100, devtools: true})
        const page = await browser.newPage()
        await page.setViewport({
            width: 1400, height: 900
        })

        while(counter!==68){
            await page.goto(`${link}${counter}`)
            await page.waitForSelector('a.button.button_color_gray.button_size_medium.pagination__direction.pagination__direction_type_forward.ng-star-inserted')
            console.log(counter)


            let html = await page.evaluate(async () => {
                let page = []

                try{
                    let divs = document.querySelectorAll('div.goods-tile__inner')
                    divs.forEach(div =>{
                        let obj = {
                            title: div.querySelector('a.goods-tile__heading.ng-star-inserted').innerText,
                            price: div.querySelector('div.goods-tile__price.price--red.ng-star-inserted').innerText,
                            reviews: div.querySelector('div.goods-tile__rating.ng-star-inserted').innerText
                        }
                        page.push(obj)
                    })
                }catch(e){
                    console.log(e);
                }
                return page
            },{waitUntil: 'a.button.button_color_gray.button_size_medium.pagination__direction.pagination__direction_type_forward.ng-star-inserted'})
            await res.push(html)
            console.log(res)
            counter++
        }
    } catch(e){
        console.log(e)
        await browser.close()
    }
})();