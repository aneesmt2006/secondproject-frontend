/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* =========================================================
         🎨 Your existing named colors (kept intact)
      ========================================================= */
      colors: {
        periwinkle: '#7A77B9',
        lavender: '#A58DB1',
        cocoa: '#5A3C33',
        wine: '#7B2E2F',
        rose: '#D4798B',
        lilac: '#C7A7D1',
        cream: '#F9F0E6',

        /* =========================================================
           💙 Lovable Doctor Theme (HSL variable colors)
           ========================================================= */
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',

        card: 'hsl(var(--card) / <alpha-value>)',
        'card-foreground': 'hsl(var(--card-foreground) / <alpha-value>)',

        popover: 'hsl(var(--popover) / <alpha-value>)',
        'popover-foreground': 'hsl(var(--popover-foreground) / <alpha-value>)',

        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--primary-foreground) / <alpha-value>)',

        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'hsl(var(--secondary-foreground) / <alpha-value>)',

        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',

        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',

        destructive: 'hsl(var(--destructive) / <alpha-value>)',
        'destructive-foreground': 'hsl(var(--destructive-foreground) / <alpha-value>)',

        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',

        /* Doctor theme custom medical colors */
        'medical-success': 'hsl(var(--medical-success) / <alpha-value>)',
        'medical-warning': 'hsl(var(--medical-warning) / <alpha-value>)',
        'medical-info': 'hsl(var(--medical-info) / <alpha-value>)',
      },

      /* =========================================================
         🔲 Border & Radius System
      ========================================================= */
      borderColor: {
        border: 'hsl(var(--border) / <alpha-value>)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) - 2px)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 6px)',
      },

      /* =========================================================
         🪞 Shadows and Fonts
      ========================================================= */
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
       fontFamily: {
        sans: ['"Nunito"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
