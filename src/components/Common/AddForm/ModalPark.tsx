import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalPark.css"
import React, { useState, type FormEvent } from 'react';
import { addParking, fetchParkings } from '../../services/parcheggioService';
import { validatePlate } from '../../services/autoService';


const ModalPark = (props : any) => {

  const [formData, setFormData] = useState({
    nome: "",
    posizione: "",
    postiTotali: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
      setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    
    addParking(formData)
      .then(() => {
        fetchParkings(props.search).then((data) => {
          props.setParkings(data);
        }).catch((error) => {
          console.error('Errore durante il caricamento delle auto:', error); 
        });
        props.onHide(); 
        setFormData({
           nome: "",
           posizione: "",
           postiTotali: 0,
        }); 
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiunta dell\'auto:', error);
      });
    event.preventDefault();
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
          Aggiungi Parcheggio
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input 
                value={formData.nome}
                onChange={handleInputChange} type="text" 
                className="form-control" id="nome" 
                placeholder="Inserisci il nome" 
                required/>
          </div>
          <div className="form-group">
            <label htmlFor="posizione">Posizione</label>
            <input 
                type="text" 
                className="form-control" 
                id="posizione"
                value={formData.posizione}
                onChange={handleInputChange}
                placeholder="Inserisci la posizione"
                required />
          </div>
          <div className="form-group">
            <label htmlFor="posti totali">Posti Totali</label>
            <input 
              type="text" 
              className="form-control" 
              id="postiTotali" 
              value={formData.postiTotali}
              onChange={handleInputChange}
              placeholder="Inserisci i posti totali" 
              required/>
          </div>
      </Modal.Body>
      <Modal.Footer> 
        <Button className='color' onClick={props.onHide}>Close</Button>
        <Button className='primary-button' variant="primary" type="submit">
            Aggiungi
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
}; export default ModalPark;