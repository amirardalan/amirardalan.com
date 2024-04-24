import type { FC, ChangeEventHandler } from 'react';
import { css } from '@emotion/react';

type CheckboxProps = {
  label: string;
  value: boolean;
  title: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: FC<CheckboxProps> = ({ label, value, onChange, title }) => {
  const styleCheckbox = css({
    cursor: 'pointer',
    appearance: 'none',
    background: 'var(--color-accent)',
    border: '1px solid var(--color-accent-gray)',
    borderRadius: 4,
    width: 16,
    height: 16,
    position: 'relative',
    '&::before': {
      content: '"✓"',
      fontSize: '1.2rem',
      color: 'var(--color-text)',
      position: 'absolute',
      right: -1,
      top: -1.8,
      visibility: 'hidden',
    },
    '&:checked': {
      '&::before': {
        background: 'transparent',
        visibility: 'visible',
      },
    },
    '&::before, &:checked::before': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 16,
      height: 16,
      borderRadius: 4,
      transition: 'all 0.2s ease',
    },
  });

  const styleCheckboxLabel = css({
    fontFamily: 'var(--font-primary)',
    display: 'flex',
    alignItems: 'center',
  });

  return (
    <label css={styleCheckboxLabel}>
      <input
        css={styleCheckbox}
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
