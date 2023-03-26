import { FC } from 'react';

type DropdownProps = {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
};

const Dropdown: FC<DropdownProps> = ({ label, value, handleChange, data }) => {
  return (
    <label className="dropdownLabel">
      <span>{label}</span>
      <select value={value} onChange={handleChange}>
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
