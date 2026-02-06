type SectionBoxProps = {
  children: React.ReactNode;
};

export default function SectionBox({
  children,
}: SectionBoxProps) {
  return (
    <section className="relative z-20 mx-auto px-24">
      <div className="rounded-2xl bg-[#1f1f1f] p-10 shadow-lg border-[0.5px]  border-[#C0C0C0]">
        {children}
      </div>
    </section>
  );
}
