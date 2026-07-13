import { useEffect, useState } from 'react'
import { HeroBackground } from './components/hero-background'
import { ThemeToggle } from './components/theme-toggle'

type FlowStage = {
	status?: string
	stage?: string
	[key: string]: unknown
}

export function SuccessPage() {
	const [data, setData] = useState<FlowStage | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const token = params.get('token')

		if (!token) {
			setError('Missing token in URL')
			setLoading(false)
			return
		}

		const fetchFlowStage = async () => {
			try {
				const apiUrl = import.meta.env.VITE_PLATFORM_API_URL || 'https://api.zkyc.tech'
				const response = await fetch(`${apiUrl}/api/kyc/flow-stage`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})

				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`)
				}

				const json = await response.json()
				setData(json)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch flow stage')
			} finally {
				setLoading(false)
			}
		}

		fetchFlowStage()
	}, [])

	return (
		<main className="min-h-screen flex items-center justify-center px-4 hero-bg">
			<HeroBackground />
			<ThemeToggle className="fixed top-4 right-4 z-50" />
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-1">
					<p className="text-3xl font-light text-slate-900 dark:text-white">KYC Verification</p>
					<p className="text-slate-400 dark:text-white/40 text-sm">
						Powered by <span className="font-semibold text-black dark:text-white">zKYC</span>
					</p>
				</div>

				<div className="glass-card rounded-2xl p-8 space-y-5 text-center">
					{loading && (
						<p className="text-slate-500 dark:text-white/60 text-sm">Checking verification status...</p>
					)}

					{!loading && error && (
						<>
							<div className="mx-auto w-14 h-14 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-2xl">
								✕
							</div>
							<p className="text-slate-900 dark:text-white font-semibold">Something went wrong</p>
							<p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
						</>
					)}

					{!loading && !error && (
						<>
							<div className="mx-auto w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-2xl">
								✓
							</div>
							<p className="text-slate-900 dark:text-white font-semibold">Verification Complete</p>
							<p className="text-slate-400 dark:text-white/40 text-sm">
								{data?.stage || data?.status || 'Your KYC flow status has been updated.'}
							</p>
							<pre className="text-left text-xs bg-input/40 border border-input rounded-xl p-4 overflow-auto text-slate-600 dark:text-white/60">
								{JSON.stringify(data, null, 2)}
							</pre>
						</>
					)}
				</div>
			</div>
		</main>
	)
}
