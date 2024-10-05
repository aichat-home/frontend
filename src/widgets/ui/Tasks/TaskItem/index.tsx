import React, { useEffect, useMemo, useState } from "react";
import Block from "../../Block";
import Button from "../../Button";
import "./index.css";
import { useCheckTaskMutation } from "../store/tasksApi";
import { TaskTgIcon, TweeterIcon, YoutubeIcon } from "../../../../shared/assets/index";

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  reward: number;
  iconSrc: string;
  buttonText: string;
  link: string;
  animationDelay?: string;
}

enum TaskIcons {
  telegram = "Telegram",
  twitter = "Twitter",
  twitterX = "X",
  youtube = "Youtube",
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  reward,
  iconSrc,
  link,
  buttonText,
  animationDelay,
}) => {
  const [checkTask] = useCheckTaskMutation();
  const [isChecking, setIsChecking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = async () => {
    if (isCompleted) return; 

    window.open(link, "_blank");
    setIsChecking(true);
    const startTime = Date.now();

    const interval = setInterval(async () => {
      try {
        await checkTask({ task_id: id }).unwrap();
        console.log("Task checked successfully:", id);
        clearInterval(interval);
        setIsChecking(false);
        setIsCompleted(true); 
      } catch (error) {
        console.error("Error checking task:", error);
        if (Date.now() - startTime >= 30000) {
          clearInterval(interval);
          setIsChecking(false);
        }
      }
    }, 5000);
  };

  const resolvedIconSrc = useMemo(() => {
    if (iconSrc === TaskIcons.telegram) return TaskTgIcon;
    if (iconSrc === TaskIcons.youtube) return YoutubeIcon;
    if (iconSrc === TaskIcons.twitter || iconSrc === TaskIcons.twitterX) return TweeterIcon;
  }, [iconSrc]);

  return (
    <div className={`task-item ${isVisible ? "visible" : ""}`} style={{ animationDelay }}>
      <Block className="task-list">
        <img src={resolvedIconSrc} alt={title} className="task-icon" />
      </Block>
      <div className="task-info">
        <div>{title}</div>
        <span>{isCompleted ? "Completed" : description}</span>
      </div>
      <div className="task-action">
        <span>{reward} BBP</span>
        <Button onClick={handleButtonClick} disabled={isChecking || isCompleted}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
