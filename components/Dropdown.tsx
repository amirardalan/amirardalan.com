import { FC } from 'react';
import { css } from '@emotion/react';

type DropdownProps = {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
};

const Dropdown: FC<DropdownProps> = ({ label, value, handleChange, data }) => {
  // const styleDropdown = css({
  //   appearance: 'none',
  //   background: 'blue !important',
  //   border: '1px solid red !important',
  //   borderRadius: '4px !important',
  //   color: 'red !important',
  //   cursor: 'pointer',
  //   fontSize: '16px !important',
  //   padding: '8px !important',
  //   position: 'relative',
  //   '&::before': {
  //     content: '"▼"',
  //     color: 'red !important',
  //     fontSize: '12px !important',
  //     position: 'absolute',
  //     right: '10px !important',
  //     top: '50% !important',
  //     transform: 'translateY(-50%) !important',
  //   },
  // });

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
