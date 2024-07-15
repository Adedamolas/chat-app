import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { auth } from "../firebase-config";
import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import "../src/App.css";


const links = [
  { href: "/settings", label: "Home" },
  { href: "/support", label: "Create-Post" },
  { href: "/license", label: "Posts" },
  { href: "/license", label: "Authors" },
];

export default function MobileMenu() {
  const { isAuth, signUserOut } = useContext(AppContext);
  return (
    <div className=" mobile_menu">
      <Menu>
        <MenuButton className="data-[active]:bg-blue-200 border-white border-0 p-1 bg-none rounded-full">
          Menu
        </MenuButton>
        <MenuItems
          anchor="bottom"
          transition
          className="dropdown cursor-pointer -translate-x-12 [--anchor-gap:4px] sm:[--anchor-gap:8px] text-white px-2 py-3 rounded-lg z-50 mt-2 origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {links.map((link) => (
            <MenuItem key={link.href}>
              <span className="block bg-transparent w-full px-4 rounded-lg data-[focus]:bg-gray-500 transition-all data-[focus]:border-white">
                <a href={link.href}>{link.label}</a>
              </span>
            </MenuItem>
          ))}
          {!isAuth && (
            <>
              <a href={"/login"} className="rounded-full">
                <li>Login</li>
              </a>
            </>
          )}
          {isAuth && (
            <>
              <button onClick={signUserOut}>Sign Out</button>
            </>
          )}
        </MenuItems>
      </Menu>
    </div>
  );
}
