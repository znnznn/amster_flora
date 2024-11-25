'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import story from '@/assets/images/story.jpg'
import { Button } from '@/components/ui/button'

const imageVariants = {
    visible: { x: 0, y: '-50%', transition: { duration: 0.7 } },
    hidden: { x: '-100%', y: '-50%' }
}

export const Story = () => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [controls, isInView])

    return (
        <section
            ref={ref}
            className='mt-48 bg-primary py-6 max-md:mt-24'>
           <div className='relative container pl-0 ml-0 flex h-[460px] justify-end 2xl:pl-4 2xl:!ml-auto'>
           <motion.img
                animate={controls}
                initial='hidden'
                variants={imageVariants}
                className='absolute left-0 max-lg:-left-24 top-1/2 max-lg:-translate-y-0 max-lg:top-20 size-[540px] max-xl:size-[470px] max-lg:size-[370px] max-md:size-80 max-sm:size-64 -translate-y-1/2 rounded-r-[22px] object-cover'
                src={story.src}
                alt='Історія'
            />
             <div className='size-full flex flex-col items-start justify-end'>
          <p className='text-background hidden max-md:block max-sm:max-w-52 pl-5'>
            З часом, завдяки вашій довірі
                    та підтримці, ми виросли в повноцінний магазин, де кожна квітка
                    обирається з турботою та увагою.
            </p>
          </div>
           <div className='flex justify-end w-full'>

           <p className='text-background hidden max-md:block  max-sm:max-w-52'>
                    Наш магазин квітів заснований з любов'ю до краси природи та бажанням
                    дарувати радість людям. Все почалося з маленької майстерні, де ми
                    створювали букети для друзів і знайомих.
            </p>
           </div>
            <div className='flex max-w-[460px] max-lg:max-w-[400px] flex-col items-start gap-y-6 max-md:hidden'>
                <h2 className='text-[28px] text-accent max-md:text-lg'>Історія</h2>
                <p className='text-background'>
                    Наш магазин квітів заснований з любов'ю до краси природи та бажанням
                    дарувати радість людям. Все почалося з маленької майстерні, де ми
                    створювали букети для друзів і знайомих. З часом, завдяки вашій довірі
                    та підтримці, ми виросли в повноцінний магазин, де кожна квітка
                    обирається з турботою та увагою.
                </p>
                <Link  href='/story'>
                    <Button
                        variant='secondary'
                        size='lg'>
                        Про нас
                    </Button>
                </Link>
            </div>

            <AboutUsButton />
           </div>
        </section>
    )
}

const AboutUsButton = () => {
    const text = 'про нас про нас про нас про нас'

    return (
        <Link
            href='/story'
            className='absolute bottom-4 right-12 size-52 max-lg:size-40 max-md:size-32 rounded-full transition-transform hover:rotate-45 hover:scale-90'>
            <svg
                className='h-full w-full animate-spin-slow rounded-full'
                viewBox='0 0 100 100'>
                <path
                    id='circlePath'
                    d='M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0'
                    fill='none'
                />
                <text className='fill-accent text-[11.5px] font-bold'>
                    <textPath
                        href='#circlePath'
                        startOffset='0%'>
                        {text.split(' ').join('\u00A0\u00A0')}
                    </textPath>
                </text>
            </svg>
            <div className='absolute inset-5 flex cursor-pointer items-center justify-center rounded-full'>
                <MoveUpRight className='size-20 text-accent' />
            </div>
        </Link>
    )
}
