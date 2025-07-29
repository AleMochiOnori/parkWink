const BASE_URL = 'http://localhost:3001';

export function fetchParkingsWithoutPaginationParams(searchTerm: string) {
    return fetch(`${BASE_URL}/parcheggi${searchTerm ? `&nome_like=${searchTerm}` : ''}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


export function fetchParkings(searchTerm: string, currentPage: number, postPerPage: number) {
    const page = currentPage + 1;
    return fetch(`${BASE_URL}/parcheggi${`?_page=${page}&_limit=${postPerPage}${searchTerm ? `&nome_like=${searchTerm}` : ""}`}`)

        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const total = Number(response.headers.get('x-total-count'));
            return { data, total };
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



export function fetchParksWithoutParams(searchTerm: string) {
    return fetch(`${BASE_URL}/parcheggi${searchTerm ? `?id=${searchTerm}` : ''}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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