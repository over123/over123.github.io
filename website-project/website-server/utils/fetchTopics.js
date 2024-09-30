/*
 * @Author: xudan
 * @Date: 2024-07-24 14:24:17
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-25 18:52:31
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { logger } = require('../middlewares/logger');
const { enableDebug } = require('../config');


// 设置 Chrome 选项以模拟移动设备并启用无头模式
const mobileEmulation = {
    deviceName: 'iPhone X'
};
const options = new chrome.Options()
    .setMobileEmulation(mobileEmulation)
    .addArguments('--headless'); // 启用无头模式

let driver;

async function initializeDriver() {
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
}

async function fetchTopics(ctx) { // 添加 ctx 参数
    await initializeDriver();
    try {
        // 导航到移动版页面
        // await driver.get("http://speak8.com/plugin.php?id=strong_yyzl:strong_yyzl&mobile=2" + (page ? ('&page=' + page) : ''));
        await driver.get("http://speak8.com/plugin.php?id=strong_yyzl:strong_yyzl&mobile=2");

        // 等待话题加载
        await driver.wait(until.elementLocated(By.css('.c_mon')), 10000);

        const topics = [];
        let topicCount = await driver.findElements(By.css('.zltab a')).then(elements => elements.length);

        for (let index = 0; index < topicCount; index++) {
            try {
                // 在每次循环中重新获取元素
                const topicElements = await driver.findElements(By.css('.zltab a'));
                if (index >= topicElements.length) {
                    logger.error(`Index ${index} is out of bounds. Total elements: ${topicElements.length}`);
                    break;
                }
                const _element = topicElements[index];

                const url = await _element.getAttribute('href');
                const title = await _element.getAttribute('innerHTML');

                topics.push({ index, url, title });

                // 每处理完一个主题，就保存一次进度
                saveSummary(topics);
            } catch (topicListError) {
                logger.error(`Error getting topic list for index ${index}:`, topicListError);
                topics.push({ index, url: '', title: `Unknown ${index}` });
                saveSummary(topics);
            }
        }

        // 遍历topics
        for (const topic of topics) {
            const topicList = await getTopicList(topic);
            topic.topicList = topicList;
            enableDebug && logger.info(`Getting topic list for topic ${topic.index, topic.title}:`);
        }

        ctx.body = {
            success: true,
            topics: topics,
        };
        logger.info('Fetched topics successfully');

    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Error fetching topics',
        };
        logger.error('Error fetching topics:', error);
    } finally {
        await driver.quit();
    }
}

async function getTopicList({ index, title, url, page = 1 }) {
    let pageCount = 1;
    let allTopics = [];
    let topicListCount = 0;

    async function fetchPage(currentPage) {
        const pageUrl = `${url}&page=${currentPage}`;
        await driver.get(pageUrl);

        try {
            await driver.wait(until.elementLocated(By.css('.szl_ul')), 60000);

            const topicListItems = await driver.findElements(By.css('.szl_ul li'));
            topicListCount = topicListCount > 0 ? topicListCount : topicListItems.length;

            enableDebug && logger.info(`Found ${topicListItems.length} items on page ${currentPage}`);

            for (let itemIndex = 0; itemIndex < topicListItems.length; itemIndex++) {
                try {
                    const item = topicListItems[itemIndex];
                    const link = await item.findElement(By.css('a'));

                    // 添加等待和错误处理
                    let href, text;
                    try {
                        await driver.wait(until.elementIsVisible(link), 5000);
                        href = await link.getAttribute('href');
                        text = await link.getText();
                    } catch (attributeError) {
                        logger.error(`Error getting attributes for item ${itemIndex}:`, attributeError);
                        href = '';
                        text = `Unknown ${itemIndex}`;
                    }

                    enableDebug && logger.info(`Processing topic list item ${itemIndex + 1} on page ${currentPage}:`, { href, text });
                    allTopics.push({
                        summaryIndex: index,
                        id: itemIndex + 1 + (currentPage - 1) * topicListCount,
                        href,
                        text
                    });
                } catch (itemError) {
                    logger.error(`Error processing topic list item ${itemIndex + 1} on page ${currentPage}:`, itemError);
                }
            }

            // 检查是否存在分页元素，并且只在第一页时获取总页数
            if (currentPage === 1) {
                const dumpPageElement = await driver.findElements(By.css('#dumppage'));
                if (dumpPageElement.length > 0) {
                    const pageOptions = await driver.findElements(By.css('#dumppage option'));
                    pageCount = pageOptions.length;
                } else {
                    enableDebug && logger.info(`No pagination found for ${title}, assuming single page.`);
                    pageCount = 1;
                }
            }

            enableDebug && logger.info(`Fetched page ${currentPage} of ${pageCount} for ${title}`);

            if (currentPage < pageCount) {
                await fetchPage(currentPage + 1);
            }
        } catch (error) {
            logger.error(`Error fetching page ${currentPage} for ${title}:`, error);
        }
    }

    try {
        await fetchPage(page);
    } catch (error) {
        logger.error(`Error in getTopicList for ${title}:`, error);
    }

    async function fetchTopicContent({ id, text, href }) {
        try {
            await driver.get(href);
            enableDebug && logger.info(`Navigating to: ${href}`);

            await driver.wait(async () => {
                const readyState = await driver.executeScript("return document.readyState");
                return readyState === "complete";
            }, 60000, "Timed out waiting for page to load");

            await driver.wait(until.elementLocated(By.css('.strong_switchaccount_box')), 60000, "Timed out waiting for .strong_switchaccount_box to be located");

            // 获取panel_title
            const panelTitle = await driver.executeScript("return document.querySelector('.panel_title').textContent.trim()");

            // 获取所有的panel_item，包括不可见的
            const panelItemsList = await driver.executeScript(`
                const items = document.querySelectorAll('.panel_item');
                return Array.from(items).map(item => ({
                    singleItemTitle: item.querySelector('.panel_head').textContent.trim().replace(/[+-]/g, ''),
                    singleItemContent: item.querySelector('.panel_com').textContent.trim().split('\\n').map(line => line.trim().replace(/•/g, '')).filter(line => line)
                }));
            `);

            const topicContent = { panelTitle, panelItemsList };

            enableDebug && logger.info(`Fetched topic content for ${text} (topic ID: ${id})`);

            return topicContent;
        } catch (error) {
            logger.error(`Error getting topic content for ${text} (ID: ${id}):`, error);
            return null;
        }
    }

    try {
        if (allTopics.length > 0) {
            for (const topic of allTopics) {
                const { id, text, href } = topic;
                const content = await fetchTopicContent({ id, text, href });
                if (content) {
                    topic.content = content;
                    await saveTopicContent(id, title, text, content);
                }
            }
        } else {
            enableDebug && logger.info(`No topics found for ${title}`);
        }
    } catch (error) {
        logger.error(`Error in fetchTopicContent for ${title}:`, error);
    }


    saveTopicList(title, allTopics);
    return allTopics;
}

function saveTopicContent(topicId, summaryTitle, title, content) {
    const folderPath = path.join('./files', summaryTitle.replace(/\s+/g, '-'));
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    const fileContent = {
        topicId,
        summaryTitle,
        title,
        content
    }

    const filePath = path.join(folderPath, `topic_${topicId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
    enableDebug && logger.info(`Saved content for ${title} to ${filePath}`);
}

function saveTopicList(title, topics) {
    const folderPath = path.join('./files', title.replace(/\s+/g, '-'));
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, `topic_${title.replace(/\s+/g, '-')}.json`);
    fs.writeFileSync(filePath, JSON.stringify(topics, null, 2));
}

function saveSummary(topics) {

    const date = new Date();
    const formattedDate = date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0');

    const summaryFilePath = `./files/topic_summary_${formattedDate}.json`;
    fs.writeFileSync(summaryFilePath, JSON.stringify(topics, null, 2));
    enableDebug && logger.info(`Updated summary with ${topics.length} topic categories in ${summaryFilePath}`);
}

module.exports = {
    fetchTopics
}
