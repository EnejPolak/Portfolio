'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Mail, MessageSquare, User, CheckCircle } from 'lucide-react'
import { gsap } from 'gsap'
import emailjs from '@emailjs/browser'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (isOpen) {
            // GSAP otvaranje animacije
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
        // GSAP zatvaranje animacije
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // GSAP loading animacija
        gsap.to(formRef.current, { y: -10, duration: 0.3 })

        try {
            // EmailJS konfiguracija - ZAMENJAJ S SVOJIMI VREDNOSTMI:
            // 1. serviceId: dobi iz Email Services v EmailJS dashboard
            // 2. templateId: dobi iz Email Templates v EmailJS dashboard  
            // 3. publicKey: dobi iz Account > General v EmailJS dashboard
            const serviceId = 'service_ja6bhvr' // Service ID
            const templateId = 'template_i876ezl' // Template ID  
            const publicKey = 'nN4u5VrWkXWxy-Xm-' // Public Key

            // Priprava email parametrov
            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message
            }

            // Pošlji email preko EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey)
            
            setIsSuccess(true)
            setFormData({ name: '', email: '', message: '' })
            
            // Success animacija
            gsap.fromTo(formRef.current, 
                { scale: 0.95 }, 
                { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
            )
            
        } catch (error) {
            console.error('Error sending message:', error)
            alert('Error sending message. Please try again or contact me directly at enej.polak@gmail.com')
        } finally {
            setIsSubmitting(false)
            gsap.to(formRef.current, { y: 0, duration: 0.3 })
        }
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
                className="relative w-full max-w-md mx-auto contact-modal-container"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(17, 17, 17, 0.95) 50%, rgba(10, 10, 10, 0.95) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 text-white/50 hover:text-white transition-all duration-200 p-2.5 rounded-xl hover:bg-white/10 hover:scale-110 active:scale-95"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="text-center mb-10 contact-modal-header">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3">
                        Get In Touch
                    </h2>
                    <p className="text-white/60 text-sm">
                        Let&apos;s discuss your next project
                    </p>
                </div>

                {isSuccess ? (
                    /* Success State */
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                        <p className="text-white/70 mb-6">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                        <button
                            onClick={handleClose}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    /* Form */
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-modal-form">
                        {/* Name Field */}
                        <div>
                            <label className="block text-white/80 text-xs font-medium mb-3 tracking-wide uppercase contact-modal-label">
                                <User className="w-3 h-3 inline mr-3" />
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3.5 bg-white/8 border border-white/15 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 focus:bg-white/12 transition-all duration-300 contact-modal-input"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-white/80 text-xs font-medium mb-3 tracking-wide uppercase contact-modal-label">
                                <Mail className="w-3 h-3 inline mr-3" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3.5 bg-white/8 border border-white/15 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 focus:bg-white/12 transition-all duration-300 contact-modal-input"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-white/80 text-xs font-medium mb-3 tracking-wide uppercase contact-modal-label">
                                <MessageSquare className="w-3 h-3 inline mr-3" />
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full px-5 py-4 bg-white/8 border border-white/15 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 focus:bg-white/12 transition-all duration-300 resize-none leading-relaxed contact-modal-textarea"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] contact-modal-button"
                                style={{
                                    background: isSubmitting ? 
                                        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)' :
                                        'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #2563eb 100%)'
                                }}
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                                
                                {/* Button content */}
                                <div className="relative flex items-center gap-3">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span className="text-sm font-medium tracking-wide">Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                            <span className="text-sm font-medium tracking-wide">Send Message</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ContactModal 