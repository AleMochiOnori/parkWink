const BASE_URL = 'http://localhost:3001';

export function fetchParkings(searchTerm : string) {
    return fetch(`${BASE_URL}/parcheggi${searchTerm ? `?id=${searchTerm}` : ''}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


export function addParking(parking: { nome: string; posizione: string; postiTotali: number }) {
    return fetch(`${BASE_URL}/parcheggi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parking),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

export function deleteParking(id: string) {
    return fetch(`${BASE_URL}/parcheggi/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}