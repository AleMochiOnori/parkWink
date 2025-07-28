import "./AutoPage.css";
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import { deletePrenotazione, fetchPrenotazioni } from "../services/prenotazioneService";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrashBin from "../../assets/TrashBin.svg";
import ReactPaginate from "react-paginate";
import "./PrenotazioniTable.css"
import { Button } from "react-bootstrap";

interface Prenotazione {
  id: string;
  idAuto: string;
  idParcheggio: number;
  inizio: string;
  fine: string;
}

const PrenotazioniPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage : number = 10
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[]>([]);
  const [total, setTotal] = useState(0);

useEffect(() => {
  fetchPrenotazioni(searchTerm, currentPage, itemsPerPage).then(res => {
    setPrenotazioni(res.data);
    setTotal(res.total);
  });
}, [currentPage, searchTerm]);

const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  function handleDelete(id: string | number) {
    const idStr = id.toString();
    deletePrenotazione(idStr)
      .then(() => {
        setPrenotazioni(prev => prev.filter(p => p.id !== id));
      })
      .catch(error => {
        console.error("Errore durante la cancellazione della prenotazione:", error);
      });
  }

  const columns = [
    { header: "ID", accessor: "id" as keyof Prenotazione },
    { header: "ID Auto", accessor: "idAuto" as keyof Prenotazione },
    { header: "ID Parcheggio", accessor: "idParcheggio" as keyof Prenotazione },
    { header: "Inizio", accessor: "inizio" as keyof Prenotazione },
    { header: "Fine", accessor: "fine" as keyof Prenotazione },
    {
      header: "Azioni",
      accessor: "actions" as keyof Prenotazione,
      render: (_value: any, row: Prenotazione) => (
        <div className="action-icons">
          <Link to={`/PrenotazioneDetail/${row.id}`}>
            <img
              className="pen-icon"
              src={penIcon}
              alt="Modifica"
              style={{ cursor: "pointer", width: "20px" }}
            />
          </Link>
          <img
            className="trash"
            src={TrashBin}
            alt="Elimina"
            onClick={() => handleDelete(row.id)}
            style={{ cursor: "pointer", width: "20px", height: "20px" }}
          />
        </div>
      )
    }
  ];

  return (
    <>
      <div className="centered">
        <h1 className="ciao">Lista Prenotazioni</h1>
        <div className="SearchBar">
          <SearchBar value={searchTerm} setSearchTerm={setSearchTerm} />
          <Link to={"/prenotazioni"}>
             <Button className="buttonGreen2" variant="primary">
            Aggiungi Prenotazione
          </Button>
          </Link>
         
        </div>
        <div className="table-container">
          <TableComp items={prenotazioni} columns={columns} />
          <div className="pagination_container">
            <div></div>
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrenotazioniPage;
