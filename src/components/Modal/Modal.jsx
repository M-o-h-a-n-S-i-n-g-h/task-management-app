import Button from '../Button'

import styles from './modal.module.css'

const Modal = ({ children, isOpen, actions, header }) =>
  isOpen && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>{header}</div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          {actions.map((action) => (
            <Button
              key={action.label}
              type={action.type}
              disabled={action.disabled}
              onClick={() => {
                action.onClick()
              }}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

export default Modal
