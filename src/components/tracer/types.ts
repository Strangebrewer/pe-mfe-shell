export type Span = {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  service: string;
  operation: string;
  status: string;
  error?: string;
  startTime: string;
  endTime: string;
  metadata?: Record<string, any>;
};

export type DisplayTrace = {
  trace: { id: string; label: string };
  spans: Span[];
  status: 'polling' | 'done' | 'no-spans';
};
