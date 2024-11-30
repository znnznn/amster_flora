import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    '2xl': '1280px'
                }
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                '4xl': '2rem',
                '3xl': '1.375rem',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                marquee: {
                    from: {
                        transform: 'translateX(0%)'
                    },
                    to: {
                        transform: 'translateX(-100%)'
                    }
                },
                marquee2: {
                    from: {
                        transform: 'translateX(100%)'
                    },
                    to: {
                        transform: 'translateX(0%)'
                    }
                },
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                marquee2: 'marquee2 25s linear infinite',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'spin-slow': 'spin 25s linear infinite'
            }
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1.3rem' }],
            sm: ['0.875rem', { lineHeight: '1.3rem' }],
            base: ['1rem', { lineHeight: '1.25rem' }],
            lg: ['1.125rem', { lineHeight: '1.55rem' }],
            xl: ['1.25rem', { lineHeight: '1.5rem' }],
            '2xl': ['1.375rem', { lineHeight: '1.625rem' }],
            '3xl': ['1.75rem', { lineHeight: '2.125rem' }],
            '4xl': ['2rem', { lineHeight: '2.5rem' }],
            '5xl': ['2.25rem', { lineHeight: '2.75rem' }],
            '6xl': ['2.75rem', { lineHeight: '2.875rem' }],
            '7xl': ['4rem', { lineHeight: '4.375rem' }]
        }
    },
    plugins: [require('tailwindcss-animate')]
}
export default config
