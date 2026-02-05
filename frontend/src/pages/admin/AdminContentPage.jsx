import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { contentApi } from '@/services/api';
import { toast } from 'sonner';

const AdminContentPage = () => {
  const [heroContent, setHeroContent] = useState(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [heroRes, aboutRes] = await Promise.all([
        contentApi.getHero(),
        contentApi.getAbout()
      ]);
      setHeroContent(heroRes.data);
      setAboutContent(aboutRes.data);
    } catch (err) {
      console.error('Error fetching content:', err);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleHeroChange = (field, value) => {
    setHeroContent(prev => ({ ...prev, [field]: value }));
  };

  const handleAboutChange = (field, value) => {
    setAboutContent(prev => ({ ...prev, [field]: value }));
  };

  const saveHero = async () => {
    setSaving(true);
    try {
      await contentApi.updateHero(heroContent);
      toast.success('Hero content saved!');
    } catch (err) {
      console.error('Error saving hero:', err);
      toast.error('Failed to save hero content');
    } finally {
      setSaving(false);
    }
  };

  const saveAbout = async () => {
    setSaving(true);
    try {
      await contentApi.updateAbout(aboutContent);
      toast.success('About content saved!');
    } catch (err) {
      console.error('Error saving about:', err);
      toast.error('Failed to save about content');
    } finally {
      setSaving(false);
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Hero & About Content</h1>
        </div>

        {/* Hero Content */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hero Section</CardTitle>
            <Button onClick={saveHero} disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
              Save Hero
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Title (English)</label>
                <Input
                  value={heroContent?.title_en || ''}
                  onChange={(e) => handleHeroChange('title_en', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Title (French)</label>
                <Input
                  value={heroContent?.title_fr || ''}
                  onChange={(e) => handleHeroChange('title_fr', e.target.value)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Subtitle (English)</label>
                <Textarea
                  value={heroContent?.subtitle_en || ''}
                  onChange={(e) => handleHeroChange('subtitle_en', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Subtitle (French)</label>
                <Textarea
                  value={heroContent?.subtitle_fr || ''}
                  onChange={(e) => handleHeroChange('subtitle_fr', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Tagline (English)</label>
                <Textarea
                  value={heroContent?.tagline_en || ''}
                  onChange={(e) => handleHeroChange('tagline_en', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Tagline (French)</label>
                <Textarea
                  value={heroContent?.tagline_fr || ''}
                  onChange={(e) => handleHeroChange('tagline_fr', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Content */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>About Section</CardTitle>
            <Button onClick={saveAbout} disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
              Save About
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">About (English)</label>
                <Textarea
                  value={aboutContent?.about_en || ''}
                  onChange={(e) => handleAboutChange('about_en', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">About (French)</label>
                <Textarea
                  value={aboutContent?.about_fr || ''}
                  onChange={(e) => handleAboutChange('about_fr', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Mission (English)</label>
                <Textarea
                  value={aboutContent?.mission_en || ''}
                  onChange={(e) => handleAboutChange('mission_en', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Mission (French)</label>
                <Textarea
                  value={aboutContent?.mission_fr || ''}
                  onChange={(e) => handleAboutChange('mission_fr', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Vision (English)</label>
                <Textarea
                  value={aboutContent?.vision_en || ''}
                  onChange={(e) => handleAboutChange('vision_en', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Vision (French)</label>
                <Textarea
                  value={aboutContent?.vision_fr || ''}
                  onChange={(e) => handleAboutChange('vision_fr', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminContentPage;
