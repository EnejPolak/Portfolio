'use client'

import { useRef, useEffect } from 'react'
import { X, Download, FileText, Eye } from 'lucide-react'
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

    const previewCV = (language: 'slovensko' | 'english') => {
        // Get the correct PDF path
        const pdfPath = language === 'slovensko' ? 
            '/cv/pdf/EnejPolak-Resume-SL.pdf' : 
            '/cv/pdf/EnejPolak-Resume-EN.pdf'
        
        // Open PDF in new window for preview
        window.open(pdfPath, '_blank', 'width=900,height=1200,scrollbars=yes,resizable=yes')
    }

    const downloadCV = (language: 'slovensko' | 'english') => {
        // Get the correct PDF path
        const pdfPath = language === 'slovensko' ? 
            '/cv/pdf/EnejPolak-Resume-SL.pdf' : 
            '/cv/pdf/EnejPolak-Resume-EN.pdf'
        
        // Create download link
        const link = document.createElement('a')
        link.href = pdfPath
        link.download = language === 'slovensko' ? 
            'EnejPolak-Resume-SL.pdf' : 
            'EnejPolak-Resume-EN.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Close the modal
        handleClose()
    }

    if (!isOpen) return null

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-4"
            style={{ 
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)'
            }}
            onClick={handleClose}
        >
            <div 
                ref={modalRef}
                className="relative w-full max-w-sm sm:max-w-2xl mx-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(17, 17, 17, 0.95) 50%, rgba(10, 10, 10, 0.95) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '24px',
                    padding: '1.5rem 1.5rem',
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
                <div className="text-center mb-6 cv-modal-header">
                    <div className="w-18 h-18 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-9 h-9 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3">
                        Resume / CV
                    </h2>
                    <p className="text-white/60 text-base">
                        Choose your preferred language and action
                    </p>
                </div>

                {/* Language Options */}
                <div className="flex flex-col gap-6 cv-modal-container">
                    {/* Slovensko */}
                    <div className="bg-white/8 border border-white/15 rounded-2xl p-6">
                        <div className="flex items-start gap-6">
                            {/* Language Info */}
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className="text-4xl">🇸🇮</div>
                                <div>
                                    <h3 className="text-white font-semibold text-xl mb-1">Slovenščina</h3>
                                    <p className="text-white/60 text-sm">Slovenski življenjepis</p>
                                </div>
                            </div>
                            
                            {/* Buttons */}
                            <div className="flex flex-col gap-3 min-w-[140px]">
                                <button
                                    onClick={() => previewCV('slovensko')}
                                    className="group relative bg-white/10 hover:bg-white/15 hover:bg-white/20 border border-white/20 hover:border-purple-500/40 rounded-2xl p-4 transition-all duration-300 w-full"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Eye className="w-4 h-4 text-purple-400" />
                                        <span className="text-white font-medium">Predogled</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => downloadCV('slovensko')}
                                    className="group relative bg-purple-600/20 hover:bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400/50 rounded-2xl p-4 transition-all duration-300 w-full"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4 text-purple-300" />
                                        <span className="text-white font-medium">Prenesi</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* English */}
                    <div className="bg-white/8 border border-white/15 rounded-2xl p-6">
                        <div className="flex items-start gap-6">
                            {/* Language Info */}
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                <div className="text-4xl">🇺🇸</div>
                                <div>
                                    <h3 className="text-white font-semibold text-xl mb-1">English</h3>
                                    <p className="text-white/60 text-sm">English resume</p>
                                </div>
                            </div>
                            
                            {/* Buttons */}
                            <div className="flex flex-col gap-3 min-w-[140px]">
                                <button
                                    onClick={() => previewCV('english')}
                                    className="group relative bg-white/10 hover:bg-white/15 hover:bg-white/20 border border-white/20 hover:border-purple-500/40 rounded-2xl p-4 transition-all duration-300 w-full"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Eye className="w-4 h-4 text-purple-400" />
                                        <span className="text-white font-medium">Preview</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => downloadCV('english')}
                                    className="group relative bg-purple-600/20 hover:bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400/50 rounded-2xl p-4 transition-all duration-300 w-full"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4 text-purple-300" />
                                        <span className="text-white font-medium">Download</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center cv-modal-footer">
                    <p className="text-white/40 text-sm leading-relaxed">
                        Preview opens PDF in new window • Download saves file to your device
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CVSelectionModal