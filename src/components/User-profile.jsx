"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut, Settings, ShoppingBag } from "lucide-react"
import { useAuth } from "../context/Auth-context"
// import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"



export default function UserProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const router = useNavigate()
//   const { toast } = useToast()

  const handleLogout = () => {
    logout()
    // toast({
    //   title: "Good-bye! 👋",
    //   description: "You have been signed out successfully.",
    // })
    onClose()
    router.push("/")
  }

  const goProfile = () => {
    onClose()
    router("/profile")
  }

  const goOrders = () => {
    onClose()
    router("/orders")
  }

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl bg-white/95 backdrop-blur-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-semibold">
            {initials}
          </div>
          <DialogTitle className="mt-4 text-center text-xl">{user.name}</DialogTitle>
          <DialogDescription className="text-center">{user.email}</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-3">
          <Button variant="secondary" className="w-full flex justify-start gap-3" onClick={goProfile}>
            <Settings className="h-4 w-4" />
            Profile Settings
          </Button>

          <Button variant="secondary" className="w-full flex justify-start gap-3" onClick={goOrders}>
            <ShoppingBag className="h-4 w-4" />
            My Orders
          </Button>

          <Separator />

          <Button variant="destructive" className="w-full flex justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
