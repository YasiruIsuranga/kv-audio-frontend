import { CiHome } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdContactMail } from "react-icons/md";
import { MdPhotoLibrary } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiLogOut, BiLogIn } from "react-icons/bi";

export default function MobileNavPanel(props) {
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function goTo(route, isLogout = false) {
    if (isLogout) {
      localStorage.removeItem("token");
    }
    navigate(route);
    setOpen(false);
  }

  const navItems = [
    { label: "Home", icon: <CiHome className="mr-2" />, path: "/" },
    { label: "Gallery", icon: <MdPhotoLibrary className="mr-2" />, path: "/gallery" },
    { label: "Items", icon: <FaBoxes className="mr-2" />, path: "/items" },
    { label: "Booking", icon: <FaCalendarCheck className="mr-2" />, path: "/booking" },
    { label: "Contact", icon: <MdContactMail className="mr-2" />, path: "/contact" },
    {
      label: token ? "Log Out" : "Log In",
      icon: token ? <BiLogOut className="mr-2" /> : <BiLogIn className="mr-2" />,
      path: "/login",
      isLogout: !!token,
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="w-full h-screen bg-[#00000070] fixed top-0 left-0 z-50">
          <div className="h-full w-[300px] shadow-lg bg-cover" style={{ backgroundImage: "url('/mobileNav.avif')" }}>
            <div className="bg-[#CA7842] w-full h-[70px] relative flex justify-center items-center">
              <img
                src="/logo2.png"
                alt="logo"
                className="w-[60px] h-[60px] object-cover absolute left-1 rounded-full"
              />
              <IoMdClose
                className="absolute right-3 text-3xl text-white cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex flex-col mt-4 text-[22px] text-white font-medium">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => goTo(item.path, item.isLogout)}
                  className="flex items-center px-4 py-3 hover:bg-secondary cursor-pointer transition-all"
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}