export const required = value => {
    if (value) {
        return undefined;
    }
    return "Field is required";
}

export const maxLength = (length) => {
    return (value) => {
        if (value && value.length > length) {
            return `Max length is ${length} symbols`;
        }
        return undefined;
    }
}