import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save } from 'lucide-react';
import { eventsApi } from '@/services/api';
import { toast } from 'sonner';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await eventsApi.getAll();
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (event = null) => {
    if (event) {
      setCurrentEvent({ ...event });
    } else {
      setCurrentEvent({
        date_en: '',
        date_fr: '',
        title_en: '',
        title_fr: '',
        location_en: '',
        location_fr: '',
        summary_en: '',
        summary_fr: '',
        image_url: '',
        order: events.length + 1
      });
    }
    setEditDialog(true);
  };

  const handleChange = (field, value) => {
    setCurrentEvent(prev => ({ ...prev, [field]: value }));
  };

  const saveEvent = async () => {
    setSaving(true);
    try {
      if (currentEvent.id) {
        await eventsApi.update(currentEvent.id, currentEvent);
        toast.success('Event updated!');
      } else {
        await eventsApi.create(currentEvent);
        toast.success('Event created!');
      }
      setEditDialog(false);
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
      toast.error('Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsApi.delete(id);
      toast.success('Event deleted!');
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      toast.error('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Manage Events</h1>
          </div>
          <Button onClick={() => openEditDialog()} className="btn-primary">
            <Plus size={16} className="mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[var(--brand-dark)] bg-[var(--bg-subtle)] px-3 py-1 rounded-full">
                        {event.date_en}
                      </span>
                      <h3 className="font-semibold text-lg">{event.title_en}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{event.location_en}</p>
                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">{event.summary_en}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(event)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => deleteEvent(event.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentEvent?.id ? 'Edit Event' : 'Add Event'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Date (English)</label>
                  <Input
                    value={currentEvent?.date_en || ''}
                    onChange={(e) => handleChange('date_en', e.target.value)}
                    placeholder="August 15, 2025"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Date (French)</label>
                  <Input
                    value={currentEvent?.date_fr || ''}
                    onChange={(e) => handleChange('date_fr', e.target.value)}
                    placeholder="15 août 2025"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Title (English)</label>
                  <Input
                    value={currentEvent?.title_en || ''}
                    onChange={(e) => handleChange('title_en', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Title (French)</label>
                  <Input
                    value={currentEvent?.title_fr || ''}
                    onChange={(e) => handleChange('title_fr', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Location (English)</label>
                  <Input
                    value={currentEvent?.location_en || ''}
                    onChange={(e) => handleChange('location_en', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Location (French)</label>
                  <Input
                    value={currentEvent?.location_fr || ''}
                    onChange={(e) => handleChange('location_fr', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Summary (English)</label>
                  <Textarea
                    value={currentEvent?.summary_en || ''}
                    onChange={(e) => handleChange('summary_en', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Summary (French)</label>
                  <Textarea
                    value={currentEvent?.summary_fr || ''}
                    onChange={(e) => handleChange('summary_fr', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Image URL</label>
                  <Input
                    value={currentEvent?.image_url || ''}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Order</label>
                  <Input
                    type="number"
                    value={currentEvent?.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialog(false)}>Cancel</Button>
              <Button onClick={saveEvent} disabled={saving} className="btn-primary">
                {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminEventsPage;
