import styles from './select.module.css'

const Select = ({ label, options, ...props }) => {
  return (
    <div>
      <label htmlFor={props.name} className={styles.label}>
        {label}
      </label>
      <select {...props} className={styles.select}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
