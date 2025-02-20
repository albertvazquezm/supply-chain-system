export const getItems = async () => {
    const response = await fetch('http://localhost:4000/supply-chain/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const createItem = async (item: any) => {
    const response = await fetch('http://localhost:4000/supply-chain/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    return response.json();
};
