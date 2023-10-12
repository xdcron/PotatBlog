import PropTypes from "prop-types";

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
};

function InputField({
  type,
  placeholder,
  label,
  value,
  setValue,
  className = "",
}) {
  return (
    <label className={`${className} flex flex-col gap-2 font-semibold`}>
      {label}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-field"
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InputField;
