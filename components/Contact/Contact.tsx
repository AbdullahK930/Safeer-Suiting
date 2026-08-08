"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./Contact.module.css";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

const WHATSAPP_NUMBER = "923128957093";

type FormState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes: string;
};

type FormErrors = Partial<Record<"name" | "phone" | "date", string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  service: "",
  notes: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear that field's error as soon as the user starts fixing it
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number";
    if (!form.date.trim()) nextErrors.date = "Please choose a preferred date";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    const formattedDate = form.date
      ? new Date(form.date + "T00:00:00").toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

    const lines = [
      "Hello Safeer Suiting, I'd like to book an appointment.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Preferred Date: ${formattedDate}`,
    ];

    if (form.time.trim()) lines.push(`Preferred Time: ${form.time.trim()}`);
    if (form.service.trim()) lines.push(`Service: ${form.service}`);
    if (form.notes.trim()) lines.push(`Notes: ${form.notes.trim()}`);

    const message = encodeURIComponent(lines.join("\n"));

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noreferrer"
    );

    setErrors({});
    setSent(true);
    setForm(initialForm);
  };
  return (
    <section
      className={`${styles.contact} reveal-section`}
      id="contact"
    >
      <div className={styles.left}>
        <span className="fade-up">GET IN TOUCH</span>

        <h2 className="fade-up">
          Visit Our
          <br />
          Tailoring House
        </h2>

        <p className="fade-up">
          Experience premium tailoring, luxury fabrics and expert craftsmanship.
          Book your appointment or visit our showroom today.
        </p>

        <div className={styles.info}>
          <div className={`${styles.item} fade-up`}>
            <MapPin className={styles.icon} size={22} />
            <div>
              <h4>Address</h4>
              <p>
                Stadium Road,
                <br />
                Shamsabad, Rawalpindi,
                <br />
                Pakistan
              </p>
            </div>
          </div>

          <div className={`${styles.item} fade-up`}>
            <Phone className={styles.icon} size={22} />
            <div>
              <h4>Phone</h4>
              <p>+92 312 8957093</p>
            </div>
          </div>

          <div className={`${styles.item} fade-up`}>
            <Mail className={styles.icon} size={22} />
            <div>
              <h4>Email</h4>
              <p>safeersuiting@gmail.com</p>
            </div>
          </div>

          <div className={`${styles.item} fade-up`}>
            <Clock className={styles.icon} size={22} />
            <div>
              <h4>Working Hours</h4>
              <p>Monday – Saturday</p>
              <p>11:00 AM – 9:30 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.right} fade-up`}>
        <form
          className={styles.bookingForm}
          onSubmit={handleSubmit}
          noValidate
        >
          <h3>Book an Appointment</h3>
          <p className={styles.formHint}>
            Fill in your details below — we&apos;ll open WhatsApp with your
            appointment request already written out, ready to send.
          </p>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={errors.name ? styles.inputError : ""}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                className={errors.phone ? styles.inputError : ""}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="date">Preferred Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={errors.date ? styles.inputError : ""}
              />
              {errors.date && (
                <span className={styles.error}>{errors.date}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="time">Preferred Time</label>
              <input
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="service">Service</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="">Select a service (optional)</option>
              <option value="Three-Piece Suit">Three-Piece Suit</option>
              <option value="Shalwar Kameez">Shalwar Kameez</option>
              <option value="Formal Shirt">Formal Shirt</option>
              <option value="Uniform">Uniform</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              placeholder="Anything else we should know?"
            />
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} luxury-button`}
          >
            <Send size={18} />
            Book Appointment via WhatsApp
          </button>

          {sent && (
            <p className={styles.successMsg}>
              WhatsApp opened in a new tab with your details filled in —
              just hit send there to confirm.
            </p>
          )}
        </form>

        <iframe
          src="https://www.google.com/maps?q=Safeer%20Suiting%20cloth%20%26%20tailors%20Rawalpindi&output=embed"
          className={styles.map}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className={styles.buttons}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className={`${styles.whatsapp} luxury-button`}
          >
            <MessageCircle size={20} />
            WhatsApp Us
          </a>

          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className={`${styles.call} luxury-button`}
          >
            <Phone size={20} />
            Call Now
          </a>

          <a
            href="https://www.google.com/maps/place/SafeerSuiting+cloth+%26+tailors+We+deal+in+Pant+coat+,safarisuit,shalwarsuits%26All+type+of+uniforms/@33.6514067,73.0731827,17z"
            target="_blank"
            rel="noreferrer"
            className={`${styles.directions} luxury-button`}
          >
            <MapPin size={20} />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}