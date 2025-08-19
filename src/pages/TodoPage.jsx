import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { loadFromLocalStorage, saveToLocalStorage, generateId } from '../lib/utils';

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = loadFromLocalStorage('neo-brutalism-todos');
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage('neo-brutalism-todos', tasks);
  }, [tasks]);

  const addTask = (taskText) => {
    if (typeof taskText !== 'string' || !taskText.trim()) return;
    
    const newTask = {
      id: generateId(),
      text: taskText.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, newText) => {
    if (typeof newText !== 'string' || !newText.trim()) return;
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, text: newText.trim() }
        : task
    ));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-white mb-4 transform rotate-1 drop-shadow-lg">
            TODO
          </h1>
          <p className="text-xl font-bold text-white/90 transform -rotate-1">
            GET STUFF DONE!
          </p>
        </div>

        {/* Task Form */}
        <Card className="mb-6 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <TaskForm onAddTask={addTask} />
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-green-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <div className="text-center">
              <div className="text-3xl font-black text-black">{activeCount}</div>
              <div className="text-sm font-bold text-black/80">ACTIVE</div>
            </div>
          </Card>
          <Card className="p-4 bg-blue-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <div className="text-center">
              <div className="text-3xl font-black text-black">{completedCount}</div>
              <div className="text-sm font-bold text-black/80">DONE</div>
            </div>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform transition-all duration-200 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                filter === filterType
                  ? 'bg-yellow-400 text-black rotate-1'
                  : 'bg-white text-black hover:bg-gray-100 -rotate-1'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="text-center mb-6">
            <button
              onClick={clearCompleted}
              className="px-6 py-3 bg-red-500 text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 transition-all duration-200 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
            >
              CLEAR COMPLETED
            </button>
          </div>
        )}

        {/* Task List */}
        <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 overflow-hidden">
          <TaskList 
            tasks={getFilteredTasks()}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
          />
        </Card>

        {/* Empty State */}
        {getFilteredTasks().length === 0 && (
          <div className="text-center mt-8">
            <div className="text-4xl font-black text-white mb-2 transform -rotate-2">
              {filter === 'completed' ? 'NO COMPLETED TASKS!' : 
               filter === 'active' ? 'NO ACTIVE TASKS!' : 'NO TASKS YET!'}
            </div>
            <div className="text-lg font-bold text-white/80 transform rotate-1">
              {filter === 'all' ? 'Add your first task above!' : `Switch to "all" to see other tasks`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}