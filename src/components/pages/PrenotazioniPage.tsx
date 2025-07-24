import "./PrenotazioniPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import { fetchAutos } from "../services/autoService";
import { fetchParkings } from "../services/parcheggioService";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addPrenotazione } from "../services/prenotazioneService";

function PrenotazioniPage() {
  type OptionType = { value: string; label: string };

  const [autoOptions, setAutoOptions] = useState<OptionType[]>([]);
  const [parkingOptions, setParkingOptions] = useState<OptionType[]>([]);
  const [selectedAuto, setSelectedAuto] = useState<OptionType | null>(null);
  const [selectedParcheggio, setSelectedParcheggio] = useState<OptionType | null>(null);
  const [inizio, setInizio] = useState("");
  const [fine, setFine] = useState("");
   useEffect(() => {
    fetchAutos("").then((data) => {
      const options = data.map((auto: { id: string, targa: string }) => ({
        value: auto.id,
        label: auto.targa
      }));
      setAutoOptions(options);
    });
     fetchParkings("").then((data) => {
      const options = data.map((p: { id: string, nome: string }) => ({
        value: p.id,
        label: p.nome
      }));
      setParkingOptions(options);
    });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Logica per gestire la prenotazione
  
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
        <h1 className="ciao">Lista prenotazioni</h1>
        <div className="select-container">
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
        <form onSubmit={handleSubmit}>
          <button type="submit" className="btn">Prenota</button>
        </form>
      </div>
    </div>
  );
}

export default PrenotazioniPage;
