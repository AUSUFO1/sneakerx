'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="relative min-h-screen bg-black px-6 py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Contact{' '}
            <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl text-lg">
            We’d love to hear from you. Our team is here to help.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="you@example.com" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Phone number" placeholder="+1 (555) 000-0000" />
              <Input label="Subject" placeholder="How can we help?" />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-all hover:scale-[1.02]"
            >
              Send message
            </button>

            <p className="text-xs text-gray-500">
              This site is protected by hCaptcha and the hCaptcha Privacy Policy
              and Terms of Service apply.
            </p>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <InfoCard
              icon={<MapPin />}
              title="Address"
              content="350 5th Avenue, New York, NY 10118, United States"
            />

            <InfoCard
              icon={<Mail />}
              title="Email"
              content="support@shopsneakerx.com"
            />

            <InfoCard
              icon={<Phone />}
              title="Phone"
              content="+1 (555) 123-4567"
              sub="Mon – Sat: 09:00 AM – 06:00 PM"
            />

            <div>
              <h3 className="text-white font-semibold mb-4">Follow us</h3>
              <div className="flex gap-4">
                <SocialIcon icon={<Facebook />} />
                <SocialIcon icon={<Twitter />} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Parts */

function Input({
  label,
  type = 'text',
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}

function InfoCard({
  icon,
  title,
  content,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  sub?: string;
}) {
  return (
    <div className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-red-500">{icon}</div>
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-gray-300">{content}</p>
        {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all hover:scale-110">
      {icon}
    </button>
  );
}
