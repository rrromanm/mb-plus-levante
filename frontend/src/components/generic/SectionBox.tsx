type SectionBoxProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SectionBox({
  children,
  id,
}: SectionBoxProps) {
  return (
    <section id={id} className="relative z-20 px-4 sm:px-8 lg:px-32 pt-10 sm:pt-16 scroll-mt-24">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 lg:p-10 shadow-lg">
        {children}
      </div>
    </section>
  );
}
