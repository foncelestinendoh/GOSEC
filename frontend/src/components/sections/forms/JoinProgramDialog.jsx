import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formsApi } from "@/services/api";

export const JoinProgramDialog = ({ open, onOpenChange, onSubmitted }) => {
  const [form, setForm] = useState({ name: "", email: "", age_group: "", message: "" });
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
      await formsApi.submitJoin(form);
      onSubmitted?.();
      onOpenChange(false);
      setForm({ name: "", email: "", age_group: "", message: "" });
    } catch (err) {
      console.error("Error submitting join form:", err);
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
            Join Our Programs / Rejoindre un programme
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
              placeholder="Alexandre, Fatima, etc."
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
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1">Age group / Groupe d'âge</label>
            <Input
              name="age_group"
              value={form.age_group}
              onChange={handleChange}
              placeholder="Youth 5–12, Youth 13–18, Adult, Family..."
            />
          </div>
          <div>
            <label className="block mb-1">Programs of interest / Programmes d'intérêt</label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Soccer, youth leadership, family days, newcomer support, etc."
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

export default JoinProgramDialog;
