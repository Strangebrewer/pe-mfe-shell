import { FC } from 'react';

type Props = {
  gapMs: number;
  isAsync: boolean;
};

const GapMarker: FC<Props> = ({ gapMs, isAsync }) => {
  const label = gapMs >= 1000 ? `${(gapMs / 1000).toFixed(1)}s` : `${gapMs}ms`;

  return (
    <div className="tw:flex tw:items-center tw:gap-1.5 tw:px-1 tw:text-xs tw:text-muted">
      <span>↓</span>
      <span>{label}</span>
      {isAsync && <span className="tw:text-blue">async</span>}
    </div>
  );
};

export default GapMarker;
