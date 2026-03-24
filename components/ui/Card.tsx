export default function Card({ children }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
      {children}
    </div>
  );
}