"use client";

import React, { useState } from "react";
import { Lock, Send, Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SendNewsletterForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
    }, 500);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return;

    setSending(true);
    setStatus(null);
    setMessage("");

    try {
      const res = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, subject, htmlContent: content }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setSubject("");
        setContent("");
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión");
    } finally {
      setSending(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 py-24 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Acceso restringido</h1>
              <p className="text-white/50 mt-2">Ingresá tu contraseña para continuar</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-orange-600 hover:bg-orange-500"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ingresar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-white/30 hover:text-white/50 text-sm">
                ← Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Enviar Newsletter</h1>
            <p className="text-white/50 mt-1">Envía un boletín a todos los suscriptores</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-white/30 hover:text-white text-sm"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSend} className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Asunto del email</label>
              <Input
                type="text"
                placeholder="Ej: Nueva propuesta de catering..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={sending}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Contenido HTML</label>
              <Textarea
                placeholder="Escribí el contenido en HTML..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={sending}
                rows={12}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 font-mono text-sm"
              />
              <p className="text-white/30 text-xs mt-2">
                Podés usar HTML básico: &lt;h1&gt;, &lt;p&gt;, &lt;b&gt;, &lt;br&gt;, etc.
              </p>
            </div>

            {message && (
              <div className={`flex items-center gap-2 p-4 rounded-lg ${status === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                {status === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={sending || !subject || !content}
              className="w-full bg-orange-600 hover:bg-orange-500"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar a todos los suscriptores
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-white/30 hover:text-white/50 text-sm">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
