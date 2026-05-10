import { FC, useEffect, useRef } from 'react';
import api from '../../api';
import type { Span, DisplayTrace } from './types';

type Trace = DisplayTrace['trace'];

type Props = {
  trace: Trace;
  onSpansUpdate: (traceId: string, spans: Span[]) => void;
  onComplete: (trace: Trace) => void;
};

const TracePoller: FC<Props> = ({ trace, onSpansUpdate, onComplete }) => {
  const onSpansUpdateRef = useRef(onSpansUpdate);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onSpansUpdateRef.current = onSpansUpdate;
  }, [onSpansUpdate]);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let spanCount = 0;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
      onCompleteRef.current(trace);
    };

    const interval = setInterval(async () => {
      try {
        const response = await api.tracer.getTraces(trace.id);
        const spans: Span[] = response?.data ?? [];
        if (spans.length > spanCount) {
          spanCount = spans.length;
          onSpansUpdateRef.current(trace.id, spans);
          if (settleTimer) clearTimeout(settleTimer);
          settleTimer = setTimeout(finish, 10500);
        }
      } catch {
        // silently ignore transient poll errors
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, []); // intentionally empty — one interval per mount

  return null;
};

export default TracePoller;
