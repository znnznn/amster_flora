'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import story from '@/assets/images/story.jpg'
import { Button } from '@/components/ui/button'

const imageVariants = {
    visible: { opacity: 1, x: 0, y: '-50%', transition: { duration: 0.7 } },
    hidden: { opacity: 0, x: -400, y: '-50%' }
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
            className='relative mt-48 flex h-[460px] justify-end bg-primary px-20 py-6 max-md:mt-24 max-md:px-16 max-sm:mt-10 max-sm:px-6'>
            <motion.img
                animate={controls}
                initial='hidden'
                variants={imageVariants}
                className='absolute left-0 top-1/2 -translate-y-1/2 rounded-r-[22px] object-cover'
                src={story.src}
                alt='Історія'
            />
            <div className='flex max-w-[600px] flex-col items-start gap-y-6'>
                <h2 className='text-[28px] text-accent'>Історія</h2>
                <p className='text-background'>
                    Наш магазин квітів заснований з любов'ю до краси природи та бажанням
                    дарувати радість людям. Все почалося з маленької майстерні, де ми
                    створювали букети для друзів і знайомих. З часом, завдяки вашій довірі
                    та підтримці, ми виросли в повноцінний магазин, де кожна квітка
                    обирається з турботою та увагою.
                </p>
                <Link href='/story'>
                    <Button
                        variant='secondary'
                        size='lg'>
                        Про нас
                    </Button>
                </Link>
            </div>
            <AboutUsButton />
        </section>
    )
}

const AboutUsButton = () => {
    const text = 'про нас про нас про нас про нас'

    return (
        <Link
            href='/story'
            className='absolute bottom-4 right-12 size-52 rounded-full transition-transform hover:rotate-45 hover:scale-90'>
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
