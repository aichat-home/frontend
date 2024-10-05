import React, { useEffect, useState } from "react";
import Block from "../Block";
import TaskItem from "./TaskItem";
import "./index.css";
import { useFetchTasksQuery } from "./store/tasksApi";
import { useUser } from "../../../app/providers/UserProvider";
import { ChevronIcon } from "../../../shared/assets";
import { t } from "i18next";

interface Task {
  id: number;
  title: string;
  description: string;
  amount: number;
  icon: string;
  link: string;
}

const Tasks: React.FC = () => {
  const user = useUser();
  const [shouldFetchTasks, setShouldFetchTasks] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [animateContainer, setAnimateContainer] = useState(false);

  useEffect(() => {
    if (user) {
      setShouldFetchTasks(true);
    }
  }, [user]);

  const { data: tasksData = {}, isLoading } = useFetchTasksQuery(undefined, {
    skip: !shouldFetchTasks,
  });

  const allTasks: Task[] = Object.values(tasksData as Record<string, Task[]>).flat();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (allTasks.length > 0) {
      const completedTaskIds = user?.account?.completedTasks?.map((task) => task.id) || [];
      const newFilteredTasks = allTasks.filter((task) => !completedTaskIds.includes(task.id));

      if (JSON.stringify(filteredTasks) !== JSON.stringify(newFilteredTasks)) {
        setFilteredTasks(newFilteredTasks);
      }
    }
  }, [allTasks, user?.account?.completedTasks, filteredTasks]);

  useEffect(() => {
    if (filteredTasks.length > 0) {
      setAnimateContainer(true);
    }
  }, [filteredTasks]);

  const handleViewMore = () => {
    setShowAllTasks(!showAllTasks);
  };

  const schedulerTask: Task = {
    id: 0,
    title: "Загрузка...",
    description: "Пожалуйста, подождите, пока задачи загружаются.",
    amount: 0,
    icon: "src/shared/assets/loading-icon.svg",
    link: "#",
  };

  return (
    <Block className="task-block">
      <h3 className="task-header">{t("Tasks")}</h3>
      <div className="tasks-section">
        <div className={`tasks-container ${animateContainer ? "animated" : ""} ${showAllTasks ? "expanded" : ""}`}>
          {isLoading ? (
            <TaskItem
              key={schedulerTask.id}
              id={schedulerTask.id}
              title={schedulerTask.title}
              description={schedulerTask.description}
              reward={schedulerTask.amount}
              iconSrc={schedulerTask.icon}
              buttonText="Загрузка..."
              link={schedulerTask.link}
            />
          ) : filteredTasks.length === 0 ? (
            <p className="completed">{t("all_tasks_completed")}</p>
          ) : (
            filteredTasks
              .slice(0, showAllTasks ? filteredTasks.length : 3)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  reward={task.amount}
                  iconSrc={task.icon}
                  buttonText={t("Follow")}
                  link={task.link}
                />
              ))
          )}
        </div>
      </div>
      <div className="view-more-section">
        <div className="view-more-block">
          <button
            className="view-more-btn"
            onClick={handleViewMore}
            disabled={filteredTasks.length === 0} 
          >
            {showAllTasks ? t("view_less") : t("view_more")}
          </button>
          <img src={ChevronIcon} alt="" />
        </div>
      </div>

    </Block>
  );
};

export default Tasks;
