import { ZKYCProcess } from '@zkyc/kyc-js'
import { useState } from 'react'

type Props = {
	apiKey: string
	successUrl: string
	failureUrl: string
	platform:string
}

export function KYCButton({ apiKey, successUrl, failureUrl,platform }: Props) {
	const [iframeUrl, setIframeUrl] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleKYC = async () => {
		setLoading(true)
		setError(null)
		const userId="3845849294"
		console.log(platform)
		try {
			const { url } = await ZKYCProcess({
				apiKey,
				userId,
				successUrl,
				failureUrl,
				platform
				// platformApiUrl: import.meta.env.VITE_PLATFORM_API_URL,
				// widgetUrl: import.meta.env.VITE_WIDGET_URL,
			})
			setIframeUrl(url)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to start KYC')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<button
				type="button"
				onClick={handleKYC}
				disabled={loading}
				className="w-full bg-slate-900 dark:bg-white text-white dark:text-black rounded-full py-3 font-semibold hover:bg-slate-800 dark:hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
			>
				{loading ? 'Starting...' : 'Start KYC Verification'}
			</button>

			{error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}

			{iframeUrl && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
					<div className="relative w-full max-w-2xl h-[80vh] bg-background rounded-xl overflow-hidden shadow-2xl">
						<button
							type="button"
							onClick={() => setIframeUrl(null)}
							className="absolute top-3 right-3 z-10 bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300"
						>
							✕
						</button>
						<iframe
							src={iframeUrl}
							className="w-full h-full border-none"
							title="KYC Verification"
						/>
					</div>
				</div>
			)}
		</>
	)
}
