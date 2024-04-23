const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

export const StarRating = () => {
  return (
    <div style={containerStyle}>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>S{i + 1}</span>
        ))}
      </div>
      <p>10</p>
    </div>
  );
};
