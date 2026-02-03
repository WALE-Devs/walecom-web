"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, loading, logout, refreshUser } = useAuth();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        date_of_birth: "",
        newsletter_subscribed: false,
        preferred_language: "es",
        preferred_currency: "PEN",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone_number: user.phone_number || "",
                date_of_birth: user.date_of_birth || "",
                newsletter_subscribed: user.newsletter_subscribed || false,
                preferred_language: user.preferred_language || "es",
                preferred_currency: user.preferred_currency || "PEN",
            });
        }
    }, [user, loading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("No session found");
            await updateProfile(token, formData);
            await refreshUser();
            setSuccess("Perfil actualizado correctamente.");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Error al actualizar el perfil.";
            setError(message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center mt-20">Cargando...</div>;
    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mi Perfil</h1>
                <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                    Cerrar Sesión
                </button>
            </div>

            {error && <p className="text-red-600 mb-4 bg-red-50 p-3 rounded">{error}</p>}
            {success && <p className="text-green-600 mb-4 bg-green-50 p-3 rounded">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (No editable)</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full border rounded-md p-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Idioma Preferido</label>
                        <select
                            name="preferred_language"
                            value={formData.preferred_language}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="es">Español</option>
                            <option value="en">Inglés</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Moneda Preferida</label>
                        <select
                            name="preferred_currency"
                            value={formData.preferred_currency}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="PEN">Soles (PEN)</option>
                            <option value="USD">Dólares (USD)</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter_subscribed"
                        checked={formData.newsletter_subscribed}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700">
                        Suscribirse al boletín informativo
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition font-bold disabled:bg-blue-300"
                >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
        </div>
    );
}
