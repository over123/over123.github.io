const fs = require('fs')

const files = fs.readdirSync(__dirname).filter((file) => file.endsWith('js') && file !== 'index.js')
const controllers = {}

console.log(`processing controller ...`)

for (const file of files) {
    const controller = require(`./${file}`)
    controllers[`${file.replace(/\.js/, '')}`] = controller
}

module.exports = controllers