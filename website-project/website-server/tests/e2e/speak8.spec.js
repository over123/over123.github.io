/*
 * @Author: xudan
 * @Date: 2024-07-24 14:24:17
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-24 17:51:38
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require('fs');

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    /** demo可用
     await driver.get("https://www.baidu.com");
     let random = Math.floor(Math.random() * 6)
     let news = await driver.findElement(By.css('[data-index="'+ random +'"]'));
     await news.click(); 
     // 获取所有的窗口句柄
     let handles = await driver.getAllWindowHandles();
     // 切换到新的标签页
     await driver.switchTo().window(handles[handles.length - 1]);
     let search = await driver.findElement(By.name("wd"));
     await search.clear()
     await search.sendKeys("javascript", Key.RETURN);
     await driver.wait(until.titleIs("javascript_百度搜索"), 1000);
    */



    await driver.get("http://www.speak8.com/member.php?mod=logging&action=login&referer=portal.php");

    // 填写用户名密码并登录
    let username = await driver.findElement(By.name("username"));
    await username.sendKeys("tb0009825_11");
    let password = await driver.findElement(By.name("password"));
    await password.sendKeys("123123", Key.RETURN);

    // await driver.get("http://www.speak8.com/strong_yyyuyue-strong_yyyuyue.html");

    // 获取元素的文本内容
    // let text = await element.getText();

    // 将文本内容写入本地文件
    // fs.writeFile('output.txt', text, (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // })

      
    // // 等待元素可见
    // let showLoginDialog = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.status_loginned'))), 10000);

    
    
  } catch (error) {
    console.log("error")
    console.log(error)
  } finally {
    // await driver.quit();
  }
})();
