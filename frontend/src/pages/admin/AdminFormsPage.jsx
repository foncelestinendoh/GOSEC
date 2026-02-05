import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Loader2, Mail, User, DollarSign } from 'lucide-react';
import { formsApi } from '@/services/api';
import { toast } from 'sonner';

const AdminFormsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [joins, setJoins] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const [contactRes, joinRes, donateRes] = await Promise.all([
        formsApi.getContactForms(),
        formsApi.getJoinForms(),
        formsApi.getDonateForms()
      ]);
      setContacts(contactRes.data);
      setJoins(joinRes.data);
      setDonations(donateRes.data);
    } catch (err) {
      console.error('Error fetching forms:', err);
      toast.error('Failed to load form submissions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <div className="mb-6 flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Form Submissions</h1>
        </div>

        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail size={16} />
              Contacts ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="joins" className="flex items-center gap-2">
              <User size={16} />
              Join Requests ({joins.length})
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <DollarSign size={16} />
              Donations ({donations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No contact submissions yet
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{contact.first_name} {contact.last_name}</h3>
                          <p className="text-sm text-gray-500">{contact.email} • {contact.phone}</p>
                        </div>
                        <span className="text-xs text-gray-400">{formatDate(contact.created_at)}</span>
                      </div>
                      {contact.topic && (
                        <p className="text-sm text-[var(--brand-dark)] font-medium mb-2">Subject: {contact.topic}</p>
                      )}
                      <p className="text-sm text-gray-600">{contact.message}</p>
                      {contact.city && (
                        <p className="text-xs text-gray-400 mt-2">City: {contact.city}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="joins">
            <div className="space-y-4">
              {joins.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No join requests yet
                  </CardContent>
                </Card>
              ) : (
                joins.map((join) => (
                  <Card key={join.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{join.name}</h3>
                          <p className="text-sm text-gray-500">{join.email}</p>
                        </div>
                        <span className="text-xs text-gray-400">{formatDate(join.created_at)}</span>
                      </div>
                      {join.age_group && (
                        <p className="text-sm text-[var(--brand-dark)] font-medium mb-2">Age Group: {join.age_group}</p>
                      )}
                      {join.message && (
                        <p className="text-sm text-gray-600">{join.message}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="donations">
            <div className="space-y-4">
              {donations.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No donation pledges yet
                  </CardContent>
                </Card>
              ) : (
                donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{donation.name}</h3>
                          <p className="text-sm text-gray-500">{donation.email}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">${donation.amount} CAD</span>
                          <p className="text-xs text-gray-400">{formatDate(donation.created_at)}</p>
                        </div>
                      </div>
                      {donation.message && (
                        <p className="text-sm text-gray-600">{donation.message}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminFormsPage;
