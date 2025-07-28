const BASE_URL = "http://localhost:3001";

export async function addPrenotazione(data : any) {
  const res = await fetch("http://localhost:3001/prenotazioni", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Errore nella POST");
  }

  return res.json();
}




export function fetchPrenotazioni(searchTerm : string , currentPage : number , postPerPage : number) {
    const page = currentPage + 1;
    return fetch(`${BASE_URL}/prenotazioni${`?_page=${page}&_limit=${postPerPage}${searchTerm ? `&id=${searchTerm}` : ""}`}`)
    
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const total = Number(response.headers.get('x-total-count'));
            return { data, total };
        })
        
}



export function fetchAutosWithoutParams(searchTerm : string) {
    return fetch(`${BASE_URL}/auto${searchTerm ? `?id=${searchTerm}` : ''}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


export function validateTime(inizio: string, fine: string): boolean {
  const inizioDate = new Date(inizio);
  const fineDate = new Date(fine);
  return inizioDate < fineDate;
}

export async function patchPrenotazione(data : any) {
  const res = await fetch(`${BASE_URL}/prenotazioni`, {
    method : "PATCH",
    headers : {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data),
  });

    if (!res.ok) {
    throw new Error("Errore nella POST");
  }

  return res.json();
}

       
 
export function deletePrenotazione(id: string) {
  return fetch(`${BASE_URL}/prenotazioni/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
}