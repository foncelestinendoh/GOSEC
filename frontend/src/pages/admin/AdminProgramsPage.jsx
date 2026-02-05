import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Save } from 'lucide-react';
import { programsApi } from '@/services/api';
import { toast } from 'sonner';

const AdminProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await programsApi.getAll();
      setPrograms(res.data);
    } catch (err) {
      console.error('Error fetching programs:', err);
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (program = null) => {
    if (program) {
      setCurrentProgram({ ...program });
    } else {
      setCurrentProgram({
        title_en: '',
        title_fr: '',
        description_en: '',
        description_fr: '',
        bullets_en: [],
        bullets_fr: [],
        media_key: '',
        order: programs.length + 1
      });
    }
    setEditDialog(true);
  };

  const handleChange = (field, value) => {
    setCurrentProgram(prev => ({ ...prev, [field]: value }));
  };

  const handleBulletsChange = (field, value) => {
    const bullets = value.split('\n').filter(b => b.trim());
    setCurrentProgram(prev => ({ ...prev, [field]: bullets }));
  };

  const saveProgram = async () => {
    setSaving(true);
    try {
      if (currentProgram.id) {
        await programsApi.update(currentProgram.id, currentProgram);
        toast.success('Program updated!');
      } else {
        await programsApi.create(currentProgram);
        toast.success('Program created!');
      }
      setEditDialog(false);
      fetchPrograms();
    } catch (err) {
      console.error('Error saving program:', err);
      toast.error('Failed to save program');
    } finally {
      setSaving(false);
    }
  };

  const deleteProgram = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      await programsApi.delete(id);
      toast.success('Program deleted!');
      fetchPrograms();
    } catch (err) {
      console.error('Error deleting program:', err);
      toast.error('Failed to delete program');
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
            <h1 className="text-2xl font-bold">Manage Programs</h1>
          </div>
          <Button onClick={() => openEditDialog()} className="btn-primary">
            <Plus size={16} className="mr-2" />
            Add Program
          </Button>
        </div>

        <div className="grid gap-4">
          {programs.map((program) => (
            <Card key={program.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{program.title_en}</h3>
                    <p className="text-sm text-gray-500">{program.title_fr}</p>
                    <p className="text-sm mt-2 text-gray-600 line-clamp-2">{program.description_en}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(program)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => deleteProgram(program.id)}>
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
              <DialogTitle>{currentProgram?.id ? 'Edit Program' : 'Add Program'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Title (English)</label>
                  <Input
                    value={currentProgram?.title_en || ''}
                    onChange={(e) => handleChange('title_en', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Title (French)</label>
                  <Input
                    value={currentProgram?.title_fr || ''}
                    onChange={(e) => handleChange('title_fr', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Description (English)</label>
                  <Textarea
                    value={currentProgram?.description_en || ''}
                    onChange={(e) => handleChange('description_en', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Description (French)</label>
                  <Textarea
                    value={currentProgram?.description_fr || ''}
                    onChange={(e) => handleChange('description_fr', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Bullet Points (English) - one per line</label>
                  <Textarea
                    value={currentProgram?.bullets_en?.join('\n') || ''}
                    onChange={(e) => handleBulletsChange('bullets_en', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Bullet Points (French) - one per line</label>
                  <Textarea
                    value={currentProgram?.bullets_fr?.join('\n') || ''}
                    onChange={(e) => handleBulletsChange('bullets_fr', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Order</label>
                  <Input
                    type="number"
                    value={currentProgram?.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Media Key</label>
                  <Input
                    value={currentProgram?.media_key || ''}
                    onChange={(e) => handleChange('media_key', e.target.value)}
                    placeholder="programs.soccer"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialog(false)}>Cancel</Button>
              <Button onClick={saveProgram} disabled={saving} className="btn-primary">
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

export default AdminProgramsPage;
