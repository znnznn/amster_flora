'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
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
        <section
            ref={ref}
            className='mt-72 pl-32 pr-20'>
            <div className='relative flex justify-end rounded-lg border px-4 py-8'>
                <motion.div
                    animate={controls}
                    initial='hidden'
                    variants={textVariants}
                    className='flex flex-col items-start gap-y-7'>
                    <h2 className='text-[28px] font-semibold'>Вазони</h2>
                    <p className='max-w-[500px] font-medium'>
                        Наші букети народжуються з ретельно відібраних квітів, які
                        приїжджають до вас з найкращих квіткових плантацій світу, щоб
                        стати частиною ваших особливих моментів.
                    </p>
                    <Button
                        size='lg'
                        variant='secondary'>
                        До каталогу
                    </Button>
                </motion.div>
                <motion.div
                    animate={controls}
                    initial='hidden'
                    variants={squareVariants}
                    className='absolute -left-16 top-1/2 z-10 size-96 -translate-y-1/2 rounded-full bg-accent'>
                    <motion.img
                        animate={controls}
                        initial='hidden'
                        variants={imageVariants}
                        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                        src={flowerpot.src}
                        alt='flower pot'
                    />
                </motion.div>
            </div>
        </section>
    )
}
