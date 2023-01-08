const Dropdown = ({
  value,
  dropdownItems,
  onChange,
  className,
  ...restProps
}) => {
  return (
    <select
      className={className}
      aria-label=".form-select-sm example"
      value={value}
      onChange={onChange}
      {...restProps}
    >
      {dropdownItems.map((item, i) => (
        <option key={`option-${i}`} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
