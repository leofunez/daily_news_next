// Types
import type { JSX } from "react";

// Constants
import { CONTACT_US } from "@/constants";

// Components
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";

export default function ContactUs(): JSX.Element {
  return (
    <main>
      <div className="wrapper page-wrapper">
        <h1 className="page-title">{ CONTACT_US }</h1>

        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="phone" placeholder="Phone Number" required />
          <textarea />
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  )
}
