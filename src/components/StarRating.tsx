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

export const StarRating = ({
  maxRating = 5, // this is used as default value, when the person doesn't enter a start rating!
}: {
  maxRating: number | undefined; // we have to define default value in Typescript as undefined, it doesn't accept null as default value!
}) => {
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
