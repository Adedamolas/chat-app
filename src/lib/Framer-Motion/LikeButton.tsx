// LikeButton.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiHeart3Fill, RiHeart3Line } from "@remixicon/react";

interface LikeButtonProps {
  isLiked: boolean;
  onLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onLike();
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ scale: 1 }}
      animate={{ scale: isAnimating ? 1.5 : 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onAnimationComplete={() => setIsAnimating(false)}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      {isLiked ? <RiHeart3Fill className=" text-red-500" /> : <RiHeart3Line />}
    </motion.div>
  );
};

export default LikeButton;
