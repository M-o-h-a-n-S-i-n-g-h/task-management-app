import TextInput from 'components/TextInput'
import ImagesPreview from 'components/ImagesPreview'
import Modal from 'components/Modal'
import Select from 'components/Select'

import styles from './add-task-modal.module.css'

const AddTaskModal = ({
  isOpen,
  handleSubmit,
  setTitle,
  setAssignedTo,
  title,
  assignedTo,
  attachments,
  setAttachments,
  handleCloseAddTaskModal
}) => {
  const options = [
    { value: 'Mohan', label: 'Mohan' },
    { value: 'Mani', label: 'Mani' },
    { value: 'Mukesh', label: 'Mukesh' },
    { value: 'Rehith', label: 'Rehith' }
  ]

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject('')
    })

  const handleUploadAttachment = async (event) => {
    const { files } = event.target
    const newAttachments = []
    for (let i = 0; i < files.length; i++) {
      const base64Url = await toBase64(files[i])
      newAttachments.push({
        name: files[i].name,
        url: base64Url
      })
    }

    setAttachments([...attachments, ...newAttachments])
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleCloseAddTaskModal}
      header="Add Task"
      actions={[
        {
          label: 'Save',
          onClick: handleSubmit,
          disabled: !title,
          type: 'submit'
        },
        {
          label: 'Cancel',
          onClick: handleCloseAddTaskModal
        }
      ]}
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Title"
            value={title}
            required
          />

          <div>
            <Select
              label="Assignee"
              name="assignee"
              onChange={(e) => setAssignedTo(e.target.value)}
              value={assignedTo}
              options={options}
            />
          </div>

          <div className={styles.attachments}>
            <label htmlFor="attachment">Attachments</label>
            <input
              type="file"
              name="attachment"
              accept="image/*"
              onChange={handleUploadAttachment}
              size="60"
              multiple
            />
          </div>

          {attachments.length > 0 && <ImagesPreview images={attachments} />}
        </form>
      </div>
    </Modal>
  )
}

export default AddTaskModal
