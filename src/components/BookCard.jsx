import { useState } from 'react';
import { StarRating } from './StarRating';

export function BookCard({ book, onSelect, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !book.capa || imgError;

  return (
    <article className="book-card" onClick={() => onSelect(book)}>
      <div className="book-cover-wrapper">
        {showFallback ? (
          <div className="book-cover-fallback">
            <span className="fallback-genre">{book.genero || 'Livro'}</span>
            <strong className="fallback-title">{book.titulo}</strong>
            <span className="fallback-author">{book.autor}</span>
          </div>
        ) : (
          <img
            src={book.capa}
            alt={`Capa do livro ${book.titulo}`}
            className="book-cover-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        <div className="book-rating-badge" title={`Sua nota: ${book.nota}/5`}>
          <span className="badge-star">★</span>
          <span>{book.nota}.0</span>
        </div>

        <div className="book-card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(book)}
            title="Editar livro"
            aria-label={`Editar ${book.titulo}`}
          >
            ✎
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(book)}
            title="Excluir livro"
            aria-label={`Excluir ${book.titulo}`}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="book-card-body">
        <h3 className="book-title" title={book.titulo}>
          {book.titulo}
        </h3>
        <p className="book-author" title={book.autor}>
          {book.autor}
        </p>
        <div className="book-card-footer">
          <StarRating value={book.nota} readOnly size="sm" />
          {book.genero && <span className="book-genre-tag">{book.genero}</span>}
        </div>
      </div>
    </article>
  );
}
