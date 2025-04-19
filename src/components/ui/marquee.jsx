export default function Marquee({ items }) {
  return (
    <div className="relative flex w-full overflow-x-hidden border-y border-border/50 bg-secondary/5 backdrop-blur-sm">
      <div className="animate-marquee whitespace-nowrap py-8">
        {items.map((item) => {
          return (
            <span
              key={item}
              className="mx-6 text-2xl font-medium text-foreground/80"
            >
              {item}
            </span>
          );
        })}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-8">
        {items.map((item) => {
          return (
            <span
              key={item}
              className="mx-6 text-2xl font-medium text-foreground/80"
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
