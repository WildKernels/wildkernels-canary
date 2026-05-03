"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface DeviceContextType {
  selectedDevice: string | null
  setSelectedDevice: (device: string | null) => void
  deviceFirmwareLinks: Record<string, string>
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  const deviceFirmwareLinks = {
    "Xiaomi Redmi Note 13": "https://example.com/firmware1",
    "Samsung Galaxy S24": "https://example.com/firmware2",
    // add more devices here
  }

  return (
    <DeviceContext.Provider value={{ selectedDevice, setSelectedDevice, deviceFirmwareLinks }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}