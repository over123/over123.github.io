/*
 * @Author: xudan
 * @Date: 2024-08-01 18:31:08
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-01 19:37:25
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
// const ExperienceController = require('./experiences');
// Import the necessary modules

// Create a Koa middleware function to handle the request
const getExperiences = async (ctx) => {
    console.log('a')
    try {
        // Set the response body with the user's work experience
        ctx.body = {
            msg: 'Experiences'
        };
    } catch (error) {
        // Handle any errors that occur during the process
        ctx.status = 500;
        ctx.body = 'Error retrieving work experience';
    }
};

// Export the middleware function
module.exports = {
    getExperiences
};