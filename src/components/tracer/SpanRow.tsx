import { FC } from 'react';
import type { Span } from './types';

type Props = {
  span: Span;
  traceStart: number;
  totalDuration: number;
};

const SpanRow: FC<Props> = ({ span, traceStart, totalDuration }) => {
  const spanStart = new Date(span.startTime).getTime();
  const spanEnd = new Date(span.endTime).getTime();
  const durationMs = spanEnd - spanStart;

  const leftPct = totalDuration > 0 ? ((spanStart - traceStart) / totalDuration) * 100 : 0;
  const widthPct =
    totalDuration > 0 ? Math.max(2, ((spanEnd - spanStart) / totalDuration) * 100) : 100;

  return (
    <div className="tw:bg-bg tw:rounded tw:p-2 tw:text-xs">
      <div className="tw:flex tw:justify-between tw:items-center">
        <p className="tw:text-blue tw:font-medium">{span.service}</p>
        <p className="tw:text-muted">{durationMs}ms</p>
      </div>

      <p className="tw:text-muted tw:mt-0.5 tw:mr-[12px] tw:truncate">{span.operation}</p>

      {span.status && span.status !== 'ok' && (
        <p className="tw:text-red tw:mt-0.5">{span.status}</p>
      )}

      <div className="tw:mt-1.5 tw:h-1 tw:rounded tw:bg-purpleAlpha tw:relative tw:overflow-hidden">
        <div
          className="tw:absolute tw:h-full tw:rounded tw:bg-blue"
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
};

export default SpanRow;
