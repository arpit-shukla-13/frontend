import React from 'react'
import { Link } from 'react-router-dom'

function Adminhero() {
  return (
    <>
    <div class="bg-white pb-6 sm:pb-8 lg:pb-12">
    <div class="mx-auto mt-4 max-w-screen-2xl px-4 md:px-8">
    
    <section class="min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
      {/* <!-- image - start --> */}
      <img src="https://img.freepik.com/free-photo/front-view-stacked-books-earth-globe-education-day_23-2149241010.jpg?t=st=1716059520~exp=1716063120~hmac=f19aed740b04bd0cc3065fa6c06aca9a23ff3e455965a14107a53eb59a4fe5e5&w=996"  alt="by Fakurian Design" className="transition duration-200 group-hover:scale-110  absolute  inset-0 h-full w-full object-cover object-center" />
      {/* <!-- image - end -->

      <!-- overlay - start --> */}
      <div class="absolute inset-0 opacity-50 bg-cyan-700 mix-blend-multiply"></div>
      {/* <!-- overlay - end -->

      <!-- text start --> */}
      <div class="relative flex flex-col items-center p-4 sm:max-w-xl">
        <p class="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">NOTES-HUB</p>
        <h1 class="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">Online Sharing & Learning</h1>

        <div class="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Start now</Link>

          <Link className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Take tour</Link>
        </div>
      </div>
      {/* <!-- text end --> */}
    </section>
    
    </div>
    </div>
    </>
  )
}

export default Adminhero
