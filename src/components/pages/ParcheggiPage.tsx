import "./AutoPage.css"
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { fetchParkings } from "../services/parcheggioService";
import { Link } from "react-router-dom";

interface Parcheggi {
    id: string;
    nome: string;
    posizione : string;
    postiTotali: number;
}


const ParcheggiPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [parkings , setParkings] = useState([]);
    const [error, setError] = useState(null);


    const columns = [
    { header: "ID", accessor: "id" as keyof  Parcheggi},
    { header: "Nome", accessor: "nome" as keyof  Parcheggi},
    { header: "Posizione", accessor: "posizione" as keyof  Parcheggi},
    { header: "PostiTotali", accessor: "postiTotali" as keyof  Parcheggi },
    { header : "Azioni", accessor: "actions" as keyof  Parcheggi,  render: (_value : number, row :  Parcheggi) => (
    <Link to={`/ParcheggiDetail/${row.id}`}><img className="pen-icon"
      src={penIcon}
      alt="Modifica"
      style={{ cursor: "pointer", width: "20px" }}
      />
    </Link>
    )}
  
];



useEffect(() => {
        fetchParkings(searchTerm)
            .then(data => {
                setParkings(data);
            })
            .catch(error => {
                console.error('Errore:', error);
                setError(error.message);
            });
    }, [searchTerm]);


    return (
        <>
            <div className="centered">
                <h1 className="ciao">Lista Parcheggi</h1>
                <div className="SearchBar">
                    <SearchBar value={searchTerm}  setSearchTerm={setSearchTerm}/>
                </div>
                <div className="table-container">
                    <TableComp items = {parkings} columns={columns}/>
                </div>
            </div>
        </>
    )
}; export default ParcheggiPage;