const convertCategoryToId = (text) => {
    switch (text.toLowerCase()) {
        case 'individual': return 1;
        case 'matrimonial': return 2;
        case 'suite': return 3;
        default: return 0;
    }
};

export { convertCategoryToId }