import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./VerticallyCenteredModalAutos.css"
import { addAuto, fetchAutos, validatePlate } from '../../services/autoService';
import React, { useState, type FormEvent } from 'react';
import Select from 'react-select'



const VerticallyCenteredModal = (props : any) => {

  const [formData, setFormData] = useState({
    targa: "",
    modello: "",
    colore: "",
    proprietario: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
      setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const options = [
  { value: 'rosso', label: 'Rosso' },
  { value: 'blu', label: 'Blu' },
  { value: 'verde', label: 'Verde' },
  { value: 'nero', label: 'Nero' },
  { value: 'bianco', label: 'Bianco' },
  { value: 'giallo', label: 'Giallo' },
  { value: 'grigio', label: 'Grigio' },
  { value: 'arancione', label: 'Arancione' },
  { value: 'marrone', label: 'Marrone' },
  { value: 'viola', label: 'Viola' },
  { value: 'rosa', label: 'Rosa' },
  { value: 'ciano', label: 'Ciano' },
]
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    if (validatePlate(formData.targa)) {
      addAuto(formData)
        .then(() => {
          fetchAutos(props.search).then((data) => {
            props.setAutos(data);
          }).catch((error) => {
            console.error('Errore durante il caricamento delle auto:', error); 
          });
          props.onHide(); 
          setFormData({
            targa: "",
            modello: "",
            colore: "",
            proprietario: ""
          }); 
        })
        .catch((error) => {
          console.error('Errore durante l\'aggiunta dell\'auto:', error);
        });
      event.preventDefault();
    } else {
      alert("La targa inserita non è valida. Assicurati che sia nel formato corretto.");
      event.preventDefault();
    }
  }

    return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <form className="form-add-auto" onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Aggiungi auto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="form-group">
            <label htmlFor="targa">Targa</label>
            <input 
                value={formData.targa}
                onChange={handleInputChange} type="text" 
                className="form-control" id="targa" 
                placeholder="Inserisci la targa"
                required />
          </div>
          <div className="form-group">
            <label htmlFor="modello">Modello</label>
            <input 
                type="text" 
                className="form-control" 
                id="modello"
                value={formData.modello}
                onChange={handleInputChange}
                placeholder="Inserisci il modello"
                required />
          </div>
          <div className="form-group-colore">
            <label htmlFor="colore">Colore</label>
          </div>
           <Select className='color-select' options={options} />
          <div className="form-group">
            <label htmlFor="proprietario">Proprietario</label>    
            <input 
                type="text" 
                value={formData.proprietario}
                onChange={handleInputChange} className="form-control" 
                id="proprietario" placeholder="Inserisci il proprietario" 
                required/>
          </div>
      </Modal.Body>
      <Modal.Footer> 
        <Button onClick={props.onHide}>Close</Button>
        <Button  className='buttonMargin' variant="primary" type="submit">
            Aggiungi
          </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
}; export default VerticallyCenteredModal;