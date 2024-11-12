import React, { useEffect, useState, useCallback, useMemo } from "react";
import Block from "../Block";
import TaskItem from "./TaskItem";
import "./index.css";
import { useFetchTasksQuery } from "./store/tasksApi";
import { useUser } from "../../../app/providers/UserProvider";
import Button from "../Button";
import { useTranslation } from "../../../../node_modules/react-i18next";


interface Task {
  id: number;
  title: string;
  description: string;
  amount: number;
  icon: string;
  link: string;
  type: string;
}

const Tasks: React.FC = () => {
  const user = useUser();
  const [shouldFetchTasks, setShouldFetchTasks] = useState(false);
  const [animateContainer, setAnimateContainer] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null); 
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setShouldFetchTasks(true);
    }
  }, [user]);

  const { data: tasksData = {}, isLoading } = useFetchTasksQuery(undefined, {
    skip: !shouldFetchTasks,
  });

  const allTasks = useMemo(() => {
    if (!!tasksData){
      return Object.values(tasksData as Record<string, Task[]>).flat();
    }
    return [];
  }, [tasksData]);

  const [taskGroups, setTaskGroups] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    if (allTasks.length > 0) {
      const completedTaskIds = user?.account?.completedTasks?.map((task) => task.id) || [];

      const groupedTasks: Record<string, Task[]> = {};

      allTasks.forEach((task) => {
        if (!completedTaskIds.includes(task.id)) {
          if (!groupedTasks[task.type]) {
            groupedTasks[task.type] = [];
          }
          groupedTasks[task.type].push(task);
        }
      });

      setTaskGroups(groupedTasks);
    }
  }, [allTasks, user?.account?.completedTasks]);

  useEffect(() => {
    if (Object.keys(taskGroups).length > 0) {
      setAnimateContainer(true);
    }
  }, [taskGroups]);

  const schedulerTask: Task = {
    id: 0,
    title: "Загрузка...",
    description: "Пожалуйста, подождите, пока задачи загружаются.",
    amount: 0,
    icon: "src/shared/assets/loading-icon.svg",
    link: "#",
    type: "Loading",
  };

  const filteredTaskGroups = useMemo(() => {
    if (selectedType) {
      return { [selectedType]: taskGroups[selectedType] || [] };
    }
    return taskGroups;
  }, [selectedType, taskGroups]);

  const renderTaskItems = useCallback((tasks: Task[]) => {
    return tasks.length === 0 ? (
      <p className="completed">{t("all_tasks_completed")}</p>
    ) : (
      tasks.map((task) => (
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
    );
  }, []);

  return (
    <div className="tasks">
      <div className="filter-buttons">
        <Button className="fliter-btn" onClick={() => setSelectedType(null)}>{t("all_tasks")}</Button>
        <Button className="fliter-btn" onClick={() => setSelectedType("Partners")}>{t("partners")}</Button>
        <Button className="fliter-btn" onClick={() => setSelectedType("Daily Tasks")}>{t("daily_tasks")}</Button>
      </div>

      {Object.entries(filteredTaskGroups).map(([type, tasks]) => (
        <Block className="task-block" key={type}>
          <h3 className="task-header">{t(type)}</h3>
          <div className="tasks-section">
            <div className={`tasks-container ${animateContainer ? "animated" : ""}`}>
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
              ) : (
                renderTaskItems(tasks)
              )}
            </div>
          </div>
        </Block>
      ))}
    </div>
  );
};

export default Tasks;
