/*
 * @Author: xudan
 * @Date: 2024-07-24 14:24:17
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-20 18:59:00
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const { Builder, By, until } = require("selenium-webdriver");
const fs = require('fs');

(async function fetchTopics() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the homepage
    await driver.get("http://www.speak8.com");

    // Wait for the topics to load
    await driver.wait(until.elementLocated(By.css('.topTitles')), 10000);

    // Find all topic elements
    const topicElements = await driver.findElements(By.css('.titTab .active'));

    const topics = [];

    // Extract information from each topic
    for (let index = 0; index < topicElements.length; index++) {
      // tab 标签 - 话题分类
      const idx = index
      const _element = await topicElements[idx].findElement(By.tagName('a'));
      const id = await _element.getAttribute('data-id');
      const url = await _element.getAttribute('data-url');
      const title = await _element.getText();
      topics.push({ idx, id, url, title, topicListItems: [] });
    }

    // 话题列表
    const topicList = await driver.findElement(By.css('.information_box'));
    const topicListElements = await topicList.findElements(By.css('.szl_box'));

    // 遍历每个话题 - 当前共6个
    for (let index = 0; index < topicListElements.length; index++) {
      const topicBoxId = await topicListElements[index].getAttribute('id');
      await topicElements[index].click();
      // await driver.wait(until.elementIsVisible(topicListElements[index]), 10000);



      // 当前话题列表 - 话题列表项
      const topicLists = await topicListElements[index].findElements(By.css('.szl_ul li'));

      const topicListItems = [];
      for (const topic of topicLists) {
        const _link = await topic.findElement(By.tagName('a'));

        // 当前话题列表 - 话题列表项
        const topicHref = await _link.getAttribute('href');
        const topicId = (await topicHref.split('bid=')[1]);
        const topicItem = await _link.getText();
        if (topicItem) {
          topicListItems.push({
            topicHref,
            topicId,
            topicItem
          });
        }
      }

      // 找到对应的主题并添加 topicListItems
      const matchingTopic = topics.find(t => {
        return t.idx === index
      });
      logger.info(topicListItems)
      if (matchingTopic) {
        matchingTopic.topicBoxId = topicBoxId;
        matchingTopic.topicListItems = topicListItems;
      }
    }

    const date = new Date();
    const formattedDate = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');

    // Save topics to a JSON file
    fs.writeFileSync(`./files/topic_${formattedDate}.json`, JSON.stringify(topics, null, 2));
    logger.info(`Successfully fetched ${topics.length} topics and saved to ./files/topic_${formattedDate}.json`);

  } catch (error) {
    logger.error("Error fetching topics:", error);
  } finally {
    await driver.quit();
  }
})();
