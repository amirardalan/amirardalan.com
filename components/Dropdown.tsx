import { FC } from 'react';

type DropdownProps = {
  label: string;
  value: string;
  handleChange: Function;
  data: object;
};

interface Data {
  map: Function;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  value,
  handleChange,
  data,
}: {
  label: string;
  value: string;
  handleChange: Function;
  data: Data;
}) => {
  return (
    <label className="dropdownLabel">
      <span>{label}</span>
      <select value={value} onChange={(e) => handleChange(e)}>
        {data.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
