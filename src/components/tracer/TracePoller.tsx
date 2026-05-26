import { FC, useEffect, useRef } from 'react';
import api from '../../api';
import type { Span, DisplayTrace } from './types';

type Trace = DisplayTrace['trace'];

type Props = {
  trace: Trace;
  onSpansUpdate: (traceId: string, spans: Span[]) => void;
  onComplete: (trace: Trace) => void;
  onNoSpans: (trace: Trace) => void;
};

const TracePoller: FC<Props> = ({ trace, onSpansUpdate, onComplete, onNoSpans }) => {
  const onSpansUpdateRef = useRef(onSpansUpdate);
  const onCompleteRef = useRef(onComplete);
  const onNoSpansRef = useRef(onNoSpans);
  useEffect(() => {
    onSpansUpdateRef.current = onSpansUpdate;
  }, [onSpansUpdate]);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  useEffect(() => {
    onNoSpansRef.current = onNoSpans;
  }, [onNoSpans]);

  useEffect(() => {
    let spanCount = 0;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let giveUpTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
      if (giveUpTimer) clearTimeout(giveUpTimer);
      onCompleteRef.current(trace);
    };

    giveUpTimer = setTimeout(() => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
      onNoSpansRef.current(trace);
    }, 20000);

    const interval = setInterval(async () => {
      try {
        const response = await api.tracer.getTraces(trace.id);
        const spans: Span[] = response?.data ?? [];
        if (spans.length > spanCount) {
          spanCount = spans.length;
          onSpansUpdateRef.current(trace.id, spans);
          if (giveUpTimer) {
            clearTimeout(giveUpTimer);
            giveUpTimer = null;
          }
          if (settleTimer) clearTimeout(settleTimer);
          settleTimer = setTimeout(finish, 10500);
        }
      } catch {
        finish();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
      if (giveUpTimer) clearTimeout(giveUpTimer);
    };
  }, []); // intentionally empty — one interval per mount

  return null;
};

export default TracePoller;
