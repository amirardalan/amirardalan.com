type Spec = {
  label?: string;
  value: string;
};

export type UsesItemCardProps = {
  title?: string;
  subtitle?: string;
  specs?: Spec[];
  className?: string;
};

const UsesItemCard = ({
  title,
  subtitle,
  specs,
  className = '',
}: UsesItemCardProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      {title && <h3 className="mb-2 text-dark dark:text-light">{title}</h3>}
      {subtitle && <p className="text-dark dark:text-light">{subtitle}</p>}
      {specs && specs.length > 0 && (
        <>
          {specs[0].label && (
            <span className="flex pt-1 text-zinc-500 dark:text-zinc-400">
              {specs[0].label}:
            </span>
          )}
          {specs.map((spec, index) => (
            <p
              key={index}
              className="flex pt-1 text-zinc-500 dark:text-zinc-400"
            >
              {spec.value}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default UsesItemCard;
