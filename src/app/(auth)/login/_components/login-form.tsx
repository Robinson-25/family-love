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
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(10, {
    message: "Debe tener 10 caracteres como mínimo",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response) {
        if (response.ok) {
          toast.success("Inicio de sesión exitoso");
          setTimeout(() => {
            setFormLoading(false);
            router.push("/");
          }, 2100);
        } else {
          toast.error(response.error);
          if (response.error === "Cuenta no verificada") {
            setTimeout(() => {
              router.push("/register/verify-email");
            }, 2100);
          }
          setTimeout(() => {
            setFormLoading(false);
          }, 2100);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error interno del servidor");
      setTimeout(() => {
        setFormLoading(false);
      }, 2100);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast.error("Error al iniciar sesión con Google");
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #05101f;
          background-image:
            radial-gradient(ellipse 70% 55% at 20% 20%, rgba(2,113,189,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(105,35,183,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(115,234,254,0.04) 0%, transparent 70%);
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-root::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(2,113,189,0.12) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          animation: floatOrb 12s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .login-root::after {
          content: '';
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(105,35,183,0.1) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
          animation: floatOrb 10s ease-in-out infinite alternate-reverse;
          pointer-events: none;
        }

        @keyframes floatOrb {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 40px) scale(1.1); }
        }

        .login-card {
          position: relative;
          width: 420px;
          background: linear-gradient(160deg, rgba(2,113,189,0.08) 0%, rgba(105,35,183,0.06) 100%);
          border: 1px solid rgba(115,234,254,0.15);
          border-radius: 16px;
          padding: 48px 44px 44px;
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

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(115,234,254,0.6), rgba(2,113,189,0.8), rgba(115,234,254,0.6), transparent);
          border-radius: 50%;
        }

        .login-logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          animation: fadeUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        .login-eyebrow {
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

        .login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          font-style: italic;
          color: #e8f4ff;
          text-align: center;
          margin: 0 0 28px;
          letter-spacing: 0.02em;
          animation: fadeUp 0.6s 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }

        .divider-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          animation: fadeUp 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .divider-wrap::before,
        .divider-wrap::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(115,234,254,0.2));
        }
        .divider-wrap::after {
          background: linear-gradient(to left, transparent, rgba(115,234,254,0.2));
        }
        .divider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(115,234,254,0.5);
          box-shadow: 0 0 8px rgba(115,234,254,0.6);
          flex-shrink: 0;
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 22px;
          animation: fadeUp 0.6s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        .field-label {
          font-family: 'Jost', sans-serif !important;
          font-size: 10px !important;
          font-weight: 400 !important;
          letter-spacing: 0.2em !important;
          text-transform: uppercase !important;
          color: rgba(115,234,254,0.7) !important;
          margin-bottom: 8px !important;
          display: block !important;
        }

        .field-input {
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
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease !important;
        }

        .field-input:focus {
          border-color: rgba(2,113,189,0.7) !important;
          background: rgba(2,113,189,0.12) !important;
          box-shadow: 0 0 0 3px rgba(2,113,189,0.12), 0 0 16px rgba(115,234,254,0.06) !important;
          outline: none !important;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.18) !important;
        }

        .field-input:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(2,113,189,0.12) !important;
        }

        .actions-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 30px;
          animation: fadeUp 0.6s 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn-primary {
          width: 100% !important;
          background: linear-gradient(135deg, #0271bd 0%, #0589e0 50%, #0271bd 100%) !important;
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
          transition: background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease !important;
          box-shadow: 0 4px 20px rgba(2,113,189,0.35), 0 0 0 1px rgba(115,234,254,0.1) !important;
        }

        .btn-primary:hover {
          background-position: right center !important;
          box-shadow: 0 6px 28px rgba(2,113,189,0.55), 0 0 20px rgba(115,234,254,0.12) !important;
          transform: translateY(-1px) !important;
        }

        .btn-primary:active {
          transform: translateY(0) !important;
        }

        .sep-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .sep-line {
          flex: 1;
          height: 1px;
          background: rgba(115,234,254,0.08);
        }
        .sep-text {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(115,234,254,0.3);
        }

        .btn-google {
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          background: transparent !important;
          border: 1px solid rgba(105,35,183,0.35) !important;
          border-radius: 8px !important;
          color: rgba(232,244,255,0.7) !important;
          font-family: 'Jost', sans-serif !important;
          font-size: 11px !important;
          font-weight: 400 !important;
          letter-spacing: 0.18em !important;
          text-transform: uppercase !important;
          padding: 13px !important;
          cursor: pointer !important;
          transition: border-color 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s !important;
        }

        .btn-google:hover {
          border-color: rgba(105,35,183,0.65) !important;
          background: rgba(105,35,183,0.1) !important;
          color: rgba(232,244,255,0.95) !important;
          box-shadow: 0 4px 20px rgba(105,35,183,0.2) !important;
        }

        .login-footer {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: fadeUp 0.6s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }

        .footer-link {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: rgba(115,234,254,0.45);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.25s, border-color 0.25s;
          padding-bottom: 1px;
        }
        .footer-link:hover {
          color: rgba(115,234,254,0.85);
          border-bottom-color: rgba(115,234,254,0.35);
        }

        .footer-text {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
        }
        .footer-text a {
          color: rgba(115,234,254,0.6);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 0.25s, border-color 0.25s;
          padding-bottom: 1px;
        }
        .footer-text a:hover {
          color: rgba(115,234,254,1);
          border-bottom-color: rgba(115,234,254,0.4);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-root">
        <Form {...form}>
          <div className="login-card">

            <div className="login-logo-wrap">
              <Image
                priority
                src="/images/hero-images/logo-family-love.png"
                alt="logo family love"
                width={300}
                height={150}
                className="w-28"
              />
            </div>

            <p className="login-eyebrow">Bienvenido de vuelta</p>
            <h2 className="login-title">Inicia Sesión</h2>

            <div className="divider-wrap">
              <span className="divider-dot" />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="field-wrap">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="field-label">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ejemplo@correo.com"
                          className="field-input"
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
                      <FormLabel className="field-label">Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••"
                          className="field-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage style={{ fontSize: "11px", color: "#73eafe", opacity: 0.8, marginTop: "4px" }} />
                    </FormItem>
                  )}
                />
              </div>

              <div className="actions-wrap">
                {formLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button type="submit" className="btn-primary">
                    Iniciar Sesión
                  </Button>
                )}

                <div className="sep-wrap">
                  <span className="sep-line" />
                  <span className="sep-text">o</span>
                  <span className="sep-line" />
                </div>

                {googleLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button
                    type="button"
                    className="btn-google"
                    onClick={handleGoogleSignIn}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: 16, height: 16, flexShrink: 0 }}>
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                      <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                    Continuar con Google
                  </Button>
                )}
              </div>
            </form>

            <div className="login-footer">
              <Link href="/recuperar-contrasena" className="footer-link">
                Olvidé mi contraseña
              </Link>
              <p className="footer-text">
                ¿Aún no tienes una cuenta?{" "}
                <Link href="/register">Regístrate</Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;