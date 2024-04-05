// gets items from LocalStorage if it exists, else creates one
export const getOrSetItem = (key, value = '') => {
    const db = localStorage;
    if (db.getItem(key) == null) {
        db.setItem(key, JSON.stringify(value));
    } else {
        const data = db.getItem(key);
        return JSON.parse(data);
    }
    return value;
};

// gets an item from localStorage amd returns its value, else returns null
export const getItemValue = (key) => {
    const db = localStorage;
    if (db.getItem(key) !== null) {
        const data = db.getItem(key);
        return JSON.parse(data);
    }
    return null;
};

// adds a value to localStorage
export const setItemValue = (key, value = '') => {
    const db = localStorage;
    if (key !== null) {
        db.setItem(key, JSON.stringify(value));
        return value;
    }
    return null;
};

// clears all items from localStorage
export const clearDB = () => {
    const db = localStorage;
    db.clear();
};

