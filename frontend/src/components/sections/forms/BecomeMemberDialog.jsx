import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const BecomeMemberDialog = ({ open, onOpenChange, onSubmitted }) => {
  const [form, setForm] = useState({ name: "", email: "", role: "", motivation: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("gosec_member") || "[]");
    existing.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("gosec_member", JSON.stringify(existing));
    onSubmitted?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="heading-3">
            Become a Member / Devenir membre
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
            <label className="block mb-1">How would you like to be involved? / Comment souhaitez-vous vous impliquer ?</label>
            <Input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Volunteer, coach, partner, sponsor..."
            />
          </div>
          <div>
            <label className="block mb-1">Tell us more / Parlez-nous de vous</label>
            <Textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              rows={3}
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

export default BecomeMemberDialog;
