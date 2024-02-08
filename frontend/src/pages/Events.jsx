import React from 'react'
import UserHeader from '../components/headers/UserHeader'
import { Pagination,Button } from '@mui/material'

function Events() {
  return (

        <>
            <UserHeader/>
                    <div class="bg-white">
                            <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                                <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                                    <h1 class="text-2xl font-bold tracking-tight text-gray-900">Event Listing</h1>

                                    <div class="flex items-center">
                                        <div class="relative inline-block text-left">
                                            <div>
                                                <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                                    Sort
                                                    <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>


                                            {/* <div class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                                <div class="py-1" role="none">

                                                    <a href="#" class="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Most Popular</a>
                                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Best Rating</a>
                                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Newest</a>
                                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Price: Low to High</a>
                                                    <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Price: High to Low</a>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <section aria-labelledby="products-heading" class="pb-24 pt-6">
                                    <h2 id="products-heading" class="sr-only">Products</h2>

                                    <div class="flex justify-between">

                                        <form class="large:block me-20 ms-10 sm:min-w-[200px]">

                                            <div class="border-b border-gray-200 py-6">
                                                <h3 class="-my-3 flow-root">

                                                    <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Status</span>
                                                    <span class="ml-6 flex items-center">

                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>

                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    </button>
                                                </h3>

                                                <div class="pt-6" id="filter-section-0">
                                                    <div class="space-y-4">
                                                        <div class="flex items-center">
                                                            <input id="filter-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-0" class="ml-3 text-sm text-gray-600">Live</label>
                                                        </div>
                                                        <div class="flex items-center">
                                                            <input id="filter-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-1" class="ml-3 text-sm text-gray-600">Organizing</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="border-b border-gray-200 py-6">
                                                <h3 class="-my-3 flow-root">

                                                    <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Genre</span>
                                                    <span class="ml-6 flex items-center">

                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>

                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    </button>
                                                </h3>

                                                <div class="pt-6" id="filter-section-0">
                                                    <div class="space-y-4">
                                                        <div class="flex items-center">
                                                            <input id="filter-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-0" class="ml-3 text-sm text-gray-600">Comedy</label>
                                                        </div>
                                                        <div class="flex items-center">
                                                            <input id="filter-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-1" class="ml-3 text-sm text-gray-600">Workshop</label>
                                                        </div>
                                                        <div class="flex items-center">
                                                            <input id="filter-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-1" class="ml-3 text-sm text-gray-600">Music</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            

                                            <div class="border-b border-gray-200 py-6">
                                                <h3 class="-my-3 flow-root">

                                                    <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                                    <span class="font-medium text-gray-900">Content Type</span>
                                                    <span class="ml-6 flex items-center">

                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>

                                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    </button>
                                                </h3>

                                                <div class="pt-6" id="filter-section-0">
                                                    <div class="space-y-4">
                                                        <div class="flex items-center">
                                                            <input id="filter-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-0" class="ml-3 text-sm text-gray-600">Free</label>
                                                        </div>
                                                        <div class="flex items-center">
                                                            <input id="filter-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                            <label for="filter-color-1" class="ml-3 text-sm text-gray-600">Paid</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        

                                        <div class="lg:col-span-3">
                                            <section className="py-10 bg-gray-100 sm:py-10 rounded">
                                                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                                                    <div className="flex items-end justify-between">

                                                        <div className="hidden lg:flex lg:items-center lg:space-x-3">
                                                            {/* Implement Search */}
                                                        </div>
                                                    </div>

                                                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto lg:grid-cols-1 lg:max-w-full">
                                                        <div className="overflow-hidden bg-white rounded shadow">
                                                            <div className="px-5 sm:flex mx-auto">
                                                                <div className="relative my-auto">
                                                                    <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                                                                        <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg" alt="" />
                                                                    </a>

                                                                    <div className="absolute top-4 left-4">
                                                                        <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Lifestyle </span>
                                                                    </div>
                                                                </div>
                                                                <div className='sm:p-5 sm:ms-5'>
                                                                <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> April 04, 2020 </span>
                                                                    <p className="mt-5 text-2xl font-semibold">
                                                                        <a href="#" title="" className="text-black"> How to build coffee inside your home in 5 minutes. </a>
                                                                    </p>
                                                                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                                                    <a href="#" title="" className="inline-flex items-center justify-center pb-5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                                                                        Continue Reading
                                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                                        </svg>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="overflow-hidden bg-white rounded shadow">
                                                            <div className="px-5 sm:flex mx-auto">
                                                                <div className="relative my-auto">
                                                                    <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                                                                        <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg" alt="" />
                                                                    </a>

                                                                    <div className="absolute top-4 left-4">
                                                                        <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Lifestyle </span>
                                                                    </div>
                                                                </div>
                                                                <div className='sm:p-5 sm:ms-5'>
                                                                <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> April 04, 2020 </span>
                                                                    <p className="mt-5 text-2xl font-semibold">
                                                                        <a href="#" title="" className="text-black"> How to build coffee inside your home in 5 minutes. </a>
                                                                    </p>
                                                                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                                                    <a href="#" title="" className="inline-flex items-center justify-center pb-5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                                                                        Continue Reading
                                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                                        </svg>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="overflow-hidden bg-white rounded shadow">
                                                            <div className="px-5 sm:flex mx-auto">
                                                                <div className="relative my-auto">
                                                                    <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                                                                        <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg" alt="" />
                                                                    </a>

                                                                    <div className="absolute top-4 left-4">
                                                                        <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Lifestyle </span>
                                                                    </div>
                                                                </div>
                                                                <div className='sm:p-5 sm:ms-5'>
                                                                <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> April 04, 2020 </span>
                                                                    <p className="mt-5 text-2xl font-semibold">
                                                                        <a href="#" title="" className="text-black"> How to build coffee inside your home in 5 minutes. </a>
                                                                    </p>
                                                                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                                                    <a href="#" title="" className="inline-flex items-center justify-center pb-5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                                                                        Continue Reading
                                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                                        </svg>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        

                                                        
                                                    </div>

                                                    <div className='flex justify-center mt-10'>
                                                        <Pagination/>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        


                                    </div>
                                </section>
                            </main>                       
                    </div>




                                    
        </>
  )
}

export default Events