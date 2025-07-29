import "./AutoPage.css";
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { deleteParking, fetchParkings } from "../services/parcheggioService";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Common/AddForm/ModalPark";
import TrashBin from "../../assets/TrashBin.svg";
import ReactPaginate from "react-paginate";

interface Parcheggio {
  id: string;
  nome: string;
  posizione: string;
  postiTotali: number;
}

const ParcheggiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [parkings, setParkings] = useState<Parcheggio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 9;

  const pageCount = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    fetchParkings(searchTerm, currentPage, itemsPerPage)
      .then(res => {
        setParkings(res.data);
        setTotal(res.total);
      })
      .catch(error => {
        console.error('Errore durante il fetch dei parcheggi:', error);
        setError(error.message);
      });
  }, [searchTerm, currentPage]);

  function handleDelete(id: string) {
    deleteParking(id)
      .then(() => {
        setParkings(prev => prev.filter(p => p.id !== id));
        console.log('Parcheggio eliminato con successo');
      })
      .catch(error => {
        console.error("Errore durante la cancellazione del parcheggio:", error);
      });
  }

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const columns = [
    { header: "ID", accessor: "id" as keyof Parcheggio },
    { header: "Nome", accessor: "nome" as keyof Parcheggio },
    { header: "Posizione", accessor: "posizione" as keyof Parcheggio },
    { header: "Posti Totali", accessor: "postiTotali" as keyof Parcheggio },
    {
      header: "Azioni",
      accessor: "actions" as keyof Parcheggio,
      render: (_value: number, row: Parcheggio) => (
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

  return (
    <>
      <div className="centered">
        <h1 className="ciao">Lista Parcheggi</h1>
        <div className="SearchBar">
          <SearchBar value={searchTerm} setSearchTerm={setSearchTerm} />
          <Button className="buttonGreen2" variant="primary" onClick={() => setModalShow(true)}>
            Aggiungi Parcheggio
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            className="modalStyle"
            search={searchTerm}
            setParkings={setParkings}
          />
        </div>
        <div className="table-container">
          <TableComp items={parkings} columns={columns} />
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
