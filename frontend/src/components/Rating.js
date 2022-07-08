import React from "react";
import PropTypes from "prop-types";

export default function Rating({ value, review, color }) {
  return (
    <div className='rating' style={{ fontSize: "14px" }}>
      {/* using map to iterate the rating number */}
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          <i
            style={{ color }}
            className={
              value >= index
                ? "fas fa-star"
                : value >= index - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span>{review && review}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: "#fad20c",
  value: 0,
};

//set prop types
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  color: PropTypes.string,
};
