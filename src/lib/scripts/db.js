// gets items from LocalStorage if it exists, else creates one
export const getOrSetItem = (key, value = '') => {
    const db = localStorage;
    if (db.getItem(key) == null) {
        db.setItem(key, JSON.stringify(value));
    } else {
        const data = db.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return value;
};

export const getItemValue = (key) => {
    const db = localStorage;
    if (db.getItem(key) !== null) {
        const data = db.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
};

export const setItemValue = (key, value = '') => {
    const db = localStorage;
    if (key !== null) {
        db.setItem(key, JSON.stringify(value));
        return value;
    }
    return null;
};

export const clearDB = () => {
    const db = localStorage;
    db.clear();
};

