import type { Config } from "tailwindcss";

const spacing = {
    none: "0",      // 0px
    xs: "0.25rem", // 4px
    sm: "0.5rem",   // 8px
    md: "1rem",     // 16px
    lg: "2rem",     // 32px
    xl: "3rem",     // 48px
    "2xl": "4rem",  // 64px
    "3xl": "6rem",  // 96px
    full: "100%",   // 100%
    auto: "auto",   // auto
};

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        dropShadow: {
            "1": "0 0 0.3rem #ffffff70",
        },
        colors: {
            "dark-1": "#00161F",
            "dark-2": "#1C3A47",
            primary: "#8ECAE6",
            secondary: "#195571",
            accent: "#FAB300",
            error: "#FF0E0E",
            success: "#3AFF13",
            white: "#FFFFFF",
            warning: "#FFFFFF",
            light: "#EAE9FC",
            gray: "#333333",
            "gray-2": "#D9D9D9",
            "t-secondary": "#050316",
            "transparent": "transparent",
            "green-board": "#427119",
            "green-hover": "#6B7119",
        },
        borderRadius: {
            none: "0",
            "base": "0.25rem",
            "full": "100%",
        },
        
        padding: spacing,
        margin: spacing,
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "fade-out-up": {
                    "0%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                    "100%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                },
            },
            animation: {
                "fade-in-down": "fade-in-down 0.5s ease-out",
                "fade-out-up": "fade-out-up 0.5s ease-out",
            },
            spacing,
            screens: {
                "board": "398px",
            }
        },
    },
    plugins: [],
};
export default config;
