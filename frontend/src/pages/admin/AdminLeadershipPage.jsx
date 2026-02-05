import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save, Upload, User } from 'lucide-react';
import { leadershipApi } from '@/services/api';
import { toast } from 'sonner';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminLeadershipPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await leadershipApi.getAll();
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching leadership:', err);
      toast.error('Failed to load leadership team');
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

  const openEditDialog = (member = null) => {
    if (member) {
      setCurrentMember({ ...member });
      setPreviewUrl(getImageUrl(member.image_url));
    } else {
      setCurrentMember({
        name: '',
        role_en: '',
        role_fr: '',
        bio_en: '',
        bio_fr: '',
        email: '',
        linkedin: '',
        image_url: '',
        order: members.length + 1
      });
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setEditDialog(true);
  };

  const handleChange = (field, value) => {
    setCurrentMember(prev => ({ ...prev, [field]: value }));
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

  const saveMember = async () => {
    if (!currentMember.name || !currentMember.role_en || !currentMember.role_fr) {
      toast.error('Please fill in required fields (Name and Role)');
      return;
    }

    setSaving(true);
    try {
      if (currentMember.id) {
        if (selectedFile) {
          await leadershipApi.updateWithImage(currentMember.id, currentMember, selectedFile);
        } else {
          await leadershipApi.update(currentMember.id, currentMember);
        }
        toast.success('Team member updated!');
      } else {
        if (selectedFile) {
          await leadershipApi.createWithImage(currentMember, selectedFile);
        } else {
          await leadershipApi.create(currentMember);
        }
        toast.success('Team member added!');
      }
      setEditDialog(false);
      setSelectedFile(null);
      setPreviewUrl('');
      fetchMembers();
    } catch (err) {
      console.error('Error saving member:', err);
      toast.error('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to remove this team member?')) return;
    try {
      await leadershipApi.delete(id);
      toast.success('Team member removed!');
      fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      toast.error('Failed to remove team member');
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
            <h1 className="text-2xl font-bold">Leadership Team</h1>
          </div>
          <Button onClick={() => openEditDialog()} className="btn-primary">
            <Plus size={16} className="mr-2" />
            Add Member
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-200 relative">
                {member.image_url ? (
                  <img 
                    src={getImageUrl(member.image_url)} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-[var(--brand-oxblood)] font-medium">{member.role_en}</p>
                <p className="text-xs text-gray-500 mt-1">{member.role_fr}</p>
                {member.email && (
                  <p className="text-xs text-gray-400 mt-2">{member.email}</p>
                )}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(member)}>
                    <Edit size={14} className="mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => deleteMember(member.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentMember?.id ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Photo Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium">Photo</label>
                <div className="flex gap-4">
                  <div 
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[var(--brand-navy)] transition-colors overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Upload</span>
                      </>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 text-xs text-gray-500">Or Image URL</label>
                    <Input
                      value={currentMember?.image_url || ''}
                      onChange={(e) => {
                        handleChange('image_url', e.target.value);
                        setSelectedFile(null);
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="https://..."
                      disabled={!!selectedFile}
                    />
                    {selectedFile && (
                      <p className="text-xs text-green-600 mt-1">File selected: {selectedFile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Full Name *</label>
                <Input
                  value={currentMember?.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Jean-Pierre Mbeki"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Role (English) *</label>
                  <Input
                    value={currentMember?.role_en || ''}
                    onChange={(e) => handleChange('role_en', e.target.value)}
                    placeholder="Founder & President"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Role (French) *</label>
                  <Input
                    value={currentMember?.role_fr || ''}
                    onChange={(e) => handleChange('role_fr', e.target.value)}
                    placeholder="Fondateur et Président"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Bio (English)</label>
                  <Textarea
                    value={currentMember?.bio_en || ''}
                    onChange={(e) => handleChange('bio_en', e.target.value)}
                    rows={4}
                    placeholder="Brief biography..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Bio (French)</label>
                  <Textarea
                    value={currentMember?.bio_fr || ''}
                    onChange={(e) => handleChange('bio_fr', e.target.value)}
                    rows={4}
                    placeholder="Courte biographie..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={currentMember?.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@gosec.ca"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">LinkedIn URL</label>
                  <Input
                    value={currentMember?.linkedin || ''}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Display Order</label>
                <Input
                  type="number"
                  value={currentMember?.order || 0}
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
              <Button onClick={saveMember} disabled={saving} className="btn-primary">
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

export default AdminLeadershipPage;
