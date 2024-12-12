import { useEffect } from "react";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import PageContent from "./layouts/PageContent";
import Sidebar from "./layouts/Sidebar";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function App({ children }) {
  const userToken = useSelector((state) => state?.authState.userToken)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/')
    }
  }, [userToken])
  return (
    <div className="wrapper vertical-layout navbar-floating footer-static vertical-menu-modern menu-expanded">
    <Toaster position="top-center" />
      <Sidebar />
      <Header />
      <PageContent children={children} />
      <div className="sidenav-overlay"></div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
