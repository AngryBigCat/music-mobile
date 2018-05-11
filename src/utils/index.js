class Util {
    removeItem(items, key) {
        let cItems = items;
        cItems.splice(key, 1);
        return cItems;
    }
}



export default new Util;
