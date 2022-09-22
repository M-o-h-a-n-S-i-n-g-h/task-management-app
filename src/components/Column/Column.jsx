import { useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Button from 'components/Button'
import TextInput from 'components/TextInput'
import TaskCard from 'components/TaskCard'

import { NOT_STARTED_COLUMN_ID } from 'constants.js'

import styles from './column.module.css'

const Column = ({ column, tasks, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)
  const [loading, setLoading] = useState('idle')

  const filterTaskFunction = (task) => {
    if (searchTerm === '') {
      return task
    }

    if (task.title.toLowerCase().includes(searchTerm)) {
      return task
    }
  }

  const getFilteredTasks = () => {
    return tasks.filter(filterTaskFunction)
  }

  useEffect(() => {
    const filteredTasks = getFilteredTasks()
    setResults(filteredTasks)
  }, [tasks])

  useEffect(() => {
    if (searchTerm === '') {
      setIsFiltering(false)
    } else {
      setIsFiltering(true)
      setLoading('loading')
    }

    // for better performance we can also use debounce function from lodash
    const timeout = setTimeout(() => {
      const filteredTasks = getFilteredTasks()
      setResults(filteredTasks)
      setLoading('idle')
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchTerm])

  const renderList = () => {
    if (results.length === 0) {
      return <p>No tasks found!</p>
    }

    return results.map((task, index) => (
      <TaskCard
        key={task.id}
        task={task}
        index={index}
        columnId={column.id}
        disabled={isFiltering}
      />
    ))
  }

  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>{column.title}</h3>

      <TextInput
        type="text"
        name="title"
        value={searchTerm}
        placeHolder="Search"
        onChange={(e) => {
          setSearchTerm(e.target.value.toLowerCase())
        }}
      />

      <Droppable droppableId={column.id} isDropDisabled={isFiltering}>
        {(provided) => (
          <div
            className={styles.taskList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {loading === 'loading' ? <p>Loading...</p> : renderList()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {column.id === NOT_STARTED_COLUMN_ID && (
        <Button
          className={styles.addTaskButton}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Add task
        </Button>
      )}
    </div>
  )
}

export default Column
