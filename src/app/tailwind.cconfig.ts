// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                brandBg: '#1A0B3D',
                brandPrimary: '#6d28d9',
                linkActive: '#22d3ee',
                linkInactive: '#d1d5db',
                borderDivider: 'rgba(255, 255, 255, 0.08)'
            }
        },
    },
    plugins: [],
}
