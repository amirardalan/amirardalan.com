import type { FC, ChangeEventHandler } from 'react';

type CheckboxProps = {
  label: string;
  value: boolean;
  title: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: FC<CheckboxProps> = ({ label, value, onChange, title }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="checkbox"
        title={title}
        aria-label={label}
        aria-checked={value}
      />
      {label}
    </label>
  );
};

export default Checkbox;
