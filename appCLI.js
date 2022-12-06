/*   DB conect   */
const dbConnnect = require('./config/mongo')
dbConnnect()

//customerPrograms tools
require("./commander/indexPrograms")