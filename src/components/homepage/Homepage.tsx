"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Homepage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Image
            src="/placeholder.svg"
            width={120}
            height={40}
            alt="Dolly Chaiwala"
            className="h-8"
            style={{ aspectRatio: "120/40", objectFit: "cover" }}
          />
        </Link>
        <nav className="hidden lg:flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Menu
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Button variant="outline" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </header> */}
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <Image
                src="/placeholder.svg"
                width={800}
                height={600}
                alt="Dolly Chaiwala Tea Stall"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              />
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Authentic Indian Chai
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Dolly Chaiwala
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Serving the best chai and snacks in town since 1985.
                  Experience the authentic flavors of India at our cozy tea
                  stall.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="menu" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Our Menu
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Our Offerings
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From classic chai to delectable snacks, we have something for
                  everyone. Discover the flavors that have made Dolly Chaiwala a
                  local favorite.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="Chai"
                  className="mx-auto aspect-video overflow-hidden rounded-lg object-cover object-center"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Classic Chai</h3>
                  <p className="text-muted-foreground">
                    Our signature chai, brewed to perfection with premium Assam
                    tea leaves, spices, and milk.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="Samosa"
                  className="mx-auto aspect-video overflow-hidden rounded-lg object-cover object-center"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Crispy Samosas</h3>
                  <p className="text-muted-foreground">
                    Flaky pastry shells filled with a savory potato and pea
                    mixture, served with tamarind chutney.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="Pakora"
                  className="mx-auto aspect-video overflow-hidden rounded-lg object-cover object-center"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">Delicious Pakoras</h3>
                  <p className="text-muted-foreground">
                    Crispy vegetable fritters, perfect for dipping in our
                    homemade chutneys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Our Story
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  The Dolly Chaiwala Legacy
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dolly Chaiwala was founded in 1985 by Dolly, a passionate tea
                  enthusiast who wanted to share the authentic flavors of Indian
                  chai with her community. Today, we continue her legacy,
                  serving the best chai and snacks in town.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg"
                width={550}
                height={310}
                alt="Dolly Chaiwala Team"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  At Dolly Chaiwala, our mission is to bring the rich traditions
                  and flavors of Indian chai to our community. We are committed
                  to using only the freshest, high-quality ingredients and
                  providing a warm, welcoming atmosphere for our customers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Visit Us Today
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {`Come experience the authentic flavors of India at our cozy tea
                stall. We're open daily from 7am to 9pm.`}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex gap-2">
                <MapPinIcon className="h-6 w-6 text-muted-foreground" />
                <p className="text-muted-foreground">
                  123 Main Street, Anytown USA
                </p>
              </div>
              <div className="flex gap-2">
                <PhoneIcon className="h-6 w-6 text-muted-foreground" />
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
              <div className="flex gap-2">
                <ClockIcon className="h-6 w-6 text-muted-foreground" />
                <p className="text-muted-foreground">Open Daily: 7am - 9pm</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Dolly Chaiwala. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
