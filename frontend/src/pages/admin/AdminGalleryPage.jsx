import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { galleryApi } from '@/services/api';
import { toast } from 'sonner';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

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
      setPreviewUrl(getImageUrl(item.image_url));
    } else {
      setCurrentItem({
        title_en: '',
        title_fr: '',
        media_key: '',
        image_url: '',
        order: gallery.length + 1
      });
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setEditDialog(true);
  };

  const handleChange = (field, value) => {
    setCurrentItem(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPG, PNG, GIF, or WebP)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image file must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    // If it's a relative URL (uploaded image), prepend the API base URL
    if (url.startsWith('/api/')) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  const saveItem = async () => {
    if (!currentItem.title_en || !currentItem.title_fr) {
      toast.error('Please fill in both English and French titles');
      return;
    }

    setSaving(true);
    try {
      if (currentItem.id) {
        // Update existing item
        if (selectedFile) {
          // Update with new image
          await galleryApi.updateWithImage(currentItem.id, currentItem, selectedFile);
        } else {
          // Update without changing image
          await galleryApi.update(currentItem.id, currentItem);
        }
        toast.success('Gallery item updated!');
      } else {
        // Create new item
        if (selectedFile) {
          await galleryApi.createWithImage(currentItem, selectedFile);
        } else if (currentItem.image_url) {
          await galleryApi.create(currentItem);
        } else {
          toast.error('Please upload an image or provide an image URL');
          setSaving(false);
          return;
        }
        toast.success('Gallery item created!');
      }
      setEditDialog(false);
      setSelectedFile(null);
      setPreviewUrl('');
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
                    src={getImageUrl(item.image_url)} 
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
                <label className="block mb-2 text-sm font-medium">Title (English) *</label>
                <Input
                  value={currentItem?.title_en || ''}
                  onChange={(e) => handleChange('title_en', e.target.value)}
                  placeholder="Enter English title"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Title (French) *</label>
                <Input
                  value={currentItem?.title_fr || ''}
                  onChange={(e) => handleChange('title_fr', e.target.value)}
                  placeholder="Enter French title"
                />
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label className="block mb-2 text-sm font-medium">Image</label>
                <div className="space-y-3">
                  {/* Upload Button */}
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
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, GIF, WebP (max 10MB)
                    </p>
                  </div>
                  
                  {/* Or use URL */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-xs text-gray-500">Image URL</label>
                    <Input
                      value={currentItem?.image_url || ''}
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
              </div>
              
              {/* Image Preview */}
              {previewUrl && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
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
              <Button variant="outline" onClick={() => {
                setEditDialog(false);
                setSelectedFile(null);
                setPreviewUrl('');
              }}>Cancel</Button>
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
