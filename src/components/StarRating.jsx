import { useState } from 'react';

export function StarRating({ value = 0, onChange, size = 'md', readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  const activeValue = hovered || value;

  return (
    <div
      className={`star-rating star-rating--${size} ${readOnly ? 'is-readonly' : ''}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Nota ${value} de 5 estrelas`}
      onMouseLeave={() => !readOnly && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= activeValue;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            className={`star-btn ${filled ? 'is-filled' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!readOnly && onChange) onChange(star);
            }}
            onMouseEnter={() => !readOnly && setHovered(star)}
            aria-label={`${star} ${star === 1 ? 'estrela' : 'estrelas'}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
