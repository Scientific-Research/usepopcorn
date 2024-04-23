export const StarRating = () => {
  return (
    <div>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>S{i + 1}</span>
        ))}
      </div>
      <p>10</p>
    </div>
  );
};
