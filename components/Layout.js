import NavBar from "./NavBar";
import Footer from "./Footer";
import BetaTag from "./BetaTag";

const Layout = ({ children }) => {
  return (
    <div>
      <BetaTag />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
