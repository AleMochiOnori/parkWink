const BASE_URL = 'http://localhost:3001';
const postPerPage = 10;

export function fetchAutos(searchTerm : string) {
    const params = [];
    if (searchTerm) params.push(`id=${searchTerm}`);
    if (postPerPage) params.push(`per_page=${postPerPage}`);
    const queryString = params.length ? `?${params.join('&')}` : '';
    return fetch(`${BASE_URL}/auto${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


export const validatePlate = (targa: string) => {
    const regex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
    return regex.test(targa.toUpperCase());
  };



export function addAuto(auto: { targa: string; modello: string; colore: string; proprietario: string }) {
    return fetch(`${BASE_URL}/auto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(auto),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

export function deleteAuto(id: string) {
    return fetch(`${BASE_URL}/auto/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}
