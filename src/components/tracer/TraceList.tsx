import { FC } from "react";
import { useTracerStore } from "@bka-stuff/pe-mfe-utils";

const TraceList: FC = () => {
  const { traces, removeTraceId } = useTracerStore();

  console.log("traces from TraceList in the shell:::", traces);

  return <div></div>;
};

export default TraceList;
