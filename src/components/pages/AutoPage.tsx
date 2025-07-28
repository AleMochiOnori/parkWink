import "./AutoPage.css";
import TableComp from "../Common/Table/TableComp";
import { useEffect, useState } from "react";
import { deleteAuto, fetchAutos } from "../services/autoService";
import penIcon from "../../../public/pen.svg";
import SearchBar from "../Common/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "../Common/AddForm/VerticallyCenteredModalAutos";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrashBin from "../../assets/TrashBin.svg";
import ReactPaginate from "react-paginate";

interface Auto {
  id: string;
  targa: string;
  modello: string;
  colore: string;
  proprietario: string;
}

const AutoPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autos, setAutos] = useState<Auto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 10;

  const pageCount = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    fetchAutos(searchTerm, currentPage, itemsPerPage)
      .then((res) => {
        setAutos(res.data);
        setTotal(res.total);
      })
      .catch((error) => {
        console.error('Errore:', error);
        setError(error.message);
      });
  }, [searchTerm, currentPage]);

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

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const columns = [
    { header: "ID", accessor: "id" as keyof Auto },
    { header: "Targa", accessor: "targa" as keyof Auto },
    { header: "Modello", accessor: "modello" as keyof Auto },
    { header: "Colore", accessor: "colore" as keyof Auto },
    { header: "Proprietario", accessor: "proprietario" as keyof Auto },
    {
      header: "Azioni",
      accessor: "actions" as keyof Auto,
      render: (_value: number, row: Auto) => (
        <div className="action-icons">
          <Link to={`/AutoDetail/${row.id}`}>
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
        <h1 className="ciao">Lista Auto</h1>
        <div className="SearchBar">
          <SearchBar value={searchTerm} setSearchTerm={setSearchTerm} />
          <Button className="buttonGreen" variant="primary" onClick={() => setModalShow(true)}>
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
          <TableComp items={autos} columns={columns} />
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

export default AutoPage;
