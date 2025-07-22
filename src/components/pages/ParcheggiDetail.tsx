import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import "./ParcheggiDetail.css";

interface Parcheggi {
  id: string;
  nome: string;
  posizione: string;
  postiTotali: number;
}

function ParcheggioDetail() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Parcheggi>();

  useEffect(() => {
    fetch(`http://localhost:3001/parcheggi/${id}`)
      .then((res) => res.json())
      .then((data: Parcheggi) => {
        setValue("nome", data.nome);
        setValue("posizione", data.posizione);
        setValue("postiTotali", data.postiTotali);
      })
      .catch(() => setError("Errore nel caricamento del parcheggio"));
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Parcheggi> = (data) => {
    fetch(`http://localhost:3001/parcheggi/${id}`, {
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
        <h1 className="titleParking">Modifica Parcheggio</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="parking_form">
          <label>
            <p className="TextForm">Nome</p>
            <input  className="inputStyle"{...register("nome", { required: true })} />
            {errors.nome && <span>Campo obbligatorio</span>}
          </label>

          <label>
            <p className="TextForm">Posizione</p>
            <input {...register("posizione", { required: true })} />
            {errors.posizione && <span>Campo obbligatorio</span>}
          </label>

          <label>
           <p className="TextForm">Posti Totali</p>
            <input
              type="number"
              {...register("postiTotali", {
                required: true,
                min: 1,
              })}
            />
            {errors.postiTotali && (
              <span>Inserisci almeno 1 posto disponibile</span>
            )}
          </label>

          <button className="buttonStyle" type="submit">Salva modifiche</button>

          {success && <p className="success">Modifica salvata!</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
} ; export default ParcheggioDetail;
