type SectionBoxProps = {
  children: React.ReactNode;
  classname?: string;
};

export default function SectionBox({
  children,
  classname,
}: SectionBoxProps) {
  return (
    <section className={`relative z-20 ${classname || ""}`}>
      <div className="rounded-2xl border border-border bg-card p-10 shadow-lg">
        {children}
      </div>
    </section>
  );
}
