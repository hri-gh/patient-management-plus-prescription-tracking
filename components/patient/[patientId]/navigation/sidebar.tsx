"use client";

import { FC, useContext, createContext, useState, ReactNode } from "react";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  ClipboardPlus,
  User,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams, usePathname } from 'next/navigation';
import AllPatientsList from "../../../../app/patients/[patientId]/components/patients-sidebar";
import Link from "next/link";
import clsx from 'clsx';
import { Separator } from "@/components/ui/separator";
interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {

  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <Image
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
            width={128} // Provide a default width
            height={32} // Provide a default height
          /> */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-500 hover:bg-gray-400"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>


        {/* <AllPatientsList expanded={expanded} /> */}
        {/* <Separator className="border-2 rounded-full shadow border-white"/> */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          {/* <Image
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
            width={40} // Provide a default width
            height={40} // Provide a default height
          /> */}
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  id: number;
  text: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

const SidebarItem: FC = () => {
  const context = useContext(SidebarContext);
  const params = useParams()
  const pathname = usePathname();

  if (!context) {
    throw new Error("SidebarItem must be used within a SidebarProvider");
  }

  const { expanded } = context;

  const links: SidebarItemProps[] = [
    { id: 1, text: "Prescriptions", href: `/patients/${params.patientId}/prescriptions`, icon: ClipboardPlus },
    { id: 0, text: "Profile", href: `/patients/${params.patientId}`, icon: User },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.id}
            href={link.href}
            className={clsx
              ("relative z-50 flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group",
                {
                  "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800": pathname === link.href,
                  "hover:bg-indigo-50 text-gray-600": pathname !== link.href,
                },
              )}
          >
            <LinkIcon />
            <span
              className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
              {link.text}
            </span>

            {!expanded && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
              >
                {link.text}
              </div>
            )}
          </Link>
        );
      })}
    </>
  );
};

export { Sidebar, SidebarItem };
