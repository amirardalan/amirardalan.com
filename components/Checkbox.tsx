export default function Checkbox({ label, value, onChange }) {
  return (
  <label>
    <input
      type="checkbox"
      checked={value}
      onChange={onChange}
      className="checkbox"
      aria-label={label}
    />
    {label}
  </label>
  )
}