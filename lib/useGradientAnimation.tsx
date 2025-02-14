'use client'
import { useEffect, useState } from "react"

export const useGradientAnimation = () => {
  const [gradientStyle, setGradientStyle] = useState({})

  useEffect(() => {
    setGradientStyle({
      backgroundSize: "400% 400%",
      backgroundImage: "linear-gradient(-45deg, #ff3d00, #0400ff, #4dd0e1, #9c27b0)",
      animation: "gradientBackground 15s ease infinite",
    })
  }, [])

  return gradientStyle
}

