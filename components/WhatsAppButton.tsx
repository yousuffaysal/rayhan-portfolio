'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/data/portfolio'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={personalInfo.whatsapp}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1.5 // Show after initial intro
      }}
      style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 9999,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
        color: '#fff',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.544.917 3.41 1.401 5.309 1.403 5.73 0 10.395-4.666 10.397-10.398.001-2.777-1.082-5.388-3.048-7.354-1.966-1.965-4.577-3.046-7.353-3.046-5.732 0-10.396 4.665-10.398 10.397-.001 1.84.481 3.633 1.396 5.176l-.91 3.324 3.407-.893zm11.751-7.234c-.321-.16-1.898-.938-2.193-1.045-.295-.107-.511-.16-.726.161-.215.321-.834 1.045-1.022 1.26-.188.214-.376.241-.697.08-.321-.16-1.356-.5-2.583-1.594-.954-.852-1.597-1.904-1.785-2.225-.188-.321-.02-.495.14-.654.144-.143.321-.375.482-.563.161-.188.214-.321.321-.536.107-.214.054-.401-.027-.562-.08-.16-.726-1.741-1.022-2.437-.289-.691-.563-.598-.726-.607-.188-.01-.401-.01-.617-.01-.214 0-.563.08-.857.401-.295.321-1.127 1.1-1.127 2.68 0 1.58 1.152 3.107 1.313 3.321.161.214 2.268 3.464 5.495 4.859.767.332 1.366.529 1.834.678.77.244 1.469.21 2.023.129.617-.091 1.898-.777 2.167-1.491.268-.714.268-1.321.188-1.446-.08-.125-.295-.201-.617-.361z"/>
      </svg>
      {/* Pulse effect */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: -5,
          borderRadius: '50%',
          border: '2px solid #25D366',
        }}
      />
    </motion.a>
  )
}
