import Link from "next/link";

const footerLinks = {
  about: {
    title: "About",
    links: [
      { label: "Features", href: "/" },
      { label: "Pricing", href: "/" },
      { label: "Support", href: "/" },
    ],
  },
  blog: {
    title: "Blog",
    links: [
      { label: "Products", href: "/" },
      { label: "Technology", href: "/" },
      { label: "Crypto", href: "/" },
    ],
  },
  webflow: {
    title: "Webflow",
    links: [
      { label: "Styleguide", href: "/" },
      { label: "Licensing", href: "/" },
      { label: "Changelog", href: "/" },
    ],
  },
  social: {
    title: "Social Media",
    links: [
      { label: "Twitter", href: "https://twitter.com" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo Column */}
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-semibold text-teal-600">
              banquee.
            </Link>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © credit to{" "}
            <Link
              href="https://example.com"
              className="text-teal-600 hover:underline"
            >
              Pawel Gola
            </Link>{" "}
            - Powered by{" "}
            <Link
              href="https://webflow.com"
              className="text-teal-600 hover:underline"
            >
              Webflow
            </Link>
          </div>
          <div className="flex gap-6">
            <Link
              href="/impressum"
              className="text-gray-500 hover:text-gray-900 text-sm"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-gray-500 hover:text-gray-900 text-sm"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
