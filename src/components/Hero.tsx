'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
  }, [])

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-[100px] pb-20 overflow-hidden bg-white"
    >
      {/* Background Gradient Circles */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-[86px] top-0" width="1250" height="817" viewBox="0 0 1250 817" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.1">
            <g filter="url(#filter0_f_697_3092)">
              <circle cx="892" cy="459" r="358" fill="#3094D6"/>
            </g>
            <g filter="url(#filter1_f_697_3092)">
              <circle cx="264.5" cy="357.5" r="264.5" fill="#2082BE"/>
            </g>
            <g filter="url(#filter2_f_697_3092)">
              <ellipse cx="562.5" cy="336.5" rx="206.5" ry="336.5" fill="white"/>
            </g>
          </g>
          <defs>
            <filter id="filter0_f_697_3092" x="334" y="-99" width="1116" height="1116" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_697_3092"/>
            </filter>
            <filter id="filter1_f_697_3092" x="-100" y="-7" width="729" height="729" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_697_3092"/>
            </filter>
            <filter id="filter2_f_697_3092" x="156" y="-200" width="813" height="1073" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_697_3092"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Image
          src="/grid-pattern.svg"
          alt="Grid Pattern Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Hero Gradient Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/hero-gradient.svg"
          alt="Hero Gradient Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="flex flex-col items-center gap-5 pt-20 max-w-[900px] mx-auto">
          {/* Badge with Star Icon */}
          <div className="inline-flex items-center justify-center gap-[10px] px-5 py-[5px] rounded-[100px] border border-[#DEDEDE] bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.9703 9.47C21.9693 9.69351 21.8984 9.9111 21.7675 10.0922C21.6366 10.2734 21.4522 10.409 21.2403 10.48L19.3603 11.1C18.7701 11.2974 18.234 11.6297 17.7948 12.0707C17.3556 12.5116 17.0253 13.049 16.8303 13.64L16.1803 15.51C16.1056 15.7187 15.9697 15.8999 15.7903 16.03C15.6543 16.1279 15.4971 16.1922 15.3314 16.2176C15.1658 16.243 14.9965 16.2288 14.8375 16.1761C14.6784 16.1234 14.5341 16.0337 14.4164 15.9145C14.2987 15.7952 14.2109 15.6497 14.1603 15.49L13.5303 13.61C13.3271 13.0172 12.9841 12.4821 12.5303 12.05C12.0915 11.5996 11.554 11.2573 10.9603 11.05L9.0803 10.42C8.86741 10.353 8.68141 10.2199 8.5493 10.04C8.4197 9.85736 8.35008 9.63895 8.35008 9.415C8.35008 9.19105 8.4197 8.97264 8.5493 8.79C8.6822 8.60484 8.87174 8.46795 9.0893 8.4L10.9593 7.77C11.5612 7.5676 12.1062 7.22481 12.5493 6.77C12.9993 6.327 13.3423 5.786 13.5493 5.19L14.1693 3.34C14.2279 3.12864 14.3544 2.94241 14.5293 2.81C14.7052 2.66884 14.9237 2.59131 15.1493 2.59C15.3727 2.58462 15.5925 2.6474 15.7793 2.77C15.9693 2.88921 16.1137 3.06883 16.1893 3.28L16.8193 5.19C17.0263 5.786 17.3693 6.327 17.8193 6.77C18.2596 7.22348 18.801 7.56618 19.3993 7.77L21.2693 8.43C21.4798 8.49586 21.6626 8.62946 21.7893 8.81C21.9193 9.004 21.9843 9.235 21.9703 9.47ZM12.1003 16.4C12.0998 16.6039 12.037 16.8028 11.9203 16.97C11.7994 17.1326 11.6321 17.2547 11.4403 17.32L10.0903 17.77C9.71206 17.9034 9.36981 18.1224 9.0903 18.41C8.80541 18.6917 8.58679 19.0333 8.4503 19.41L7.9803 20.75C7.91495 20.9418 7.79289 21.1092 7.6303 21.23C7.46191 21.3483 7.26111 21.4118 7.0553 21.4118C6.84948 21.4118 6.64868 21.3483 6.4803 21.23C6.3177 21.1092 6.19565 20.9418 6.1303 20.75L5.6903 19.41C5.55351 19.0332 5.33454 18.6916 5.0493 18.41C4.76758 18.1251 4.42599 17.9065 4.0493 17.77L2.6993 17.33C2.50622 17.262 2.33868 17.1363 2.2193 16.97C2.09903 16.804 2.0327 16.605 2.0293 16.4C2.0329 16.1938 2.10018 15.9937 2.22191 15.8272C2.34365 15.6607 2.51388 15.536 2.7093 15.47L4.0493 15.03C4.42461 14.8908 4.76545 14.6722 5.04849 14.3892C5.33154 14.1062 5.55012 13.7653 5.6893 13.39L6.1393 12.07C6.19923 11.8808 6.3141 11.7137 6.4693 11.59C6.63154 11.4664 6.8277 11.3954 7.03147 11.3864C7.23523 11.3775 7.43685 11.4311 7.6093 11.54C7.7803 11.658 7.9123 11.825 7.9893 12.02L8.4393 13.39C8.57847 13.7653 8.79705 14.1062 9.0801 14.3892C9.36315 14.6722 9.70398 14.8908 10.0793 15.03L11.4193 15.5C11.6106 15.561 11.7761 15.6842 11.8893 15.85C12.0164 16.0061 12.09 16.1989 12.0993 16.4" fill="#FFC107"/>
            </svg>
            <span className="font-plus-jakarta text-xs font-normal text-[#4C5C6E]">Bantu bisnis Anda dengan AI + Teknologi</span>
          </div>

          {/* Main Heading */}
          <h1 
            ref={titleRef}
            className="font-figtree text-4xl w-[810px] md:text-[64px] font-semibold leading-normal text-center text-[#4C5C6E]"
          >
            Transformasi Digital untuk{' '}
            <span className="text-[#47A6F1]">Bisnis</span> dan{' '}
            <span className="text-[#47A6F1]">Institusi Anda</span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="font-plus-jakarta text-base font-normal max-w-[740px] leading-[150%] text-center text-[#4C5C6E]"
          >
            Kami menghadirkan solusi ICT terintegrasi untuk korporasi, pemerintahan, dan pendidikan guna meningkatkan efisiensi operasional serta mendorong inovasi berkelanjutan di era Industri 4.0.
          </p>

          {/* Service Cards */}
          <div className="flex flex-wrap items-center w-[900px] justify-center gap-[7px] w-full mt-5">
            <div className="flex w-[210px] flex-col items-center justify-center gap-[10px] px-5 py-5 rounded-[20px] border border-[#DEDEDE] bg-white">
              <p className="font-plus-jakarta text-base font-light leading-[150%] text-center text-black">
                AI & Robotic Process<br />Automation
              </p>
            </div>

            <div className="flex w-[210px] flex-col items-center justify-center gap-[10px] px-5 py-5 rounded-[20px] border border-[#DEDEDE] bg-white">
              <p className="font-plus-jakarta text-base font-light leading-[150%] text-center text-black">
                Learning<br />Management System
              </p>
            </div>

            <div className="flex w-[210px] flex-col items-center justify-center gap-[10px] px-5 py-5 rounded-[20px] border border-[#DEDEDE] bg-white">
              <p className="font-plus-jakarta text-base font-light leading-[150%] text-center text-black">
                Payment Solution Platform
              </p>
            </div>

            <div className="flex w-[210px] flex-col items-center justify-center gap-[10px] px-5 py-5 rounded-[20px] border border-[#DEDEDE] bg-white">
              <p className="font-plus-jakarta text-base font-light leading-[150%] text-center text-black">
                Development<br />Software
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className="mt-[54px] mx-auto max-w-[1280px]">
          <div className="w-full h-0 pb-[56.25%] relative rounded-[40px] border-2 border-white shadow-[0_23px_34px_0_rgba(32,130,190,0.21)] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-plus-jakarta text-sm">Video Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
