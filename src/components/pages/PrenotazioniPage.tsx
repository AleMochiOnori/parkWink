import "./PrenotazioniPage.css";
import Select from 'react-select'
import { fetchParkings, fetchParkingsWithoutPaginationParams } from "../services/parcheggioService";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addPrenotazione } from "../services/prenotazioneService";
import { Link } from "react-router-dom";
import { fetchAutosWithoutParams } from "../services/prenotazioneService";
import { Button } from "react-bootstrap";

function PrenotazioniPage() {
  type OptionType = { value: string; label: string };
  const [autoOptions, setAutoOptions] = useState<OptionType[]>([]);
  const [parkingOptions, setParkingOptions] = useState<OptionType[]>([]);
  const [selectedAuto, setSelectedAuto] = useState<OptionType | null>(null);
  const [selectedParcheggio, setSelectedParcheggio] = useState<OptionType | null>(null);
  const [inizio, setInizio] = useState("");
  const [fine, setFine] = useState("");
   useEffect(() => {
    fetchAutosWithoutParams("").then((data) => {
      const options = data.map((auto: { id: string, targa: string}) => ({
        value: auto.id,
        label: auto.targa,
      }));
      setAutoOptions(options);
    });
     fetchParkingsWithoutPaginationParams("").then((data) => {
      const options = data.map((p: { id: string, nome: string }) => ({
        value: p.id,
        label: p.nome
      }));
      setParkingOptions(options);
    });
    setInizio("")
    setFine("")
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedAuto || !selectedParcheggio || !inizio || !fine) {
      alert("Compila tutti i campi!");
      return;
  }



  const prenotazione = {
    idAuto: selectedAuto.value,
    idParcheggio: selectedParcheggio.value,
    inizio,
    fine
  };

  try {
    await addPrenotazione(prenotazione);
    alert("Prenotazione aggiunta con successo!");
  } catch (err) {
    console.error("Errore durante la prenotazione:", err);
  }
};




  return (
    <div className="centered">
      <div className="prenotazioni-container">
        <h1 className="margin-text">Prenota un parcheggio</h1>
        <div className="select-container">
          <div className="top">
            <div className="auto-select">
              <p>Seleziona la targa</p>
              <Select className='color-select' options={autoOptions} 
                value={selectedAuto}
                onChange={(selected) => setSelectedAuto(selected)}
                placeholder="Seleziona auto"/>
            </div>
            <div className="parcheggio-select">
              <p>Seleziona un parcheggio</p>
              <Select className='color-select' options={parkingOptions}
                value={selectedParcheggio}
                onChange={(selected) => setSelectedParcheggio(selected)}
                placeholder="Seleziona parcheggio" />
            </div>

          </div>
          <div className="date-container">
            <div className="date-select">
              <p>Data inizio</p>
              <input
                className="input-Style"
                type="datetime-local"
                value={inizio}
                onChange={(e) => setInizio(e.target.value)}
              />          
            </div>
            <div className="date-select">
              <p>Data fine</p>
              <input
                className="input-Style"
                type="datetime-local"
                value={fine}
                onChange={(e) => setFine(e.target.value)}
              />
            </div>
          </div>
          <div className="buttons-container">
            <form onSubmit={handleSubmit}>
              <button type="submit" className="btn-prenota">Prenota</button>
            </form>
          <Link to={"/prenotazioniTable"}>
            <Button className="button-bottom" variant="primary">Torna alle prenotazioni</Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrenotazioniPage;
