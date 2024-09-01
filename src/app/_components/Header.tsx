"use client"

import { FaHome } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa"
import { FaBars, FaChevronDown } from "react-icons/fa6"

import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDetectClickOutside } from "react-detect-click-outside"

const Header = () => {
  const pathName = usePathname()
  const [isNavbarVisible, setNavbarVisible] = useState(false)

  const handleMenuHamburguerClick = () => {
    setNavbarVisible(!isNavbarVisible)
  }

  const handleMenuClickOutside = () => {
    setNavbarVisible(false)
  }

  const ref = useDetectClickOutside({ onTriggered: handleMenuClickOutside })

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="relative z-50 flex h-16 items-center justify-between border-b bg-white px-8 py-3 md:px-32 xl:px-64">
        <Button
          className="z-50 md:hidden"
          variant="outline"
          size="icon"
          onClick={handleMenuHamburguerClick}
        >
          <FaBars size={20} />
        </Button>
        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant={`${pathName === "/" ? "default" : "outline"}`}
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/">
              <FaHome size={18} />
              <p className="font-semibold">Home</p>
            </Link>
          </Button>
          <Button
            variant={`${pathName === "/bookings" ? "default" : "outline"}`}
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/bookings">
              <FaCalendarAlt size={18} />
              <p className="font-semibold">Agendamentos</p>
            </Link>
          </Button>
        </div>
        <div className="group/configs z-50 flex cursor-pointer items-center gap-2">
          <FaChevronDown
            size={10}
            className="opacity-0 transition-opacity group-hover/configs:opacity-100"
          />
          <p className="text-sm font-semibold">Luan Henrique</p>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>
      </div>
      <div
        ref={ref}
        className={`absolute z-10 w-full border-b bg-white px-8 py-3 transition-all ${isNavbarVisible ? "top-16" : "-top-24"} md:hidden`}
      >
        <Link
          className="flex items-center gap-2 rounded-md p-3 hover:bg-slate-100"
          href="/"
        >
          <FaHome size={18} />
          <p className="font-bold">Home</p>
        </Link>
        <hr className="my-3" />
        <Link
          className="flex items-center gap-2 rounded-md p-3 hover:bg-slate-100"
          href="/bookings"
        >
          <FaCalendarAlt size={18} />
          <p className="font-bold">Agendamentos</p>
        </Link>
      </div>
    </header>
  )
}

export default Header
