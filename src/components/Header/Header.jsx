import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleOpenSideMenu = () => {
    setOpen(!open);
  };

  // Prevent scrolling when the side menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <div className="shadow bg-gray-500">
        <Container>
          <div className="w-full max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-between flex-wrap py-4">
              <div className="h-[60px] w-[60px] object-cover">
                <Link to="/">
                  <Logo />
                </Link>
              </div>

              <ul className="hidden sm:flex ml-auto gap-2 flex-wrap">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <button
                          onClick={() => navigate(item.slug)}
                          className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full hover:text-black"
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>

              <div
                className="h-[30px] w-[30px] inline-block sm:hidden"
                onClick={handleOpenSideMenu}
              >
                <img src="/menu.png" alt="Menu" />
              </div>
            </nav>
          </div>
        </Container>
      </div>
      <SideMenu handleOpenSideMenu={handleOpenSideMenu} open={open} navItems={navItems} />
    </>
  );
}

const SideMenu = ({ handleOpenSideMenu, open, navItems }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <div className={`fixed flex flex-col h-full z-20 top-0 right-0 bg-black ${open ? 'w-full' : 'w-0 overflow-hidden'} transition-width duration-300 ease-linear`}>
      <div>
        <button onClick={handleOpenSideMenu} className="mt-2 right-0">
          X
        </button>
      </div>
      <ul className="flex flex-col gap-4 sm:gap-2 mt-4 px-4">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <button
                  onClick={() => {
                    navigate(item.slug);
                    handleOpenSideMenu();
                  }}
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 w-full sm:w-auto sm:rounded-full hover:text-black"
                >
                  {item.name}
                </button>
              </li>
            )
        )}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
