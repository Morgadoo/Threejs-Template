import './globals.css'

export const metadata = {
  title: 'Three.js - Template',
  description: 'Simple Template for Three.js with Next.js and React Three Fiber',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
