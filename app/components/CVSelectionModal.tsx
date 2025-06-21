'use client'

import { useRef, useEffect } from 'react'
import { X, Download, FileText } from 'lucide-react'
import { gsap } from 'gsap'

interface CVSelectionModalProps {
    isOpen: boolean
    onClose: () => void
}

const CVSelectionModal = ({ isOpen, onClose }: CVSelectionModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            // GSAP opening animation
            gsap.set(modalRef.current, { scale: 0.8, opacity: 0 })
            gsap.set(overlayRef.current, { opacity: 0 })
            
            const tl = gsap.timeline()
            tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
              .to(modalRef.current, { 
                  scale: 1, 
                  opacity: 1, 
                  duration: 0.4, 
                  ease: "back.out(1.7)" 
              }, "-=0.1")
        }
    }, [isOpen])

    const handleClose = () => {
        // GSAP closing animation
        const tl = gsap.timeline()
        tl.to(modalRef.current, { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.3, 
            ease: "back.in(1.7)" 
        })
        .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1")
        .call(() => onClose())
    }

    const downloadCV = (language: 'slovensko' | 'english') => {
        // Open CV in new window for manual saving/printing
        const cvUrl = `/cv/cv-${language}.html`
        window.open(cvUrl, '_blank', 'width=800,height=1000,scrollbars=yes,resizable=yes')
        
        // Close the modal
        handleClose()
    }

    if (!isOpen) return null

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)'
            }}
            onClick={handleClose}
        >
            <div 
                ref={modalRef}
                className="relative w-full max-w-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(17, 17, 17, 0.95) 50%, rgba(10, 10, 10, 0.95) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '24px',
                    padding: '1rem 2.5rem',
                    boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-all duration-200 p-3 rounded-xl hover:bg-white/10 hover:scale-110 active:scale-95"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-4 cv-modal-header">
                    <div className="w-18 h-18 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-9 h-9 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3">
                        Download CV
                    </h2>
                    <p className="text-white/60 text-base">
                        Choose your preferred language
                    </p>
                </div>

                {/* Language Options */}
                <div className="flex flex-col gap-3 cv-modal-container">
                    <button
                        onClick={() => downloadCV('slovensko')}
                        className="w-full group relative bg-white/8 hover:bg-white/12 border border-white/15 hover:border-purple-500/30 rounded-2xl p-8 transition-all duration-300 text-left"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">🇸🇮</div>
                                <div>
                                    <h3 className="text-white font-semibold text-xl mb-2">Slovenščina</h3>
                                    <p className="text-white/60 text-base">Slovenski življenjepis</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                        
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => downloadCV('english')}
                        className="w-full group relative bg-white/8 hover:bg-white/12 border border-white/15 hover:border-purple-500/30 rounded-2xl p-8 transition-all duration-300 text-left"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">🇺🇸</div>
                                <div>
                                    <h3 className="text-white font-semibold text-xl mb-2">English</h3>
                                    <p className="text-white/60 text-base">English resume</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                        
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center cv-modal-footer">
                    <p className="text-white/40 text-sm leading-relaxed">
                        CV will open in new window.<br/>
                        Use Ctrl+P (Windows) or Cmd+P (Mac) to save as PDF
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CVSelectionModal