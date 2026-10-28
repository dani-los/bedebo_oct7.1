import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <SiteFooter />
        </>
    );
}
