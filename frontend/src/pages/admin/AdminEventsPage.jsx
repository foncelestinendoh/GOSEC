import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save, Upload } from 'lucide-react';
import { eventsApi } from '@/services/api';
import { toast } from 'sonner';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

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

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/api/')) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  const openEditDialog = (event = null) => {
    if (event) {
      setCurrentEvent({ ...event });
      setPreviewUrl(getImageUrl(event.image_url));
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
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setEditDialog(true);
  };

  const handleChange = (field, value) => {
    setCurrentEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPG, PNG, GIF, or WebP)');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image file must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveEvent = async () => {
    if (!currentEvent.title_en || !currentEvent.title_fr || !currentEvent.date_en) {
      toast.error('Please fill in required fields (Title and Date)');
      return;
    }

    setSaving(true);
    try {
      if (currentEvent.id) {
        if (selectedFile) {
          await eventsApi.updateWithImage(currentEvent.id, currentEvent, selectedFile);
        } else {
          await eventsApi.update(currentEvent.id, currentEvent);
        }
        toast.success('Event updated!');
      } else {
        if (selectedFile) {
          await eventsApi.createWithImage(currentEvent, selectedFile);
        } else {
          await eventsApi.create(currentEvent);
        }
        toast.success('Event created!');
      }
      setEditDialog(false);
      setSelectedFile(null);
      setPreviewUrl('');
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
                <div className="flex items-start gap-4">
                  {event.image_url && (
                    <img 
                      src={getImageUrl(event.image_url)} 
                      alt={event.title_en}
                      className="w-32 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[var(--brand-oxblood)] bg-red-50 px-3 py-1 rounded-full">
                        {event.date_en}
                      </span>
                      <h3 className="font-semibold text-lg">{event.title_en}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{event.location_en}</p>
                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">{event.summary_en}</p>
                  </div>
                  <div className="flex gap-2">
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
              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium">Event Image</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[var(--brand-navy)] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload image'}
                  </p>
                </div>
                {previewUrl && (
                  <div className="mt-3 aspect-video bg-gray-100 rounded-lg overflow-hidden max-h-40">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="mt-2">
                  <label className="block mb-1 text-xs text-gray-500">Or Image URL</label>
                  <Input
                    value={currentEvent?.image_url || ''}
                    onChange={(e) => {
                      handleChange('image_url', e.target.value);
                      setSelectedFile(null);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://..."
                    disabled={!!selectedFile}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Date (English) *</label>
                  <Input
                    value={currentEvent?.date_en || ''}
                    onChange={(e) => handleChange('date_en', e.target.value)}
                    placeholder="August 15, 2025"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Date (French) *</label>
                  <Input
                    value={currentEvent?.date_fr || ''}
                    onChange={(e) => handleChange('date_fr', e.target.value)}
                    placeholder="15 août 2025"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Title (English) *</label>
                  <Input
                    value={currentEvent?.title_en || ''}
                    onChange={(e) => handleChange('title_en', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Title (French) *</label>
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
              <div>
                <label className="block mb-2 text-sm font-medium">Order</label>
                <Input
                  type="number"
                  value={currentEvent?.order || 0}
                  onChange={(e) => handleChange('order', parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setEditDialog(false);
                setSelectedFile(null);
                setPreviewUrl('');
              }}>Cancel</Button>
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
