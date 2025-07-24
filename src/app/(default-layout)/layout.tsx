import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Header />
    <main className="min-h-screen">
      <main>{children}</main>
    </main>
    <Footer />
    </>
  );
}