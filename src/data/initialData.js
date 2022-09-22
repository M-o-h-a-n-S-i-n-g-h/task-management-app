export const initialData = {
  tasks: [
    {
      id: 'task-1',
      title: 'Take out the garbage',
      assignedTo: 'Mohan',
      closureComment: '',
      attachments: []
    },
    {
      id: 'task-2',
      title: 'Watch my favorite show',
      assignedTo: 'Mani',
      closureComment: '',
      attachments: []
    },
    {
      id: 'task-3',
      title: 'Charge my phone',
      assignedTo: 'Mukesh',
      closureComment: '',
      attachments: []
    },
    {
      id: 'task-4',
      title: 'Cook dinner',
      assignedTo: 'Rehith',
      closureComment: '',
      attachments: []
    },
    {
      id: 'task-5',
      title: 'Play badminton',
      assignedTo: 'James Henriques',
      closureComment: 'Played well',
      attachments: []
    }
  ],

  columns: {
    'not-started': {
      id: 'not-started',
      title: 'Not Started',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-4']
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      taskIds: ['task-5']
    }
  },
  columnOrder: ['not-started', 'in-progress', 'completed']
}
