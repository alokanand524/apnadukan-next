"use client"

import { useVendorInfo } from "@/hooks/useVendorInfo"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const vendor = useVendorInfo()
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [form, setForm] = useState({
    name: "",
    shop_name: "",
    email: "",
    phone: "",
  })

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  useEffect(() => {
    if (vendor) {
      setForm({
        name: vendor.name,
        shop_name: vendor.shop_name,
        email: vendor.email || "",
        phone: vendor.phone || "",
      })
    }
  }, [vendor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/auth/vendor/info/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendor_id: vendor?.vendor_id,
        ...form,
      }),
    })

    const data = await res.json()

    toast({
      title: data.success ? "Profile Updated" : "Update Failed",
      description: data.message,
      variant: data.success ? "default" : "destructive",
    })

    if (data.success) {
      router.push("/dashboard")
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/auth/vendor/info/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendor_id: vendor?.vendor_id,
        current: passwordData.current,
        newPassword: passwordData.new,
        confirmPassword: passwordData.confirm,
      }),
    })

    const data = await res.json()

    toast({
      title: data.success ? "Password Updated" : "Update Failed",
      description: data.message,
      variant: data.success ? "default" : "destructive",
    })

    if (data.success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Profile Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-4 flex-1">
          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Shop Name</Label>
            <Input name="shop_name" value={form.shop_name} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>

        {/* Right: Password Toggle + Collapse */}
        <div className="flex-1">
          <Collapsible open={showPasswordForm} onOpenChange={setShowPasswordForm}>
            <div className="mb-4">
              <CollapsibleTrigger asChild>
                <Button variant="outline" type="button">
                  {showPasswordForm ? "Hide Password Section" : "Change Password"}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-4">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input name="current" type="password" onChange={handlePasswordChange} />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input name="new" type="password" onChange={handlePasswordChange} />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input name="confirm" type="password" onChange={handlePasswordChange} />
                </div>
                <Button type="submit" variant="secondary">
                  Update Password
                </Button>
              </form>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
