type SectionBoxProps = {
  children: React.ReactNode;
};

export default function SectionBox({
  children,
}: SectionBoxProps) {
  return (
    <section className="relative z-20 mx-auto px-32 pt-16">
      <div className="rounded-2xl border border-border bg-card p-10 shadow-lg">
        {children}
      </div>
    </section>
  );
}
