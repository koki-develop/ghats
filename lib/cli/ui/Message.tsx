import { Box, render, Text } from "ink";

export function success(message: string) {
  const { unmount } = render(
    <Box marginBottom={1}>
      <Text color="green" bold>
        {"  "}🎉 {message}
      </Text>
    </Box>,
  );
  unmount();
}
