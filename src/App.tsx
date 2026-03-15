/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, 
  Droplets, 
  Leaf, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ThermometerSun,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

// --- Constants ---
const NAV_ITEMS: NavItem[] = [
  { label: '核心技術', href: '#tech' },
  { label: '解決方案', href: '#solutions' },
  { label: '關於我們', href: '#about' },
];

const FEATURES: Feature[] = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: '綠能驅動',
    description: '整合太陽能與高效熱泵技術，將能源消耗降至最低，實現真正的永續建築。'
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: '自然對流',
    description: '模擬大自然氣流律動，無需強風直吹，即可達成全室均溫的舒適體感。'
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: '新風除濕',
    description: '24小時不間斷引進過濾後的活氧新風，精準控制濕度，杜絕黴菌與過敏原。'
  }
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '20/80 Air One',
    category: '被動式置換通風',
    description: '運用 20/80 物理對流原理，以最小能耗達成全室均溫，無需強風直吹即可享受自然舒適。',
    image: '/product-air-one.webp'
  },
  {
    id: '2',
    name: 'Whole Climate',
    category: '全氣候新風處理',
    description: '24小時引進過濾後的活氧新風，精準控制溫濕度，打造四季如春的室內環境。',
    image: '/product-whole.webp'
  },
  {
    id: '3',
    name: 'Radiant Panel',
    category: '輻射冷暖板',
    description: '如陽光般溫潤的輻射式冷暖技術，無風感、無噪音，帶來極致靜謐的舒適體驗。',
    image: '/product-radiant.webp'
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-cream/95 backdrop-blur-md py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <img 
            src="/logo1.png" 
            alt="BEHOME Logo" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain flex-shrink-0"
          />
          <span className="text-sm md:text-lg font-serif tracking-wide font-semibold truncate">BEHOME Whole Climate</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-xs uppercase tracking-[0.15em] font-medium hover:text-brand-olive transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 border border-brand-ink rounded-full text-xs uppercase tracking-widest hover:bg-brand-ink hover:text-white transition-all duration-300 whitespace-nowrap">
            立即預約
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-cream border-t border-brand-ink/10 p-6 flex flex-col gap-5 lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-brand-olive"
            >
              立即預約
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.webp" 
          alt="Nature background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-cream/40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cream/20 to-brand-cream" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.4em] mb-6 font-semibold text-brand-olive">
            The Future of Breathing
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-6 sm:mb-8 leading-[1.1] text-balance">
            讓建築與自然 <br />
            <span className="italic">同步呼吸</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-brand-ink/70 leading-relaxed">
            我們不只是提供設備，更是在為您打造一種「空氣的解決方案」。
            結合綠能、對流與除濕技術，重塑您對舒適生活的想像。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a href="#solutions" className="group px-8 sm:px-10 py-3 sm:py-4 bg-brand-ink text-white rounded-full text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest flex items-center gap-2 sm:gap-3 hover:bg-brand-olive transition-all duration-300">
              探索解決方案
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#tech" className="px-8 sm:px-10 py-3 sm:py-4 border border-brand-ink rounded-full text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest hover:bg-white transition-all duration-300">
              了解核心技術
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll</span>
        <div className="w-px h-12 bg-brand-ink/20" />
      </motion.div>
    </section>
  );
};

