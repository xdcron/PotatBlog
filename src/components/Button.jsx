import PropTypes from "prop-types";

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

function Button({ className, children, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
