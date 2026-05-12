import { useEffect, useRef } from 'react';

// Detail panel — shown as an overlay when a movie is selected.
// Fixes:
//   - Prop was closeDetails (with s) in the original; App passed closeDetail (no s) — panel could never close
//   - Added close button (the original had none)
//   - focus moves to close button on open so keyboard/screen reader users land in the panel
//   - Escape key closes the panel
//   - role="dialog" + aria-modal="true" tells screen readers this is a modal
function Details({ selected, closeDetail }) {
  const closeRef = useRef(null);

  // Move focus into the panel when it opens
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeDetail();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeDetail]);

  return (
    <div className="detail-overlay" onClick={closeDetail}>
      {/* stopPropagation prevents clicks inside the panel from closing it */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        className="detail-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="detail-title">{selected.title}</h2>

        {selected.posterUrl && (
          <img
            src={selected.posterUrl}
            alt={`Poster for ${selected.title}`}
            className="detail-poster"
          />
        )}

        {/* Kept .information ul structure from the original */}
        <ul className="information">
          {selected.datePublished && (
            <li className="dateRelease">
              <strong>Released:</strong> {selected.datePublished}
            </li>
          )}
          {selected.rating && (
            <li className="rating">
              <strong>Rating:</strong> {selected.rating}
            </li>
          )}
          {selected.summary && (
            <li className="summary">
              <strong>Summary:</strong> {selected.summary}
            </li>
          )}
        </ul>

        <button
          type="button"
          ref={closeRef}
          className="close-btn"
          onClick={closeDetail}
          aria-label={`Close details for ${selected.title}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Details;