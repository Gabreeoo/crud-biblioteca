import { useState } from 'react';
import { StarRating } from './StarRating';

export function BookDetailModal({ book, onClose, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);

  if (!book) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content modal-detail"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close detail-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="detail-layout">
          <div className="detail-cover">
            {book.capa && !imgError ? (
              <img src={book.capa} alt={`Capa de ${book.titulo}`} onError={() => setImgError(true)} />
            ) : (
              <div className="book-cover-fallback">
                <span className="fallback-genre">{book.genero || 'Livro'}</span>
                <strong className="fallback-title">{book.titulo}</strong>
                <span className="fallback-author">{book.autor}</span>
              </div>
            )}
          </div>

          <div className="detail-info">
            {book.genero && <span className="book-genre-tag">{book.genero}</span>}
            <h2 className="detail-title">{book.titulo}</h2>
            <p className="detail-author">por {book.autor}</p>

            <div className="detail-rating">
              <StarRating value={book.nota} readOnly size="lg" />
              <span>{book.nota} de 5 estrelas</span>
            </div>

            <div className="detail-synopsis">
              <h4>Sinopse & Anotações</h4>
              <p>{book.sinopse || 'Nenhuma anotação adicionada para este livro.'}</p>
            </div>

            <div className="detail-actions">
              <button type="button" className="btn btn-secondary" onClick={() => onEdit(book)}>
                Editar
              </button>
              <button type="button" className="btn btn-danger" onClick={() => onDelete(book)}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
