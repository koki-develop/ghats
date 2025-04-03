import { render, Text } from "ink";

export function success(message: string) {
  const { unmount } = render(
    <Text color="green" bold>
      {"  "}🎉 {message}
    </Text>,
  );
  unmount();
}
