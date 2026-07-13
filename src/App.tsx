import { useState } from 'react'
import './App.css'
import { HeroBackground } from './components/hero-background'
import { ThemeToggle } from './components/theme-toggle'
import { KYCButton } from './KYCButton'
import { SuccessPage } from './SuccessPage'

export default function App() {
	const [apiKey, setApiKey] = useState('')
	const [successUrl, setSuccessUrl] = useState(`${window.location.origin}/success`)
	const [failureUrl, setFailureUrl] = useState(`${window.location.origin}/error`)
	const [platform, setPlatform] = useState('sdk')

	if (window.location.pathname === '/success') {
		return <SuccessPage />
	}

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

				<div className="glass-card rounded-2xl p-8 space-y-5">
					{/* Environment Selection */}
					<div className="space-y-1.5">
						<label className="text-xs font-medium text-slate-500 dark:text-white/50 uppercase tracking-wide">
							Environment
						</label>
						<select
							value={platform}
							onChange={(e) => setPlatform(e.target.value)}
							className="w-full px-4 py-3 bg-input/40 border border-input rounded-xl text-slate-900 dark:text-white focus:outline-none focus-visible:border-violet-500/50 focus-visible:ring-4 focus-visible:ring-violet-500/10 transition-all duration-300 text-sm"
						>
							<option className="bg-popover text-popover-foreground" value="sdk">
								KYC
							</option>
							<option className="bg-popover text-popover-foreground" value="aptos">
								Aptos
							</option>
						</select>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-medium text-slate-500 dark:text-white/50 uppercase tracking-wide">
							API Key <span className="text-red-500 dark:text-red-400">*</span>
						</label>
						<input
							type="password"
							placeholder="test_xxx or prod_xxx"
							value={apiKey}
							onChange={(e) => setApiKey(e.target.value)}
							className="w-full px-4 py-3 bg-input/40 border border-input rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus-visible:border-violet-500/50 focus-visible:ring-4 focus-visible:ring-violet-500/10 transition-all duration-300 text-sm"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-medium text-slate-500 dark:text-white/50 uppercase tracking-wide">
							Success URL
						</label>
						<input
							type="url"
							value={successUrl}
							onChange={(e) => setSuccessUrl(e.target.value)}
							className="w-full px-4 py-3 bg-input/40 border border-input rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus-visible:border-violet-500/50 focus-visible:ring-4 focus-visible:ring-violet-500/10 transition-all duration-300 text-sm"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-medium text-slate-500 dark:text-white/50 uppercase tracking-wide">
							Failure URL
						</label>
						<input
							type="url"
							value={failureUrl}
							onChange={(e) => setFailureUrl(e.target.value)}
							className="w-full px-4 py-3 bg-input/40 border border-input rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus-visible:border-violet-500/50 focus-visible:ring-4 focus-visible:ring-violet-500/10 transition-all duration-300 text-sm"
						/>
					</div>

					<KYCButton
						apiKey={apiKey}
						successUrl={successUrl}
						failureUrl={failureUrl}
						platform={platform}
					/>
				</div>
			</div>
		</main>
	)
}
