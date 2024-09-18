import { motion } from "framer-motion";

type Props = {
  top?: string;
  size?: string;
  left?: string;
  color?: string;
  shape?: string;
  delay?: number;
};

const FloatingShape = (props: Props) => {
  const { top, size, left, color, shape, delay } = props;
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 blur-lg ${color}  ${size}  ${shape}`}
      style={{top, left}}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden: true
    ></motion.div>
  );
};

export default FloatingShape;
