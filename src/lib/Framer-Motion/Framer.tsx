// Modal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: '0' },
  exit: { opacity: 0, y: '100vh' },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
