import { RiSearch2Line } from "@remixicon/react";
import { auth } from "./firebase-config";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

interface Props {
  isAuth: boolean;
  signUserOut: () => void;
}
export default function Navbar({ isAuth, signUserOut }: Props) {
  const links = [
    { href: "/userposts", label: "My Posts" },
    { href: "/explore", label: "Explore" },
    { href: "/followers", label: "My Followers" },
    { href: "/license", label: "Settings" },
  ];

  return (
    <nav className=" flex flex-col sm:flex-row sm:px-32 md-px-32 w-full justify-between items-center list-none py-3 text-xl px-5 fixed top-0 backdrop-blur-md z-10">
      <div className=" flex flex-col sm:flex-row gap-5 items-center text-sm sm:text-lg sm:items-baseline">
        <div className=" border-black border-solid border-2 py-2 p-1">
          <h2 className=" font-extrabold translate-x-5 translate-y-2">Blogr</h2>
        </div>
        <ul className=" flex flex-row items-center justify-center">
          <a href={"/"} className=" p-3 rounded-full">
            <li>Home</li>
          </a>
          <a href={"create-post"} className=" p-3 rounded-full">
            <li>Create-Post</li>
          </a>
          <a href={"posts"} className=" p-3 rounded-full">
            <li>Posts</li>
          </a>
          <a href={"authors"} className=" p-3 rounded-full">
            <li>Authors</li>
          </a>
        </ul>
      </div>
      <div className=" flex flex-row gap-5 items-center">
        <span>
          <RiSearch2Line />
        </span>
        {!isAuth && (
          <>
            <a href={"login"} className="rounded-full">
              <li>Login</li>
            </a>
          </>
        )}
        {isAuth && (
          <>
            <button onClick={signUserOut}>Sign Out</button>
          </>
        )}
        {isAuth && (
          <>
            <Menu>
              <MenuButton className="data-[active]:bg-blue-200 border-white border-0 p-1 bg-none rounded-full">
                <img
                  width={"50px"}
                  height={"50px"}
                  className=" rounded-full"
                  src={auth.currentUser?.photoURL ?? undefined}
                  alt="profile_pic"
                />
              </MenuButton>
              <MenuItems
                anchor="bottom left"
                transition
                className="dropdown -translate-x-12 [--anchor-gap:4px] sm:[--anchor-gap:8px] text-white px-2 py-3 rounded-lg z-50 mt-2 origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                {links.map((link) => (
                  <MenuItem
                    key={link.href}
                    className="block bg-transparent w-full px-4 rounded-lg data-[focus]:bg-gray-500 transition-all data-[focus]:border-white"
                  >
                    <a href={link.href}>{link.label}</a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
}
