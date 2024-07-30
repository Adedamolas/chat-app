import { Link } from "react-router-dom";

export default function Niche() {
  const links = [
    { href: "/niche/Technology", label: "Technology" },
    { href: "/niche/Health", label: "Health" },
    { href: "/niche/Finance", label: "Finance" },
    { href: "/niche/Lifestyle", label: "Lifestyle" },
    { href: "/niche/Personal", label: "Personal" },
    { href: "/niche/Entertainment", label: "Entertainment" },
  ];
  return (
    <div className=" mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Check your preferred niche</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className=" flex flex-row items-center justify-center bg-gray-200 p-2 rounded-full"
          >
            <h2 className="text-xl font-bold">{link.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
