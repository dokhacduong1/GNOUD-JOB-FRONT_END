
export function SelectTree(items, level = 1, idOrigin = "", arr = []) {
    for (let item of items) {
        const prefix = Array(level + 1).join("⚫");
        arr.push({
            value: item._doc._id,
            label: `${prefix} ${item._doc.title}`,
        })
        if (item.children && item.children.length > 0) {
            SelectTree(item.children, level + 1, idOrigin, arr)
        }
    }
    return arr
}


export function SelectTreeArr(items, level = 1, arr = []) {
    for (let item of items) {
        const prefix = Array(level + 1).join("");
        arr.push(item._doc)
        item._doc.title = `${prefix} ${item._doc.title}`
        if (item.children && item.children.length > 0) {
            SelectTreeArr(item.children,level+1, arr)
        }
    }
    return arr
}