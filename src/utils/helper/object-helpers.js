export const updateObjectInArray = (items, itemId, idPropName, newObjProps) => {
    return items.map(i => {
        return (i[idPropName] === itemId)
            ? {...i, ...newObjProps}
            : i;
    })
}