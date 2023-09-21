import Card from "./Card";
import Image from "next/image";
import logo from "@/assets/images/home.png";
import SidebarLink from "./SidebarLink";

const links = [
  { id: 1, label: "Home", icon: "Grid", link: "/home" },
  {
    id: 2,
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { id: 3, label: "Profile", icon: "User", link: "/profile" },
  {
    id: 4,
    label: "Settings",
    icon: "LogOut",
    link: "/api/logout",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {links.map((link) => (
        <SidebarLink link={link} key={link.id} />
      ))}
    </Card>
  );
};

export default Sidebar;
