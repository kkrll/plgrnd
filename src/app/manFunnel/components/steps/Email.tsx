"use client";

import { useState, useRef, useEffect } from "react";
import { useFunnelContext } from "../../context/FunnelContext";
import Input from "../Input";
import Button from "../Button";
import Logo from "../Logo";

export default function Email() {
  const { updateData, nextStep } = useFunnelContext();
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      updateData({ email: email.trim() });
      nextStep();
    }
  };

  return (
    <section className="w-full p-6 min-h-screen flex flex-col items-center">
      <Logo />
      <h2 className="mb-2 text-center">Your results are almost ready!</h2>
      <p className="mb-6 text-center">
        Enter your email to unlock your detailed quiz results and coaches
        matches.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between flex-1"
      >
        <Input
          ref={inputRef}
          icon={
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 10.5C18 11.3284 17.3284 12 16.5 12H1.5C0.671573 12 0 11.3284 0 10.5V1.90137L9 7.90137L18 1.90137V10.5ZM16.5 0C16.899 0 17.2606 0.157016 17.5293 0.411133L9 6.09863L0.469727 0.411133C0.738508 0.156728 1.1007 1.16449e-08 1.5 0H16.5Z"
                fill="white"
              />
            </svg>
          }
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          hint={
            <div className="flex gap-2 ml-2">
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M9.06109 7.7981H5.25622M9.06109 7.7981V6.56733C9.06109 4.10528 5.25622 4.10505 5.25622 6.56733V7.7981M9.06109 7.7981C9.41132 7.7981 9.69524 8.08201 9.69524 8.43224V9.95194C9.69524 11.1415 8.73093 12.1058 7.54139 12.1058H6.77592C5.58638 12.1058 4.62207 11.1415 4.62207 9.95194V8.43224C4.62207 8.08201 4.90599 7.7981 5.25622 7.7981"
                  stroke="#797F91"
                />
                <path
                  d="M7.15854 16.7207C1.04355 12.6572 0.501062 11.9246 0.5 3.79763C3.49061 3.03572 5.9366 1.99054 7.15854 0.720703C8.38259 1.99054 10.7833 3.03572 13.5 3.79763C13.5 11.9246 13.2735 12.6572 7.15854 16.7207Z"
                  stroke="#797F91"
                />
              </svg>

              <span>
                We respect your privacy and are committed to protecting your
                personal data. Your data will be processed in accordance with
                our Privacy Policy.
              </span>
            </div>
          }
          enterKeyHint="done"
          onKeyDown={(e) => {
            if (e.key === "Enter" && email.trim()) {
              e.preventDefault();
              updateData({ email: email.trim() });
              nextStep();
            }
          }}
        />
        <Button type="submit" disabled={!email.trim()}>
          Continue
        </Button>
      </form>
    </section>
  );
}
