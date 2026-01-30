"use client";

import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (formData.password !== formData.password2) {
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }

        try {
            const response = await register(formData);
            setSuccess(response.message || "Usuario registrado con éxito. Por favor inicia sesión.");
            // Clear form
            setFormData({
                email: "",
                password: "",
                password2: "",
                first_name: "",
                last_name: "",
            });
            // Optionally redirect to login after a few seconds
            setTimeout(() => router.push("/login"), 3000);
        } catch (err: any) {
            setError(err.message || "Error al registrar el usuario.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm bg-white">
            <h1 className="text-2xl font-bold mb-6">Registro</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Apellido</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>

            <p className="mt-4 text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
    );
}
