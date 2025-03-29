type Item = {
  label?: string;
  value: string;
};

export type UsesItemCardProps = {
  title?: string;
  subtitle?: string;
  items?: Item[];
  className?: string;
};

const UsesItemCard = ({
  title,
  subtitle,
  items,
  className = '',
}: UsesItemCardProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      {title && <h3 className="mb-2 text-dark dark:text-light">{title}</h3>}
      {subtitle && <p className="text-dark dark:text-light">{subtitle}</p>}
      {items && items.length > 0 && (
        <>
          {items[0].label && (
            <span className="flex pt-1 text-zinc-500 dark:text-zinc-400">
              {items[0].label}:
            </span>
          )}
          {items.map((item, index) => (
            <p
              key={index}
              className="flex pt-1 text-zinc-500 dark:text-zinc-400"
            >
              {item.value}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default UsesItemCard;
