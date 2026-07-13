import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// biome-ignore lint/style/noNonNullAssertion: <Vite necissite this>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system" storageKey="theme" enableSystem>
			<App />
		</ThemeProvider>
	</StrictMode>,
)
