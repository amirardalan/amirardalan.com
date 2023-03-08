import type { FC, ChangeEventHandler, Key } from 'react';

type DropdownProps = {
  label: string;
  value: string;
  handleChange: ChangeEventHandler | any;
  data: any;
};

const Dropdown: FC<DropdownProps> = ({ label, value, handleChange, data }) => {
  return (
    <label className="dropdownLabel">
      <span>{label}</span>
      <select value={value} onChange={(e) => handleChange(e)}>
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
