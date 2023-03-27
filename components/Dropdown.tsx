import { FC } from 'react';
import { css } from '@emotion/react';

type DropdownProps = {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
};

const Dropdown: FC<DropdownProps> = ({ label, value, handleChange, data }) => {
  const styleDropdown = css({
    background: 'var(--color-accent)',
    border: '1px solid var(--color-accent-gray)',
    borderRadius: 4,
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontSize: 12,
    height: 25,
    padding: '.2rem .8rem .2rem .4rem',
    position: 'relative',
  });

  return (
    <label className="dropdownLabel">
      <span>{label}</span>
      <select value={value} onChange={handleChange} css={styleDropdown}>
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
