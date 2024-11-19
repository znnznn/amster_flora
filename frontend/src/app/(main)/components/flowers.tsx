import Image from 'next/image'

import flowerpot from '@/assets/images/flowerpot.jpg'
import h from '@/assets/images/h.jpg'
import orchid from '@/assets/images/orchid.jpg'
import pion from '@/assets/images/pion.jpg'
import rose from '@/assets/images/rose.jpg'
import tulpin from '@/assets/images/tulpin.jpg'

export const Flowers = () => {
    return (
        <section className='mt-48 px-20 max-md:mt-16 max-md:px-16 max-sm:mt-10 max-sm:px-3'>
            <h2 className='sr-only text-center text-[28px] font-bold'>Квіти</h2>

            <div className='grid h-[600px] w-full grid-cols-3 grid-rows-2 gap-5 text-right text-[28px] font-semibold leading-none max-md:grid-cols-2 max-md:gap-x-6 max-md:gap-y-10 max-sm:grid-cols-1 max-sm:gap-x-4 max-sm:gap-y-8'>
                <div className='group relative size-full cursor-pointer overflow-hidden rounded-[22px] bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-accent'>Троянда</h3>
                    <Image
                        src={rose}
                        alt='Троянда'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative size-full cursor-pointer overflow-hidden rounded-[22px] bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-primary'>Тюльпан</h3>
                    <Image
                        src={tulpin}
                        alt='Тюльпан'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative size-full cursor-pointer overflow-hidden rounded-[22px] bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-accent'>
                        Хризантема
                    </h3>
                    <Image
                        src={h}
                        alt='Хризантема'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative size-full cursor-pointer overflow-hidden rounded-[22px] bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-primary'>Вазони</h3>
                    <Image
                        src={flowerpot}
                        alt='Вазони'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative size-full cursor-pointer overflow-hidden rounded-[22px] bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-accent'>Орхідея</h3>
                    <Image
                        src={orchid}
                        alt='Орхідея'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative size-full cursor-pointer overflow-hidden rounded-[22px] bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-primary'>Півонії</h3>
                    <Image
                        src={pion}
                        alt='Півонії'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
            </div>
        </section>
    )
}
