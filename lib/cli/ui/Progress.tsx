import { render, Static, Text } from "ink";
import Spinner from "./Spinner";

export type ProgressStatus = "in-progress" | "done";

export type ProgressProps = {
  status: ProgressStatus;
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

export function progress() {
  const { rerender, unmount } = render(null);

  return {
    unmount,
    inProgress: (title: string) => {
      rerender(<Progress status="in-progress" title={title} />);
    },
    done: (title: string) => {
      rerender(<Progress status="done" title={title} />);
    },
    clear: () => {
      rerender(null);
    },
  };
}
