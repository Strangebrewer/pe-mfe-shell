import { FC, Fragment, useState } from 'react';
import type { DisplayTrace } from './types';
import SpanRow from './SpanRow';
import GapMarker from './GapMarker';

const GAP_THRESHOLD_MS = 100;
const ASYNC_THRESHOLD_MS = 500;

type Props = {
  displayTrace: DisplayTrace;
};

const TraceEntry: FC<Props> = ({ displayTrace }) => {
  const { trace, spans, status } = displayTrace;
  const [expanded, setExpanded] = useState(false);

  const sorted = [...spans].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  const traceStart = sorted.length ? new Date(sorted[0].startTime).getTime() : 0;
  const traceEnd = sorted.length
    ? Math.max(...sorted.map((s) => new Date(s.endTime).getTime()))
    : 0;
  const totalDuration = traceEnd - traceStart;
  const totalDurationDisplay =
    totalDuration >= 1000
      ? `${(totalDuration / 1000).toFixed(1)}s`
      : totalDuration > 0
        ? `${totalDuration}ms`
        : null;

  return (
    <div className="tw:border-b tw:border-purpleAlpha">
      <button
        className="tw:w-full tw:flex tw:items-center tw:gap-2 tw:text-left tw:py-2 tw:px-3 hover:tw:bg-purpleAlpha tw:transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        {status === 'polling' ? (
          <span className="tw:text-blue tw:text-xs tw:animate-spin tw:inline-block">⟳</span>
        ) : status === 'no-spans' ? (
          <span className="tw:text-red tw:text-xs">✗</span>
        ) : (
          <span className="tw:text-green tw:text-xs">✓</span>
        )}
        <span className="tw:text-primary tw:text-sm tw:truncate tw:flex-1">{trace.label}</span>
        {totalDurationDisplay && (
          <span className="tw:text-muted tw:text-xs">{totalDurationDisplay}</span>
        )}
        <span className="tw:text-muted tw:text-xs">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="tw:flex tw:flex-col tw:gap-1 tw:px-3 tw:pb-2">
          {status === 'no-spans' ? (
            <p className="tw:text-red tw:text-xs tw:italic">No trace data received</p>
          ) : sorted.length === 0 ? (
            <p className="tw:text-muted tw:text-xs tw:italic">Waiting for spans...</p>
          ) : (
            sorted.map((span, i) => {
              const next = sorted[i + 1];
              const gapMs = next
                ? new Date(next.startTime).getTime() - new Date(span.endTime).getTime()
                : 0;
              return (
                <Fragment key={span.spanId}>
                  <SpanRow span={span} traceStart={traceStart} totalDuration={totalDuration} />
                  {gapMs > GAP_THRESHOLD_MS && (
                    <GapMarker gapMs={gapMs} isAsync={gapMs >= ASYNC_THRESHOLD_MS} />
                  )}
                </Fragment>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TraceEntry;
