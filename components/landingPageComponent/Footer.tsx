"use client"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about">About Us</Link>
              </li>
              <li>
                <Link href="#careers">Careers</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#blog">Blog</Link>
              </li>
              <li>
                <Link href="#guides">Guides</Link>
              </li>
              <li>
                <Link href="#help">Help Center</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="#cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#twitter">Twitter</Link>
              </li>
              <li>
                <Link href="#linkedin">LinkedIn</Link>
              </li>
              <li>
                <Link href="#facebook">Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2025 JobBoard. All rights reserved. Developer By Rajikshan K</p>
        </div>
      </div>
    </footer>
  )
}

