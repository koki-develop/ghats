import { Box, Text } from "ink";
import Spinner from "../../ui/Spinner";
import { getBuildTargetPath } from "..";

type BuildUIProps = {
  workflowPaths: string[];
  currentIndex: number;
};

type Status = "pending" | "building" | "done";

function getStatus(index: number, currentIndex: number): Status {
  if (index < currentIndex) return "done";
  if (index === currentIndex) return "building";
  return "pending";
}

export default function BuildUI({ workflowPaths, currentIndex }: BuildUIProps) {
  return (
    <Box flexDirection="column">
      {workflowPaths.map((workflowPath, index) => (
        <WorkflowPath
          key={workflowPath}
          status={getStatus(index, currentIndex)}
          workflowPath={workflowPath}
        />
      ))}
    </Box>
  );
}

type WorkflowPathProps = {
  status: Status;
  workflowPath: string;
};

function WorkflowPath({ status, workflowPath }: WorkflowPathProps) {
  switch (status) {
    case "pending":
      return (
        <Text dimColor>
          {"  "}
          {workflowPath}
        </Text>
      );
    case "building":
      return (
        <Text>
          <Spinner />
          <Text dimColor> {workflowPath}</Text>
        </Text>
      );
    case "done":
      return (
        <Text>
          <Text color="green" bold>
            ✔
          </Text>
          <Text bold> {getBuildTargetPath(workflowPath)}</Text>
        </Text>
      );
  }
}
