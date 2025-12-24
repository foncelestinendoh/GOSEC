import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ContactDialog = ({ open, onOpenChange, onSubmitted }) => {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("gosec_contact") || "[]");
    existing.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("gosec_contact", JSON.stringify(existing));
    onSubmitted?.();
    onOpenChange(false);
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
          <div>
            <label className="block mb-1">Full name / Nom complet</label>
            <Input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
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
            <label className="block mb-1">Subject / Sujet</label>
            <Input
              name="topic"
              value={form.topic}
              onChange={handleChange}
            />
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
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="btn-secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel / Annuler
            </Button>
            <Button type="submit" className="btn-primary button-text">
              Submit / Envoyer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
