import { Static, Text } from "ink";
import Spinner from "./Spinner";

export type ProgressProps = {
  status: "in-progress" | "done";
  title: string;
};

export default function Progress({ status, title }: ProgressProps) {
  if (status === "in-progress") {
    return (
      <Text>
        <Spinner />
        <Text dimColor> {title}</Text>
      </Text>
    );
  }

  if (status === "done") {
    return (
      <Static items={[title]}>
        {(title) => (
          <Text key={title}>
            <Text color="green" bold>
              ✓
            </Text>
            <Text bold> {title}</Text>
          </Text>
        )}
      </Static>
    );
  }
}
