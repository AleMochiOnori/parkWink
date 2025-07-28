import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./ParcheggiDetail.css";
import { validateTime } from "../services/prenotazioneService";

interface Prenotazione {
  id: string;
  idAuto: string;
  idParcheggio: number;
  inizio: string;
  fine: string;
}

function PrenotazioneDetail() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Prenotazione>();

  useEffect(() => {
    fetch(`http://localhost:3001/prenotazioni/${id}`)
      .then((res) => res.json())
      .then((data: Prenotazione) => {
        setValue("idAuto", data.idAuto);
        setValue("idParcheggio", data.idParcheggio);
        setValue("inizio", data.inizio);
        setValue("fine", data.fine);
      })
      .catch(() => setError("Errore nel caricamento della prenotazione"));
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Prenotazione> = (data) => {
    fetch(`http://localhost:3001/prenotazioni/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella modifica");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => setError("Errore durante il salvataggio"));
  };

  return (
    <div className="wrapper-parking">
      <div className="Detail-parkingPage-Container">
        <h1 className="titleParking">Modifica Prenotazione</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="parking_form">
          
          <label>
            <p className="TextForm">ID Auto</p>
            <input
              className="inputStyle"
              {...register("idAuto", { required: true })}
            />
            {errors.idAuto && <span>Campo obbligatorio</span>}
          </label>

          <label>
            <p className="TextForm">ID Parcheggio</p>
            <input
              type="text"
              className="inputStyle"
              {...register("idParcheggio", { required: true, min: 1 })}
            />
            {errors.idParcheggio && <span>Inserisci un parcheggio valido</span>}
          </label>

          <label>
            <p className="TextForm">Inizio</p>
            <input
              type="datetime-local"
              className="inputStyle"
              {...register("inizio", { required: true })}
            />
            {errors.inizio && <span>Data inizio obbligatoria</span>}
          </label>

            <label>
                <p className="TextForm">Fine</p>
                <input
                    type="datetime-local"
                    className="inputStyle"
                    {...register("fine", {
                    required: "Data fine obbligatoria",
                    validate: (fine) => {
                        const inizio = getValues("inizio");
                        return validateTime(inizio, fine) || "La data di fine deve essere dopo l'inizio";
                    },
                    })}
                />
                {errors.fine && <span>{errors.fine.message}</span>}
            </label>

          <button className="buttonStyle" type="submit">Salva modifiche</button>

          {success && <p className="success">Modifica salvata!</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default PrenotazioneDetail;
