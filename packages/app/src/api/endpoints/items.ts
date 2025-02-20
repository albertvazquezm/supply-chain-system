export const getItems = async () => {
    const response = await fetch('http://localhost:4000/supply-chain/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};