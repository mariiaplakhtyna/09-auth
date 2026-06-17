import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <section>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </section>
  );
}
