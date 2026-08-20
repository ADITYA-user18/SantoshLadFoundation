"use client";

import React, { useState } from 'react';
import { X, Send, HeartHandshake, Users, Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/language';
import { foundationContent } from '@/data/foundationContent';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  volunteer: 'Volunteer',
  partner: 'Partner',
  story: 'Share Story',
  support: 'Seek Help',
};

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const { locale } = useLanguage();
  const t = foundationContent[locale].joinModal;

  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'story' | 'support'>('volunteer');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: CATEGORY_NAMES[activeTab] || 'Volunteer',
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          notes: formData.notes,
        }),
      });
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setFormData({ name: '', phone: '', location: '', notes: '' });
    onClose();
  };

  const getNotesPlaceholder = () => {
    switch (activeTab) {
      case 'volunteer':
        return t.notesVolunteer;
      case 'partner':
        return t.notesPartner;
      case 'story':
        return t.notesStory;
      case 'support':
        return t.notesSupport;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#F8F6F0] w-full h-[100dvh] sm:h-auto sm:max-h-[90dvh] sm:max-w-xl sm:rounded-3xl text-[#141414] relative shadow-2xl overflow-hidden border-0 sm:border sm:border-[#E8E4D9] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-4 relative border-b border-[#E8E4D9] shrink-0 bg-[#F8F6F0] z-10">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-[#EDE8DE] hover:bg-[#E2DCCF] text-[#141414] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#857E74] block mb-1">
            {t.eyebrow}
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl text-[#141414] font-medium tracking-tight">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#666055] font-light mt-1 max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 pb-16 sm:pb-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#E5DFD4] text-[#141414] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl text-[#141414]">
                {t.thankYouTitle} {formData.name || 'Friend'}.
              </h4>
              <p className="text-xs sm:text-sm text-[#666055] font-light max-w-md mx-auto leading-relaxed">
                {t.thankYouMsg}
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-full bg-[#141414] text-[#F8F6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2A26] transition-all cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Pills */}
              <div className="grid grid-cols-4 gap-2 p-1 rounded-2xl bg-[#EDE8DE] text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('volunteer')}
                  className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'volunteer'
                      ? 'bg-[#141414] text-white shadow-xs'
                      : 'text-[#666055] hover:text-[#141414]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{t.pills.volunteer}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('partner')}
                  className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'partner'
                      ? 'bg-[#141414] text-white shadow-xs'
                      : 'text-[#666055] hover:text-[#141414]'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{t.pills.partner}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('story')}
                  className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'story'
                      ? 'bg-[#141414] text-white shadow-xs'
                      : 'text-[#666055] hover:text-[#141414]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.pills.story}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('support')}
                  className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'support'
                      ? 'bg-[#141414] text-white shadow-xs'
                      : 'text-[#666055] hover:text-[#141414]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.pills.support}</span>
                </button>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524C42] mb-1">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Rao"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE8DE] border border-[#E0D8CB] focus:border-[#141414] focus:outline-none text-xs text-[#141414] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524C42] mb-1">
                    {t.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98450 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EDE8DE] border border-[#E0D8CB] focus:border-[#141414] focus:outline-none text-xs text-[#141414] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524C42] mb-1">
                  {t.locationLabel}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Kalaghatgi, Dharwad"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE8DE] border border-[#E0D8CB] focus:border-[#141414] focus:outline-none text-xs text-[#141414] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524C42] mb-1">
                  Details
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={getNotesPlaceholder()}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EDE8DE] border border-[#E0D8CB] focus:border-[#141414] focus:outline-none text-xs text-[#141414] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#141414] text-[#F8F6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#2C2A26] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>{t.submitBtn}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
