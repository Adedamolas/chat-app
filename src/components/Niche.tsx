import React from "react";
import { Link } from "react-router-dom";

export default function Niche() {
  const links = [
    { href: "/userposts", label: "My Posts" },
    { href: "/explore", label: "Explore" },
    { href: "/followers", label: "My Followers" },
    { href: "/settings", label: "Settings" },
  ];
  return (
    <div className=" mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Check your preferred niche</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/niche/Technology" className=" p-2 rounded-full">
          <h2 className="text-xl font-bold">Technology</h2>
        </Link>
        <Link to="/niche/Health" className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Health</h2>
        </Link>
        <Link to="/niche/Finance" className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Finance</h2>
        </Link>
        <Link to="/niche/Lifestyle" className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Lifestyle</h2>
        </Link>
        <Link to="/niche/Personal" className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Personal</h2>
        </Link>
        <Link to="/niche/Entertainment" className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Entertainment</h2>
        </Link>
      </div>
    </div>
  );
}
