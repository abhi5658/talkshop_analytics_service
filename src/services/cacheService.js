const NodeCache = require("node-cache");
const myCache = new NodeCache();

module.exports.set = (key, value) => {
    myCache.set(key, value);
}
module.exports.has = (key) => {
    return myCache.has(key);
}
module.exports.get = (key) => {
    return myCache.get(key);
}
module.exports.del = (key) => {
    myCache.del(key);
}