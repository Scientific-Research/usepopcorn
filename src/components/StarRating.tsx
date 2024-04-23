const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export const StarRating = ({ maxRating }: { maxRating: number }) => {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {/* {Array.from({ length: 5 }, (_, i) => ( */}
        {Array.from({ length: maxRating }, (_, i) => (
          <span key={i}>S{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>{maxRating}</p>
    </div>
  );
};
