// Do not use, this custom ejs fileLoader will crash JSBox 
import ejs from 'ejs'

const JSBoxFileLoader = path => $file.read(path).string

ejs.fileLoader = JSBoxFileLoader

export default ejs