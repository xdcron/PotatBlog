import PropTypes from "prop-types";

FormBody.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.array,
};

function FormBody({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col border-2 border-black p-8 gap-3 rounded-lg w-[300px] sm:w-[340px]  md:w-[380px] "
    >
      {children}
    </form>
  );
}

export default FormBody;
