"use client"

import { useMemo, useState } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { Check, X } from "lucide-react"

const devices = [
  {
    name: "Xiaomi 13T Pro / Redmi K60 Ultra",
    codename: "corot",
    brand: "XIAOMI",
    status: "GKI",
    dedicated: false,
    osVersion: "Android 14",
    kernelVersion: "5.15.x",
    workingKernel: "Wild Kernels GKI 1.0",
    features: ["Thermal management", "Performance boost", "Battery optimization"],
    knownLimitations: ["git push test"],
    rom: "sgtock",
    romKernel: "sgtock kernel",
    kernelVariants: [
      { hos: "HOS 3", kernel: "Wild Kernels GKI 1.0" },
      { hos: "HOS 2", kernel: "Wild Kernels GKI 0.9" },
    ],
    compatibleKernels: [
      { description: "HOS 2 compatible alternative", kernel: "Wild Kernels GKI 0.8" },
    ],
    lastConfirmed: "May 3, 2026",
  },
  {
    name: "OnePlus Ace 2 Pro",
    codename: "xigua",
    osVersion: "OxygenOS 15",
    kernelVersion: "android13-5.15.167",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 2 Pro",
    codename: "xigua",
    osVersion: "OxygenOS 16",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 2V",
    codename: "vitamin",
    osVersion: "OxygenOS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 2",
    codename: "udon",
    osVersion: "OxygenOS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 2",
    codename: "udon",
    osVersion: "OxygenOS 16",
    kernelVersion: "android12-5.10.236",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3 Pro",
    codename: "dagu",
    osVersion: "OxygenOS 14",
    kernelVersion: "android14-6.1.75",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3 Pro",
    codename: "dagu",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3 Pro",
    codename: "dagu",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3V",
    codename: "audi",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3V",
    codename: "audi",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3",
    codename: "aston",
    osVersion: "OxygenOS 15",
    kernelVersion: "android13-5.15.167",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 3",
    codename: "aston",
    osVersion: "OxygenOS 16",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5 Pro",
    codename: "hummer",
    osVersion: "OxygenOS 15",
    kernelVersion: "android15-6.6.66",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5 Pro",
    codename: "hummer",
    osVersion: "OxygenOS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5 Race",
    codename: "subaru",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.115",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5 Race",
    codename: "subaru",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.134",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5 Ultra",
    codename: "emira",
    osVersion: "OxygenOS 15",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5 Ultra",
    codename: "emira",
    osVersion: "OxygenOS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5",
    codename: "giulia",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 5",
    codename: "giulia",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.141",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 6T",
    codename: "ferrari",
    osVersion: "OxygenOS 16",
    kernelVersion: "android16-6.12.38",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace 6",
    codename: "ferrari",
    osVersion: "OxygenOS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace Race",
    codename: "pickle",
    osVersion: "OxygenOS 14",
    kernelVersion: "android12-5.10.168",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace Race",
    codename: "pickle",
    osVersion: "OxygenOS 15",
    kernelVersion: "android12-5.10.209",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace",
    codename: "pickle",
    osVersion: "OxygenOS 14",
    kernelVersion: "android12-5.10.168",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Ace",
    codename: "pickle",
    osVersion: "OxygenOS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 3",
    codename: "vitamin",
    osVersion: "OxygenOS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 4 CE",
    codename: "benz",
    osVersion: "OxygenOS 15",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 4 CE",
    codename: "benz",
    osVersion: "OxygenOS 16",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 4",
    codename: "avalon",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 4",
    codename: "OnePlusNord4",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.141",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 5",
    codename: "audi",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord 5",
    codename: "audi",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.141",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord CE 5",
    codename: "ebba_v2",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.115",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord CE 5",
    codename: "ebba_v2",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.134",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord CE4 Lite",
    codename: "camry",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.75",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Nord CE4 Lite",
    codename: "camry",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Open",
    codename: "hedwig",
    osVersion: "OxygenOS 15",
    kernelVersion: "android13-5.15.167",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Open",
    codename: "hedwig",
    osVersion: "OxygenOS 16",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 2 MT6991",
    codename: "caihong",
    osVersion: "OxygenOS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 2 Pro",
    codename: "rainbow",
    osVersion: "OxygenOS 15",
    kernelVersion: "android15-6.6.57",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 2 Pro",
    codename: "rainbow",
    osVersion: "OxygenOS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 2 SM8650",
    codename: "caihong",
    osVersion: "OxygenOS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 2 SM8650",
    codename: "caihong",
    osVersion: "OxygenOS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 3 MT6897",
    codename: "erhai",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android14-6.1.128",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 3 MT6897",
    codename: "erhai",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android14-6.1.134",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 3 SM8750",
    codename: "erhai_pro",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android15-6.6.57",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad 3 SM8750",
    codename: "erhai_pro",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad Go 2",
    codename: "bluey_v2",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android14-6.1.134",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad Lite",
    codename: "starlight",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad MT6983",
    codename: "aries",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad MT6983",
    codename: "aries",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android12-5.10.236",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad Pro",
    codename: "rainbow",
    osVersion: "Oxygen OS 14",
    kernelVersion: "android14-6.1.75",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad Pro",
    codename: "rainbow",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Pad Pro",
    codename: "rainbow",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Turbo 6V",
    codename: "jet",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus Turbo 6",
    codename: "jet",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 10 Pro",
    codename: "negroni",
    osVersion: "Oxygen OS 14",
    kernelVersion: "android12-5.10.209",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 10 Pro",
    codename: "negroni",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 10 Pro",
    codename: "negroni",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android12-5.10.236",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 10R",
    codename: "pickle",
    osVersion: "Oxygen OS 14",
    kernelVersion: "android12-5.10.168",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 10R",
    codename: "pickle",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android12-5.10.209",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 10T",
    codename: "ovaltine",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 11",
    codename: "salami",
    osVersion: "Oxygen OS 14",
    kernelVersion: "android13-5.15.123",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 11",
    codename: "salami",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android13-5.15.167",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 11",
    codename: "salami",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 11R",
    codename: "udon",
    osVersion: "Oxygen OS 14",
    kernelVersion: "android12-5.10.209",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 11R",
    codename: "udon",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android12-5.10.226",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 11R",
    codename: "udon",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android12-5.10.236",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 12",
    codename: "waffle",
    osVersion: "Oxygen OS 14",
    kernelVersion: "android14-6.1.57",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 12",
    codename: "waffle",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 12",
    codename: "waffle",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android14-6.1.141",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 12R",
    codename: "aston",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android13-5.15.167",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 12R",
    codename: "aston",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android13-5.15.180",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13 CPH",
    codename: "dodge",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13 PJZ",
    codename: "dodge",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android15-6.6.66",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13S",
    codename: "dodge",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android15-6.6.56",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13S",
    codename: "dodge",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13T",
    codename: "dodge",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android15-6.6.66",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13T",
    codename: "dodge",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13",
    codename: "dodge",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android15-6.6.89",
    features: ["HMBIRD", "SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6 NAT", "Unicode Fix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13R",
    codename: "giulia",
    osVersion: "Oxygen OS 15",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 13R",
    codename: "giulia",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android14-6.1.118",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "Droidspaces", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 15T",
    codename: "ferrari",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android16-6.12.38",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 15",
    codename: "cayenne",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android16-6.12.23",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
  {
    name: "OnePlus 15R",
    codename: "ferrari",
    osVersion: "Oxygen OS 16",
    kernelVersion: "android16-6.12.38",
    features: ["SusFS", "BBR", "BBG", "TTL", "IP_SET & IPv6NAT", "UnicodeFix", "NTSync"],
    dedicated: true,
  },
]

export default function SupportedDevicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "gki" | "dedicated">("all")

  const filteredDevices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return devices.filter((device) => {
      const searchableText = [
        device.name,
        device.codename ?? "",
        device.osVersion ?? "",
        device.kernelVersion ?? "",
        device.status ?? "",
        device.rom ?? "",
        device.features ?? "",
      ]
        .join(" ")
        .toLowerCase()

      const matchesSearch = query === "" || searchableText.includes(query)
      const matchesFilter =
        filter === "all" ||
        (filter === "gki" && device.status === "GKI") ||
        (filter === "dedicated" && device.dedicated)

      return matchesSearch && matchesFilter
    })
  }, [filter, searchQuery])

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 pb-32">
      <div className="w-full max-w-6xl">
        <BlurFade delay={0.1} inView>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            GKI Devices
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.2} inView>
          <p className="text-muted-foreground mb-8">
            Wild Kernels GKI support for Xiaomi and dedicated OnePlus devices is listed below. Every OnePlus entry includes the dedicated tag and its OS/kernel/feature details.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-slate-900/20">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
              <label className="block w-full">
                <span className="sr-only">Search devices</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search devices, OS, kernel, or ROM..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </label>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="inline-flex h-fit items-center justify-center rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
              >
                Clear
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { key: "all", label: "All Devices" },
                { key: "gki", label: "Xiaomi GKI" },
                { key: "dedicated", label: "Dedicated OnePlus" },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFilter(option.key as "all" | "gki" | "dedicated")}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    filter === option.key
                      ? "border-blue-400 bg-blue-500/15 text-blue-200"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredDevices.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-slate-800 bg-slate-950/90 p-8 text-center text-sm text-slate-400">
              No devices match your search or selected filter.
            </div>
          ) : (
            filteredDevices.map((device, index) => {
              return (
                <BlurFade
                  key={`${device.name}-${device.osVersion ?? device.codename}-${index}`}
                  delay={0.3 + index * 0.01}
                  inView
                >
                  <MagicCard className="flex flex-col h-full p-6 bg-slate-900/50 border border-slate-800">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="font-bold text-lg text-foreground mb-1">{device.name}</h2>
                        {device.codename && (
                          <p className="text-xs text-muted-foreground font-mono">Codename: {device.codename}</p>
                        )}
                      </div>
                      {device.dedicated && (
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                          Dedicated
                        </span>
                      )}
                    </div>

                    {device.osVersion && (
                      <div className="mb-2 text-xs text-muted-foreground">
                        <div className="flex justify-between gap-3 border-b border-slate-800 pb-2">
                          <span>OS Version</span>
                          <span className="text-slate-200">{device.osVersion}</span>
                        </div>
                        <div className="flex justify-between gap-3 pt-2">
                          <span>Kernel Version</span>
                          <span className="text-slate-200">{device.kernelVersion}</span>
                        </div>
                      </div>
                    )}

                    {Array.isArray(device.features) ? (
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-green-500 mb-2 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Features
                        </h3>
                        <ul className="space-y-1">
                          {device.features.map((item) => (
                            <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500 mt-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mb-4 text-xs text-muted-foreground">
                        <h3 className="mb-2 text-green-500 text-[11px] uppercase tracking-[0.16em]">
                          Features
                        </h3>
                        <p className="whitespace-pre-wrap text-sm text-slate-200">{device.features}</p>
                      </div>
                    )}

                    {device.knownLimitations?.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-amber-500 mb-2 flex items-center gap-1">
                          <X className="h-3 w-3" /> Known Limitations
                        </h3>
                        <ul className="space-y-1">
                          {device.knownLimitations.map((item) => (
                            <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-amber-500 mt-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {device.kernelVariants?.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-sky-400 mb-2">
                          Kernel Variants by HOS
                        </h3>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          {device.kernelVariants.map((variant) => (
                            <li key={`${variant.hos}-${variant.kernel}`} className="flex justify-between gap-4">
                              <span className="font-medium text-slate-200">{variant.hos}</span>
                              <span>{variant.kernel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {device.compatibleKernels?.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-sky-400 mb-2">
                          Compatible Alternatives
                        </h3>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          {device.compatibleKernels.map((item) => (
                            <li key={item.kernel} className="flex justify-between gap-4">
                              <span className="font-medium text-slate-200">{item.description}</span>
                              <span>{item.kernel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {device.rom && (
                      <div className="grid gap-2 text-sm text-muted-foreground">
                        <div className="flex justify-between border-t border-slate-800 pt-4">
                          <span className="text-slate-300">ROM:</span>
                          <span>{device.rom}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-4">
                          <span className="text-slate-300">ROM Kernel:</span>
                          <span>{device.romKernel}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-4">
                          <span className="text-slate-300">Working Kernel:</span>
                          <span>{device.workingKernel}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-4">
                          <span className="text-slate-300">Last Confirmed:</span>
                          <span>{device.lastConfirmed}</span>
                        </div>
                      </div>
                    )}
                  </MagicCard>
                </BlurFade>
              )
            })
          )}
        </div>

        {/* Coming Soon Info Section */}
        <BlurFade delay={0.7} inView className="mb-12">
          <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg">
            <h3 className="text-amber-500 font-semibold mb-2">Tested & Working on Your Device?</h3>
            <p className="text-amber-500/80 text-sm mb-4">
              If you've successfully tested Wild Kernels on a device not listed as officially supported, 
              please report it in our <strong>Telegram group</strong> with details about your testing. 
              We'll verify and add it to the official supported devices list!
            </p>
            <a
              href="https://t.me/WildKernelsTG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/50 text-amber-500 rounded-full text-sm font-semibold hover:bg-amber-500/30 transition-colors"
            >
              Join Telegram Group →
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.8} inView>
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-500 text-sm">
              <strong>Note:</strong> Device support and feature availability may change with kernel updates. 
              Always check the latest release notes before flashing. If you encounter issues, please report them on our GitHub repository.
            </p>
          </div>
        </BlurFade>
      </div>
    </main>
  )
}
