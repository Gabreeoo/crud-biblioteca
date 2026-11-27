import { useState } from "react";
import { StarRating } from "./StarRating";

const emptyForm = {
  titulo: "",
  autor: "",
  genero: "",
  capa: "",
  nota: 5,
  sinopse: "",
};

export function BookModal({ isOpen, initialBook, onClose, onSave }) {
  const [form, setForm] = useState(() =>
    initialBook ? { ...initialBook } : emptyForm,
  );
  const [previewError, setPreviewError] = useState(false);

  if (!isOpen) return null;

  const isEditing = Boolean(initialBook);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "capa") setPreviewError(false);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.autor.trim()) return;
    onSave({
      ...form,
      titulo: form.titulo.trim(),
      autor: form.autor.trim(),
      genero: form.genero.trim(),
      capa: form.capa.trim(),
      sinopse: form.sinopse.trim(),
      nota: Number(form.nota) || 5,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">
            {isEditing ? "Editar Livro" : "Adicionar Novo Livro"}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-layout">
            <div className="cover-preview-col">
              <span className="field-label">Prévia da Capa</span>
              <div className="cover-preview-box">
                {form.capa && !previewError ? (
                  <img
                    src={form.capa}
                    alt="Prévia da capa"
                    onError={() => setPreviewError(true)}
                  />
                ) : (
                  <div className="cover-preview-placeholder">
                    <span>{form.titulo || "Sem capa"}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-fields-col">
              <label className="field">
                <span>Título </span>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Dom Casmurro"
                  required
                />
              </label>

              <label className="field">
                <span>Autor </span>
                <input
                  type="text"
                  name="autor"
                  value={form.autor}
                  onChange={handleChange}
                  placeholder="Ex: Machado de Assis"
                  required
                />
              </label>

              <div className="field-row">
                <label className="field">
                  <span>Gênero</span>
                  <input
                    type="text"
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    placeholder="Ex: Romance"
                  />
                </label>

                <div className="field">
                  <span>Sua Nota</span>
                  <div className="rating-input-box">
                    <StarRating
                      value={form.nota}
                      onChange={(nota) =>
                        setForm((prev) => ({ ...prev, nota }))
                      }
                      size="lg"
                    />
                    <span className="rating-text">{form.nota}/5</span>
                  </div>
                </div>
              </div>

              <label className="field">
                <span>URL da Capa</span>
                <input
                  type="url"
                  name="capa"
                  value={form.capa}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/capa.jpg"
                />
              </label>

              <label className="field">
                <span>Sinopse / Anotações</span>
                <textarea
                  name="sinopse"
                  rows={3}
                  value={form.sinopse}
                  onChange={handleChange}
                  placeholder="Escreva suas impressões ou a sinopse do livro..."
                />
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Salvar Alterações" : "Criar Livro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
