import './search-box.style.css';

const SearchBox = ({ onChangeHandler, className, type, placeholder }) => {
  return (
    <input
      className={`search-box ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;
