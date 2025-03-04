import { MapIframe } from '@/components/map-iframe'
import { Section } from '@/components/ui/section'

export const Map = () => {
    return (
        <Section>
            <MapIframe className='mt-14 h-96 w-full rounded-3xl' />
        </Section>
    )
}
