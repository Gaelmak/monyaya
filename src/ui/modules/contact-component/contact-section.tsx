import ContactForm from "@/ui/components/contact-form/contactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="flex flex-col items-center justify-center md:h-[50vh] bg-primary-50 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center relative md:absolute md:right-1/5 md:top-1/2 md:w-4/6 w-full h-auto md:h-[64vh] bg-white px-2 py-5 rounded-xl">
        {/* Bloc Contact Information */}
        <div className="w-full md:w-1/3 bg-primary-400 h-auto md:h-[62vh] rounded-xl px-4 py-6 text-primary-50">
          <div className="flex flex-col gap-6 text-primary-50">
            <div className="text-center md:text-left">
              <p className="text-lg md:text-2xl font-semibold">
                Contact Information
              </p>
              <p className="text-xs md:text-sm mt-2">
                Vous avez une question particulière, vous voulez être en contact
                avec notre équipe ? Laissez-nous un message.
              </p>
            </div>
            <ul className="flex flex-col gap-6 mt-4">
              <li className="flex flex-row gap-3 items-center">
                <Phone size={20} />
                <div className="flex flex-col">
                  <a href="tel:+243821611703" className="text-sm">
                    +243 821 611 703
                  </a>
                  <a href="tel:+243997724968" className="text-sm">
                    +243 997 724 968
                  </a>
                </div>
              </li>
              <li className="flex flex-row gap-3 items-center">
                <Mail size={20} />
                <a href="mailto:monyayaofficiel@gmail.com" className="text-sm">
                  monyayaofficiel@gmail.com
                </a>
              </li>
              {/* <li className="flex flex-row gap-3 items-center">
                <MapPin size={20} />
                <span className="text-sm">Mont Ngafula</span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bloc Formulaire */}
        <div className="w-full md:w-3/5 mt-6 md:mt-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
