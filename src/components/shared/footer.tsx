import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-white text-gray-700 py-10 border-t'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm'>
        {/* Categories */}
        <div>
          <h3 className='font-semibold mb-2'>Categories</h3>
          <ul className='space-y-3'>
            <li className='cursor-pointer'>Graphics & Design</li>
            <li className='cursor-pointer'>Digital Marketing</li>
            <li className='cursor-pointer'>Writing & Translation</li>
            <li className='cursor-pointer'>Video & Animation</li>
            <li className='cursor-pointer'>Music & Audio</li>
            <li className='cursor-pointer'>Programming & Tech</li>
            <li className='cursor-pointer'>Data</li>
            <li className='cursor-pointer'>Business</li>
            <li className='cursor-pointer'>Lifestyle</li>
            <li className='cursor-pointer'>Sitemap</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className='font-semibold mb-2'>About</h3>
          <ul className='space-y-3'>
            <li className='cursor-pointer'>Careers</li>
            <li className='cursor-pointer'>Press & News</li>
            <li className='cursor-pointer'>Partnerships</li>
            <li className='cursor-pointer'>Privacy Policy</li>
            <li className='cursor-pointer'>Terms of Service</li>
            <li className='cursor-pointer'>Intellectual Property Claims</li>
            <li className='cursor-pointer'>Investor Relations</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className='font-semibold mb-2'>Support</h3>
          <ul className='space-y-3'>
            <li className='cursor-pointer'>Help & Support</li>
            <li className='cursor-pointer'>Trust & Safety</li>
            <li className='cursor-pointer'>Selling on Fiverr</li>
            <li className='cursor-pointer'>Buying on Fiverr</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className='font-semibold mb-2'>Community</h3>
          <ul className='space-y-3'>
            <li className='cursor-pointer'>Events</li>
            <li className='cursor-pointer'>Blog</li>
            <li className='cursor-pointer'>Forum</li>
            <li className='cursor-pointer'>Community Standards</li>
            <li className='cursor-pointer'>Podcast</li>
            <li className='cursor-pointer'>Affiliates</li>
            <li className='cursor-pointer'>Invite a Friend</li>
            <li className='cursor-pointer'>Become a Seller</li>
            <li className='cursor-pointer'>Fiverr Elevate</li>
          </ul>
        </div>

        {/* More From Fiverr */}
        <div>
          <h3 className='font-semibold mb-2'>More From Fiverr</h3>
          <ul className='space-y-3'>
            <li className='cursor-pointer'>Fiverr Business</li>
            <li className='cursor-pointer'>Fiverr Pro</li>
            <li className='cursor-pointer'>Fiverr Studios</li>
            <li className='cursor-pointer'>Fiverr Logo Maker</li>
            <li className='cursor-pointer'>Fiverr Guides</li>
            <li className='cursor-pointer'>Get Inspired</li>
            <li className='cursor-pointer'>ClearVoice</li>
            <li className='cursor-pointer'>AND CO</li>
            <li>Learn</li>
          </ul>
        </div>
      </div>

      <Separator className='my-6' />

      {/* Bottom */}
      <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4'>
        <div>© Fiverr International Ltd. 2021</div>
        <div className='flex items-center gap-4'>
          <Twitter className='w-4 h-4 cursor-pointer' />
          <Facebook className='w-4 h-4 cursor-pointer' />
          <Youtube className='w-4 h-4 cursor-pointer' />
          <Instagram className='w-4 h-4 cursor-pointer' />
          <Linkedin className='w-4 h-4 cursor-pointer' />
        </div>
        <div className='flex items-center gap-2'>🌐 English | $USD</div>
      </div>
    </footer>
  );
}
