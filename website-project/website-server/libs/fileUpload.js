const path = require('path');
const { mkdir, unlink } = require('fs/promises');
const config = require('../config');
const { createReadStream, createWriteStream } = require('fs')



class FileUpload {
  constructor(dirPath,types){
        this.uploadDir = path.join(config.publicDir, './images/'+ dirPath);
        this.types = types || []
    }

    /**
     * check file type
     * @param {File} file
     * @returns {boolean}
    */
    checkType(file) {
        // do not check if types is empty
        if (this.types.length === 0) {
            return true
        }
        const fileExt = file.name.split('.').pop()
        if (this.types.indexOf(fileExt) !== -1) {
            return true
        }
        return false
    }

    /**
     * make the directory for saving the file
     * @return {*} 
     * @memberof FileUpload
     */
    async makeDir() {
        let date = new Date();
        let saveDir = path.join(this.uploadDir, (date.getFullYear()).toString(), (date.getMonth() + 1).toString());
        await mkdir(saveDir,{ recursive: true });
        return saveDir
    }

    /**
     * write file with stream
     * @param {File} file
     * @returns {object} result
   */
    async writeFile(file) {
        if (!this.checkType(file)) {
            return {
                status: false,
                fileName: file.name,
                msg: '文件格式错误',
            }
        }


        const filePath = file.filepath
        const fileName = file.newFilename // originalFilename
        const saveDir = await this.makeDir();
        let savePath = path.join(saveDir, fileName)
    
        const reader = createReadStream(filePath)
        const writer = createWriteStream(savePath)
    
        // promisify the callback function
        // NOTE: stream/promises api is available, but requires nodejs v15.0.0+
        await new Promise((resolve, reject) => {
            reader.pipe(writer)
            reader.on('end', async () => {
                await unlink(filePath) //remove temporary file after stream end
                console.log('file successfully written to ' + savePath);
                resolve()
            })
            reader.on('error', (err) => reject(err))
        })

        return {
            fileName,
            filePath: `${savePath}`,
        }
    }

    async execute(ctx) {
        // mkdir if the dir doesn't exist
        // await mkdir(this.uploadDir, { recursive: true })
    
        const fileResults = []
        const fileForm = ctx.request.files || {}
        let result = {} ;
        try {
          for (const key in fileForm) {
            const files = fileForm[key]
            if (Object.prototype.toString.call(files) === '[object Array]') {
              for (const file of files) {
                fileResults.push(await this.writeFile(file))
              }
            } else {
              fileResults.push(await this.writeFile(files))
            }
          }
    
          result.files = fileResults
        } catch (error) {
          if (error.code === 'EACCES') {
            result.error = '文件拒绝访问'
          } else {
            result.error = '保存文件出错'
          }
          console.log(error)
        }

        return result
    }
}

module.exports = FileUpload;  