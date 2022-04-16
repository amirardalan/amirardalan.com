export default function Checkbox({ label, value, onChange, title }) {
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
  )
}