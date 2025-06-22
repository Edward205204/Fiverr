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
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Graphics & Design</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Digital Marketing</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Writing & Translation</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Video & Animation</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Music & Audio</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Programming & Tech</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Data</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Business</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Lifestyle</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Sitemap</span>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className='font-semibold mb-2'>About</h3>
          <ul className='space-y-3'>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Careers</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Press & News</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Partnerships</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Privacy Policy</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Terms of Service</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Intellectual Property Claims</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Investor Relations</span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className='font-semibold mb-2'>Support</h3>
          <ul className='space-y-3'>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Help & Support</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Trust & Safety</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Selling on Fiverr</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Buying on Fiverr</span>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className='font-semibold mb-2'>Community</h3>
          <ul className='space-y-3'>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Events</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Blog</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Forum</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Community Standards</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Podcast</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Affiliates</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Invite a Friend</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Become a Seller</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Fiverr Elevate</span>
            </li>
          </ul>
        </div>

        {/* More From Fiverr */}
        <div>
          <h3 className='font-semibold mb-2'>More From Fiverr</h3>
          <ul className='space-y-3'>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Fiverr Business</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Fiverr Pro</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Fiverr Studios</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Fiverr Logo Maker</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Fiverr Guides</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Get Inspired</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>ClearVoice</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>AND CO</span>
            </li>
            <li className='hover:cursor-pointer'>
              <span className='hover:underline '>Learn</span>
            </li>
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
