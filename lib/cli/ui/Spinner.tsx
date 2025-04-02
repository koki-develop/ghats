import { useEffect, useState } from "react";
import { Text } from "ink";

const spinners = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function Spinner() {
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinnerIndex((spinnerIndex) => (spinnerIndex + 1) % spinners.length);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return <Text color="cyan">{spinners[spinnerIndex]}</Text>;
}
