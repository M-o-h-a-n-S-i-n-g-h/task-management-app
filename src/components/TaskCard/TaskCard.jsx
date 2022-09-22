import { Draggable } from 'react-beautiful-dnd'
import ReactTooltip from 'react-tooltip'

import styles from './taskcard.module.css'

const TaskCard = ({ task, index, disabled }) => {
  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={disabled}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.card}
        >
          <div className={styles.titleAndComment}>
            <p className={styles.cardTitle}>{task.title}</p>
            {task.closureComment && (
              <span
                data-tip={task.closureComment}
                data-for="closure-comment"
                className={styles.closureComment}
              >
                <img
                  src="https://img.icons8.com/cute-clipart/38/000000/ok.png"
                  alt="Completed"
                />
                <ReactTooltip id="closure-comment" place="top" effect="solid" />
              </span>
            )}
          </div>

          <div className={styles.cardFooter}>
            {task.assignedTo && (
              <div className={styles.assignedToContainer}>
                <small>Assigned to: &nbsp;</small>
                <span
                  id="assigned-to"
                  data-tip={task.assignedTo}
                  data-for="assigned-to"
                  className={styles.assignedTo}
                >
                  {task.assignedTo}
                  <ReactTooltip id="assigned-to" place="top" effect="solid" />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard
