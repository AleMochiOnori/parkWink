import { useState } from "react";
import type { FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./VerticallyCenteredModalAutos.css";
import { addPrenotazione, fetchPrenotazioni, validateTime } from "../../services/prenotazioneService";

const PrenotazioniModal = (props: any) => {
  const [formData, setFormData] = useState({
    idAuto: "",
    idParcheggio: "",
    inizio: "",
    fine: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateTime(formData.inizio, formData.fine);
    if (!isValid) {
      alert("La data di inizio deve essere precedente alla data di fine.");
      return;
    }

    try {
      await addPrenotazione(formData);
      const updatedPrenotazioni = await fetchPrenotazioni(props.search);
      props.setPrenotazioni(updatedPrenotazioni);
      props.onHide();
      setFormData({
        idAuto: "",
        idParcheggio: "",
        inizio: "",
        fine: "",
      });
    } catch (err) {
      console.error("Errore durante salvataggio:", err);
    }
  };


  return (
    <Modal {...props} size="lg" centered>
      <form className="form-add-auto" onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuova Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="idAuto">IdAuto</label>
            <input
              type="text"
              className="form-control"
              id="idAuto"
              value={formData.idAuto}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="idParcheggio">IdParcheggio</label>
            <input
              className="form-control"
              id="idParcheggio"
              value={formData.idParcheggio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="inizio">Inizio</label>
            <input
              type="datetime-local"
              className="form-control"
              id="inizio"
              value={formData.inizio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fine">Fine</label>
            <input
              type="datetime-local"
              className="form-control"
              id="fine"
              value={formData.fine}
              onChange={handleInputChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Chiudi</Button>
          <Button className="buttonMargin" variant="primary" type="submit">
            Aggiungi
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PrenotazioniModal;
