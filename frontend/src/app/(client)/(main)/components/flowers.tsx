import Image from 'next/image'

import flowerpot from '@/assets/images/flowerpot.jpg'
import h from '@/assets/images/h.jpg'
import orchid from '@/assets/images/orchid.jpg'
import pion from '@/assets/images/pion.jpg'
import rose from '@/assets/images/rose.jpg'
import tulpin from '@/assets/images/tulpin.jpg'

export const Flowers = () => {
    return (
        <section className='container mt-48 max-md:mt-16'>
            <h2 className='sr-only text-center text-2xl font-bold max-md:text-lg'>
                Квіти
            </h2>

            <div className='grid w-full grid-cols-3 gap-5 text-right text-2xl font-semibold leading-none max-md:grid-cols-2 max-md:gap-3 max-md:text-lg'>
                <div className='group relative cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-accent'>Троянда</h3>
                    <Image
                        src={rose}
                        alt='Троянда'
                        className='aspect-video size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-primary'>Тюльпан</h3>
                    <Image
                        src={tulpin}
                        alt='Тюльпан'
                        className='aspect-square size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-accent'>
                        Хризантема
                    </h3>
                    <Image
                        src={h}
                        alt='Хризантема'
                        className='size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-primary'>Вазони</h3>
                    <Image
                        src={flowerpot}
                        alt='Вазони'
                        className='aspect-square size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-accent'>Орхідея</h3>
                    <Image
                        src={orchid}
                        alt='Орхідея'
                        className='aspect-video size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
                <div className='group relative cursor-pointer overflow-hidden rounded-3xl bg-primary'>
                    <h3 className='absolute right-5 top-5 z-10 text-primary'>Півонії</h3>
                    <Image
                        src={pion}
                        alt='Півонії'
                        className='aspect-square size-full origin-top-left object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                </div>
            </div>
        </section>
    )
}
