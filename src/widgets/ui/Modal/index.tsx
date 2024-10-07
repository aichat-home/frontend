import React, { useState, useEffect } from "react";
import "./index.css";
import clsx from "clsx";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children, className }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
    } else if (!isVisible && showModal) {
      handleClose();
    }
  }, [isVisible]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowModal(false);
      onClose();
    }, 300);
  };

  if (!showModal && !isClosing) return null;

  return (
    <div 
      className={clsx("modal-overlay", { "modal-overlay-hidden": isClosing })} 
      onClick={handleClose}
    >
      <div
        className={clsx("modal-content", className, { "modal-close": isClosing })}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Линия для закрытия модалки */}
        <div className="modal-drag-line" onClick={handleClose}></div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