const TechSection = () => {
  return (
    <section id="tech" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/tech-section.webp" 
                alt="Technical detail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-12 -right-12 glass-card p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-olive/10 rounded-full">
                  <Zap className="w-6 h-6 text-brand-olive" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold">45%</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">能源效率提升</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-olive/10 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-brand-olive" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold">99.9%</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">空氣淨化率</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-olive mb-6 block">Core Technology</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              超越傳統空調 <br />
              <span className="italic">追求極致體感</span>
            </h2>
            <p className="text-brand-ink/70 mb-12 leading-relaxed">
              傳統空調依賴強冷風與高能耗。BEHOME Whole Climate 重新定義了室內氣候控制。
              我們利用物理對流原理，配合精密的濕度管理與再生能源，
              創造出如森林晨曦般自然、清爽且無聲的居住環境。
            </p>

            <div className="space-y-8">
              {FEATURES.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-olive/30 flex items-center justify-center group-hover:bg-brand-olive group-hover:text-white transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-2">{feature.title}</h3>
                    <p className="text-sm text-brand-ink/60 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  return (
    <section id="solutions" className="py-32 bg-brand-ink text-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-sage mb-6 block">Solutions</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              為不同空間 <br />
              量身打造的 <span className="italic">空氣藝術</span>
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest border-b border-brand-sage pb-2 hover:text-brand-sage transition-colors">
            查看所有系列 <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-ink/20 group-hover:bg-brand-ink/0 transition-colors duration-500" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-sage mb-2">{product.category}</p>
              <h3 className="text-2xl font-serif mb-3">{product.name}</h3>
              <p className="text-sm text-brand-cream/60 leading-relaxed mb-6">{product.description}</p>
              <div className="w-8 h-px bg-brand-sage group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">Invisible Comfort</h2>
          <p className="text-brand-ink/60 max-w-xl mx-auto">
            真正的奢華是感受不到設備的存在，只留下最純淨的呼吸與寧靜。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: <ThermometerSun />, label: '全室均溫', value: '±0.5°C' },
            { icon: <Droplets />, label: '黃金濕度', value: '50-55%' },
            { icon: <Wind />, label: '超低分貝', value: '18dB' },
            { icon: <ShieldCheck />, label: 'PM2.5 過濾', value: '99.97%' },
          ].map((item, idx) => (
            <div key={idx} className="text-center p-8 rounded-3xl border border-brand-cream hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-cream rounded-full flex items-center justify-center text-brand-olive">
                {item.icon}
              </div>
              <p className="text-xs uppercase tracking-widest text-brand-ink/40 mb-2">{item.label}</p>
              <p className="text-3xl font-serif font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-olive mb-6 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              關於 <span className="italic">BEHOME Whole Climate</span>
            </h2>
            <div className="space-y-6 text-brand-ink/70 leading-relaxed">
              <p>
                BEHOME Whole Climate源自於對理想居住環境的追求。我們相信，真正的舒適不應該依賴高耗能的設備，
                而是透過與自然共生的智慧設計，讓建築本身成為調節氣候的載體。
              </p>
              <p>
                我們的團隊結合建築設計、機電工程與環境科學的專業，致力於研發被動式通風、
                全氣候新風處理與輻射冷暖等創新技術，為台灣的住宅與商業空間帶來革命性的空氣品質解決方案。
              </p>
              <p>
                從豪宅別墅到商業空間，我們以「讓建築與自然同步呼吸」為使命，
                打造真正健康、舒適且永續的生活環境。
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-6 sm:gap-12">
              <div>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-brand-olive">10+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-ink/40 mt-2">年專業經驗</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-brand-olive">200+</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-ink/40 mt-2">完成案例</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-brand-olive">98%</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-ink/40 mt-2">客戶滿意度</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/about-team.webp" 
                alt="Our team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-2xl shadow-xl hidden md:block bg-white">
              <p className="text-sm font-serif italic text-brand-ink/80">
                「讓每一次呼吸，都是與自然的對話。」
              </p>
              <p className="text-xs text-brand-ink/40 mt-2">— BEHOME Whole Climate 創辦理念</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '別墅全案規劃',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const mailtoLink = `mailto:Greenhome.consult1@gmail.com?subject=${encodeURIComponent(`[網站諮詢] ${formData.subject} - ${formData.name}`)}&body=${encodeURIComponent(
      `姓名：${formData.name}\n電話：${formData.phone}\n電子郵件：${formData.email}\n諮詢項目：${formData.subject}\n\n訊息內容：\n${formData.message || '（未填寫）'}`
    )}`;
    
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', subject: '別墅全案規劃', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-olive rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              開啟您的 <br />
              <span className="italic">私人氣候諮詢</span>
            </h2>
            <p className="text-white/70 mb-12 leading-relaxed">
              我們的專家團隊將根據您的建築結構與生活習慣，
              規劃專屬的空氣解決方案。讓家成為最健康的避風港。
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+886 0932325312</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>Greenhome.consult1@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>台北市士林區延平北路9段285之3</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">姓名 *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b border-brand-ink/10 py-2 focus:border-brand-olive outline-none transition-colors" 
                    placeholder="您的稱呼" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">電話 *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border-b border-brand-ink/10 py-2 focus:border-brand-olive outline-none transition-colors" 
                    placeholder="聯絡電話" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">電子郵件</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border-b border-brand-ink/10 py-2 focus:border-brand-olive outline-none transition-colors" 
                  placeholder="Email Address" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">諮詢項目</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full border-b border-brand-ink/10 py-2 focus:border-brand-olive outline-none transition-colors bg-transparent"
                >
                  <option>別墅全案規劃</option>
                  <option>商業空間解決方案</option>
                  <option>產品技術諮詢</option>
                  <option>售後服務預約</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">備註訊息</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="w-full border-b border-brand-ink/10 py-2 focus:border-brand-olive outline-none transition-colors resize-none" 
                  placeholder="請描述您的需求..."
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-olive text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-ink transition-all duration-500 disabled:opacity-50"
              >
                {isSubmitting ? '處理中...' : '送出預約申請'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-center text-brand-olive text-sm">已開啟郵件程式，請完成寄送！</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 px-4 md:px-6 border-t border-brand-ink/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <img 
                src="/logo1.png" 
                alt="BEHOME Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <span className="text-lg md:text-xl font-serif tracking-wide font-semibold">BEHOME Whole Climate</span>
            </div>
            <p className="text-sm text-brand-ink/50 leading-relaxed mb-8">
              致力於將自然智慧與現代科技融合，提供中央全氣候淨零規劃，為高端居住空間打造極致的空氣品質解決方案。
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/BEHOME.taiwan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/behome.taiwan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@behome-taiwan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-ink hover:text-white transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">核心技術</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60">
              <li><a href="#solutions" className="hover:text-brand-olive">20/80 被動式置換通風</a></li>
              <li><a href="#solutions" className="hover:text-brand-olive">全氣候新風處理</a></li>
              <li><a href="#solutions" className="hover:text-brand-olive">輻射冷暖板</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">聯絡資訊</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>+886 0932325312</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="break-all">Greenhome.consult1@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>台北市士林區延平北路9段285之3</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">訂閱電子報</h4>
            <p className="text-sm text-brand-ink/50 mb-6">獲取最新的綠能建築趨勢與生活靈感。</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="bg-brand-cream border-b border-brand-ink/10 py-2 text-sm outline-none flex-grow" />
              <button className="text-brand-olive"><ArrowRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-brand-ink/5 text-[10px] uppercase tracking-widest text-brand-ink/40">
          <p>© 2026 BEHOME Whole Climate. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-ink">Privacy Policy</a>
            <a href="#" className="hover:text-brand-ink">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-olive selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TechSection />
        <SolutionSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
