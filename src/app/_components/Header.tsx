"use client"

import { FaHome } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa"
import {
  FaArrowRightToBracket,
  FaBars,
  FaChevronDown,
  FaGears,
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
import { Dialog, DialogContent } from "./ui/dialog"
import { Switch } from "./ui/switch"
import { useTheme } from "next-themes"
import { Label } from "./ui/label"

const Header = () => {
  const { setTheme, theme } = useTheme()

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  const session = useSession()
  const router = useRouter()

  const pathName = usePathname()
  const [isNavbarVisible, setNavbarVisible] = useState(false)
  const [openLoginPopUp, setOpenLoginPopUp] = useState(false)

  const handleBookingsPageClick = () => {
    if (session.status === "unauthenticated") {
      return setOpenLoginPopUp(true)
    }
    router.push("/bookings")
  }

  const handleMenuHamburguerClick = (page?: string) => {
    if (page) {
      if (page === "/bookings" && session.status === "unauthenticated") {
        return setOpenLoginPopUp(true)
      }
      router.push(page)
    }

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
      <div className="relative z-50 flex h-16 items-center justify-between border-b bg-white px-8 py-3 dark:bg-neutral-900 md:px-32 xl:px-64">
        <Button
          className="z-50 md:hidden"
          variant="outline"
          size="icon"
          onClick={() => handleMenuHamburguerClick()}
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
            onClick={handleBookingsPageClick}
          >
            <FaCalendarAlt size={18} />
            <p className="font-semibold">Agendamentos</p>
          </Button>
        </div>
        {session.status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
                    src={`${session.data?.user.image === "" ? "/default_profile_pic.jpg" : session.data?.user.image}`}
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
              <div className="flex items-center gap-2 rounded-sm p-2 hover:bg-accent">
                <FaMoon />
                <Label className="font-bold" htmlFor="dark-mode">
                  Dark Mode
                </Label>
                <Switch
                  onClick={handleThemeChange}
                  checked={theme === "dark"}
                  id="dark-mode"
                />
              </div>
              {session.data.user.isAdmin && (
                <DropdownMenuItem className="gap-2" asChild>
                  <Link href="/admin">
                    <FaGears />
                    <p className="font-bold">Admin</p>
                  </Link>
                </DropdownMenuItem>
              )}
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
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-neutral-900 dark:hover:bg-accent"
                >
                  <HiOutlineDotsVertical size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={18}>
                <div className="flex items-center gap-2 rounded-sm p-2 hover:bg-accent">
                  <FaMoon />
                  <Label className="font-bold" htmlFor="dark-mode">
                    Dark Mode
                  </Label>
                  <Switch
                    onClick={handleThemeChange}
                    checked={theme === "dark"}
                    id="dark-mode"
                  />
                </div>
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
        className={`absolute z-10 w-full border-b bg-white px-8 py-3 transition-all dark:bg-neutral-900 ${isNavbarVisible ? "top-16" : "-top-24"} md:hidden`}
      >
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-accent"
          onClick={() => handleMenuHamburguerClick("/")}
        >
          <FaHome size={18} />
          <p className="font-bold">Home</p>
        </div>
        <hr className="my-3" />
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-accent"
          onClick={() => handleMenuHamburguerClick("/bookings")}
        >
          <FaCalendarAlt size={18} />
          <p className="font-bold">Agendamentos</p>
        </div>
      </div>
      <Dialog open={openLoginPopUp} onOpenChange={setOpenLoginPopUp}>
        <DialogContent className="w-96 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-4 font-bold">
              Faça login para ver seus agendamentos
            </h1>
            <Button className="w-full" asChild>
              <Link href="/login">
                <p>Fazer Login</p>
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
