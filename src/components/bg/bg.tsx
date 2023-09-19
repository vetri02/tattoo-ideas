import * as React from "react"

const Bg = (props: any) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 1440 560"
    {...props}
  >
    <g mask='url("#SvgjsMask1254")' fill="none">
      <path fill='url("#SvgjsLinearGradient1255")' d="M0 0H1440V560H0z" />
      <path d="M1440 0h-.32l.32 5.91z" fill="rgba(255, 255, 255, .1)" />
      <path
        d="M1439.68 0l.32 5.91v302.23L861.79 0z"
        fill="rgba(255, 255, 255, .075)"
      />
      <path
        d="M861.79 0L1440 308.14v107.15L333.73 0z"
        fill="rgba(255, 255, 255, .05)"
      />
      <path
        d="M333.73 0L1440 415.29v4.28L249.83 0z"
        fill="rgba(255, 255, 255, .025)"
      />
      <path d="M0 560h611.04L0 444.61z" fill="rgba(0, 0, 0, .1)" />
      <path
        d="M0 444.61L611.04 560h277.39L0 235.88z"
        fill="rgba(0, 0, 0, .075)"
      />
      <path
        d="M0 235.88L888.43 560h226.91L0 188.27z"
        fill="rgba(0, 0, 0, .05)"
      />
      <path
        d="M0 188.27L1115.34 560h13.13L0 108.05z"
        fill="rgba(0, 0, 0, .025)"
      />
    </g>
    <defs>
      <mask id="SvgjsMask1254">
        <path fill="#fff" d="M0 0H1440V560H0z" />
      </mask>
      <linearGradient
        x1="15.28%"
        y1="-39.29%"
        x2="84.72%"
        y2="139.29%"
        gradientUnits="userSpaceOnUse"
        id="SvgjsLinearGradient1255"
      >
        <stop stopColor="rgba(34, 34, 34, 1)" offset={0} />
        <stop stopColor="rgba(0, 0, 0, 1)" offset={1} />
      </linearGradient>
    </defs>
  </svg>
  )
}

export default Bg