type SectionBoxProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionBox({
  title,
  children,
}: SectionBoxProps) {
  return (
    <section className="relative z-20 mx-auto px-16 -mt-8">
      <div className="rounded-2xl bg-[#1f1f1f] p-10 shadow-lg border border-[#C0C0C0]">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center tracking-widest text-[#F0F0F0F0]">
            {title}
          </h2>
        </div>

        {children}
      </div>
    </section>
  );
}
