export const SummaryCardIcon = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

export const SummaryCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-2 rounded-xl border border-primary bg-white p-6 transition-all ease-in-out hover:bg-primary/5">
      {children}
    </div>
  );
};
