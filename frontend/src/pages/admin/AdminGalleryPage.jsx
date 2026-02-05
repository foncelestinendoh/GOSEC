import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save } from 'lucide-react';
import { galleryApi } from '@/services/api';
import { toast } from 'sonner';

const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await galleryApi.getAll();
      setGallery(res.data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (item = null) => {
    if (item) {
      setCurrentItem({ ...item });
    } else {
      setCurrentItem({
        title_en: '',
        title_fr: '',
        media_key: '',
        image_url: '',
        order: gallery.length + 1
      });
    }
    setEditDialog(true);
  };

  const handleChange = (field, value) => {
    setCurrentItem(prev => ({ ...prev, [field]: value }));
  };

  const saveItem = async () => {
    setSaving(true);
    try {
      if (currentItem.id) {
        await galleryApi.update(currentItem.id, currentItem);
        toast.success('Gallery item updated!');
      } else {
        await galleryApi.create(currentItem);
        toast.success('Gallery item created!');
      }
      setEditDialog(false);
      fetchGallery();
    } catch (err) {
      console.error('Error saving gallery item:', err);
      toast.error('Failed to save gallery item');
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await galleryApi.delete(id);
      toast.success('Gallery item deleted!');
      fetchGallery();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      toast.error('Failed to delete gallery item');
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
            <h1 className="text-2xl font-bold">Manage Gallery</h1>
          </div>
          <Button onClick={() => openEditDialog()} className="btn-primary">
            <Plus size={16} className="mr-2" />
            Add Image
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.title_en}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title_en}</h3>
                <p className="text-sm text-gray-500">{item.title_fr}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                    <Edit size={16} className="mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => deleteItem(item.id)}>
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{currentItem?.id ? 'Edit Gallery Item' : 'Add Gallery Item'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Title (English)</label>
                <Input
                  value={currentItem?.title_en || ''}
                  onChange={(e) => handleChange('title_en', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Title (French)</label>
                <Input
                  value={currentItem?.title_fr || ''}
                  onChange={(e) => handleChange('title_fr', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Image URL</label>
                <Input
                  value={currentItem?.image_url || ''}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              {currentItem?.image_url && (
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={currentItem.image_url} 
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Media Key</label>
                  <Input
                    value={currentItem?.media_key || ''}
                    onChange={(e) => handleChange('media_key', e.target.value)}
                    placeholder="gallery.item1"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Order</label>
                  <Input
                    type="number"
                    value={currentItem?.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialog(false)}>Cancel</Button>
              <Button onClick={saveItem} disabled={saving} className="btn-primary">
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

export default AdminGalleryPage;
