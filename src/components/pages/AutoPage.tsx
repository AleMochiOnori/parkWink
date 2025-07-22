import "./AutoPage.css"
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import { fetchAutos } from "../services/autoService";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { Link } from "react-router-dom";

interface Auto {
    id: number;
    targa: string;
    modello: string;
    colore: string;
    proprietario : string;
}

const AutoPage = () =>{
const [searchTerm, setSearchTerm] = useState('');
const [autos , setAutos] = useState([]);
const [error, setError] = useState(null);


const columns = [
  { header: "ID", accessor: "id" as keyof Auto},
  { header: "Targa", accessor: "targa" as keyof Auto},
  { header: "Modello", accessor: "modello" as keyof Auto },
  { header: "Colore", accessor: "colore" as keyof Auto },
  { header: "Proprietario", accessor: "proprietario" as keyof Auto },
  { header : "Azioni", accessor: "actions" as keyof Auto,  render: (_value : number, row : Auto) => (
    <Link to={`/AutoDetail/${row.id}`}><img className="pen-icon"
      src={penIcon}
      alt="Modifica"
      style={{ cursor: "pointer", width: "20px" }}
      />
    </Link>
  )}
  
];


useEffect(() => {
        fetchAutos(searchTerm)
            .then(data => {
                setAutos(data);
            })
            .catch(error => {
                console.error('Errore:', error);
                setError(error.message);
            });
    }, [searchTerm]);




    return (
        <>
            <div className="centered">
                <h1 className="ciao">Lista Auto</h1>
                <div className="SearchBar">
                    <SearchBar value={searchTerm}  setSearchTerm={setSearchTerm}/>
                </div>
                <div className="table-container">
                    <TableComp items = {autos} columns={columns}/>
                </div>
            </div>
        </>
    )
}; export  default AutoPage;