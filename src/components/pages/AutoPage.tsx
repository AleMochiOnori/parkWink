import "./AutoPage.css"
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import { deleteAuto, fetchAutos } from "../services/autoService";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Common/AddForm/VerticallyCenteredModalAutos";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrashBin from "../../assets/TrashBin.svg";

interface Auto {
    id: string;
    targa: string;
    modello: string;
    colore: string;
    proprietario : string;
}

const AutoPage = () =>{
const [searchTerm, setSearchTerm] = useState('');
const [autos , setAutos] = useState<Auto[]>([]);
const [error, setError] = useState(null);
const [modalShow, setModalShow] = React.useState(false);


function handleDelete(id: string | number) {
  const idStr = id.toString();
  deleteAuto(idStr)
    .then(() => {
      setAutos(prevAutos => prevAutos.filter(auto => auto.id !== id));
      console.log('Auto eliminata con successo');
    })
    .catch(error => {
      console.error("Errore durante la cancellazione dell'auto:", error);
    });
}

const columns = [
  { header: "ID", accessor: "id" as keyof Auto},
  { header: "Targa", accessor: "targa" as keyof Auto},
  { header: "Modello", accessor: "modello" as keyof Auto },
  { header: "Colore", accessor: "colore" as keyof Auto },
  { header: "Proprietario", accessor: "proprietario" as keyof Auto },
  { header : "Azioni", accessor: "actions" as keyof Auto,  render: (_value : number, row : Auto) => (
  <div className="action-icons">
    <Link to={`/AutoDetail/${row.id}`}>
      <img className="pen-icon"
      src={penIcon}
      alt="Modifica"
      style={{ cursor: "pointer", width: "20px" }}
      />
    </Link>
    <img className="trash" src={TrashBin}
      alt="Modifica"
      onClick={() => handleDelete(row.id)}
      style={{ cursor: "pointer", width: "20px" , height: "20px"}}>
    </img>
  </div>
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
             console.log(autos);
    }, [searchTerm]);

     console.log(autos);


    return (
        <>
            <div className="centered">
                <h1 className="ciao">Lista Auto</h1>
                <div className="SearchBar">
                    <SearchBar value={searchTerm}  setSearchTerm={setSearchTerm}/>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Aggiungi Auto
                    </Button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        className="modalStyle"
                        search={searchTerm}
                        setAutos={setAutos}
                        
                    />
                </div>
                <div className="table-container">
                    <TableComp items = {autos} columns={columns}/>
                </div>
            </div>
        </>
    )
}; export  default AutoPage;