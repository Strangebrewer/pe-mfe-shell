import { FC, useEffect } from 'react';
import api from '../../api';
import { Span, DisplayTrace } from './types';

type Trace = DisplayTrace['trace'];

type Props = {
  trace: Trace;
  onSpansUpdate: (traceId: string, spans: Span[]) => void;
  onComplete: (trace: Trace) => void;
  onNoSpans: (trace: Trace) => void;
};

const TracePoller: FC<Props> = ({ trace, onSpansUpdate, onComplete, onNoSpans }) => {
  useEffect(() => {
    let spanCount = 0;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let giveUpTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = () => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
      if (giveUpTimer) clearTimeout(giveUpTimer);
      onComplete(trace);
    };

    giveUpTimer = setTimeout(() => {
      clearInterval(interval);
      if (settleTimer) clearTimeout(settleTimer);
      onNoSpans(trace);
    }, 20200);

    const interval = setInterval(async () => {
      try {
        const response = await api.tracer.getTraces(trace.id);
        const spans: Span[] = response?.data ?? [];
        if (spans.length > spanCount) {
          spanCount = spans.length;
          onSpansUpdate(trace.id, spans);
          if (giveUpTimer) {
            clearTimeout(giveUpTimer);
            giveUpTimer = null;
          }
          if (settleTimer) clearTimeout(settleTimer);
          settleTimer = setTimeout(finish, 10200);
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
