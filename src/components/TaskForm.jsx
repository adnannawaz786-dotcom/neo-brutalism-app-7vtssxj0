import { useState } from 'react'
import Button from './ui/Button'

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      return
    }

    setIsSubmitting(true)

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    }

    try {
      if (typeof onAddTask === 'function') {
        await onAddTask(newTask)
      }
      
      // Reset form
      setTitle('')
      setDescription('')
      setPriority('medium')
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
      <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-tight">
        ADD NEW TASK
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="task-title" 
            className="block text-sm font-bold text-black mb-2 uppercase tracking-wide"
          >
            Task Title *
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-4 py-3 border-3 border-black font-bold text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>

        <div>
          <label 
            htmlFor="task-description" 
            className="block text-sm font-bold text-black mb-2 uppercase tracking-wide"
          >
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={3}
            className="w-full px-4 py-3 border-3 border-black font-bold text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] resize-none"
            disabled={isSubmitting}
            maxLength={500}
          />
        </div>

        <div>
          <label 
            htmlFor="task-priority" 
            className="block text-sm font-bold text-black mb-2 uppercase tracking-wide"
          >
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 border-3 border-black font-bold text-black focus:outline-none focus:ring-0 focus:border-blue-500 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            disabled={isSubmitting}
          >
            <option value="low">LOW PRIORITY</option>
            <option value="medium">MEDIUM PRIORITY</option>
            <option value="high">HIGH PRIORITY</option>
          </select>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={!title.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'ADDING TASK...' : 'ADD TASK'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm