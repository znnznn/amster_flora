'use client'

import { motion, useAnimation, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

import bouquet from '@/assets/images/home/bouqet.png'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { H2 } from '@/components/ui/typography'
import { Link } from '@/i18n/routing'

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
    hidden: { opacity: 0, x: 400, y: '-50%' }
}

export const Bouquets = () => {
    const t = useTranslations('HomePage')
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
            <Section
                ref={ref}
                className='mt-32 pr-20 max-sm:pr-4'
            >
                <div className='relative rounded-lg border p-8 max-md:p-4'>
                    <motion.div
                        animate={controls}
                        initial='hidden'
                        variants={textVariants}
                        className='flex flex-col items-start gap-y-7'
                    >
                        <H2>{t('Bouquets.Title')}</H2>
                        <p className='max-w-[500px] font-medium max-lg:max-w-[400px]'>
                            {t('Bouquets.Desctiption')}
                        </p>
                        <Link href='/catalogue'>
                            <Button variant='accent'>{t('Bouquets.Button')}</Button>
                        </Link>
                    </motion.div>
                    <motion.div
                        animate={controls}
                        initial='hidden'
                        variants={squareVariants}
                        className='absolute -right-14 top-1/2 z-10 size-96 -translate-y-1/2 rounded-full bg-accent max-lg:size-72 max-md:size-52 max-sm:hidden'
                    >
                        <motion.img
                            animate={controls}
                            initial='hidden'
                            variants={imageVariants}
                            className='absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 max-lg:size-96 max-md:size-64 max-sm:size-48'
                            src={bouquet.src}
                            alt={t('Bouquets.Title')}
                        />
                    </motion.div>
                </div>
            </Section>
        </div>
    )
}
