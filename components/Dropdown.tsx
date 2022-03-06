export default function Dropdown({ label, value, handleChange, data }) {
  return (
    <label className="dropdownLabel">
      {label+': '}
      <select value={value} onChange={(e) => handleChange(e)}>
        {data.map((item: any) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}