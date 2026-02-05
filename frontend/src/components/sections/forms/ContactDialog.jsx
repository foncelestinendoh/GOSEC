import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formsApi } from "@/services/api";

export const ContactDialog = ({ open, onOpenChange, onSubmitted }) => {
  const [form, setForm] = useState({ 
    first_name: "", 
    last_name: "", 
    email: "", 
    phone: "",
    topic: "", 
    relation: "",
    city: "",
    message: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await formsApi.submitContact(form);
      onSubmitted?.();
      onOpenChange(false);
      setForm({ 
        first_name: "", 
        last_name: "", 
        email: "", 
        phone: "",
        topic: "", 
        relation: "",
        city: "",
        message: "" 
      });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="heading-3">
            Contact GOSEC / Contacter GOSEC
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2 body-medium">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">First name / Prénom</label>
              <Input
                required
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1">Last name / Nom</label>
              <Input
                required
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Email</label>
              <Input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1">Phone / Téléphone</label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1">Subject / Sujet</label>
              <Input
                name="topic"
                value={form.topic}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1">City / Ville</label>
              <Input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Gatineau, Ottawa..."
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <Textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="btn-secondary"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel / Annuler
            </Button>
            <Button type="submit" className="btn-primary button-text" disabled={loading}>
              {loading ? "Submitting..." : "Submit / Envoyer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
