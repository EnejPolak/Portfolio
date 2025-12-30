'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import styles from './ProjectBriefForm.module.css'

// SVG Icons - Minimalistične, inline
const TargetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

const PaletteIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
)

const RefreshIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
    </svg>
)

const LayoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
)

const CubeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
)

const FolderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
)

const WalletIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z" />
        <line x1="17" y1="12" x2="17" y2="12.01" />
    </svg>
)

const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const MessageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

interface FormData {
    // Contact Information
    contactName: string
    contactEmail: string
    websiteLink: string
    
    // Section 1
    goals: string[]
    goalsOther: string
    
    // Section 2
    character: string[]
    characterOther: string
    
    // Section 3
    currentWebsiteLikes: string
    currentWebsiteChanges: string
    
    // Section 4
    visualStyle: string
    visualStyleExamples: string
    
    // Section 5
    threeDElements: string
    threeDElementsDetails: string
    
    // Section 6
    contentAvailability: string[]
    
    // Section 7
    budget: string
    
    // Section 8
    timeframe: string
    
    // Section 9
    additionalNotes: string
}

const STORAGE_KEY = 'project_brief_form_data'

export default function ProjectBriefForm() {
    const [formData, setFormData] = useState<FormData>({
        contactName: '',
        contactEmail: '',
        websiteLink: '',
        goals: [],
        goalsOther: '',
        character: [],
        characterOther: '',
        currentWebsiteLikes: '',
        currentWebsiteChanges: '',
        visualStyle: '',
        visualStyleExamples: '',
        threeDElements: '',
        threeDElementsDetails: '',
        contentAvailability: [],
        budget: '',
        timeframe: '',
        additionalNotes: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Ensure all fields are strings, not undefined
                setFormData({
                    contactName: parsed.contactName || '',
                    contactEmail: parsed.contactEmail || '',
                    websiteLink: parsed.websiteLink || '',
                    goals: parsed.goals || [],
                    goalsOther: parsed.goalsOther || '',
                    character: parsed.character || [],
                    characterOther: parsed.characterOther || '',
                    currentWebsiteLikes: parsed.currentWebsiteLikes || '',
                    currentWebsiteChanges: parsed.currentWebsiteChanges || '',
                    visualStyle: parsed.visualStyle || '',
                    visualStyleExamples: parsed.visualStyleExamples || '',
                    threeDElements: parsed.threeDElements || '',
                    threeDElementsDetails: parsed.threeDElementsDetails || '',
                    contentAvailability: parsed.contentAvailability || [],
                    budget: parsed.budget || '',
                    timeframe: parsed.timeframe || '',
                    additionalNotes: parsed.additionalNotes || ''
                })
            } catch (e) {
                console.error('Error loading form data:', e)
            }
        }
    }, [])

    // Save to localStorage on every change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }, [formData])

    const handleCheckboxChange = (section: 'goals' | 'character' | 'contentAvailability', value: string) => {
        setFormData(prev => {
            const current = prev[section] as string[]
            const maxSelections = section === 'goals' ? 2 : undefined
            
            if (current.includes(value)) {
                return {
                    ...prev,
                    [section]: current.filter(item => item !== value)
                }
            } else {
                if (maxSelections && current.length >= maxSelections) {
                    return prev
                }
                return {
                    ...prev,
                    [section]: [...current, value]
                }
            }
        })
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const formatEmailContent = (): string => {
        let content = 'PROJEKTNI VPRAŠALNIK — PRENOVA SPLETNE STRANI\n\n'
        content += '═══════════════════════════════════════════════════════\n\n'
        
        // Contact Information
        content += 'KONTAKTNE INFORMACIJE\n'
        content += '─────────────────────────────────────────────────────\n'
        content += `Ime: ${formData.contactName || '(ni navedeno)'}\n`
        content += `Email: ${formData.contactEmail || '(ni navedeno)'}\n`
        content += `Spletna stran: ${formData.websiteLink || '(ni navedeno)'}\n`
        content += '\n'
        content += '═══════════════════════════════════════════════════════\n\n'

        // Section 1
        content += 'SEKCIJA 1 — CILJI SPLETNE STRANI\n'
        content += '─────────────────────────────────────────────────────\n'
        if (formData.goals.length > 0) {
            formData.goals.forEach(goal => {
                content += `• ${goal}\n`
            })
        }
        if (formData.goalsOther) {
            content += `• Drugo: ${formData.goalsOther}\n`
        }
        content += '\n'

        // Section 2
        content += 'SEKCIJA 2 — ZNAČAJ IN OBČUTEK STRANI\n'
        content += '─────────────────────────────────────────────────────\n'
        if (formData.character.length > 0) {
            formData.character.forEach(char => {
                content += `• ${char}\n`
            })
        }
        if (formData.characterOther) {
            content += `• Drugo: ${formData.characterOther}\n`
        }
        content += '\n'

        // Section 3
        content += 'SEKCIJA 3 — TRENUTNA SPLETNA STRAN\n'
        content += '─────────────────────────────────────────────────────\n'
        content += 'Kaj vam je na trenutni spletni strani všeč?\n'
        content += `${formData.currentWebsiteLikes || '(ni odgovora)'}\n\n`
        content += 'Kaj bi želeli spremeniti ali izboljšati?\n'
        content += `${formData.currentWebsiteChanges || '(ni odgovora)'}\n\n`

        // Section 4
        content += 'SEKCIJA 4 — VIZUALNI STIL IN REFERENCE\n'
        content += '─────────────────────────────────────────────────────\n'
        content += `Izbran slog: ${formData.visualStyle || '(ni izbrano)'}\n`
        if (formData.visualStyleExamples) {
            content += `Primeri: ${formData.visualStyleExamples}\n`
        }
        content += '\n'

        // Section 5
        content += 'SEKCIJA 5 — 3D ELEMENTI IN ANIMACIJE\n'
        content += '─────────────────────────────────────────────────────\n'
        content += `Odgovor: ${formData.threeDElements || '(ni izbrano)'}\n`
        if (formData.threeDElementsDetails) {
            content += `Dodatne informacije: ${formData.threeDElementsDetails}\n`
        }
        content += '\n'

        // Section 6
        content += 'SEKCIJA 6 — RAZPOLOŽLJIVOST VSEBINE\n'
        content += '─────────────────────────────────────────────────────\n'
        if (formData.contentAvailability.length > 0) {
            formData.contentAvailability.forEach(item => {
                content += `• ${item}\n`
            })
        } else {
            content += '(ni odgovora)\n'
        }
        content += '\n'

        // Section 7
        content += 'SEKCIJA 7 — PRORAČUN\n'
        content += '─────────────────────────────────────────────────────\n'
        content += `${formData.budget || '(ni izbrano)'}\n\n`

        // Section 8
        content += 'SEKCIJA 8 — ČASOVNI OKVIR\n'
        content += '─────────────────────────────────────────────────────\n'
        content += `${formData.timeframe || '(ni izbrano)'}\n\n`

        // Section 9
        content += 'SEKCIJA 9 — DODATNE OPOMBE\n'
        content += '─────────────────────────────────────────────────────\n'
        content += `${formData.additionalNotes || '(ni opomb)'}\n\n`

        content += '═══════════════════════════════════════════════════════\n'
        content += `Poslano: ${new Date().toLocaleString('sl-SI')}\n`

        return content
    }

    const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
        const newErrors: Record<string, string> = {}

        // Contact Information
        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Prosimo, vnesite vaše ime.'
        }
        if (!formData.contactEmail.trim()) {
            newErrors.contactEmail = 'Prosimo, vnesite vaš email naslov.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Prosimo, vnesite veljaven email naslov.'
        }
        if (!formData.websiteLink.trim()) {
            newErrors.websiteLink = 'Prosimo, vnesite link do vaše spletne strani.'
        } else if (!/^https?:\/\/.+/.test(formData.websiteLink.trim())) {
            newErrors.websiteLink = 'Prosimo, vnesite veljaven URL (npr. https://example.com).'
        }

        // Section 1 - Goals
        if (formData.goals.length === 0) {
            newErrors.goals = 'Prosimo, izberite vsaj en cilj spletne strani.'
        }
        if (formData.goals.includes('Drugo') && !formData.goalsOther.trim()) {
            newErrors.goalsOther = 'Prosimo, navedite svoj cilj.'
        }

        // Section 2 - Character
        if (formData.character.length === 0) {
            newErrors.character = 'Prosimo, izberite vsaj en značaj strani.'
        }
        if (formData.character.includes('Drugo') && !formData.characterOther.trim()) {
            newErrors.characterOther = 'Prosimo, navedite značaj strani.'
        }

        // Section 3 - Current Website
        if (!formData.currentWebsiteLikes.trim()) {
            newErrors.currentWebsiteLikes = 'Prosimo, odgovorite na vprašanje.'
        }
        if (!formData.currentWebsiteChanges.trim()) {
            newErrors.currentWebsiteChanges = 'Prosimo, odgovorite na vprašanje.'
        }

        // Section 4 - Visual Style
        if (!formData.visualStyle) {
            newErrors.visualStyle = 'Prosimo, izberite vizualni stil.'
        }

        // Section 5 - 3D Elements
        if (!formData.threeDElements) {
            newErrors.threeDElements = 'Prosimo, izberite možnost glede 3D elementov.'
        }
        if ((formData.threeDElements === 'Zelo zainteresirani' || formData.threeDElements === 'Odprti za predlog') && !formData.threeDElementsDetails.trim()) {
            newErrors.threeDElementsDetails = 'Prosimo, navedite dodatne informacije ali ideje.'
        }

        // Section 6 - Content Availability
        if (formData.contentAvailability.length === 0) {
            newErrors.contentAvailability = 'Prosimo, izberite vsaj eno možnost.'
        }

        // Section 7 - Budget
        if (!formData.budget) {
            newErrors.budget = 'Prosimo, izberite proračun.'
        }

        // Section 8 - Timeframe
        if (!formData.timeframe) {
            newErrors.timeframe = 'Prosimo, izberite časovni okvir.'
        }

        // Section 9 - Additional Notes (optional, but we'll require it)
        if (!formData.additionalNotes.trim()) {
            newErrors.additionalNotes = 'Prosimo, navedite dodatne opombe ali napišite "Ni opomb".'
        }

        setErrors(newErrors)
        return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitError('')
        
        const validation = validateForm()
        
        if (!validation.isValid) {
            // Scroll to first error after state update
            setTimeout(() => {
                const firstErrorField = Object.keys(validation.errors)[0]
                if (firstErrorField) {
                    const element = document.querySelector(`[data-field="${firstErrorField}"]`)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                }
            }, 100)
            return
        }

        setIsSubmitting(true)

        try {
            // EmailJS configuration
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS konfiguracija ni nastavljena. Prosimo, preverite spremenljivke okolja.')
            }

            const emailContent = formatEmailContent()
            const recipientEmail = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL

            if (!recipientEmail) {
                throw new Error('Email naslov prejemnika ni nastavljen.')
            }

            // EmailJS template parameters
            // Contact Us template uporablja:
            // - To Email: fiksen email (enej.polak@gmail.com) - že nastavljen v template-ju
            // - Subject: {{name}} (uporablja se v subject-u)
            // - Content: {{name}}, {{time}}, {{message}}
            // - Reply To: {{email}}
            const templateParams = {
                name: formData.contactName || 'Neznan pošiljatelj', // Za {{name}} v subject-u in content-u
                email: formData.contactEmail || recipientEmail, // Za {{email}} v Reply To
                message: emailContent, // Za {{message}} v content-u
                time: new Date().toLocaleString('sl-SI', { 
                    dateStyle: 'long', 
                    timeStyle: 'short' 
                }), // Za {{time}} v content-u
                // Dodatni parametri, če jih template potrebuje
                subject: `Nov projektni vprašalnik — ${formData.contactName || 'Neznan pošiljatelj'}`,
                contact_name: formData.contactName,
                contact_email: formData.contactEmail,
                website_link: formData.websiteLink
            }

            console.log('Sending email with params:', { 
                serviceId, 
                templateId, 
                email: recipientEmail,
                subject: templateParams.subject,
                hasMessage: !!templateParams.message
            })

            const result = await emailjs.send(serviceId, templateId, templateParams, publicKey)
            
            if (result.status !== 200) {
                throw new Error(`EmailJS returned status ${result.status}`)
            }

            // Clear localStorage on success
            localStorage.removeItem(STORAGE_KEY)
            
            setSubmitSuccess(true)
            setFormData({
                contactName: '',
                contactEmail: '',
                websiteLink: '',
                goals: [],
                goalsOther: '',
                character: [],
                characterOther: '',
                currentWebsiteLikes: '',
                currentWebsiteChanges: '',
                visualStyle: '',
                visualStyleExamples: '',
                threeDElements: '',
                threeDElementsDetails: '',
                contentAvailability: [],
                budget: '',
                timeframe: '',
                additionalNotes: ''
            })
        } catch (error: any) {
            console.error('Error sending email:', error)
            
            // Better error message
            let errorMessage = 'Prišlo je do napake pri pošiljanju. '
            
            if (error?.text) {
                errorMessage += `EmailJS napaka: ${error.text}`
            } else if (error?.message) {
                errorMessage += error.message
            } else if (typeof error === 'string') {
                errorMessage += error
            } else {
                errorMessage += 'Prosimo, poskusite znova ali nas kontaktirajte neposredno.'
            }
            
            setSubmitError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitSuccess) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <div className={styles.successIconWrapper}>
                        <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className={styles.successTitle}>Vprašalnik uspešno oddan</h2>
                    <p className={styles.successMessage}>
                        Vaši odgovori so bili poslani. Kontaktirali vas bomo v najkrajšem možnem času.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        Projektni vprašalnik — Prenova spletne strani
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Vprašalnik pomaga opredeliti cilje, obseg, vizualno smer in tehnične zahteve za novo spletno stran.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Contact Information Section */}
                    <div className={`${styles.section} ${errors.contactName || errors.contactEmail || errors.websiteLink ? styles.sectionError : ''}`} data-field="contactName">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <UserIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Kontaktne informacije</h2>
                        </div>
                        <p className={styles.sectionDescription}>Prosimo, vnesite vaše kontaktne podatke.</p>
                        <div className={styles.inputGroup}>
                            <div>
                                <label className={`${styles.label} ${styles.labelRequired}`}>
                                    Ime in priimek
                                </label>
                                <input
                                    type="text"
                                    value={formData.contactName || ''}
                                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                                    placeholder="Janez Novak"
                                    className={`${styles.input} ${errors.contactName ? styles.inputError : ''}`}
                                    data-field="contactName"
                                />
                                {errors.contactName && (
                                    <div className={styles.errorMessage}>
                                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.contactName}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className={`${styles.label} ${styles.labelRequired}`}>
                                    Email naslov
                                </label>
                                <input
                                    type="email"
                                    value={formData.contactEmail || ''}
                                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                    placeholder="janez.novak@example.com"
                                    className={`${styles.input} ${errors.contactEmail ? styles.inputError : ''}`}
                                    data-field="contactEmail"
                                />
                                {errors.contactEmail && (
                                    <div className={styles.errorMessage}>
                                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.contactEmail}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className={`${styles.label} ${styles.labelRequired}`}>
                                    Link do vaše spletne strani
                                </label>
                                <input
                                    type="url"
                                    value={formData.websiteLink || ''}
                                    onChange={(e) => handleInputChange('websiteLink', e.target.value)}
                                    placeholder="https://www.example.com"
                                    className={`${styles.input} ${errors.websiteLink ? styles.inputError : ''}`}
                                    data-field="websiteLink"
                                />
                                {errors.websiteLink && (
                                    <div className={styles.errorMessage}>
                                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.websiteLink}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <div className={`${styles.section} ${errors.goals || errors.goalsOther ? styles.sectionError : ''}`} data-field="goals">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <TargetIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Cilji spletne strani</h2>
                        </div>
                        <p className={styles.sectionDescription}>Izberite največ 2 možnosti:</p>
                        {errors.goals && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.goals}
                            </div>
                        )}
                        <div className={styles.optionsList}>
                            {['Predstavitev blagovne znamke', 'Pridobivanje novih strank', 'Informativna spletna stran', 'Promocije, dogodki ali kampanje'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.goals.includes(option)}
                                        onChange={() => handleCheckboxChange('goals', option)}
                                        disabled={!formData.goals.includes(option) && formData.goals.length >= 2}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                            <label className={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    checked={formData.goals.includes('Drugo')}
                                    onChange={() => handleCheckboxChange('goals', 'Drugo')}
                                    disabled={!formData.goals.includes('Drugo') && formData.goals.length >= 2}
                                    className={styles.checkbox}
                                />
                                <span className={styles.optionText}>Drugo</span>
                            </label>
                            {formData.goals.includes('Drugo') && (
                                <div>
                                    <input
                                        type="text"
                                        value={formData.goalsOther}
                                        onChange={(e) => handleInputChange('goalsOther', e.target.value)}
                                        placeholder="Prosimo, navedite"
                                        className={`${styles.input} ${errors.goalsOther ? styles.inputError : ''}`}
                                        data-field="goalsOther"
                                    />
                                    {errors.goalsOther && (
                                        <div className={styles.errorMessage}>
                                            <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.goalsOther}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className={`${styles.section} ${errors.character || errors.characterOther ? styles.sectionError : ''}`} data-field="character">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <PaletteIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Značaj in občutek strani</h2>
                        </div>
                        {errors.character && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.character}
                            </div>
                        )}
                        <div className={styles.optionsList}>
                            {['Igriva', 'Drzna / izstopajoča', 'Premium', 'Minimalistična', 'Barvita', 'Elegantna', 'Preprosta in pregledna'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.character.includes(option)}
                                        onChange={() => handleCheckboxChange('character', option)}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                            <label className={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    checked={formData.character.includes('Drugo')}
                                    onChange={() => handleCheckboxChange('character', 'Drugo')}
                                    className={styles.checkbox}
                                />
                                <span className={styles.optionText}>Drugo</span>
                            </label>
                            {formData.character.includes('Drugo') && (
                                <div>
                                    <input
                                        type="text"
                                        value={formData.characterOther}
                                        onChange={(e) => handleInputChange('characterOther', e.target.value)}
                                        placeholder="Prosimo, navedite"
                                        className={`${styles.input} ${errors.characterOther ? styles.inputError : ''}`}
                                        data-field="characterOther"
                                    />
                                    {errors.characterOther && (
                                        <div className={styles.errorMessage}>
                                            <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.characterOther}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className={`${styles.section} ${errors.currentWebsiteLikes || errors.currentWebsiteChanges ? styles.sectionError : ''}`} data-field="currentWebsiteLikes">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <RefreshIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Trenutna spletna stran</h2>
                        </div>
                        <div className={styles.inputGroup}>
                            <div>
                                <label className={`${styles.label} ${styles.labelRequired}`}>
                                    Kaj vam je na trenutni spletni strani všeč?
                                </label>
                                <textarea
                                    value={formData.currentWebsiteLikes}
                                    onChange={(e) => handleInputChange('currentWebsiteLikes', e.target.value)}
                                    rows={4}
                                    className={`${styles.textarea} ${errors.currentWebsiteLikes ? styles.inputError : ''}`}
                                    data-field="currentWebsiteLikes"
                                />
                                {errors.currentWebsiteLikes && (
                                    <div className={styles.errorMessage}>
                                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.currentWebsiteLikes}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className={`${styles.label} ${styles.labelRequired}`}>
                                    Kaj bi želeli spremeniti ali izboljšati?
                                </label>
                                <textarea
                                    value={formData.currentWebsiteChanges}
                                    onChange={(e) => handleInputChange('currentWebsiteChanges', e.target.value)}
                                    rows={4}
                                    className={`${styles.textarea} ${errors.currentWebsiteChanges ? styles.inputError : ''}`}
                                    data-field="currentWebsiteChanges"
                                />
                                {errors.currentWebsiteChanges && (
                                    <div className={styles.errorMessage}>
                                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.currentWebsiteChanges}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className={`${styles.section} ${errors.visualStyle ? styles.sectionError : ''}`} data-field="visualStyle">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <LayoutIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Vizualni stil in reference</h2>
                        </div>
                        {errors.visualStyle && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.visualStyle}
                            </div>
                        )}
                        <div className={styles.optionsList} style={{ marginBottom: '1rem' }}>
                            {['Čist in urejen', 'Igriv in izrazit', 'Unikaten / eksperimentalen', 'Kombinacija slogov'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name="visualStyle"
                                        value={option}
                                        checked={formData.visualStyle === option}
                                        onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                                        className={styles.radio}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <label className={styles.label}>
                                Primeri spletnih strani ali znamk (neobvezno)
                            </label>
                            <textarea
                                value={formData.visualStyleExamples}
                                onChange={(e) => handleInputChange('visualStyleExamples', e.target.value)}
                                rows={3}
                                placeholder="Navedite primere ali povezave"
                                className={styles.textarea}
                            />
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className={`${styles.section} ${errors.threeDElements || errors.threeDElementsDetails ? styles.sectionError : ''}`} data-field="threeDElements">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <CubeIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>3D elementi in animacije</h2>
                        </div>
                        <p className={styles.sectionDescription}>
                            Napredni vizualni elementi, kot so 3D modeli ali animacije, povečajo vizualni učinek in prepoznavnost blagovne znamke.
                            Hkrati pa pomenijo več razvoja in lahko vplivajo na ceno projekta.
                        </p>
                        {errors.threeDElements && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.threeDElements}
                            </div>
                        )}
                        <div className={styles.optionsList} style={{ marginBottom: '1rem' }}>
                            {['Zelo zainteresirani', 'Odprti za predlog', 'Raje klasična rešitev', '3D elementov ne želimo'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name="threeDElements"
                                        value={option}
                                        checked={formData.threeDElements === option}
                                        onChange={(e) => handleInputChange('threeDElements', e.target.value)}
                                        className={styles.radio}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                        </div>
                        {(formData.threeDElements === 'Zelo zainteresirani' || formData.threeDElements === 'Odprti za predlog') && (
                            <div>
                                <label className={`${styles.label} ${styles.labelRequired}`}>
                                    Dodatne informacije ali ideje
                                </label>
                                <textarea
                                    value={formData.threeDElementsDetails}
                                    onChange={(e) => handleInputChange('threeDElementsDetails', e.target.value)}
                                    rows={3}
                                    placeholder="Prosimo, navedite svoje ideje ali predloge"
                                    className={`${styles.textarea} ${errors.threeDElementsDetails ? styles.inputError : ''}`}
                                    data-field="threeDElementsDetails"
                                />
                                {errors.threeDElementsDetails && (
                                    <div className={styles.errorMessage}>
                                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.threeDElementsDetails}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Section 6 */}
                    <div className={`${styles.section} ${errors.contentAvailability ? styles.sectionError : ''}`} data-field="contentAvailability">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <FolderIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Razpoložljivost vsebine</h2>
                        </div>
                        {errors.contentAvailability && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.contentAvailability}
                            </div>
                        )}
                        <div className={styles.optionsList}>
                            {['Fotografije', 'Besedila', 'Logotip', 'Vizualna identiteta / barve', 'Nič od naštetega (potrebna pomoč)'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.contentAvailability.includes(option)}
                                        onChange={() => handleCheckboxChange('contentAvailability', option)}
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className={`${styles.section} ${errors.budget ? styles.sectionError : ''}`} data-field="budget">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <WalletIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Proračun</h2>
                        </div>
                        {errors.budget && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.budget}
                            </div>
                        )}
                        <div className={styles.optionsList} style={{ marginBottom: '1rem' }}>
                            {['do 500 €', '500 – 1.000 €', '1.000 – 2.000 €', 'nad 2.000 €', 'Želimo najprej predlog'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name="budget"
                                        value={option}
                                        checked={formData.budget === option}
                                        onChange={(e) => handleInputChange('budget', e.target.value)}
                                        className={styles.radio}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                        </div>
                        <p className={styles.infoText}>
                            Uporaba naprednih animacij ali 3D elementov lahko vpliva na končno ceno projekta.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div className={`${styles.section} ${errors.timeframe ? styles.sectionError : ''}`} data-field="timeframe">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <CalendarIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Časovni okvir</h2>
                        </div>
                        {errors.timeframe && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.timeframe}
                            </div>
                        )}
                        <div className={styles.optionsList}>
                            {['čim prej', 'v približno enem mesecu', 'prilagodljivo, kakovost je pomembnejša'].map(option => (
                                <label key={option} className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name="timeframe"
                                        value={option}
                                        checked={formData.timeframe === option}
                                        onChange={(e) => handleInputChange('timeframe', e.target.value)}
                                        className={styles.radio}
                                    />
                                    <span className={styles.optionText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section 9 */}
                    <div className={`${styles.section} ${errors.additionalNotes ? styles.sectionError : ''}`} data-field="additionalNotes">
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIcon} style={{ color: '#6366f1' }}>
                                <MessageIcon />
                            </div>
                            <h2 className={styles.sectionTitle}>Dodatne opombe</h2>
                        </div>
                        <textarea
                            value={formData.additionalNotes}
                            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                            rows={6}
                            placeholder="Dodatne ideje, posebne želje, pomembne informacije... (Če nimate opomb, napišite 'Ni opomb')"
                            className={`${styles.textarea} ${errors.additionalNotes ? styles.inputError : ''}`}
                            data-field="additionalNotes"
                        />
                        {errors.additionalNotes && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.additionalNotes}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className={styles.submitWrapper}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.submitButton}
                        >
                            {isSubmitting ? 'Pošiljanje...' : 'Oddaj vprašalnik'}
                        </button>
                    </div>

                    {submitError && (
                        <div className={styles.errorAlert}>
                            <p className={styles.errorAlertText}>{submitError}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

