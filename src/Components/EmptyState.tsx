type Props = {
  title: string;
  subtitle?: string;
};

export const EmptyState = ({ title, subtitle }: Props) => (
  <div className="empty-state">
    <p className="empty-title">{title}</p>
    {subtitle && <p className="empty-subtitle">{subtitle}</p>}
  </div>
);
