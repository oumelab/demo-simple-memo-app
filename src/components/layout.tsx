import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <div className="max-w-4xl mx-auto px-5 min-h-dvh flex flex-col justify-between">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
