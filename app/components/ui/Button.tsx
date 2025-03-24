type ButtonProps = {
  onClick?: () => void;
  type?: 'button' | 'submit';
  text: string;
  disabled?: boolean;
};

export default function Button({ onClick, type, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="m-0 min-w-20 rounded-lg bg-dark px-4 py-2 font-mono text-xxs uppercase text-light dark:bg-light dark:text-dark"
    >
      {text}
    </button>
  );
}
