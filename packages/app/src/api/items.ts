export const getItems = async () => {
    const response = await fetch('http://localhost:4000/supply-chain/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 
export const getItem = async (id: string) => {
    const response = await fetch(`http://localhost:4000/supply-chain/item/${id}`, {
        method: 'GET',
    });
    return response.json();
};
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateItem = async (id: string, data: any) => {
    const response = await fetch(`http://localhost:4000/supply-chain/item/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createItemEvent = async (id: string, itemEvent: any) => {
    const response = await fetch(`http://localhost:4000/supply-chain/item/${id}/event`, {
        method: 'POST',
        body: JSON.stringify(itemEvent),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const getItemEvents = async (id: string) => {
    const response = await fetch(`http://localhost:4000/supply-chain/item/${id}/events`, {
        method: 'GET',
    });
    return response.json();
};

export const getItemCurrentLocation = async (id: string) => {
    const response = await fetch(`http://localhost:4000/supply-chain/item/${id}/current-location`, {
        method: 'GET',
    });
    return response.json();
};
