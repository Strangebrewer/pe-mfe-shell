import { FC, useEffect, useState } from 'react';
import { ActionButton, useTracerStore, useUserStore } from '@bka-stuff/pe-mfe-utils';
import TracePoller from './TracePoller';
import TraceEntry from './TraceEntry';
import { DisplayTrace, Span } from './types';

type Trace = DisplayTrace['trace'];

const TraceList: FC = () => {
  const { traces, removeTraceId } = useTracerStore();
  const { user } = useUserStore();
  const [displayTraces, setDisplayTraces] = useState<DisplayTrace[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (!user) setDisplayTraces([]);
  }, [user]);

  useEffect(() => {
    setDisplayTraces((prev) => {
      const existingIds = new Set(prev.map((d) => d.trace.id));
      const incoming = traces.filter((t) => !existingIds.has(t.id));
      if (!incoming.length) return prev;
      setHasUnread(true);
      return [
        ...incoming.map((t) => ({
          trace: t,
          spans: [],
          status: 'polling' as const,
        })),
        ...prev,
      ];
    });
  }, [traces]);

  function handleSpansUpdate(traceId: string, spans: Span[]) {
    setDisplayTraces((prev) => prev.map((d) => (d.trace.id === traceId ? { ...d, spans } : d)));
  }

  function handleComplete(trace: Trace) {
    setDisplayTraces((prev) =>
      prev.map((d) => (d.trace.id === trace.id ? { ...d, status: 'done' } : d)),
    );
    removeTraceId(trace);
  }

  function handleNoSpans(trace: Trace) {
    setDisplayTraces((prev) =>
      prev.map((d) => (d.trace.id === trace.id ? { ...d, status: 'no-spans' } : d)),
    );
    removeTraceId(trace);
  }

  function handleExpand() {
    setExpanded(!expanded);
    setHasUnread(false);
  }

  return (
    <div
      className={`tw:fixed tw:right-0 tw:top-[64px] tw:h-[calc(100vh_-_64px)] tw:bg-surface tw:border-l tw:border-purpleAlpha tw:overflow-hidden tw:transition-all tw:duration-200 tw:z-10 ${expanded ? 'tw:w-[300px]' : 'tw:w-[64px]'}`}
    >
      {displayTraces
        .filter((d) => d.status === 'polling')
        .map((d) => (
          <TracePoller
            key={d.trace.id}
            trace={d.trace}
            onSpansUpdate={handleSpansUpdate}
            onComplete={handleComplete}
            onNoSpans={handleNoSpans}
          />
        ))}

      <div>
        <span
          className={`tw:w-full tw:h-[48px] tw:flex tw:items-center tw:text-muted hover:tw:text-primary tw:transition-colors ${expanded ? 'tw:px-3 tw:justify-between' : 'tw:justify-center'}`}
        >
          {expanded && <span className="tw:text-sm tw:font-medium">Activity</span>}
          <span className={hasUnread && !expanded ? 'tracer-unread-glow' : ''}>
            <ActionButton
              iconClass={expanded ? 'fas fa-arrow-right' : 'fas fa-info-circle'}
              title={expanded ? '' : 'view traces'}
              size="lg"
              color="green"
              onClick={handleExpand}
            />
          </span>
        </span>
      </div>

      {expanded && (
        <div className="tw:overflow-y-auto tw:h-[calc(100%-48px)]">
          {displayTraces.length === 0 ? (
            <p className="tw:text-muted tw:text-xs tw:text-center tw:mt-4 tw:px-3 tw:italic">
              No activity yet
            </p>
          ) : (
            displayTraces.map((d) => <TraceEntry key={d.trace.id} displayTrace={d} />)
          )}
        </div>
      )}
    </div>
  );
};

export default TraceList;
