import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import AddTaskModal from 'components/AddTaskModal'
import Button from 'components/Button'
import Column from 'components/Column'

import { initialData } from 'data/initialData'
import {
  NOT_STARTED_COLUMN_ID,
  COMPLETED_COLUMN_ID,
  LOCAL_STORAGE_KEY,
  IN_PROGRESS_COLUMN_ID
} from 'constants.js'

import styles from './board.module.css'

const Board = () => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? initialData
  )
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('Mohan')
  const [attachments, setAttachments] = useState([])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const resetAddTaskModal = () => {
    setTitle('')
    setAssignedTo('Mohan')
    setAttachments([])
    setIsOpen(false)
  }

  const handleCloseAddTaskModal = () => {
    setIsOpen(false)
    resetAddTaskModal()
  }

  const handleSubmit = () => {
    const newTaskId = `task-${state.tasks.length + 1}`

    const newTask = {
      id: newTaskId,
      title,
      assignedTo,
      attachments
    }

    const newState = {
      ...state,
      tasks: [...state.tasks, newTask],
      columns: {
        ...state.columns,
        [NOT_STARTED_COLUMN_ID]: {
          ...state.columns[NOT_STARTED_COLUMN_ID],
          taskIds: [...state.columns[NOT_STARTED_COLUMN_ID].taskIds, newTaskId]
        }
      }
    }

    setState(newState)
    resetAddTaskModal()
  }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    if (
      source.droppableId === NOT_STARTED_COLUMN_ID &&
      destination.droppableId === COMPLETED_COLUMN_ID
    ) {
      return
    }

    if (
      source.droppableId === COMPLETED_COLUMN_ID &&
      destination.droppableId === NOT_STARTED_COLUMN_ID
    ) {
      return
    }

    if (
      source.droppableId === COMPLETED_COLUMN_ID &&
      destination.droppableId === IN_PROGRESS_COLUMN_ID
    ) {
      return
    }

    const updateColumn = (column, newTaskIds) => {
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      return {
        ...column,
        taskIds: newTaskIds
      }
    }

    const sourceColumn = state.columns[source.droppableId]
    const destinationColumn = state.columns[destination.droppableId]

    if (source.droppableId === destination.droppableId) {
      const newTaskIds = [...sourceColumn.taskIds]

      const newColumn = updateColumn(sourceColumn, newTaskIds)

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }

      setState(newState)
    } else {
      if (destination.droppableId === COMPLETED_COLUMN_ID) {
        const confirmText = window.prompt(
          `Are you sure you want to move this task to completed?`
        )

        if (!confirmText) {
          return
        }

        const newTask = state.tasks.find((task) => task.id === draggableId)
        newTask.closureComment = confirmText

        const newState = {
          ...state,
          tasks: [...state.tasks, newTask]
        }

        setState(newState)
      }

      const sourceColumnTaskIds = [...sourceColumn.taskIds]
      const destinationColumnTaskIds = [...destinationColumn.taskIds]

      sourceColumnTaskIds.splice(source.index, 1)
      destinationColumnTaskIds.splice(destination.index, 0, draggableId)

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceColumnTaskIds
      }

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationColumnTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn
        }
      }

      setState(newState)
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={styles.board}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId]
            const tasks = column.taskIds.map((taskId) =>
              state.tasks.find((task) => task.id === taskId)
            )

            return (
              <Column
                column={column}
                setIsOpen={setIsOpen}
                key={columnId}
                tasks={tasks}
              />
            )
          })}
        </div>
      </DragDropContext>

      <AddTaskModal
        isOpen={isOpen}
        handleCloseAddTaskModal={handleCloseAddTaskModal}
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        attachments={attachments}
        setAttachments={setAttachments}
      />

      <Button
        type="button"
        onClick={() => {
          setState(initialData)
          localStorage.removeItem(LOCAL_STORAGE_KEY)
        }}
        style={{ marginTop: '20px' }}
      >
        Reset
      </Button>
    </div>
  )
}

export default Board
