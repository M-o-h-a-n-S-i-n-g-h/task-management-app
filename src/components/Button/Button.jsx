import styles from './button.module.css'

const Button = ({
  type = 'button',
  children,
  variant,
  disabled = false,
  className,
  ...props
}) => {
  const primaryVariantClass = variant === 'primary' ? styles.primary : ''
  const disabledClass = disabled ? styles.disabled : ''

  return (
    <button
      type={type}
      className={`${styles.button} ${disabledClass} ${primaryVariantClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
