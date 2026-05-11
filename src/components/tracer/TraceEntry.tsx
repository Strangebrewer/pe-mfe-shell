import { FC, useState } from 'react';
import type { DisplayTrace } from './types';

type Props = {
  displayTrace: DisplayTrace;
};

const TraceEntry: FC<Props> = ({ displayTrace }) => {
  const { trace, spans, status } = displayTrace;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="tw:border-b tw:border-[var(--nPurpleAlpha)]">
      <button
        className="tw:w-full tw:flex tw:items-center tw:gap-2 tw:text-left tw:py-2 tw:px-3 hover:tw:bg-[var(--nPurpleAlpha)] tw:transition-colors"
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
        <span className="tw:text-muted tw:text-xs">{spans.length}s</span>
        <span className="tw:text-muted tw:text-xs">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="tw:flex tw:flex-col tw:gap-1 tw:px-3 tw:pb-2">
          {status === 'no-spans' ? (
            <p className="tw:text-red tw:text-xs tw:italic">No trace data received</p>
          ) : spans.length === 0 ? (
            <p className="tw:text-muted tw:text-xs tw:italic">Waiting for spans...</p>
          ) : (
            spans.map((span) => {
              const durationMs = Math.round(
                new Date(span.endTime).getTime() - new Date(span.startTime).getTime(),
              );
              return (
                <div
                  key={span.spanId}
                  className="tw:bg-[var(--baseBg)] tw:rounded tw:p-2 tw:text-xs"
                >
                  <div className="tw:flex tw:justify-between tw:items-center">
                    <span className="tw:text-blue tw:font-medium">{span.service}</span>
                    <span className="tw:text-muted">{durationMs}ms</span>
                  </div>
                  <div className="tw:text-muted tw:mt-0.5">{span.operation}</div>
                  {span.status && span.status !== 'ok' && (
                    <div className="tw:text-red tw:mt-0.5">{span.status}</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TraceEntry;
