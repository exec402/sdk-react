# @exec402/react

React hooks and components for exec402 protocol

## Installation

```bash
npm install @exec402/react
```

### Peer Dependencies

```bash
npm install react wagmi viem @tanstack/react-query
```

## Usage

### Setup Provider

Wrap your app with `ExecProvider` inside wagmi and react-query providers:

```tsx
import { ExecProvider } from "@exec402/react";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ExecProvider network="testnet">
          {children}
        </ExecProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### useCall

Create a contract call task:

```tsx
import { useCall } from "@exec402/react";

function MyComponent() {
  const { mutate, isPending } = useCall();

  const handleCall = () => {
    mutate({
      target: "0x1234...",
      data: "0xabcd...",
      amount: "1000000",
    });
  };

  return <button onClick={handleCall} disabled={isPending}>Call</button>;
}
```

### useTransfer

Create a transfer task:

```tsx
import { useTransfer } from "@exec402/react";

function MyComponent() {
  const { mutate } = useTransfer();

  mutate({
    recipients: ["0x1234..."],
    amounts: ["1000000"],
  });
}
```

### useTasks

Query task list:

```tsx
import { useTasks } from "@exec402/react";

function TaskList() {
  const { data, isLoading } = useTasks({ status: "pending", limit: 10 });

  return (
    <ul>
      {data?.tasks.map((task) => (
        <li key={task.id}>{task.id}</li>
      ))}
    </ul>
  );
}
```

### useTask

Query a single task:

```tsx
import { useTask } from "@exec402/react";

function TaskDetail({ taskId }: { taskId: string }) {
  const { data: task } = useTask(taskId);

  return <div>{task?.status}</div>;
}
```

### useExecuteCall / useExecuteTransfer

Execute a pending task:

```tsx
import { useExecuteCall, useTask } from "@exec402/react";

function ExecuteTask({ taskId }: { taskId: string }) {
  const { data: task } = useTask(taskId);
  const { mutate: execute } = useExecuteCall();

  return (
    <button onClick={() => task && execute(task)}>
      Execute
    </button>
  );
}
```

### useExecClient

Access the underlying ExecClient instance:

```tsx
import { useExecClient } from "@exec402/react";

function MyComponent() {
  const client = useExecClient();

  // Use client directly
  const info = await client.getInfo();
}
```

## API Reference

### Hooks

| Hook | Description |
|------|-------------|
| `useCall` | Create a contract call task |
| `useTransfer` | Create a transfer task |
| `useTasks` | Query task list |
| `useTask` | Query a single task |
| `useExecuteCall` | Execute a call task |
| `useExecuteTransfer` | Execute a transfer task |
| `useCanisterInfo` | Get canister information |
| `useExecClient` | Access ExecClient instance |
| `useExecContext` | Access ExecContext (client + network) |

### Components

| Component | Description |
|-----------|-------------|
| `ExecProvider` | Context provider for exec402 |

