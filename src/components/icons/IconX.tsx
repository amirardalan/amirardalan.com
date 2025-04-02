type IconXProps = {
  size: number;
};

export default function IconX({ size }: IconXProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 24"
      fill="var(--color-primary)"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M0.0583996 0L9.32452 12.3803L0 22.4461H2.09874L10.2625 13.6332L16.8584 22.4461H24L14.2123 9.36956L22.8916 0H20.7929L13.2747 8.11632L7.2 0H0.0583996ZM3.14469 1.54462H6.42551L20.9133 20.9015H17.6325L3.14469 1.54462Z"
      />
    </svg>
  );
}
