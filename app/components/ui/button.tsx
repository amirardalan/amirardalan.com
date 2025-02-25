type ButtonProps = {
  onClick?: () => void;
  type?: 'button' | 'submit';
  text: string;
};

export default function Button({ onClick, type, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="m-0 min-w-20 rounded-lg bg-dark py-1.5 font-mono text-xxs uppercase text-light dark:bg-light dark:text-dark"
    >
      {text}
    </button>
  );
}
