import PropTypes from "prop-types";

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  bgColor: "steelblue",
  text: "default text",
};

Button.protoTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  onClickFunc: PropTypes.func,
};

export default Button;
