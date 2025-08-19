import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Check } from 'lucide-react';

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
          <h3 className="text-2xl font-black text-black mb-2">NO TASKS YET!</h3>
          <p className="text-lg font-bold text-gray-600">ADD SOME TASKS TO GET STARTED</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ delay: index * 0.1 }}
          className={`
            bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
            transform transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            hover:-translate-y-1 p-4 group
            ${task.completed ? 'bg-green-100' : 'bg-white'}
          `}
          style={{
            transform: `rotate(${Math.random() * 4 - 2}deg)`
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Button
                onClick={() => onToggleTask && onToggleTask(task.id)}
                variant="outline"
                size="sm"
                className={`
                  w-8 h-8 p-0 border-2 border-black transition-all duration-200
                  ${task.completed 
                    ? 'bg-green-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }
                `}
              >
                {task.completed && <Check size={14} />}
              </Button>
              
              <div className="flex-1">
                <h3 
                  className={`
                    font-black text-lg transition-all duration-200
                    ${task.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-black'
                    }
                  `}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p 
                    className={`
                      font-bold text-sm mt-1 transition-all duration-200
                      ${task.completed 
                        ? 'text-gray-400 line-through' 
                        : 'text-gray-600'
                      }
                    `}
                  >
                    {task.description}
                  </p>
                )}
                {task.priority && (
                  <span 
                    className={`
                      inline-block mt-2 px-3 py-1 text-xs font-black border-2 border-black
                      ${task.priority === 'high' 
                        ? 'bg-red-400 text-white' 
                        : task.priority === 'medium'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-blue-400 text-white'
                      }
                    `}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                onClick={() => onEditTask && onEditTask(task)}
                variant="outline"
                size="sm"
                className="
                  w-8 h-8 p-0 border-2 border-black bg-blue-400 text-white
                  hover:bg-blue-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                "
              >
                <Edit2 size={14} />
              </Button>
              
              <Button
                onClick={() => onDeleteTask && onDeleteTask(task.id)}
                variant="outline"
                size="sm"
                className="
                  w-8 h-8 p-0 border-2 border-black bg-red-500 text-white
                  hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
                "
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>

          {task.dueDate && (
            <div className="mt-3 pt-3 border-t-2 border-black border-dashed">
              <p className="text-sm font-bold text-gray-600">
                DUE: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;