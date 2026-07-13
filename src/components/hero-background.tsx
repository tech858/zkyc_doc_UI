import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Ambient looping video layered over the `.hero-bg` gradient (see App.css).
 * Desktop-only and purely decorative — mirrors the marketing-site convention
 * of swapping the whole clip per theme rather than color-grading one clip
 * with a CSS filter.
 */
export function HeroBackground() {
	const { resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	const isDark = resolvedTheme === 'dark'
	const videoSrc = isDark ? '/images/hero-glow.mp4' : '/images/hero-glow-light.mp4'

	return (
		<video
			key={videoSrc}
			aria-hidden="true"
			autoPlay
			muted
			loop
			playsInline
			className="hidden md:block fixed inset-0 w-full h-full object-cover opacity-70 dark:opacity-40 mix-blend-normal dark:mix-blend-screen pointer-events-none -z-10"
			style={{
				maskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, black 0%, transparent 85%)',
				WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 40%, black 0%, transparent 85%)',
				filter: isDark ? undefined : 'saturate(1.6) contrast(1.15)',
			}}
		>
			<source src={videoSrc} type="video/mp4" />
		</video>
	)
}
