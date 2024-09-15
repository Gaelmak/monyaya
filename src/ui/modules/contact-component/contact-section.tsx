import ContactForm from "@/ui/components/contact-form/contactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="flex flex-col items-center justify-center h-[64vh] bg-primary-50">
      <div className="flex flex-row justify-between items-center absolute right-1/5 top-2/3 w-4/6 h-[64vh] bg-white px-2 rounded-xl">
        <div className="w-1/3  bg-primary-400 h-[62vh] rounded-xl px-2 py-2">
          <div className="p-1 w-full h-full flex flex-col gap-20 px-4 py-10  text-primary-50 ">
            <div className="flex flex-col gap-1 text-primary-50">
              <p className="text-2xl font-semibold">Contact Information</p>
              <p className="text-sm">
                Vous avez une question particuliere, vous voulez etre en contact
                avec notre equipe ? laissez nous un message.
              </p>
            </div>
            <ul className="flex flex-col gap-8">
              <li className="flex flex-row gap-5 items-center">
                <Phone size={20} />
                <div className="flex flex-col">
                  <span className="">+243 821 611 703</span>
                  <span className="">+243 997 724 968</span>
                </div>
              </li>
              <li className="flex flex-row gap-5 items-center">
                <Mail size={20} />
                <span className="">monyaya@gmail.com</span>
              </li>
              <li className="flex flex-row gap-5 items-center">
                <MapPin size={20} /> <span className="">Mont ngafula</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-3/5 pr-5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
