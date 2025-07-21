const BASE_URL = 'http://localhost:3001';

export function fetchAutos(searchTerm : string) {
    return fetch(`${BASE_URL}/auto?id=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}