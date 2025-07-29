import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import "./AutoDetail.css";
import { validatePlate } from "../services/autoService";
import Select from 'react-select'

interface Auto {
  id: string;
  targa: string;
  modello: string;
  colore: string;
  proprietario: string;
}

function AutoDetail() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Auto>();


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

  useEffect(() => {
    fetch(`http://localhost:3001/auto/${id}`)
      .then((res) => res.json())
      .then((data: Auto) => {
        setValue("targa", data.targa);
        setValue("modello", data.modello);
        setValue("colore", data.colore);
        setValue("proprietario", data.proprietario);
        setValue("colore", data.colore.toLowerCase());
      })
      .catch(() => setError("Errore nel caricamento dell'auto"));
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Auto> = (data) => {
    if (validatePlate(data.targa)) {
      fetch(`http://localhost:3001/auto/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error("Errore nella modifica");
        setSuccess(true);
      })
        .catch(() => setError("Errore durante il salvataggio"));
    } else {
      alert("La targa inserita non è valida. Assicurati che sia nel formato corretto.");
      setSuccess(false);
    }
  };

  return (
    <div className="wrapper-auto">
      <div className="Detail-autoPage-Container">
        <h1 className="titleAuto">Modifica Auto</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="auto_form">
          <label>
            <p className="TextForm">Targa</p>
            <input className="inputStyle" {...register("targa", { required: true })} />
            {errors.targa && <span>Campo obbligatorio</span>}
          </label>

          <label>
            <p className="TextForm">Modello</p>
            <input {...register("modello", { required: true })} />
            {errors.modello && <span>Campo obbligatorio</span>}
          </label>

          <label>
            <p className="TextForm">Colore</p>
            <Controller
              name="colore"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="color-select"
                  options={options}
                  value={options.find(option => option.value === field.value)}
                  onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                />
              )}
            />
            {errors.colore && <span>Campo obbligatorio</span>}
          </label>

          <label>
            <p className="TextForm">Proprietario</p>
            <input {...register("proprietario", { required: true })} />
            {errors.proprietario && <span>Campo obbligatorio</span>}
          </label>

          <button className="buttonStyle" type="submit">Salva modifiche</button>

          {success && <p className="success">Modifica salvata!</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AutoDetail;
