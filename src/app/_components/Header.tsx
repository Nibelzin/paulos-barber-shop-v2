"use client"

import { FaHome } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa"
import {
  FaArrowRightToBracket,
  FaBars,
  FaChevronDown,
  FaMoon,
  FaUser,
} from "react-icons/fa6"
import { HiOutlineDotsVertical } from "react-icons/hi"

import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useDetectClickOutside } from "react-detect-click-outside"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

const Header = () => {
  const session = useSession()
  const router = useRouter()

  const pathName = usePathname()
  const [isNavbarVisible, setNavbarVisible] = useState(false)

  const handleMenuHamburguerClick = () => {
    setNavbarVisible(!isNavbarVisible)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/", redirect: true })
  }

  const handleMenuClickOutside = () => {
    setNavbarVisible(false)
  }

  const ref = useDetectClickOutside({
    onTriggered: handleMenuClickOutside,
    disableTouch: true,
  })

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
        {session.status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="" asChild>
              <div className="group/configs z-50 flex cursor-pointer items-center gap-2">
                <FaChevronDown
                  size={10}
                  className="opacity-0 transition-opacity group-hover/configs:opacity-100"
                />
                <p className="text-sm font-semibold">
                  {session.data?.user?.name}
                </p>
                <Avatar>
                  <AvatarImage
                    src={`${session.data.user?.image}`}
                    className="object-cover"
                  />
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={18}>
              <DropdownMenuItem className="gap-2" asChild>
                <Link href="/profile">
                  <FaUser />
                  <p className="font-bold">Meu Perfil</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <FaMoon />
                <p className="font-bold">Dark Mode</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-red-500"
                onClick={handleSignOut}
              >
                <FaArrowRightToBracket />
                <p className="font-bold">Log Out</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <HiOutlineDotsVertical size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={18}>
                <DropdownMenuItem className="gap-2">
                  <FaMoon />
                  <p className="font-bold">Dark Mode</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="flex gap-2" size="sm" asChild>
              <Link href="/login">
                <FaUser />
                <p>Fazer Login</p>
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div
        ref={ref}
        className={`absolute z-10 w-full border-b bg-white px-8 py-3 transition-all ${isNavbarVisible ? "top-16" : "-top-24"} md:hidden`}
      >
        <Link
          className="flex items-center gap-2 rounded-md p-3 hover:bg-slate-100"
          href="/"
          onClick={handleMenuHamburguerClick}
        >
          <FaHome size={18} />
          <p className="font-bold">Home</p>
        </Link>
        <hr className="my-3" />
        <Link
          className="flex items-center gap-2 rounded-md p-3 hover:bg-slate-100"
          href="/bookings"
          onClick={handleMenuHamburguerClick}
        >
          <FaCalendarAlt size={18} />
          <p className="font-bold">Agendamentos</p>
        </Link>
      </div>
    </header>
  )
}

export default Header
