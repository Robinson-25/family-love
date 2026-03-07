"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Debe tener 2 caracteres como mínimo",
  }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(10, {
    message: "Debe tener 10 caracteres como mínimo",
  }),
});

const RegisterForm = () => {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    try {
      const response = await axios.post("/api/auth/register-user", values);

      if (response.data.error) {
        setTimeout(() => setFormLoading(false), 2100);
        toast.error(response.data.error);
      } else if (response.data.ok) {
        Swal.fire({
          html: `<div>
            <h3 style="font-weight: bold; font-size: 1.6rem; margin-bottom: 14px; color: rgb(220,220,220);">Activa tu cuenta</h3>
            <p style="font-size: 1rem; line-height: 1.6rem; color: rgb(200,200,200);">
              Te acabamos de enviar un correo electrónico con un enlace para
              verificar tu email y activar tu cuenta. Por favor revisa tu
              bandeja de entrada, si no lo encuentras también puedes revisar en spam.
            </p>
          </div>`,
          confirmButtonColor: "#0271bd",
          background: "#05101f",
        }).then(() => {
          router.push("/login");
        });
      }
    } catch (error) {
      setTimeout(() => setFormLoading(false), 2100);
      toast.error("Error interno del servidor, vuelve a intentarlo");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .reg-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
          background: #05101f;
          background-image:
            radial-gradient(ellipse 70% 55% at 20% 20%, rgba(2,113,189,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(105,35,183,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(115,234,254,0.04) 0%, transparent 70%);
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .reg-root::before {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(2,113,189,0.12) 0%, transparent 70%);
          top: -100px; left: -100px;
          animation: floatOrb 12s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .reg-root::after {
          content: '';
          position: absolute;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(105,35,183,0.1) 0%, transparent 70%);
          bottom: -80px; right: -80px;
          animation: floatOrb 10s ease-in-out infinite alternate-reverse;
          pointer-events: none;
        }

        @keyframes floatOrb {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(40px,40px) scale(1.1); }
        }

        .reg-card {
          position: relative;
          width: 360px;
          background: linear-gradient(160deg, rgba(2,113,189,0.08) 0%, rgba(105,35,183,0.06) 100%);
          border: 1px solid rgba(115,234,254,0.15);
          border-radius: 16px;
          padding: 36px 32px 32px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(2,113,189,0.1),
            0 32px 64px rgba(0,0,0,0.5),
            0 0 80px rgba(2,113,189,0.08),
            inset 0 1px 0 rgba(115,234,254,0.1);
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
          z-index: 1;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(115,234,254,0.6), rgba(2,113,189,0.8), rgba(115,234,254,0.6), transparent);
          border-radius: 50%;
        }

        .reg-logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          animation: fadeUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        .reg-eyebrow {
          text-align: center;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(115,234,254,0.65);
          margin-bottom: 6px;
          animation: fadeUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        .reg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 300;
          font-style: italic;
          color: #e8f4ff;
          text-align: center;
          margin: 0 0 28px;
          letter-spacing: 0.02em;
          animation: fadeUp 0.6s 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }

        .reg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .reg-divider::before,
        .reg-divider::after {
          content: '';
          flex: 1;
          height: 1px;
        }
        .reg-divider::before { background: linear-gradient(to right, transparent, rgba(115,234,254,0.2)); }
        .reg-divider::after  { background: linear-gradient(to left, transparent, rgba(115,234,254,0.2)); }
        .reg-divider-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(115,234,254,0.5);
          box-shadow: 0 0 8px rgba(115,234,254,0.6);
          flex-shrink: 0;
        }

        .reg-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeUp 0.6s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        .reg-label {
          font-family: 'Jost', sans-serif !important;
          font-size: 10px !important;
          font-weight: 400 !important;
          letter-spacing: 0.2em !important;
          text-transform: uppercase !important;
          color: rgba(115,234,254,0.7) !important;
          margin-bottom: 8px !important;
          display: block !important;
        }

        .reg-input {
          width: 100% !important;
          background: rgba(2,113,189,0.08) !important;
          border: 1px solid rgba(115,234,254,0.12) !important;
          border-radius: 8px !important;
          color: #e8f4ff !important;
          font-family: 'Jost', sans-serif !important;
          font-size: 14px !important;
          font-weight: 300 !important;
          padding: 12px 14px !important;
          outline: none !important;
          box-shadow: none !important;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s !important;
        }

        .reg-input:focus {
          border-color: rgba(2,113,189,0.7) !important;
          background: rgba(2,113,189,0.12) !important;
          box-shadow: 0 0 0 3px rgba(2,113,189,0.12), 0 0 16px rgba(115,234,254,0.06) !important;
          outline: none !important;
        }

        .reg-input::placeholder { color: rgba(255,255,255,0.18) !important; }

        .reg-input:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(2,113,189,0.12) !important;
        }

        .reg-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 22px;
          animation: fadeUp 0.6s 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn-register {
          width: 100% !important;
          background: linear-gradient(135deg, #6923b7 0%, #8b3de0 50%, #6923b7 100%) !important;
          background-size: 200% 100% !important;
          color: #ffffff !important;
          font-family: 'Jost', sans-serif !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.22em !important;
          text-transform: uppercase !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 14px !important;
          cursor: pointer !important;
          transition: background-position 0.4s, box-shadow 0.3s, transform 0.2s !important;
          box-shadow: 0 4px 20px rgba(105,35,183,0.35), 0 0 0 1px rgba(115,234,254,0.08) !important;
        }

        .btn-register:hover {
          background-position: right center !important;
          box-shadow: 0 6px 28px rgba(105,35,183,0.55), 0 0 20px rgba(115,234,254,0.1) !important;
          transform: translateY(-1px) !important;
        }

        .btn-register:active { transform: translateY(0) !important; }

        .reg-footer {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeUp 0.6s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }

        .reg-footer-text {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
        }
        .reg-footer-text a {
          color: rgba(115,234,254,0.6);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.25s, border-color 0.25s;
          padding-bottom: 1px;
        }
        .reg-footer-text a:hover {
          color: rgba(115,234,254,1);
          border-bottom-color: rgba(115,234,254,0.4);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="reg-root">
        <Form {...form}>
          <div className="reg-card">

            <div className="reg-logo-wrap">
              <Image
                priority
                src="/images/hero-images/logo-family-love.png"
                alt="logo family love"
                width={300}
                height={150}
                className="w-28"
              />
            </div>

            <p className="reg-eyebrow">Crea tu cuenta</p>
            <h2 className="reg-title">Regístrate</h2>

            <div className="reg-divider">
              <span className="reg-divider-dot" />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="reg-fields">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="reg-label">Usuario</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="ej. johndoe"
                          className="reg-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ fontSize: "11px", color: "#73eafe", opacity: 0.8, marginTop: "4px" }} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="reg-label">Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ej. Robinsonbiktu@gmail.com"
                          className="reg-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ fontSize: "11px", color: "#73eafe", opacity: 0.8, marginTop: "4px" }} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="reg-label">Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••"
                          className="reg-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ fontSize: "11px", color: "#73eafe", opacity: 0.8, marginTop: "4px" }} />
                    </FormItem>
                  )}
                />
              </div>

              <div className="reg-actions">
                {formLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button type="submit" className="btn-register">
                    Registrarse
                  </Button>
                )}
              </div>
            </form>

            <div className="reg-footer">
              <p className="reg-footer-text">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login">Inicia Sesión</Link>
              </p>
            </div>

          </div>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;