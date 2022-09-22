import styles from './text-input.module.css'

const TextInput = ({
  name,
  placeHolder,
  label = '',
  onChange = () => {},
  value = '',
  required = false
}) => {
  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        placeholder={placeHolder}
        value={value}
        className={styles.input}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default TextInput
