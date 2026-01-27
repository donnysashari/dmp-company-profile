'use client'

import Link from 'next/link'

export default function SimpleFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="font-figtree text-xl font-semibold mb-4 text-white">
              PT. Digital Mahadata Prima
            </h3>
            <p className="font-plus-jakarta text-gray-300 mb-6 max-w-md leading-relaxed">
              Kami membantu organisasi mentransformasikan bisnis mereka melalui perangkat lunak digital dan layanan TIK yang unggul.
            </p>
            <div className="space-y-2">
              <p className="font-plus-jakarta text-sm text-gray-300">
                <span className="font-medium">Alamat:</span><br />
                No.10 Blok A3, Ruko Dewe Square<br />
                Jl. Raya, Bedrek, Siwalanpanji,<br />
                Kec. Buduran, Kabupaten Sidoarjo,<br />
                Jawa Timur 61252, Indonesia
              </p>
              <p className="font-plus-jakarta text-sm text-gray-300">
                <span className="font-medium">Telepon:</span> 021-22212552
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-figtree text-lg font-medium mb-4 text-white">
              Perusahaan
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="font-plus-jakarta text-gray-300 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-plus-jakarta text-gray-300 hover:text-white transition-colors">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-plus-jakarta text-gray-300 hover:text-white transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="font-plus-jakarta text-gray-300 hover:text-white transition-colors">
                  Portofolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-plus-jakarta text-gray-300 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-figtree text-lg font-medium mb-4 text-white">
              Layanan
            </h4>
            <ul className="space-y-2 font-plus-jakarta text-gray-300 text-sm">
              <li>AI & Robotic Process Automation</li>
              <li>Learning Management System</li>
              <li>Payment Solution Platform</li>
              <li>Development Software</li>
              <li>Cloud Infrastructure</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="font-plus-jakarta text-gray-400 text-sm">
            © 2024 PT. Digital Mahadata Prima. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
