import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle({ className = '' }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	if (!mounted) {
		return <div className={`h-9 w-9 ${className}`} />
	}

	const isDark = resolvedTheme === 'dark'

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/8 dark:border-white/[0.07] text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/22 transition-all duration-300 bg-white/60 dark:bg-black/30 backdrop-blur-md ${className}`}
		>
			{isDark ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
		</button>
	)
}
