// hooks/useVendorInfo.ts
"use client"

import { useEffect, useState } from "react"

type VendorInfo = {
  vendor_id: string
  shop_name: string
  name: string
  email: string
  phone: string
}

export const useVendorInfo = () => {
  const [vendor, setVendor] = useState<VendorInfo | null>(null)

  useEffect(() => {
    const vendor_id = localStorage.getItem("vendor_id")
    if (!vendor_id) return

    const fetchInfo = async () => {
      const res = await fetch("/api/auth/vendor/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendor_id }),
      })

      const data = await res.json()
      if (data.success && data.vendor) {
        setVendor(data.vendor)
      }
    }

    fetchInfo()
  }, [])

  return vendor
}
