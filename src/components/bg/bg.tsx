import * as React from "react"

const Bg = (props: any) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 1440 560"
    {...props}
  >
    <g mask='url("#SvgjsMask1225")' fill="none">
      <path fill='url("#SvgjsLinearGradient1226")' d="M0 0H1440V560H0z" />
      <path d="M1440 0h-293.05L1440 7.46z" fill="rgba(255, 255, 255, .1)" />
      <path
        d="M1146.95 0L1440 7.46v62.1L562.18 0z"
        fill="rgba(255, 255, 255, .075)"
      />
      <path
        d="M562.18 0L1440 69.56v264.52L456.7 0z"
        fill="rgba(255, 255, 255, .05)"
      />
      <path
        d="M456.7 0L1440 334.08v66.86L210.27 0z"
        fill="rgba(255, 255, 255, .025)"
      />
      <path d="M0 560h66.31L0 308.08z" fill="rgba(0, 0, 0, .1)" />
      <path
        d="M0 308.08L66.31 560h147.54L0 155.81z"
        fill="rgba(0, 0, 0, .075)"
      />
      <path
        d="M0 155.81L213.85 560h326.31L0 109.7z"
        fill="rgba(0, 0, 0, .05)"
      />
      <path
        d="M0 109.7L540.16 560h575.09L0 65.09z"
        fill="rgba(0, 0, 0, .025)"
      />
    </g>
    <defs>
      <mask id="SvgjsMask1225">
        <path fill="#fff" d="M0 0H1440V560H0z" />
      </mask>
      <linearGradient
        x1="15.28%"
        y1="-39.29%"
        x2="84.72%"
        y2="139.29%"
        gradientUnits="userSpaceOnUse"
        id="SvgjsLinearGradient1226"
      >
        <stop stopColor="rgba(3, 7, 18, 1)" offset={0} />
        <stop stopColor="rgba(3, 7, 18, 1)" offset={1} />
      </linearGradient>
    </defs>
  </svg>
  )
}

export default Bg