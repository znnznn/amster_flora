'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import flowerpot from '@/assets/images/flowerpot.png'
import { Button } from '@/components/ui/button'

const textVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    hidden: { opacity: 0, y: 200 }
}

const squareVariants = {
    visible: {
        opacity: 1,
        scale: 1,
        y: '-50%',
        transition: { duration: 0.7 }
    },
    hidden: { opacity: 0, scale: 0.7, y: '-50%' }
}

const imageVariants = {
    visible: { opacity: 1, x: '-50%', y: '-50%', transition: { duration: 0.7 } },
    hidden: { opacity: 0, x: -400, y: '-50%' }
}

export const Flowerpots = () => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [controls, isInView])

    return (
        <div className='overflow-x-clip'>
            <section
                ref={ref}
                className='container mt-32 pl-20 max-md:mt-20 max-sm:mt-12 max-sm:pl-4'>
                <div className='relative flex justify-end rounded-lg border p-8 max-md:p-4 max-sm:justify-start'>
                    <motion.div
                        animate={controls}
                        initial='hidden'
                        variants={textVariants}
                        className='flex flex-col items-start gap-y-7'>
                        <h2 className='text-2xl font-semibold max-md:text-lg'>Вазони</h2>
                        <p className='max-w-[500px] font-medium max-lg:max-w-[370px]'>
                            Наші букети народжуються з ретельно відібраних квітів, які
                            приїжджають до вас з найкращих квіткових плантацій світу, щоб
                            стати частиною ваших особливих моментів.
                        </p>
                        <Link href='/catalogue'>
                            <Button
                                size='lg'
                                variant='secondary'>
                                До каталогу
                            </Button>
                        </Link>
                    </motion.div>
                    <motion.div
                        animate={controls}
                        initial='hidden'
                        variants={squareVariants}
                        className='absolute -left-14 top-1/2 z-10 size-96 -translate-y-1/2 rounded-full bg-accent max-lg:size-72 max-md:size-52 max-sm:hidden'>
                        <motion.img
                            animate={controls}
                            initial='hidden'
                            variants={imageVariants}
                            className='absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 max-lg:size-96 max-md:size-64 max-sm:size-48'
                            src={flowerpot.src}
                            alt='flower pot'
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
