export default function Filter({ title, rating, onTitleChange, onRatingChange }) {
  return (
    <div className="filters">
      <div className="field">
        <label htmlFor="title-filter">Title</label>
        <input
          id="title-filter"
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="rating-filter">Minimum rating</label>
        <input
          id="rating-filter"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={rating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
