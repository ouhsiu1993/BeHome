import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BEHOME Whole Climate | 讓建築與自然同步呼吸',
  description: '我們不只是提供設備，更是在為您打造一種「空氣的解決方案」。結合綠能、對流與除濕技術，重塑您對舒適生活的想像。',
  keywords: '空氣解決方案, 被動式通風, 新風系統, 輻射冷暖, 綠能建築',
  openGraph: {
    title: 'BEHOME Whole Climate',
    description: '讓建築與自然同步呼吸',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
