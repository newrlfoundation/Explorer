import '../styles/globals.css'
import Navbar from './navbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css" />
      </head>
      <body className='bg-slate-100'>
        <Navbar />
        {children}
        <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
      </body>
    </html>
  )
}
