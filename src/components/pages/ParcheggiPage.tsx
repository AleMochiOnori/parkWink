import "./AutoPage.css"
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { deleteParking, fetchParkings } from "../services/parcheggioService";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Common/AddForm/ModalPark";
import React from "react";
import TrashBin from "../../assets/TrashBin.svg";
import ReactPaginate from "react-paginate";

interface Parcheggi {
    id: string;
    nome: string;
    posizione : string;
    postiTotali: number;
}



const ParcheggiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [parkings, setParkings] = useState<Parcheggi[]>([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(parkings.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = parkings.slice(offset, offset + itemsPerPage);

  function handleDelete(id: string) {
    deleteParking(id)
      .then(() => {
        setParkings(prevParks => prevParks.filter(park => park.id !== id));
        console.log('Auto eliminata con successo');
      })
      .catch(error => {
        console.error("Errore durante la cancellazione dell'auto:", error);
      });
  }

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const columns = [
    { header: "ID", accessor: "id" as keyof Parcheggi },
    { header: "Nome", accessor: "nome" as keyof Parcheggi },
    { header: "Posizione", accessor: "posizione" as keyof Parcheggi },
    { header: "PostiTotali", accessor: "postiTotali" as keyof Parcheggi },
    {
      header: "Azioni",
      accessor: "actions" as keyof Parcheggi,
      render: (_value: number, row: Parcheggi) => (
        <div className="action-icons">
          <Link to={`/ParcheggiDetail/${row.id}`}>
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
      ),
    },
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
          <SearchBar value={searchTerm} setSearchTerm={setSearchTerm} />
          <Button className="buttonGreen" variant="primary" onClick={() => setModalShow(true)}>
            Aggiungi Parcheggio
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            className="modalStyle"
            setParkings={setParkings}
            search={searchTerm}
          />
        </div>
        <div className="table-container">
          <TableComp items={currentItems} columns={columns} />
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

export default ParcheggiPage;