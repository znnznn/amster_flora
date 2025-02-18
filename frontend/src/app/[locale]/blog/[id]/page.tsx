import { PageHeader } from '@/components/ui/page-header'
import { Section } from '@/components/ui/section'
import type { IdParams } from '@/types/params'

export const generateMetadata = async ({ params }: IdParams) => {
    const { id } = await params
    return {
        title: id
    }
}

const BlogPostPage = async ({ params }: IdParams) => {
    const { id } = await params

    console.log(id)

    return (
        <Section className='lg:mt-16'>
            <PageHeader
                breadcrumbKeys={[
                    {
                        key: 'blog'
                    }
                ]}
            />
            <article className='mt-6 space-y-6 md:mt-12'>
                <header className='mb-8'>
                    <h1 className='text-3xl mb-4 font-bold'>
                        Квіти: Різноманіття і Догляд за Красою Природи
                    </h1>
                    <p className='italic text-gray-600'>
                        Ця стаття розповість про різноманітні види квітів, їх унікальні
                        характеристики та поради з догляду, щоб ваша садиба завжди була
                        сповнена яскравих кольорів і приємних ароматів.
                    </p>
                </header>

                <section className='mb-8'>
                    <p className='mb-4'>
                        Квіти завжди були символом краси, радості та гармонії. Вони
                        прикрашають наші сади, домівки та життя, даруючи приємні емоції і
                        створюючи атмосферу затишку. Кожна квітка унікальна і має свої
                        особливості.
                    </p>
                </section>

                <section className='mb-8'>
                    <h2 className='mb-4 text-2xl font-bold'>Різноманіття Видів Квітів</h2>

                    <div className='space-y-4'>
                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>1. Троянди</h3>
                            <p>
                                Троянди – королеви квітів. Вони вражають своєю
                                елегантністю та багатством кольорів. Існує безліч сортів
                                троянд, кожен з яких має свій неповторний аромат і
                                зовнішній вигляд.
                            </p>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>2. Лілії</h3>
                            <p>
                                Лілії – символ чистоти і величі. Вони відомі своїми
                                великими квітками і приємним ароматом. Лілії часто
                                використовують в букетах і садових композиціях.
                            </p>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>3. Тюльпани</h3>
                            <p>
                                Тюльпани – яскраві весняні квіти, які додають кольору і
                                радості після зими. Вони мають безліч відтінків і форм, що
                                робить їх універсальними для будь-якого саду.
                            </p>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>4. Орхідеї</h3>
                            <p>
                                Орхідеї – екзотичні і витончені квіти, які потребують
                                особливого догляду. Вони часто використовуються як
                                декоративні рослини у приміщеннях.
                            </p>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>5. Ромашки</h3>
                            <p>
                                Ромашки – символ простоти і невинності. Вони додають
                                легкості і свіжості будь-якому саду.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='mb-8'>
                    <h2 className='mb-4 text-2xl font-bold'>Характеристики Квітів</h2>
                    <p>
                        Кожна квітка має свої унікальні характеристики, які визначають її
                        догляд та умови вирощування. Наприклад, троянди потребують
                        сонячного місця і регулярного поливу, тоді як орхідеї потребують
                        більш високої вологості і помірного світла.
                    </p>
                </section>

                <section className='mb-8'>
                    <h2 className='mb-4 text-2xl font-bold'>
                        Поради з Догляду за Квітами
                    </h2>
                    <div className='space-y-6'>
                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>
                                1. Правильний Полив
                            </h3>
                            <ul className='list-disc space-y-2 pl-6'>
                                <li>
                                    Поливайте квіти вранці або ввечері, щоб уникнути
                                    випаровування води під час спекотного дня.
                                </li>
                                <li>
                                    Не перезволожуйте грунт, адже це може призвести до
                                    загнивання коріння.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>2. Добрива</h3>
                            <ul className='list-disc space-y-2 pl-6'>
                                <li>
                                    Використовуйте органічні або спеціальні добрива для
                                    квітів відповідно до їх потреб.
                                </li>
                                <li>
                                    Дотримуйтесь інструкцій щодо дозування, щоб уникнути
                                    надлишку мінералів.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>3. Світло</h3>
                            <p>
                                Розміщуйте квіти в місцях з відповідним освітленням: деякі
                                квіти потребують прямого сонячного світла, інші – півтінь
                                або навіть тінь.
                            </p>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>
                                4. Обрізка і Формування
                            </h3>
                            <ul className='list-disc space-y-2 pl-6'>
                                <li>
                                    Регулярно обрізайте відцвілі квіти та сухі листя, щоб
                                    стимулювати новий ріст.
                                </li>
                                <li>
                                    Формуйте кущі та інші рослини для кращого зовнішнього
                                    вигляду і здоров'я.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className='mb-2 text-xl font-semibold'>
                                5. Захист від Шкідників
                            </h3>
                            <ul className='list-disc space-y-2 pl-6'>
                                <li>
                                    Використовуйте натуральні або хімічні засоби для
                                    захисту рослин від комах та хвороб.
                                </li>
                                <li>
                                    Регулярно оглядайте квіти на наявність шкідників і
                                    вживайте заходів при перших ознаках зараження.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className='mb-4 text-2xl font-bold'>Висновок</h2>
                    <p>
                        Догляд за квітами – це не тільки приємне хобі, але й відповідальне
                        завдання, яке потребує певних знань і навичок. Дотримуючись
                        простих порад і приділяючи достатньо уваги своїм зеленим друзям,
                        ви зможете створити справжній квітковий рай у себе вдома або в
                        саду. Квіти віддячать вам своїм цвітінням і ароматом, наповнюючи
                        життя красою і гармонією.
                    </p>
                </section>
            </article>
        </Section>
    )
}

export default BlogPostPage
